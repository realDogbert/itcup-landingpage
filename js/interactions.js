const endpoint = ' https://mwve9u6of7.execute-api.eu-central-1.amazonaws.com/prod';
var _user = null;

$(document).ready(function(){

    $('#registrationSuccess').hide();

	// Smooth Scrolling
	$('a[href^="#"]').on('click',function(e) {

		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 500, 'swing', function () {
			window.location.hash = target;
		});
    });

    const form = $('#registration');
    form.submit(function(e) {

        // prevent Default functionality
        e.preventDefault();
        form.addClass('was-validated');

        _user = {
            firstName: $('#firstname').val(),
            lastName: $('#lastname').val(),
            email: $('#email').val(),
            agreement: $('#agreement').is(':checked')
        };
        if (verifyNewsletterForm()) {
            registerUser();
        };

    });

});

function verifyNewsletterForm() {

    // Reset all field to be true
    var valid = (_user.firstName.trim().length >= 3) 
        && (_user.lastName.trim().length >= 3)
        && (_user.email.trim().length >= 3) 
        && _user.agreement;
        
    return valid;

}

function registerUser() {

    var url = endpoint + '/user';

    $.ajax({
        headers: {
            "X-API-KEY": "Pl4RPMiY0z8zajGRwVtOy31usOsf0fez8AEtI01x"
        },
        method: 'POST',
        url: url,
        data: JSON.stringify(_user),
        contentType: 'application/json'
    })
    .done(function(data) {
        $('#registrationRequest').hide();
        $('#registrationSuccess').show();
    })
    .fail(function(error) {
        console.log(error);
        $('#registrationRequest').hide();
        $('#registrationSuccess').show();
    });

}
 