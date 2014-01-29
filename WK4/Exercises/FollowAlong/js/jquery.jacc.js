/*
	jAcc: Accordion
	Compatibility: jQuery 1.8.1+
	Author: Your Name
*/

(function($){

    $.fn.jacc = function(options){
        var opts = $.extend({}, $.fn.jacc.defaults, options);

        this.each(function(){
            var acc = $(this);
            var headers = acc.children(opts.header);
            var contents = acc.children(opts.content);

            contents.hide().eq(opts.show).show();

            headers.on('click', function(e){
                var clicked = $(this);
                var block = clicked.next();

                if(!block.is(':animated')){  //if not block animated
                    if(opts.multi){
                        block.slideToggle(opts.duration, opts.easing);
                    }else{
                        block
                            .slideDown(opts.duration, opts.easing)
                            .siblings(opts.content)
                            .slideUp(opts.duration, opts.easing);
                    };
                };
                e.preventDefault();
            });
        });
    };
    //defaults passed in by the user
    $.fn.jacc.defaults = {
        header: 'a',
        content: 'div',
        easing: 'swing',
        duration: 400,
        multi: false,
        show: 0
    };

	

})(jQuery);