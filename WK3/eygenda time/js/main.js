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

    // var loadApp = function(){
    //       	console.log('test-app');
    //        $.ajax({
    //            url: 'xhr/list.php',
    //            type: 'get',
    //            dataType: 'json',
    //            success: function(response){
    //                var land = response.landing;
    //                var html = '';
    //                var html = $.render(land, "landtemplate");

    //                $('container').append(html);
    //            }
    //        });
    //    };

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
                }else{
                    loadApp();
                }
            }

        })
    }

    var loadRegForm = function(){

        $.get('templates/app.html', function(html){
            var h = $(html);
            var regCode = h.find('#template_registration_view').html();
            $.template('reg', regCode);		// compile template
            $.render(currentUser, 'reg');		// use template
            $('#container').html(regCode);

            //$('#reg_btn').on('click', register);
        });
        return false;
    };

    ////// Register New User //////

    var register = function(){

        var user = $('#reg_form input#user').val(),
            email = $('#reg_form input#email').val(),
            pwd = $('#reg_form input#pwd').val();

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
                }else{
                    loadApp();
                }
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




