(function($) {
	"use strict"



    // password access
    function setCookie(key, value) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        const keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    $(".password-preloader-form form").submit( function() {
            let password = $('#password-field').val();

            if (password === 'better-try-it') {
                setCookie('allowed', true);
                window.location.href = 'index.html';
                return false;
            } else {
                alert('Password is incorrect');
                return false;
            }
        }
    );

	///////////////////////////
	// Preloader
	$(window).on('load', function() {
	    let allowed = true;

        if (allowed) {
            // alert('allowed' + allowed);
            $("#preloader").delay(600).fadeOut();
        } else {
            // alert('not allowed ' + allowed);
            $(".password-preloader-form").show();
            $(".preloader").hide();
        }
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
        const hash = this.hash;
        // console.log('hash=' + hash + '.');
        const offset = $(this.hash).offset();
        if (offset === undefined) {
            console.log("Unable to find section " + hash);
            return;
        }

        $('html, body').animate({
            scrollTop: offset.top
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


    $('.carousel-with-modals').owlCarousel({
        center: false,
        items: 3,
        loop: true,
        margin: 10,
        nav:true,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    $('.carousel-with-modals-large').owlCarousel({
        center: false,
        items: 3,
        loop: true,
        margin: 10,
        nav:true,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });

    $('.selectpicker').selectpicker();


    $('.modal').on('hidden.bs.modal', function (e) {
        // for html5
        let video = $(this).find("video");
        video.each(function () { this.pause() });

        // trying to stop loading after modal is closed
        video.attr('src', '');

        // for vimeo
        let iframe = $(this).find("iframe");
        iframe.attr("src", iframe.attr("src"));


    }).on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal

        let video_url = button.data('video-url'); // Extract info from data-* attributes
        if (video_url === undefined) {            // or from source.src attribute
            video_url = button.find('video').find('source').data('src');
        }

        const poster_url = button.find('video').attr('poster');

        // alert(button.text() + ' +++ ' + video_url + ' +++ ' + button.parent().parent().html());

        let description_html = button.parent().parent().find('.video-description-full-version').html();
        if (description_html === undefined) {
            description_html = '';
        }
        // replacing contents
        let modal = $(this);
        modal.find('.modal-full-content').html('<div>' + description_html + '</div>');

        // alert(video_url + " --> " + video_url.startsWith("https://youtube.com"));

        if (video_url.startsWith("https://youtube.com") ||
            video_url.startsWith("https://www.youtube.com")) {

            let iframe = modal.find('.modal-body iframe.youtube');
            iframe.show();
            modal.find('.modal-body video').hide();

            let iframe_url = video_url + "?rel=0&amp;showinfo=0";

            iframe.attr('src', iframe_url);
        }
        else {
            let video = modal.find('.modal-body video');
            // video.each(function () { this.play() }); // autoplay
            video.show();
            modal.find('.modal-body iframe').hide();
            video.attr('src', video_url);
            if (poster_url) {
                video.attr('poster', poster_url);

            }
        }


    });

    // every video preview is wrapped into a button that opens it in a pop-up
    $( ".video-preview" ).wrapInner( "<a href=\"#\" data-toggle=\"modal\" data-target=\"#modal-for-video\"></a>");

    // play icon is added
    $( ".video-preview video" ).wrap( "<div style=\"position: relative;\"></div>").parent().prepend("<div class=\"owl-video-play-icon\"></div>");




    //////////////// start of menu profile selector /////////////////////////////
    $(".has-dropdown ul li a").click(function(){


        let image_source = $(this).find('img.avatar').attr('src');
        // alert(image_source);
        let img_selected_in_menu = $(this).parents('.has-dropdown').find('img.avatar').first();
        img_selected_in_menu.attr('src', image_source);

    });

    //////////////// end of menu profile selector /////////////////////////////



    ////// star rating

    var star_rating = $('.star-rating .fa');

    var SetRatingStar = function() {
        return star_rating.each(function() {
            if (parseInt(star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
                return $(this).removeClass('fa-star-o').addClass('fa-star');
            } else {
                return $(this).removeClass('fa-star').addClass('fa-star-o');
            }
        });
    };

    star_rating.on('click', function() {
        star_rating.siblings('input.rating-value').val($(this).data('rating'));
        return SetRatingStar();
    });

    SetRatingStar();
	
	////// Info appear

    $('.appearInfo').on('click', function(){
		$('.infoText').addClass('appear');
		$(this).addClass('disappear');
	});



    $(".addToWatchlist").on('click',function(e){
        var $this = $(this);
        e.preventDefault();
        
        $('#watchlist, #overlay').addClass('open');
        var img_url = $this.siblings('.video-preview').find('video').attr('poster'),
            img = '<img class="vid_img" src="' + img_url + '">',
            $p = $this.siblings('p').clone();

       if( !$this.hasClass('addedToWatchlist') ){
            $(this).addClass('addedToWatchlist');
            $('<li>'+ img + $p.html()+'</li>').appendTo('#watchlist ul');
        }

        return false;

    });

    
    $("#watchlist .close, #overlay").on('click',function(e){
        e.preventDefault();
        $('#watchlist, #overlay').removeClass('open');
    });


})(jQuery);
