(function($) {
	"use strict"


    $("#show-watch-list").on('click',function(e){
        $('#watchlist, #overlay').addClass('open');
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

    });

    
    $("#watchlist .close, #overlay").on('click',function(e){
        e.preventDefault();
        $('#watchlist, #overlay').removeClass('open');
    });


})(jQuery);
