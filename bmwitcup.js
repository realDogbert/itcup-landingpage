$(document).ready(function() {

    $('#registration').submit(function(e) {

        // prevent Default functionality
        e.preventDefault();
        
        // Change button and prevent a second click
        $('#submitRegistration')
            .removeClass('btn-primary')
            .addClass('btn-secondary')
            .text('Sende Anmeldung');

        var data = {
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            email: $('#email').val(),
            agreement: $('#agreement').is(':checked')
        }

        $.ajax({
            method: 'POST',
            url: 'https://api.bmw-itcup.de/v1/users/',
            dataType: 'json',
            data: JSON.stringify(data),
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
        
    });


});