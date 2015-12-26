(function() {
    angular.module('users')
        .directive("experiment", directiveFunction)
})();
var tick;
var button_add_to_container,system_on_off_falg,arrow_y_position;
var arrow_click_count;
var standard_circle_button=blank_circle_button=sample_circle_button=new createjs.Shape();
var cap_move_flag;
var tub_current_position_x,tub_current_position_y;
var test_tube_name_container,current_test_tube_name,drop_flag;
var  initial_x_pos_tube_1,initial_y_pos_tube_1,initial_x_pos_tube_2,initial_y_pos_tube_2,initial_x_pos_tube_3,initial_y_pos_tube_3;
function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            demoCanvas = document.getElementById("demoCanvas");
            demoCanvas.width = element[0].width;
            demoCanvas.height = element[0].height;
            queue = new createjs.LoadQueue(true);
            queue.installPlugin(createjs.Sound);
            queue.on("complete", handleComplete, this);
            queue.loadManifest([{
                id: "background",
                src: "././images/background.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "up_arrow",
                src: "././images/down_arrow.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "up_arrow_click",
                src: "././images/down_arrow_click.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "down_arrow",
                src: "././images/down_arrow.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "down_arrow_click",
                src: "././images/down_arrow_click.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "glass_tube_half",
                src: "././images/glass_tube_half.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "screen_arrow",
                src: "././images/screen_arrow.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "switch_to_move",
                src: "././images/switch_to_move.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "button_up",
                src: "././images/button_up.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "button_down",
                src: "././images/button_down.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "tubestandunder",
                src: "././images/tubestandunder.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "tube_one",
                src: "././images/tube_one.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "tube_stand_top",
                src: "././images/tube_stand_top.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "clear_enter_bottom",
                src: "././images/clear_enter_bottom.svg",
                type: createjs.LoadQueue.IMAGE
            }
            ,{
                id: "clear_enter_top",
                src: "././images/clear_enter_top.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "tube_sample_solution",
                src: "././images/tube_sample_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }
            ]);
            system_stage = new createjs.Stage("demoCanvas");
            system_stage.enableDOMEvents(true);
            system_stage.enableMouseOver();
            createjs.Touch.enable(system_stage);
            tick = setInterval(updateTimer, 100); /** Stage update function in a timer */
            system_container = new createjs.Container(); /** Creating the microscope container */
            system_container.name = "system_container";
            system_stage.addChild(system_container); /** Append it in the stage */
            /**handle complete function  */
            function handleComplete() {
                loadImages(queue.getResult("background"), "background",0,-55, "", 0, system_container); /** Background image */
                loadImages(queue.getResult("up_arrow_click"), "button_down_13", 513,480, "pointer",180, system_container); 
                loadImages(queue.getResult("up_arrow"), "button_up_round_rect_13", 513,480, "pointer",180, system_container); /** Up arrow */
                loadImages(queue.getResult("down_arrow_click"),"button_down_14", 470,400, "pointer", 0, system_container); 
                loadImages(queue.getResult("down_arrow"), "button_up_round_rect_14", 470,400, "pointer", 0, system_container); /** Down arrow */
                loadImages(queue.getResult("glass_tube_half"), "glass_tube_half", 525,185, "pointer", 0, system_container); 
                loadImages(queue.getResult("screen_arrow"), "screen_arrow",150,225, "pointer", 0, system_container); /**Pointer on the screen */
                loadImages(queue.getResult("switch_to_move"), "switch_to_move",519,150, "pointer", 0, system_container);
                /**Button images */
                loadImages(queue.getResult("button_down"), "button_down_1",120,320 , "", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_1",120,320 , "", 0, system_container); 
                loadImages(queue.getResult("button_down"), "button_down_2",201,320 , "", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_2",201,320 , "", 0, system_container);
                loadImages(queue.getResult("button_down"), "button_down_3",280,320 , "", 0, system_container);
                loadImages(queue.getResult("button_up"), "button_up_round_rect_3",280,320 , "", 0, system_container);
                loadImages(queue.getResult("button_down"), "button_down_4",119,360 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_up"), "button_up_round_rect_4",119,360 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_down"), "button_down_5",200,360 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_up"), "button_up_round_rect_5",200,360 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_down"), "button_down_6",279,360 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_6",279,360 , "pointer", 0, system_container);               
                loadImages(queue.getResult("button_down"), "button_down_7",118,400 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_7",118,400 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_down"), "button_down_8",200,400 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_8",200,400 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_down"), "button_down_9",278,400 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_9",278,400 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_down"), "button_down_10",117,440 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_up"), "button_up_round_rect_10",117,440 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_down"), "button_down_11",200,440 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_up"), "button_up_round_rect_11",200,440 , "pointer", 0, system_container); 
                loadImages(queue.getResult("button_down"), "button_down_12",277,440 , "pointer", 0, system_container);
                loadImages(queue.getResult("button_up"), "button_up_round_rect_12",277,440 , "pointer", 0, system_container);
                loadImages(queue.getResult("clear_enter_bottom"), "button_down_15",530,399 , "pointer", 0, system_container);
                loadImages(queue.getResult("clear_enter_top"), "button_up_round_rect_15",530,399 , "pointer", 0, system_container);
                loadImages(queue.getResult("clear_enter_bottom"), "button_down_16",530,440 , "pointer", 0, system_container);
                loadImages(queue.getResult("clear_enter_top"), "button_up_round_rect_16",530,440 , "pointer", 0, system_container);
                /**Tube stand image */
                loadImages(queue.getResult("tubestandunder"), "tubestandunder",450,550 ,"", 0, system_container);
                /**Tubes */
                loadImages(queue.getResult("tube_one"), "tube_1",483,563 , "pointer", 0, system_container);
                loadImages(queue.getResult("tube_sample_solution"), "tube_2",556,563 , "pointer", 0, system_container);
                loadImages(queue.getResult("tube_sample_solution"), "tube_3",632,563 , "pointer", 0, system_container);
                loadImages(queue.getResult("tube_stand_top"), "tube_stand_top",461,602 ,"", 0, system_container);
                
                /**Adding text to the buttons  */
                setText("button_text_round_rect_1", 140, 340, _("DNA"), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_2", 222, 340, _("RNA"), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_3", 294, 340, _("protein"), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_4", 130, 380, _("OD 600"), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_5", 211, 380, _("dye 500"), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_6", 291, 380, _("dye 650"), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_7", 122, 419, _("assay 340"), "#FFFFFF",0.87, system_container);
				setText("button_text_round_rect_8", 205, 419, _("assay 405"), "#FFFFFF",0.87, system_container);
				setText("button_text_round_rect_9", 282, 419, _("assay 490"), "#FFFFFF",0.87, system_container);
                setText("button_text_round_rect_10", 120, 460, _("Absorbance"), "#FFFFFF",0.75, system_container);
				setText("button_text_round_rect_11", 208, 460, _("Function"), "#FFFFFF",0.87, system_container);
                setText("button_text_round_rect_12", 280, 460, _("Parameter"), "#FFFFFF",0.87, system_container);
                setText("button_text_round_rect_14", 552, 463, _(""), "#0947A3",0.9, system_container);
                setText("button_text_round_rect_13", 540, 360, _(""), "#FFFFFF",0.9, system_container);
                setText("button_text_round_rect_15", 552, 420, _("Clear"), "#0947A3",0.9, system_container);
                setText("button_text_round_rect_16", 552, 463, _("Enter"), "#0947A3",0.9, system_container);
                setText("standard_text", 396, 303, _("Standard"), "#FFFFFF",0.9, system_container);
                setText("blank_text", 472, 343, _("Blank"), "#0947A3",0.9, system_container);
				setText("sample_text", 540, 360, _("Sample"), "#FFFFFF",0.9, system_container);
                /**Creating circle shape for the standard, blank and sample buttons. */
                create_circle("standard_circle_button","standard_circle",424,299,system_container,34,"#0947A3","#000000");
                create_circle("blank_circle_button","blank_circle",489,339,system_container,34,"#D6D6D6","#0947A3");
                create_circle("sample_circle_button","sample_circle",565,355,system_container,34,"#0947A3","#000000");
                setText("reading_text_1", 180, 243, _("405 nm"), "#000000",1.7, system_container);
				setText("reading_text_2", 180, 273, _("490 nm"), "#000000",1.7, system_container);
				setText("reading_text_3", 180, 303, _("550 nm"), "#000000",1.7, system_container);
                setText("reading_text_4", 180, 243, _("550 nm"), "#000000",1.7, system_container);
				setText("reading_text_5", 180, 273, _("595 nm"), "#000000",1.7, system_container);
				setText("reading_text_6", 180, 303, _("650 nm"), "#000000",1.7, system_container);
                setText("absorbance_text", 150, 235, _("Absorbance 650 nm"), "#00000",1.2, system_container);
                setText("result_sample_tube_1", 150, 245, _("0.000 A"), "#00000",1.7, system_container);
                setText("result_sample_tube_2", 150, 245, _("0.580 A"), "#00000",1.7, system_container);
                setText("result_sample_tube_3", 150, 245, _("0.610 A"), "#00000",1.7, system_container);
                create_round_rect("round_rect_button_1","round_rect_1",120,320,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_2","round_rect_2",201,320,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_3","round_rect_3",280,320,70,37,25,"#0947A3","#000000",0.01,system_container); 
                create_round_rect("round_rect_button_4","round_rect_4",119,360,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_5","round_rect_5",200,360,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_6","round_rect_6",279,360,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_7","round_rect_7",118,400,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_8","round_rect_8",200,400,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_9","round_rect_9",278,400,70,37,25,"#0947A3","#000000",0.01,system_container); 
                create_round_rect("round_rect_button_10","round_rect_10",117,440,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_11","round_rect_11",200,440,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_12","round_rect_12",277,440,70,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_13","round_rect_13",473,441,39,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_14","round_rect_14",473,400,39,37,25,"#0947A3","#000000",0.01,system_container);
                create_round_rect("round_rect_button_15","round_rect_15",531,399,75,37,25,"#0947A3","#D4D4D4",0.01,system_container);
                create_round_rect("round_rect_button_15","round_rect_16",531,441,75,37,25,"#0947A3","#D4D4D4",0.01,system_container);
                system_container.getChildByName("blank_circle").alpha = 0.01;
                system_container.getChildByName("sample_circle").alpha = 0.01;
                system_container.getChildByName("standard_circle").alpha = 0.01;
                /**Adding click functionality to  all buttons in the devise. */
                for(var i=1;i<17;i++){
                        var round_rect_button_name="round_rect_"+i
                        round_rect_button_name_to_container=system_container.getChildByName(round_rect_button_name);
                        /**Mouse down function of button. */
                        round_rect_button_name_to_container.on("mousedown", function(evt) { 
                            button_click("button_up_"+this.name,"button_text_"+this.name);/**Calling the button_click function and send the parameter. - name of the button */
                        });
                        /**Mouse up function of button. */
                        round_rect_button_name_to_container.on("pressup", function(evt) {
                            button_click_up("button_up_"+this.name,"button_text_"+this.name);/**Calling the button_click_up function and send the parameter. - name of the button */
                         });
                    }
                    initialisationOfVariables(); /** Initializing the variables */
                    initialisationOfImages(); /** Function call for images used in the apparatus visibility */
                    translationLabels(); /** Translation of strings using gettext */
                    /**System ON function */
					system_container.getChildByName("round_rect_10").on("pressup", function(evt) {
	                    system_on(); /** This function is used to show the arrows and numbers inside the screen. */
	                });
					/** Up arrow functionality*/
					system_container.getChildByName("round_rect_14").on("pressup", function(evt) {
                        arrow_move(system_container.getChildByName("round_rect_13"),"up",system_container.getChildByName("round_rect_14"));
					});
					/**Down arrow functionality*/
					system_container.getChildByName("round_rect_13").on("pressup", function(evt) {
                        arrow_move(system_container.getChildByName("round_rect_14"),"down",system_container.getChildByName("round_rect_13"));
					});
                    /**Click "ENTER" button- functionality*/
                    system_container.getChildByName("round_rect_16").on("pressup", function(evt) {
                        system_container.getChildByName("screen_arrow").alpha =0; /**Hiding the arrow inside the screen */
                        show_hide_values(0,0);/**Hiding all values inside the screen.*/
                        system_container.getChildByName("absorbance_text").alpha = 1; /**showing the numbers inside the screen */
                        system_container.getChildByName("switch_to_move").mouseEnabled = true; /**Enabling the cap of the device.   */
                        system_container.getChildByName("round_rect_14").mouseEnabled = false;
                        system_container.getChildByName("round_rect_13").mouseEnabled = false;

                    });
                    /**Cap move- functionality*/
                    system_container.getChildByName("switch_to_move").on("pressup", function(evt) {
                            if(cap_move_flag){ /**Checking the cap is removed, using cap_move_flag */
                                createjs.Tween.get(system_container.getChildByName("switch_to_move"), {override:true}).to({y:100},300);
                                system_container.getChildByName("tube_1").mouseEnabled = true;
                                system_container.getChildByName("tube_2").mouseEnabled = true;
                                system_container.getChildByName("tube_3").mouseEnabled = true;
                                cap_move_flag=false;
                                for(var i=1;i<4;i++){
                                var test_tube_name="tube_"+i;
                                test_tube_name_container=system_container.getChildByName(test_tube_name);
                                test_tube_name_container.on("pressmove", function(evt) { 
                                    current_test_tube_name=this.name;
                                    drag_and_drop_testtube(current_test_tube_name);
                               });
                            }
                            }
                            else{
                               createjs.Tween.get(system_container.getChildByName("switch_to_move"), {override:true}).to({y:150},300);
                               system_container.getChildByName("tube_1").mouseEnabled = false;
                               system_container.getChildByName("tube_2").mouseEnabled = false;
                               system_container.getChildByName("tube_3").mouseEnabled = false;
                               cap_move_flag=true;
                            }
                    });
                    /**Drag functionality of test tubs */
                    function drag_and_drop_testtube(current_test_tube_name){
                                system_container.getChildByName(current_test_tube_name).on("pressmove", function(evt) { 
                                evt.target.x = evt.stageX;
                                evt.target.y = evt.stageY;
                                tub_current_position_x=evt.stageX;
                                tub_current_position_y=evt.stageY;
                            });
                          /**Drop functionality of test tube. */          
                         system_container.getChildByName(current_test_tube_name).on("pressup", function(evt) {
                            if(tub_current_position_x>495 && tub_current_position_y<230 && tub_current_position_x<582 &&  tub_current_position_y>8 && drop_flag==0){//Drop area of the test tube.
                               drop_flag=1;
                               system_container.getChildByName("switch_to_move").mouseEnabled = false;
                               system_container.getChildByName(current_test_tube_name).x=525;/**placing the test tube on the device  */
                               system_container.getChildByName(current_test_tube_name).y=112;
                               system_container.getChildByName(current_test_tube_name).alpha=0;/** Hiding the current test tube. */
                               system_container.getChildByName("tube_1").mouseEnabled = false; 
                               system_container.getChildByName("tube_2").mouseEnabled = false; 
                               system_container.getChildByName("tube_3").mouseEnabled = false; 
                               system_container.getChildByName(current_test_tube_name).mouseEnabled = true; 
                               system_container.getChildByName("glass_tube_half").alpha=1;/** showing the half test tube on the device. */
                               system_container.getChildByName("absorbance_text").alpha = 0; /**hiding the text inside the screen */
                               system_container.getChildByName("switch_to_move").mouseEnabled = false; /**disabling the cap of the device.   */
                               system_container.getChildByName("round_rect_16").mouseEnabled = false; 
                               system_container.getChildByName("blank_circle").mouseEnabled = true;
                               system_container.getChildByName("sample_circle").mouseEnabled = true;
                             }
                         else{
                            revert_tubs();/**Calling the revert function when the tube drop away from the top of the device. it will move towards the original position.  */
                            }
                        });
                    }
                   /**Function for remove the half glass tube by clicking it. */
                system_container.getChildByName("glass_tube_half").on("pressup", function(evt) {
                    remove_half_tube();
                    drop_flag=0;
                });   

            system_container.getChildByName("blank_circle").on("pressup", function(evt) {
                 if (current_test_tube_name=="tube_1" && drop_flag==1){
                    system_container.getChildByName("result_sample_tube_1").alpha = 1;
                }
                 });
           system_container.getChildByName("sample_circle").on("pressup", function(evt) {
                if(current_test_tube_name=="tube_2" || current_test_tube_name=="tube_3" && drop_flag==1) {
                    system_container.getChildByName("result_sample_"+current_test_tube_name).alpha = 1;
                         }
                 });  
                     }
           /**Function is used to  press the button */
            function button_click(element_name,text_Name){
                system_container.getChildByName(element_name).alpha=0;
                system_container.getChildByName(text_Name).y++;
                }
            /**Function is used to  press_up the button */
            function button_click_up(element_name,text_Name){
                system_container.getChildByName(element_name).alpha=1;
                system_container.getChildByName(text_Name).y--;
                }
                /**Function is used to create circles on the top of the button */
            function create_circle(circle,circleName,xPos,yPos,container,circle_radius,circle_color,border_color){
	            circle=new createjs.Shape();/** creating new circle  */
	            circle.graphics.setStrokeStyle(1).beginStroke(border_color);
	            circle.graphics.beginFill(circle_color).drawCircle(xPos,yPos, circle_radius);/**Adding the white color and position to the rectangle. */
	            circle.cursor="pointer";/** Giving cursor-pointer effect to the rectangle. */
	            circle.alpha=0.5;/**Setting the alpha value of rectangle */
	            circle.name=circleName;/** Giving the name to the rectangle */
	            container.addChild(circle); /** Adding the rectangle to the corresponding container. */
     		}
            /**Function is used to create round  shape on the button. */
            function  create_round_rect(round_rect,round_rect_name,xPos,Ypos,round_rect_width,round_rect_height,round_rect_radius,border_color,filled_color,alpha_Value,container){
                 round_rect = new createjs.Shape();
                 round_rect.graphics.setStrokeStyle(1).beginStroke(border_color);
                 round_rect.graphics.beginFill(filled_color).drawRoundRect(xPos, Ypos, round_rect_width, round_rect_height,round_rect_radius);
                 round_rect.alpha=alpha_Value;
                 round_rect.cursor="pointer"
                 round_rect.name=round_rect_name;/** Giving the name to the rectangle */
                 container.addChild(round_rect);
            }
     		/**when calling the system_on function, arrow and readings get displayed on the device screen. */
     		function system_on(){
                if(!system_on_off_falg){
     			system_container.getChildByName("screen_arrow").alpha = 1; /**showing the arrow inside the screen */
      			show_hide_values(1,0);
      			system_on_off_falg=true;/** system_on_off_falg is used to check whether the system is in "ON" or "OFF" condition. */
                }
     		}
     		/** Arrow move function is used to move the arrow upward and downwards using  */
     		function arrow_move(opposite_arrow,position_to_move,current_arrow){
     			if(system_on_off_falg){
							opposite_arrow.mouseEnabled = true;/**Enabling the opposite arrow while clicking the Up arrow */
							if(position_to_move=="up"){ /** checking the button is "Arrow-up"  */
                                arrow_click_count--;
								     if(arrow_click_count>=1){
								 	      system_container.getChildByName("screen_arrow").y-=30; /**moving the arrow  upwards.*/
							          }
								  if(arrow_click_count==0){
								  	 show_hide_values(1,0);/**Showing the first section values on the screen */
						              current_arrow.mouseEnabled = false;/**Disabling the current button when the arrow_click_count is "0" */
                                      arrow_click_count=1;
								  }
							}
							else if(position_to_move=="down"){/** checking the button is "Arrow-Down"  */
                                arrow_click_count++;
								 if(arrow_click_count<=3){
									 system_container.getChildByName("screen_arrow").y+=30; /**moving the arrow downwards.*/
								   }
								if(arrow_click_count==4){
      		 				        show_hide_values(0,1);/**Showing the second section values on the screen */
						           current_arrow.mouseEnabled = false;
                                   arrow_click_count=3;
                                   system_container.getChildByName("round_rect_16").mouseEnabled = true; /**enabling the click functionality of "Enter" button.   */

                                }else{
                                    system_container.getChildByName("round_rect_16").mouseEnabled = false; /**enabling the click functionality of "Enter" button.   */
                                }
								
							}
					}
     		}
            /**Function is used to show the values inside the screen. */
     		function show_hide_values(first_section,second_section){
				system_container.getChildByName("reading_text_1").alpha = first_section; 
				system_container.getChildByName("reading_text_2").alpha = first_section; 
				system_container.getChildByName("reading_text_3").alpha = first_section; 
				system_container.getChildByName("reading_text_4").alpha = second_section; 
				system_container.getChildByName("reading_text_5").alpha = second_section; 
				system_container.getChildByName("reading_text_6").alpha = second_section; 
            }
            /**Function is used to remove the half tube from the device . */
            function remove_half_tube(){
                revert_tubs();
                system_container.getChildByName("glass_tube_half").alpha=0;/** showing the half test tube on the device. */
                system_container.getChildByName("tube_1").alpha=1;/** Showing  the current test tube. */
                system_container.getChildByName("tube_2").alpha=1;
                system_container.getChildByName("tube_3").alpha=1;
                system_container.getChildByName("blank_circle").mouseEnabled = false;
                system_container.getChildByName("sample_circle").mouseEnabled = false;
                system_container.getChildByName("result_sample_tube_1").alpha = 0;
                system_container.getChildByName("result_sample_tube_2").alpha = 0;
                system_container.getChildByName("result_sample_tube_3").alpha = 0;
                system_container.getChildByName("tube_1").mouseEnabled = true; 
                 system_container.getChildByName("tube_2").mouseEnabled = true; 
                 system_container.getChildByName("tube_3").mouseEnabled = true;
                system_container.getChildByName("switch_to_move").mouseEnabled = true;
                  cap_move_flag=false;

                }
            /**Function is used to revert the tubes. */
            function revert_tubs(){
                system_container.getChildByName("tube_1").y=563;
                system_container.getChildByName("tube_1").x=483; 
                system_container.getChildByName("tube_2").y=563;
                system_container.getChildByName("tube_2").x=556; 
                system_container.getChildByName("tube_3").y=563;
                system_container.getChildByName("tube_3").x=632;  
                 // system_container.getChildByName("switch_to_move").mouseEnabled = true;
                
            }
            /** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
            function translationLabels() {
                /** This help array shows the hints for this experiment */
                helpArray = [_("help1"),_("help2"), _("help3"), _("help4"), _("help5"), _("help6"),_("help7"),_("help8"),_("help9"),_("Next"), _("Close")];
                scope.heading = _("Isolation of Chloroplast");
                scope.instructions = _("Instructions");
                scope.variables = _("Variables");
                scope.insructions1=_("Click on the 'Absorbance' button.");
                scope.insructions2=_("Click the down arrow to set the value 650 nm.");
                scope.insructions3=_("Click 'Enter' button.");
                scope.insructions4=_("Click on the lid to remove it.");
                scope.insructions5=_("Drag and drop the blank cuvette  into the cuvette slot.");
                scope.insructions6=_("Click on the 'Blank' button.");
                scope.insructions7=_("Click on the blank cuvette to remove it from the cuvette slot");
                scope.insructions8=_("Drag the cuvette, containing sample, into the cuvette slot.");
                scope.insructions9=_("Click on the 'Sample' button.");
                scope.insructions10=_("Click on the 'Help' icon for more help.");
                scope.reset = _("Reset");
                scope.copyright = _("copyright");
                scope.$apply();
            }
        }
    }
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
    system_stage.update();
}
/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container) {
    var text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    text.x = textX;
    text.y = textY;
    text.textBaseline = "alphabetic";
    text.name = name;
    text.cursor="pointer";
    text.text = value;
    text.color = color;
    container.addChild(text); /** Adding text to the container */
}
/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container) {
    var _bitmap = new createjs.Bitmap(image).set({});  
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX = _bitmap.scaleY = 0.88;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    container.addChild(_bitmap); /** Adding bitmap to the container */
}
/** All variables initialising in this function */
function initialisationOfVariables() {
  system_on_off_falg=false; 
	arrow_click_count=1; 
    cap_move_flag=true;
    drop_flag=0;
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
      system_container.getChildByName("screen_arrow").alpha = 0; /**Hiding the arrow inside the screen */
      system_container.getChildByName("reading_text_1").alpha = 0; 
      system_container.getChildByName("reading_text_2").alpha = 0; 
      system_container.getChildByName("reading_text_3").alpha = 0; 
      system_container.getChildByName("reading_text_4").alpha = 0; 
      system_container.getChildByName("reading_text_5").alpha = 0; 
      system_container.getChildByName("reading_text_6").alpha = 0; 
      system_container.getChildByName("absorbance_text").alpha = 0;
      system_container.getChildByName("result_sample_tube_1").alpha = 0; 
      system_container.getChildByName("result_sample_tube_2").alpha = 0; 
      system_container.getChildByName("result_sample_tube_3").alpha = 0; 
      system_container.getChildByName("glass_tube_half").alpha = 0; /**Hiding the half glass tube inside the device */
        system_container.getChildByName("button_up_round_rect_14").mouseEnabled = false;/** Disabling the click functionality of "Up" arrow.  */
      system_container.getChildByName("round_rect_16").mouseEnabled = false; /**Disabling the click functionality of "Enter" button.   */
      system_container.getChildByName("switch_to_move").mouseEnabled = false; /**Disabling the cap of the device.   */
    }
/** Resetting the experiment */
function reset(scope) {
    window.location.reload();
}
