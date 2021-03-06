const endpoint = 'http://localhost:4000/v1/users/';
// const endpoint = 'https://api.bmw-itcup.de/v1/users/';

var _user = null;

$(document).ready(function() {

    var urlParams = new URLSearchParams(location.search);
    getUserData(urlParams.get('id'));

    $('#updateUser').submit(function(e) {

        // prevent Default functionality
        e.preventDefault();
        resetLayout();

        // update user data
        _user.firstName = $('#firstName').val();
        _user.lastName = $('#lastName').val();
        _user.email = $('#email').val();
        _user.golfclub = $('#golfclub').val();
        _user.userStatus = $('#userStatus').val();
        _user.handicap = Number($('#handicap').val().replace(/,/, '.'));
        _user.updatedAt = new Date().getTime();
        if (!_user.createdAt) {
            _user.createdAt = new Date().getTime();
        }

        if (verifyUser()) {
            updateUser(_user);
        }
        
    });

    $('#deleteUser').click(function(){
        deleteUser(_user);
    });

})

function getUserData(id) {

    $.ajax({
        method: 'GET',
        url: endpoint + id
    })
    .done(function(data) {

        _user = data;


        // fill visible form fields
        $('#firstName').val(data.firstName);
        $('#lastName').val(data.lastName);
        $('#email').val(data.email);
        $('#golfclub').val(data.golfclub);
        $('#userStatus').val(data.userStatus);
        if(data.handicap) $('#handicap').val(data.handicap);
        $('#createdAt').html(new Date(data.createdAt).toLocaleString());
        $('#updatedAt').html(new Date(data.updatedAt).toLocaleString());
    })
    .fail(function(error) {
        console.log(error);
        showError('Daten konnten nicht geladen werden.');
    });

}

function updateUser(user) {

    $.ajax({
        method: 'PUT',
        url: endpoint + user.id,
        dataType: 'json',
        data: JSON.stringify(user),
        contentType: 'application/json'
    })
    .done(function(data) {
        showSuccess('Danke. Deine Daten wurden erfogreich geändert.');
    })
    .fail(function(error) {
        console.log(error);
        showError('Daten konnten nicht aktualisiert werden.');
    });
}


function deleteUser(user) {

    $.ajax({
        method: 'DELETE',
        url: endpoint + user.id
    })
    .done(function(data) {
        showSuccess('Die Daten wurden erfolgreich gelöscht.');
    })
    .fail(function(error) {
        console.log(error);
        showError('Daten konnten nicht gelöscht werden.');
    });
}


function showSuccess(successMessage) {
    $('#response')
        .addClass('alert alert-success')
        .text(successMessage);
}

function showError(errorMessage) {
    $('#response')
        .addClass('alert alert-danger')
        .css('margin-top', '20px')
        .text(errorMessage); 
}

function verifyUser() {

    console.log(_user);

    var valid = true;
    if (_user.golfclub.trim().length < 3) {
        // valid = false;
        // $('#golfclub').addClass('highlight');
        _user.golfclub = null;
    };
    if (_user.handicap == 0) {
        _user.handicap = null;
    };
    if (_user.firstName.trim().length < 3) {
        valid = false;
        $('#firstname').addClass('highlight');
    };
    if (_user.lastName.trim().length < 3) {
        valid = false;
        $('#lastname').addClass('highlight');
    };
    if (_user.email.trim().length < 3) {
        valid = false;
        $('#email').addClass('highlight');
    };
    return valid;

}

function resetLayout() {

    $('#response').html("");
    $('#golfclub').removeClass('highlight');
    $('#firstname').removeClass('highlight');
    $('#lastname').removeClass('highlight');
    $('#email').removeClass('highlight');

}