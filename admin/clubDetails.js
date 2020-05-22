// const endpoint = 'http://localhost:4000/v1/users/';
// const endpoint = 'https://api.bmw-itcup.de/v1/users/';
const endpoint = ' https://mwve9u6of7.execute-api.eu-central-1.amazonaws.com/prod';

var _club = null;

$(document).ready(function() {

    var urlParams = new URLSearchParams(location.search);
    getClubData(urlParams.get('id'));

})

function getClubData(id) {

    let url = endpoint + '/clubs/' + id;

    $.ajax({
        headers: {
            "X-API-KEY": "Pl4RPMiY0z8zajGRwVtOy31usOsf0fez8AEtI01x"
        },
        method: 'GET',
        url: url
    })
    .done(function(data) {

        _club = data;
        console.log(_club);

        $('#logo').attr("src", _club.images.url_logo);
        $('#cover').attr("src", _club.images.url_cover);

        // fill visible form fields
        $('#clubName').val(_club.name);
        $('#description').text(_club.content);

        $('#street').val(_club.address.street);
        $('#zip').val(_club.address.zip);
        $('#city').val(_club.address.city);
        $('#country').val(_club.address.country);

    })
    .fail(function(error) {
        console.log(error);
        // showError('Daten konnten nicht geladen werden.');
    });

}