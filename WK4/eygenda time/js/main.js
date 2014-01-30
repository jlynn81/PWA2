/*  
	Your Project Title
	Author: You
*/

(function($){
	console.log('test');
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
	
		$.get('templates/app.html', function(html){
			var h = $(html);
			var appCode = h.find('#template_app').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			container.html(appCode);
			
			//loadProjects();

			//Navigation Click Events
			$('#logout').on('click', logout);
			//$('#p-link').on('click', loadApp);

		}); 
		return false;
	};
	
	//Loads the Landing/Home page of the Manager
	var loadLanding = function(){
		console.log('test');
		$.get('templates/landing.html', function(html){
			var h = $(html);
			var landingCode = h.find('#template_landing').html();
			$.template('landing', landingCode);		// compile template
			$.render(currentUser, 'landing');		// use template
			container.html(landingCode);

			$('#login_btn').on('click', login);
			$('#reg_btn').on('click', loadRegForm);


		});
	};
	
	//Checks the login state of the User
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
    	var user = $('#username').val();
		var pass = $('#password').val();

    	console.log('test');
        $.ajax({
            url: 'xhr/login.php',
            data: {
                username: user,
				password: pass 
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){

                    //showLoginError();
                    //$('#registration .err_msg').text(response.error);
                }else{
                    loadApp();
                }
            }

        })
    };

    //Loads the Registration Page

    var loadRegForm = function(){
	
		$.get('templates/app.html', function(html){
			var h = $(html);
			var regCode = h.find('#template_registration_view').html();
			$.template('reg', regCode);		// compile template
			$.render(currentUser, 'reg');		// use template
			$('#container').html(regCode);

            $('#submit_btn').on('click', register);
		}); 
		return false;
	};


	
	////// Register New User //////

	var register = function(){

		var user = $('#user').val(),
			email = $('#email').val(),
			pwd = $('#pass').val();

            console.log('test');
			$.ajax({
				url: 'xhr/register.php',
				data: {
					username: user,
					email: email,
					password: pwd
				},
				type: 'post',
				dataType: 'json',
				success: function(response){
					if(response.error){
						$('#registration .err_msg').text(response.error);
                        console.log(response.error);
					}else{
                        loadApp();
                    }

				}
			});
			return false;
	};

    //Adding a New Project to the Manager

    var loadNewProject = function(){
        $.get('templates/app.html', function(html){
            var p = $(html);
            var projectCode = p.find('#template_project_view').html();
            $.template('app', projectCode);
            $.render(currentUser, 'app');
            container.html(projectCode);

            $('#add_project_btn').on('click', projectPage);
        });
    };

    var projectPage = function(){
        //var projName = $()

        console.log('test');
        $.ajax({
            url: 'xhr/new_project.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                loadNewProject();
            }
        });
        return false;
    };
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
		checkLoginState();
		/* loadTemplates(); */
	};
	
	init();
	
		
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
		
	var logout = function(){
	
		$.ajax({
			url: 'xhr/logout.php',
			type: 'GET',
			dataType: 'json',
			success: function(response){
				loadLanding();
			}
		});
		return false;
	};






})(jQuery); // end private scope




