
function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

$(document).ready(function() {
	var cookieName = 'welcome3';

	if (readCookie(cookieName)) {
		return;
	}

	// $('body').prepend('<style>' + css + '</style>');
	$('body').prepend('<a href="http://wp.me/p4DeHb-4F" id="welcome-intro" target="_blank">Website Maintenance in Progress - Check Out What\'s New!</a>');

	var div = $('#welcome-intro');
	div.css({
		position: 'fixed',
		display: 'block',
		'text-decoration': 'none',
		bottom: '0px',
		left: '0px',
		right: '0px',
		height: '70px',
		'line-height': '70px',
		background: 'rgba(39, 174, 96, 0.8)',
		color: '#fff',
		'font-size': '18px',
		'text-align': 'center',
		'font-weight': '200',
		'z-index': '1000000'
	});

	div.mouseenter(function() {
		div.css({
			background: 'rgba(39, 174, 96, 1)',
			transition: 'all 0.55s ease'
		});
	});

	div.mouseleave(function() {
		div.css({
			background: 'rgba(39, 174, 96, 0.8)',
			transition: 'all 0.55s ease'
		});
	});

	div.click(function() {
		div.hide();
		createCookie(cookieName, 1, 7);
	});
});