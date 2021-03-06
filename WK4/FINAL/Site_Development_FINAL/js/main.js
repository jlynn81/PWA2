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
		currentUser = {},
        currentInfo = {}
	;
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
    //Loads the Application Function
 	var loadApp = function(){
        $.get('templates/app.html', function(html){
            var h = $(html);
			var appCode = h.find('#template_app').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			container.html(appCode);
			

			//Navigation Click Events
			$('#logout').on('click', logout);   //logs out the current user from the app

            $('#add_project_btn').on('click', loadNewProjects); //allows the user the add a project

            $('#taskLink').on('click', getTasks); //loads Current Tasks associated with that Project


		});
		return false;
	};
	
	//Loads the Landing/Home page of the Manager/ Lists out User Current Projects
	var loadLanding = function(){
		console.log('test');
		$.get('templates/landing.html', function(html){
			var h = $(html);
			var landingCode = h.find('#template_landing').html();
			$.template('landing', landingCode);		// compile template
			$.render(currentUser, 'landing');		// use template
			container.html(landingCode);

			$('#login_btn').on('click', login);     //logs in the user
			$('#reg_btn').on('click', loadRegForm); //loads the registration form for a new user


		});
	};
	
	//Checks the login state of the User
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
                    loadLanding();
                }else if(response.user){
                    currentUser = response.user;
                    loadApp();
                    $('input, textarea').placeholder();
                }
			}
		});
	};

    //allows a registered user to log in and provides errors when a field is left empty
    var login = function(){
    	var user = $('#username').val();
		var password = $('#password').val();

        var pattern;
        var pass;

    	console.log('test');
        $.ajax({
            url: 'xhr/login.php',
            data: {
                username: user,
				password: password
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    $('#registration').find('.err_msg').text(response.error);
                    console.log(response.error);
                }else{
                    loadApp();
                }
            }

        });
    };

    ////// Loads Registration Page

    var loadRegForm = function(){
	
		$.get('templates/app.html', function(html){
			var h = $(html);
			var regCode = h.find('#template_registration_view').html();
			$.template('reg', regCode);		// compile template
			$.render(currentUser, 'reg');		// use template
			container.html(regCode);

            $('#submit_btn').on('click', register); //Loads the registration template view
		}); 
		return false;
	};

	////// Register New User //////

	var register = function(){      //registration form with error response

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
						$('#registration').find('.err_msg').text(response.error);
                        console.log(response.error);
					}else{
                        loadApp();
                    }

				}
			});
			return false;
	};

    ////// Adding a New Project to the Manager

    var loadNewProjects = function(){

        $.get('templates/app.html', function(html){
            var p = $(html);
            var projectCode = p.find('#template_project_view').html();
            $.template('newProj', projectCode); //compiles the template
            $.render(currentUser, 'newProj');   //uses the template
            container.html(projectCode);

            $('#finish').on('click', newProject);   //Allows User to Finish Adding a Project
            $('#cancel').on('click', loadApp);      //Allows user to cancel out of creating a new project

        });
        return false;
    };

    ////// New Project Creation Form
    var newProject = function(){
        var projName = $('.projectName').val();
        var descName = $('#description').val();
        var date = $('#date').val();
        var status = $('#status').find('option').val();

        console.log('test');
        $.ajax({
            url: 'xhr/new_project.php',
            data: {
                projectName: projName,
                projectDescription: descName,
                dueDate: date,
                status: status
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    $('.projectName').find('.err_msg').text(response.error);
                    console.log(response.error);
                }else{
                    loadNewProjects();
                }

            }
        });
        return false;
    };

    ////// Loads the Current Tasks Page
    var loadTaskPage = function(){

        $.get('templates/app.html', function(html){
            var p = $(html);
            var taskCode = p.find('#template_task').html();
            $.template('task', taskCode);   //compiles the template
            $.render(currentUser, 'task');  //uses the template
            container.html(taskCode);

            $('#add_task_btn').on('click', loadNewTasks);   //Allows a User to Create a New Task
            console.log('click');
            $('#back_btn').on('click', loadApp);            //Gets the User back to the Project page

            console.log('test');
        });
        return false;
    };

    //Loads the New Task Page for task creation
    var loadNewTasks = function(){

        $.get('templates/app.html', function(html){
            var t = $(html);
            var taskCode = t.find('#template_task_view').html();
            $.template('newTask', taskCode);    //compiles the template
            $.render(currentUser, 'newTask');   //uses the template
            container.html(taskCode);

            $('#finish').on('click', newTask);  //Allows the new User to Add the Task once form is filled in
            $('#cancel').on('click', loadTaskPage);    //Allows User to cancel creation of task


        });
        return false;
    };

    //Add New Task Form
    var newTask = function(){
        var taskName = $('#taskname').val();
        var taskDesc = $('#description').val();
        var date = $('#date').val();
        var status = $('#status').find('option').val();
        var newProjectID = 12;

        console.log('test');
        $.ajax({
            url: 'xhr/new_task.php',
            data: {
                projectID: '' + newProjectID,
                taskName: taskName,
                taskDescription: taskDesc,
                dueDate: date,
                status: status
            },
            type: 'post',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    $('#taskform').find('.err_msg').text(response.error);
                }else{
                    loadNewTasks();
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

    //Does the Log Out function for the entire application
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

    var getProject = function(){
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                loadNewProjects();
            }
        });
    };

    //Used to link the Tasks to the template_task page
    var getTasks = function(){
        $.ajax({
            url: 'xhr/get_tasks.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                loadTaskPage();
            }

        });
        return false;
    };

    //Updates or Edits the task
    var updateTask = function(id, date){
        $.ajax({
            url: 'xhr/update_task.php',
            type: 'post',
            data: {
                taskID: id ? id : currentInfo.id,
                taskName: currentInfo.taskName,
                taskDescription: currentInfo.taskDescription,
                status: currentInfo.status,
                dueDate: date ? date : currentInfo.dueDate
            },
            dataType: 'json',
            success: function(response){
                getTasks();
            }
        });
    };

    //Updates/Edits Project
    var updateProject = function(id, date){
        $.ajax({
            url: 'xhr/update_project.php',
            type: 'post',
            data: {
                projectID: id ? id : currentInfo.id,
                projectName: currentInfo.projectName,
                projectDescription: currentInfo.projectDescription,
                status: currentInfo.status,
                dueDate: date ? date : currentInfo.dueDate

            },
            dataType: 'json',
            success: function(response){
                getProject();
            }
        });
    };








})(jQuery); // end private scope




