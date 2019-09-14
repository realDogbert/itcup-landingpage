const endpoint = 'http://localhost:4000/v1/users';
// const endpoint = 'https://api.bmw-itcup.de/v1/users';

var _users = null;
var _filter = null;

$(document).ready(function() {

    loadUsers('all');
    $('select').on('change', function() {
        loadUsers(this.value);
    });

})

function loadUsers(filter) {

    var url = endpoint;
    if (filter && filter != 'all') {
        url = url + '?userStatus=' + filter;
    };
    $('#result').html('');

    $.ajax({
        method: 'GET',
        url: url
    })
    .done(function(data) {

        _users = data;

        $.each(_users, (idx, user) => {
            $('#result').append(createUserLine(idx, user));
        });
        

    })
    .fail(function(error) {
        console.log(error);
    });

}


function createUserLine(idx, user) {

    var line = $("<tr>").attr('id', idx);
    line.append($("<td>").html(idx)); 
    line.append($("<td>").html(user.firstName)); 
    line.append($("<td>").html(user.lastName));
    line.append($("<td>").html(user.email));
    line.append($("<td>").html(user.userStatus));
    line.append($("<td>").html(user.golfclub));
    line.append($("<td>").html(new Date(user.createdAt).toLocaleDateString()));
    line.append($("<td>").html(new Date(user.updatedAt).toLocaleDateString()));

    line.on('click', function() {
        window.location.href = "update.html?id=" + user.id;
    });

    return line;
}