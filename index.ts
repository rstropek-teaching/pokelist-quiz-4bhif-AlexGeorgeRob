$().ready(function () {
    // Disable backBut at the beginning
    $('#backBut').attr('disabled', 'disabled');

    const limit: number = 20;
    let offset: number = 0;

    getPokemon();

    async function getPokemon() {
        $('#details').hide();
        $('#backListBut').hide();
        $('#list').show();

        const url: string = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&&offset=${offset}`;
        const pokelist: any = await $.get(url);

        $('h1').empty();
        $('h1').append('Pokemon List');
        $('#pokemon').empty();

        // Print out the current limit pokemon
        let html: string = '';
        for (const pokemon of pokelist.results) {
            html = `<tr>
                        <td>${pokemon.name}</td>
                        <td><button type="button" id="${pokemon.url}">Details</button>
                    </tr>`;
            $('#pokemon').append(html);
        }
    }

    async function getDetails(url: string) {
        $('#list').hide();
        $('#details').show();
        $('#backListBut').show();

        const pokedetails: any = await $.get(url);

        $('h1').empty();
        $('h1').append(`${pokedetails.name}`);
        $('#details').empty();

        let html: string = '';
        html = `<img src="${pokedetails.sprites.front_default}">
                <p>Weight: ${pokedetails.weight}</p>
                <p>Abilities:</p>
                <ol>`;

        for (const detail of pokedetails.abilities) {
            html += `<li>${detail.ability.name}</li>`;
        }

        html += `</ol>`;
        $('#details').append(html);
    }

    $('#backBut').click(function () {
        offset -= limit;

        // Check if next page is the first one
        if (offset - limit < 0) {
            $(this).attr('disabled', 'disabled');
        }
        // Or check if the offset wants to go out of bounds 
        else if (offset < 0) {
            offset = 0;
            $(this).attr('disabled', 'disabled');
        }
        // Enable the button opposite button on action
        $('#nextBut').removeAttr('disabled');

        getPokemon();
    });

    $('#nextBut').click(function () {
        offset += limit;

        // Check if next page is the last one
        if (802 < offset + limit) {
            $(this).attr('disabled', 'disabled');
        }
        // Or check if the offset wants to go out of bounds
        else if (802 < offset) {
            offset = 802;
            $(this).attr('disabled', 'disabled');
        }
        // Enable the button opposite button on action
        $('#backBut').removeAttr('disabled');

        getPokemon();
    });

    $('#pokemon').on('click', 'button', function () {
        let url: string = $(this).attr('id') + '';
        getDetails(url);
    });

    $('#backListBut').click(function() {
        getPokemon();
    });
});