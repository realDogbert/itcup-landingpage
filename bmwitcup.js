var _user = null;

$(document).ready(function() {

    $('#registration').submit(function(e) {

        // prevent Default functionality
        e.preventDefault();
        
        // Change button and prevent a second click
        $('#submitRegistration')
            .removeClass('btn-primary')
            .addClass('btn-secondary')
            .text('Sende Anmeldung');

        // Reset response if it had bees set previously
        $('#response').removeClass('alert alert-danger');

        _user = {
            firstName: $('#firstname').val(),
            lastName: $('#lastname').val(),
            email: $('#email').val(),
            golfclub: $('#golfclub').val(),
            handicap: Number($('#handicap').val()),
            agreement: $('#agreement').is(':checked')
        }

        if (verifyUser()) {
            registerUser();
        } else {

            // Reset button
            $('#submitRegistration')
                .removeClass('btn-secondary')
                .addClass('btn-primary')
                .text('Anmeldung abschicken ');
            
            $('#response')
                .addClass('alert alert-danger')
                .css('margin-top', '20px')
                .text('Bitte alle markierten Felder ausfüllen.');

        }

    });


});

function verifyUser() {

    // Reset all field to be true
    var valid = true;
    $('#golfclub').removeClass('highlight');
    $('#handicap').removeClass('highlight');
    $('#firstname').removeClass('highlight');
    $('#lastname').removeClass('highlight');
    $('#email').removeClass('highlight');


    if (_user.golfclub.trim().length < 3) {
        valid = false;
        $('#golfclub').addClass('highlight');
        _user.golfclub = null;
    };
    if (_user.handicap == 0) {
        valid = false;
        $('#handicap').addClass('highlight');
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

function registerUser() {

    $.ajax({
        method: 'POST',
        url: 'https://api.bmw-itcup.de/v1/users/',
        dataType: 'json',
        data: JSON.stringify(_user),
        contentType: 'application/json'
    })
    .done(function(data) {
        $('#submitRegistration').hide();
        $('#response')
            .addClass('alert alert-success')
            .text('Anmeldung erfolgreich gesendet.');
    })
    .fail(function(error) {
        $('#submitRegistration')
            .removeClass('btn-secondary')
            .addClass('btn-primary')
            .text('Anmeldung abschicken');
        $('#response')
            .addClass('alert alert-danger')
            .css('margin-top', '20px')
            .text('Fehler beim Senden der Anmeldung.'); 
    });

}