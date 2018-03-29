(function($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});

	///////////////////////////
	// Owl Carousel
	$('#about-slider').owlCarousel({
		items:1,
		loop:true,
		margin:15,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : true,
		animateOut: 'fadeOut'
	});

	$('#testimonial-slider').owlCarousel({
		loop:true,
		margin:15,
		dots : true,
		nav: false,
		autoplay : true,
		responsive:{
			0: {
				items:1
			},
			992:{
				items:2
			}
		}
	});

    $('.video-slider').owlCarousel({
        items:1,
        merge:false,
        loop:true,
        margin:10,
        video:true,
        lazyLoad:true,
        center:false,
        nav:true,
        dots: false,
        responsive:{
            480:{
                items:2
            },
            600:{
                items:4
            }
        }
    });

    $('.video-slider-manual').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });

    $('.carousel-with-modals').owlCarousel({
        center: false,
        items: 5,
        loop: true,
        margin: 10,
    });

    $('.selectpicker').selectpicker();


    $('.modal').on('hidden.bs.modal', function (e) {
        // for html5
        let video = $(this).find("video");
        video.each(function () { this.pause() });

        // for vimeo
        let iframe = $(this).find("iframe");
        iframe.attr("src", iframe.attr("src"));
    }).on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal

        let video_url = button.data('video-url'); // Extract info from data-* attributes
        if (video_url === undefined) {            // or from source.src attribute
            video_url = button.find('video').find('source').attr('src');
        }

        const poster_url = button.find('video').attr('poster');

        // alert(button.text() + ' ' + video_url + ' ' + button.find('.full').html());

        let description_html = button.find('.video-description-full-version').html();
        if (description_html === undefined) {
            description_html = '';
        }
        // replacing contents
        let modal = $(this);
        modal.find('.modal-full-content').html('<div>' + description_html + '</div>');


        // autoplay
        let video = modal.find('.modal-body video');
        video.attr('src', video_url);
        // video.each(function () { this.play() });
        if (poster_url) {
            video.attr('poster', poster_url);
        }

    });






})(jQuery);
