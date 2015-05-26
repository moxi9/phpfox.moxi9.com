/* -- Full Screen Viewport Container
   ---------------------------- */

function checkMenu() {
	var windowpos = $(window).scrollTop(),
		windowHeight = $(window).height(),
		navHeight = $('.navbar-wrapper').height();

	if ($('.footer').visible(true)) {
		$('.contact-us').fadeOut();
	}
	else {
		$('.contact-us').fadeIn();
	}

	if (windowpos <= (windowHeight - navHeight)) {
		$('.nav li.current').removeClass('current');
		$('body').removeClass('in-fixed-mode');
		if (dropForm === true) {
			$('#get-started-form').animate({
				'margin-bottom': '0px'
			}, 'fast');
			dropForm = false;
		}
	}
	else {
		$('body').addClass('in-fixed-mode');
		if (dropForm === false) {
			dropForm = true;
			$('#get-started-form').animate({
				'margin-bottom': '-' +  $('#get-started-form').outerHeight() + 'px'
			}, 'fast');
		}
	}
};

if ($('#page-index').length || $('#page-nebula').length) {
	var dropForm = false;
	$(window).load(checkMenu);
	$(window).scroll(checkMenu);
}

$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
	var brand = $('.navbar-brand').html();
	$('.navbar-brand').html(brand.replace('fox', '<span>fox</span>'));
    init();
});

$(document).ready(function() {
  fullScreenContainer();
  owlCarousel();
  magnificPopup();

	$('.navbar-nav a').click(function() {
		var c = $('.navbar-collapse');

		if ($('#respond').hasClass('active')) {
			$('#respond').removeClass('active');
			$('.navbar-nav').hide();
			// $('#the-holder').show();
			// c.removeClass('collapse').removeClass('in');
		}
	});

	$('#respond').click(function() {
		var t = $(this), n = $('.navbar-collapse'), b = $('.navbar-nav');

		if (t.hasClass('active')) {
			t.removeClass('active');
			// n.removeClass('collapse').removeClass('in');
			// $('#the-holder').show();
			b.hide();

			return;
		}

		t.addClass('active');
		// n.addClass('collapse').addClass('in');
		b.show();
		// $('#the-holder').hide();
	});

	$('.plans a, .get-phpfox').click(function() {
		var url = 'http://shop.phpfox.com/cart/[ID]:1', t = $(this), id = t.data('product-id'), ids = id.split(':');
		// var url = 'http://shop.phpfox.com/pages/checkout?id=[ID]&email=&name=';

		// console.log(ids);
		$('.no-install').attr('href', url.replace('[ID]', ids[0]));
		$('.with-install').attr('href', url.replace('[ID]', ids[1]));

		$('#checkout').find('.modal-title').html(t.parents('.plan:first').find('.plan-title > h2').html());
		$('#checkout').modal({
			show: true
		});

		return false;
	});

	$('.plan').mouseenter(function() {
		$('.plan.featured').removeClass('featured');
		$(this).addClass('featured');
	});

	$('.image-load:not(.built)').each(function() {
		var t = $(this),
			src = t.data('src'),
			img = new Image();

		img.onload = function() {
			t.css('background-image', 'url(' + src + ')');
		};
		img.src = src;
	});

	$('#new-order').submit(function() {
		var t = $(this),
			n = $('#name'),
			e = $('#email'),
			errors = 0;

		if (!n.val()) {
			n.parent().addClass('has-error');
			n.parent().find('.alert').removeClass('hide');
			n.focus();
			errors++;
		}

		if (!e.val()) {
			e.parent().addClass('has-error');
			e.parent().find('.alert').removeClass('hide');
			errors++;
		}

		if (!errors) {
			t.find('button').addClass('disabled');
			window.location.href = 'http://shop.phpfox.com/pages/checkout?id=' + $('#order-id').val() + '&email=' + encodeURIComponent($('#email').val()) + '&name=' + encodeURIComponent($('#name').val());
		}

		return false;
	});

	var html = '<ol class="carousel-indicators">',
		iteration = 0;
	$('#carousel-example-generic .carousel-inner > .item').each(function() {
		html += '<li data-target="#carousel-example-generic" data-slide-to="' + iteration + '" class="' + (iteration === 0 ? 'active' : '') + '"></li>';
		iteration++;
	});
	html += '</ol>';

	$('#carousel-example-generic').prepend(html);

	/*
	$('.get-started-link').click(function() {
		dropForm = false;

		$('#get-started-form').css('margin-bottom', 0);
		$('#name').focus();

		return false;
	});
	*/

	$('.more').click(function() {
		var b = $('body');

		if (b.hasClass('more-clicked')) {
			b.removeClass('more-clicked');
			return false;
		}
		b.addClass('more-clicked');

		return false;
	});

	$('.list-group-item:first-of-type').addClass('active');
	$('.list-group-item').click(function() {
		var t = $(this);

		$('.list-group-item.active').removeClass('active');
		t.addClass('active');

		return false;
	});

	/*
	setTimeout(function() {

	}, 2000);
	*/

	$('.nebula-features').click(function() {
		$('.bs-modal-lg').modal({
			show: true
		});

		$('#nebula-features').load('/nebula/features/popup.html');

		console.log('click2!');

		return false;
	});

	$('.neutron-features').click(function() {
		$('.bs-modal-lg').modal({
			show: true
		});

		$('#neutron-features').load('/neutron/features/popup.html');

		return false;
	});
});

function builtInMenu() {
	$('.build-in-menu a').click(function() {
		var t = $(this), id = t.attr('href');

		$('.build-in-menu a.active').removeClass('active');
		t.addClass('active');
		$('.build-in-features section').hide();
		$('.build-in-features ' + id).show();

		// $('html, body').animate({scrollTop: 10}, 'slow');

		return false;
	});
};


/* --- initialize functions on window load here -------------- */

function init() {
    tooltips();
    onePageScroll();
    scrollAnchor();
	builtInMenu();
};

/* --- Full Screen Container ------------- */

function fullScreenContainer() {
	    var changeIt = function() {
		    var screenHeight = $(window).height();
		    if ($(window).width() <= 480) {
			    return;
		    }

		    $('section#get-started').css('min-height', screenHeight + 'px');
		    var obj = $('section#get-started .container .row');
		    obj.css({
			    position: 'absolute',
			    left: '50%',
			    top: '50%',
			    width: obj.width(),
			    'margin-left': '-' + (obj.width() / 2) + 'px',
			    'margin-top': '-' + (obj.height() / 2) + 'px',
			    bottom: 'auto'
		    });
	    };

	if ($(window).width() > 480) {
		changeIt();
	}

  $(window).resize(changeIt);
};


/* --- owlCarousel ------------- */

function owlCarousel() {

    $("#owl-example").owlCarousel({
      lazyLoad : true,
      items: 3,
      theme: "owl-theme-main"
    }); 

	/*
    $("#get-started").owlCarousel({
      lazyLoad: true,
      lazyEffect: "fade",
      singleItem: true,
      navigation: true,
      navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
      slideSpeed : 450,
      pagination: false,
      transitionStyle: "fade",
      theme: "owl-theme-featured"
      
    });
    */
}



/* --- Tooltips ------------------- */

function tooltips() {
  $('.tooltips').tooltip(); 
}


/* --- scrollReveal ------------------- */

window.scrollReveal = new scrollReveal();
  


/* --- magnific popup ------------------- */

function magnificPopup() {

  // Gallery
  $('.popup-gallery').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-fade',
    disableOn: 700,
    removalDelay: 160,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    },
	  zoom: {
		  enabled: true, // By default it's false, so don't forget to enable it

		  duration: 300, // duration of the effect, in milliseconds
		  easing: 'ease-in-out', // CSS transition easing function

		  // The "opener" function should return the element from which popup will be zoomed in
		  // and to which popup will be scaled down
		  // By defailt it looks for an image tag:
		  opener: function(openerElement) {
			  // openerElement is the element on which popup was initialized, in this case its <a> tag
			  // you don't need to add "opener" option if this code matches your needs, it's defailt one.
			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
	  },
    callbacks: {
      close: function() {
        $('.portfolio-item figure figcaption').removeClass('active');
        $('.portfolio-item figure .info').removeClass('active');
      }
    }
  });

  $('.portfolio-item figcaption a.preview').click(function(){
    $(this).parent().addClass('active');
    $(this).parent().siblings('.info').addClass('active');
  });

  // Zoom Gallery

  $('.zoom-modal').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below

    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function 

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is('i') ? openerElement : openerElement.find('i');
      }
    }

  });

  $('.popup-modal').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
}



/* --- Isotope ------------------- */

function isotope() {

 var $container = $('#portfolio');

 // init
 $container.imagesLoaded( function(){
   $container.isotope({
     // options
     itemSelector: '.portfolio-item',
     layoutMode: 'fitRows'
   });
 });

 // filter items on button click
 $('#filters').on( 'click', 'button', function( event ) {
   var filterValue = $(this).attr('data-filter-value');
   $container.isotope({ filter: filterValue });
   $('#filters button').removeClass('active');
   $(this).addClass('active');
 });

}


/* --- Scroll to Anchor ------------------- */

function scrollAnchor() {

  // scroll to specific anchor
  $('.scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 650);
        return false;
      }
    }
  });
  
}

/* --- One Page Scroll ------------------- */

function onePageScroll() {
  $('.nav').onePageNav({
      currentClass: 'current',
      changeHash: false,
      scrollSpeed: 650,
      scrollOffset: 30,
      scrollThreshold: 0.5,
      filter: ':not(.get-started-link)',
      easing: 'swing',
      begin: function() {
          //I get fired when the animation is starting
      },
      end: function() {
          //I get fired when the animation is ending
      },
      scrollChange: function($currentListItem) {
          //I get fired when you enter a section and I pass the list item of the section
      }
  });

	$('.view-all-faq').click(function() {
		$('.list-group-item').addClass('active');

		return false;
	});

	$('.contact-us, .get-in-contact').click(function() {
		var t = $(this);

		if (t.hasClass('active')) {
			t.removeClass('active');
			zE.hide();

			return false;
		}

		t.addClass('active');
		zE.activate({hideOnClose: true});

		// console.log(Object.keys(zE));

		return false;
	});

	if ($('#contact-us').length) {
		var interval = setTimeout(function() {
			// if (typeof(zE) == 'function') {
				// clearInterval(interval);
				// zE.activate({hideOnClose: true});
				$('.contact-us').trigger('click');
				$('#contact-us .the-spin').fadeOut();
			// }
		}, 2000);

		// zE.activate({hideOnClose: true});
	}

	$('.newsletter-form .form-control').focus(function() {
		$(this).parent().parent().find('.form-group').removeClass('hide');
	});

	$('.build-in-features section:first-of-type').show();
	$('.build-in-menu a').click(function() {
		var t = $(this),
			id = t.attr('href').replace('#', '');

		window.location.hash = id;

		$('.build-in-menu a.active').removeClass('active');
		t.addClass('active');
		$('.build-in-features section').attr('style', '');
		$('section#' + id).show().css({
			'position': 'absolute',
			'left': '0px',
			'top': ($(window).scrollTop() + 20) + 'px'
		});

		// console.log(id);

		return false;
	});

	if ($('.embed-container').length) {
		setTimeout(function() {
			$('.embed-container').html('<iframe src="https://embed.spotify.com/?uri=spotify:user:iamnatio:playlist:30tQCkFj1OiNYooqv4wVT5" frameborder="0" allowtransparency="true"></iframe>');
		}, 1000);
	}

	var b = $('.latest-blogs');
	var key = 'latest_blogs_' + (new Date()).getDate(), localBlog = false;
	if (b.length && !b.hasClass('built')) {
		b.addClass('built');

		if(typeof(Storage) !== "undefined") {
			localBlog = localStorage.getItem(key);
			if (localBlog) {
				b.html(localBlog);
			}
			else {
				localBlog = false;
			}
		}

		if (localBlog === false) {
			setTimeout(function() {
				$.ajax({
					url: feedUrl,
					success: function(e) {
						var html = '<ul class="unstyled">', iteration = 0;
						for (var i in e) {
							var blog = e[i];

							iteration++;
							if (iteration >= 6) {
								break;
							}
							html += '<li><a href="' + blog.link + '" target="_blank">' + blog.title + '</a></li>';
						}
						html += '</ul>';

						b.html(html);
						if(typeof(Storage) !== "undefined") {
							localStorage.setItem(key, html);
						}
					}
				});
			}, 800);
		}
	}
};

function isScrolledIntoView(elem)
{
	var $elem = $(elem);
	var $window = $(window);

	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();

	var elemTop = $elem.offset().top;
	var elemBottom = elemTop + $elem.height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};

$(document).ready(function() {
	if (!$('#nebula-features').length) {
		return;
	}

	$('#nebula-features article').click(function() {
		var t = $(this);

		$('#nebula-features article.active').removeClass('active');
		t.addClass('active');
	});

	$('#nebula-features article li').each(function() {
		var t = $(this);
		if (t.hasClass('active')) {
			return;
		}

		t.addClass('active');
		t.tooltip({
			title: t.find('p').html(),
			placement: 'bottom',
			html: true
		});
		// t.tooltip('show');
	});
});