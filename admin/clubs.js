// const endpoint = 'http://localhost:4000/v1/users';
const endpoint = ' https://mwve9u6of7.execute-api.eu-central-1.amazonaws.com/prod';

var _users = null;
var _filter = null;

$(document).ready(function() {

    loadClubs('all');

})

function loadClubs(filter) {

    var url = endpoint + '/clubs';
    $('#result').html('');

    $.ajax({
        headers: {
            "X-API-KEY": "Pl4RPMiY0z8zajGRwVtOy31usOsf0fez8AEtI01x"
        },
        method: 'GET',
        url: url
    })
    .done(function(data) {

        $.each(data.clubs, (idx, club) => {
            $('#result').append(createClubLine(idx, club));
        });

    })
    .fail(function(error) {
        console.log(error);
    });

}


function createClubLine(idx, club) {

    var line = $("<tr>").attr('id', club.id);
    line.append($("<td>").html(idx)); 
    line.append($("<td>").html(club.name)); 
    line.append($("<td>").html(club.address.street));
    line.append($("<td>").html(club.address.zip));
    line.append($("<td>").html(club.address.city));

    line.on('click', function() {
        window.location.href = "clubDetails.html?id=" + club.id;
    });

    return line;
}