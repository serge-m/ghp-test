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
        items: 2,
        loop: true,
        margin: 10,
        autoWidth:true,
        responsive: {
            480:{
                items:2
            },
            600:{
                items:4
            }
        }
    });

    $('.selectpicker').selectpicker();

    /// imgcheckbox start

    $(".exampleone img").imgCheckbox();
    $(".exampletwo img").imgCheckbox({
        "styles": {
            "span.imgCheckbox.imgChked img": {
                "filter": "blur(5px)",
                "-webkit-filter": "blur(5px)",
                "transform": "scale(0.9)"
            }
        }
    });


        $('.modal').on('hidden.bs.modal', function (e) {
            // for html5
            let video = $(this).find("video");
            video.each(function () { this.pause() });

            // for vimeo
            let iframe = $(this).find("iframe");
            iframe.attr("src", iframe.attr("src"));
        }).on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var video_url = button.data('video-url'); // Extract info from data-* attributes
            if (video_url === undefined) {
                video_url = button.find('video').attr('src');
            }

            // alert(button.text() + ' ' + video_url + ' ' + button.find('.full').html());

            // replacing contents
            var modal = $(this);
            modal.find('.modal-full-content').html('<div>' + button.find('.video-description-full-version').html() + '</div>');


            // autoplay
            var video = modal.find('.modal-body video');
            video.attr('src', video_url);
            video.each(function () { this.play() });

        });






})(jQuery);
