/* -- Full Screen Viewport Container
   ---------------------------- */

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

		window.location.href = 'http://shop.phpfox.com/pages/checkout?id=' + $('#order-id').val() + '&email=' + encodeURIComponent($('#email').val()) + '&name=' + encodeURIComponent($('#name').val());

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

	$('.get-started-link').click(function() {
		dropForm = false;
		/*
		$('#get-started-form').animate({
			'margin-bottom': '0px'
		}, 'fast');
		*/
		$('#get-started-form').css('margin-bottom', 0);
		$('#name').focus();
		// $("html, body").animate({ scrollTop: $('#get-started h1').scrollTop()});

		return false;
	});

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
});



/* --- initialize functions on window load here -------------- */

function init() {
  tooltips();
  onePageScroll();
  scrollAnchor();
}

/* --- Full Screen Container ------------- */

function fullScreenContainer() {
  // Set Initial Screen Dimensions

 // var screenWidth = $(window).width() + "px";
  var screenHeight = $(window).height() + "px";
	console.log('Height:' + screenHeight);

	$('section#get-started').css('min-height', screenHeight);
	/*
  $("#get-started .item").css({
    // width: screenWidth,
    height: screenHeight
  });
  */

  // Every time the window is resized...

  $(window).resize( function () {

    // Fetch Screen Dimensions

   //  var screenWidth = $(window).width() + "px";
    var screenHeight = $(window).height() + "px";
      
    // Set Slides to new Screen Dimensions

	  $('section#get-started').css('min-height', screenHeight);
	  /*
    $("#get-started .item").css({
      // width: screenWidth,
      height: screenHeight
    }); 
      */
  });

}



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
};

if ($('#page-index').length) {
	var dropForm = false;
	$(window).scroll(function() {
	    var windowpos = $(window).scrollTop(),
		    windowHeight = $(window).height(),
		    navHeight = $('.navbar-wrapper').height();

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
	});
}