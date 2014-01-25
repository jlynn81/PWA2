/*  
	Your Project Title
	Author: You
*/

(function($){
	
	/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	
	var win = $(window),
		body = $(document.body),
		container = $('#container'),	// the only element in index.html
		currentUser = {}
	;
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	var loadApp = function(){
        $.ajax({
            url: 'xhr/list.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                var land = response.landing;
                var html = '';
                var html = $.render(land, "landtemplate");

                $('container').append(html);
            }
        });
    };
	
	
	var loadLanding = function(){
		$.get('templates/landing.html', function(html){
			var h = $(html);
			var landingCode = h.find('#template_landing').html();
			$.template('landing', landingCode);		// compile template
			$.render(currentUser, 'landing');		// use template
			container.html(landingCode);
		});
	};
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.user){
                    loadApp();
                }else{
                    // if error
                    loadLanding();
                    $('input, textarea').placeholder();
                }
			}
		});
	};

    var login = function(){
        $.ajax({
            url: 'xhr/login.php',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    showLoginError();
                }else{
                    loadApp();
                }
            }

        })
    }
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
        $('#container').empty();
        $.get('templates/landing.html', function(htmlArg){
            var lang = $(htmlArg).find('#template_landing');

            $.template('landtemplate', lang);
            var html = $.render('', 'landtemplate');
            $('#container').append(html);
        });
	
		checkLoginState();
	};
	
	
	init();

    $('button').on('click', function(e){
        loadApp();
        return false;
        console.log(e);
    });
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	win.on('submit', '#user-reg-form', function(){
		
		return false;
	});
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




