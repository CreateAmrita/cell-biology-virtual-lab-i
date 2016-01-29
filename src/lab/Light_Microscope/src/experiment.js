(function() {
    angular.module('users')
        .directive("experiment", directiveFunction)
})();
var tick;
var cellName_Array, blur_filter, blurCells,current_cellIn_monitor;
var current_cellIn_monitor_X, current_cellIn_monitor_Y, left_right_click_count, up_down_click_count;
var mechanical_stageup_value, mechanical_small_stageup_value, initial_blur_value;
var current_binocular_cell_alpha, intensity_flag;
var current_cellIn_binocular,system_off_flag,lightFlag;
var arrow_rect_one=arrow_rect_two=arrow_rect_three=arrow_rect_four =new createjs.Shape();/** adding the rectangle shape for the first section buttons.  */
var arrow_rect_five=arrow_rect_six=arrow_rect_seven=arrow_rect_eight=new createjs.Shape();
var binocular_rect_one=binocular_rect_two=binocular_rect_three=binocular_rect_four=new createjs.Shape();/** adding the rectangle shape for the Binocular section buttons.  */
var binocular_rect_five=binocular_rect_six=binocular_rect_seven=binocular_rect_eight=new createjs.Shape();
var binocular_rect_nine=binocular_rect_ten =new createjs.Shape();
var alpha_count_white,alpha_count_black = 0;
var round_object,round_object_top,slide;

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
            queue = new createjs.LoadQueue(true);
            queue.installPlugin(createjs.Sound);
            queue.on("complete", handleComplete, this);
            queue.loadManifest([{
                id: "background",
                src: "././images/background.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "micro_body_computer",
                src: "././images/micro_body_computer.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "top_portion",
                src: "././images/top_portion.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "lens_rotate10",
                src: "././images/lens_rotate10.svg",
                type: createjs.LoadQueue.IMAGE

            }, {
                id: "lens_rotate40",
                src: "././images/lens_rotate40.svg",
                type: createjs.LoadQueue.IMAGE

            }, {
                id: "lens_rotate100",
                src: "././images/lens_rotate100.svg",
                type: createjs.LoadQueue.IMAGE

            }, {
                id: "middle_flat_round_object",
                src: "././images/middle_flat_round_object.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "middle_flat_round_object_top",
                src: "././images/middle_flat_round_object_top.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "top_switch_off",
                src: "././images/top_switch_off.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "top_switch_on",
                src: "././images/top_switch_on.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "side_switch_off",
                src: "././images/side_switch_off.svg",
                type: createjs.LoadQueue.IMAGE
            },{
                id: "side_switch_on",
                src: "././images/side_switch_on.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "middle_flat_round_object_holder",
                src: "././images/middle_flat_round_object_holder.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "down_switch_off",
                src: "././images/down_switch_off.svg",
                type: createjs.LoadQueue.IMAGE

            }, {
                id: "down_switch_on",
                src: "././images/down_switch_on.svg",
                type: createjs.LoadQueue.IMAGE

            }, {
                id: "arrow_one",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_two",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_three",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_four",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_five",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "rotate_line1",
                src: "././images/rotate_line1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_six",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_seven",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrow_eight",
                src: "././images/arrow.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_0",
                src: "././images/monitor_cell_0.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_1",
                src: "././images/monitor_cell_1.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_2",
                src: "././images/monitor_cell_2.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_3",
                src: "././images/monitor_cell_3.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_4",
                src: "././images/monitor_cell_4.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_5",
                src: "././images/monitor_cell_5.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_6",
                src: "././images/monitor_cell_2.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_7",
                src: "././images/monitor_cell_7.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_8",
                src: "././images/monitor_cell_8.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_cell_9",
                src: "././images/monitor_cell_9.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "slide",
                src: "././images/slide.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitor_black",
                src: "././images/monitor_black.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "bino_view_black",
                src: "././images/bino_view_black.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turner_big",
                src: "././images/turner_big.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turnerbig_line1",
                src: "././images/turnerbig_line1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turnerbig_line2",
                src: "././images/turnerbig_line2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turnersmall_line1",
                src: "././images/turnersmall_line1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrowtop_big",
                src: "././images/arrowtop_big.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrowbottom_big",
                src: "././images/arrowtop_big.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrowtop_small",
                src: "././images/arrowtop_small.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "arrowbottom_small",
                src: "././images/arrowtop_small.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "toolbox",
                src: "././images/toolbox.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "small_controller",
                src: "././images/small_controller.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "small_controller_arrow_larg_right",
                src: "././images/small_controller_arrow_larg.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "small_controller_arrow_larg_left",
                src: "././images/small_controller_arrow_larg.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "small_controller_arrow_rightbtm",
                src: "././images/small_controller_arrow_larg.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "small_controller_arrow_leftbtm",
                src: "././images/small_controller_arrow_larg.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "lightintensity_top",
                src: "././images/lightintensity_top.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "lightintensity_btm",
                src: "././images/lightintensity_top.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "switch_largebg",
                src: "././images/switch_largebg.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "switch_large_on",
                src: "././images/switch_large_on.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "switch_large_off",
                src: "././images/switch_large_off.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "light_switch_largebg",
                src: "././images/light_switch_largebg.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "light_switch_on",
                src: "././images/light_switch_on.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "light_switch_off",
                src: "././images/light_switch_off.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_0_binoView",
                src: "././images/binocular_cell_0.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_1_binoView",
                src: "././images/binocular_cell_1.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_2_binoView",
                src: "././images/binocular_cell_2.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_3_binoView",
                src: "././images/binocular_cell_3.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_4_binoView",
                src: "././images/binocular_cell_4.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_5_binoView",
                src: "././images/binocular_cell_5.jpg",
                type: createjs.LoadQueue.IMAGE
            },  {
                id: "monitorCell_7_binoView",
                src: "././images/binocular_cell_7.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_8_binoView",
                src: "././images/binocular_cell_8.jpg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "monitorCell_9_binoView",
                src: "././images/binocular_cell_9.jpg",
                type: createjs.LoadQueue.IMAGE
            }
            ]);
            
			/** Creating the stage for the experiment. */
            light_microscope_stage = new createjs.Stage("demoCanvas");
            light_microscope_stage.enableDOMEvents(true);
            light_microscope_stage.enableMouseOver();
            tick = setInterval(updateTimer, 100); /** Stage update function in a timer */
            
			/** Creating the microscope container */
            light_microscope_container = new createjs.Container(); 
            light_microscope_container.name = "light_microscope_container";
            light_microscope_stage.addChild(light_microscope_container); /** Append it in the stage */
            
			/** Creating the zoom controls container */
            zoom_Controls_container = new createjs.Container(); 
            zoom_Controls_container.name = "zoom_Controls_container";
            light_microscope_stage.addChild(zoom_Controls_container); /** Append it in the stage */
            
			/** Creating the binocular container */
            cell_group_container_one = new createjs.Container(); 
            cell_group_container_one.name = "cell_group_container";
            light_microscope_stage.addChild(cell_group_container_one); /** Append it in the stage */
            
			/** Creating the binocular container */
            binocular_controls_container = new createjs.Container(); 
            binocular_controls_container.name = "binocular_controls_container";
            light_microscope_stage.addChild(binocular_controls_container); /** Append it in the stage */
            cellmask = new createjs.Shape(); /** New shape for cell mask */
            binocular_mask = new createjs.Shape(); /**hide the enlarged cell's image using this mask */
            binocular_light_intensity = new createjs.Shape(); /**This shape is used to display the light intensity of the microscope */
            binocular_light_intensity_mask = new createjs.Shape(); /**This is used as the mask for light intensity shape */
            binocular_light_systemOn_rect= new createjs.Shape(); /**This is used as the mask for system ON/Off   */
            function handleComplete() { /**handle complete function  */
                blur_filter = new createjs.BlurFilter(initial_blur_value); /**Adding blur functionality to the cells in the monitor. the initial blur value is 5 */
                cellmask.graphics.drawRect(400, 408, 259, 180); /** Background - Zoom container */
                binocular_mask.graphics.drawRect(0, 0, 700, 460); /**Drawing the rectangle shape for the binocular mask */
                binocular_light_intensity.graphics.beginFill("#FFFFFF").drawRect(0, 0, 700, 460); /** Filling white color into for light intensity effect  */
                light_microscope_container.addChild(cellmask); /** Adding Background into container */
                cell_group_container_one.mask = binocular_mask; /**Adding Mask effect for binocular cells */
                binocular_controls_container.addChild(binocular_light_intensity); /** adding the light intensity container into the binocular container */
                binocular_controls_container.addChild(binocular_light_intensity_mask); /** adding the light intensity mask container into the binocular container */
                binocular_controls_container.addChild(binocular_light_systemOn_rect) /** adding the On/OFF  rectangle container into the binocular container */
                binocular_light_intensity.alpha = current_binocular_cell_alpha; /** Setting the light intensity alpha value , current_binocular_cell_alpha= 0*/
                
				/** Background image */
                loadImages(queue.getResult("background"), "background", 0, 0, "", 0, light_microscope_container); 
                
				/** adding cell into the monitor screen */
                for(var i=0;i<10;i++){
                    var _monitor_cell_name="monitor_cell_"+i;
                    loadImages(queue.getResult(_monitor_cell_name), _monitor_cell_name, 380, 406, "", 0, light_microscope_container); /**appending the cells into the monitor */
                }
                loadImages(queue.getResult("monitor_black"), "monitor_black", 408, 409, "", 0, light_microscope_container); /** Black screen */
                loadImages(queue.getResult("micro_body_computer"), "micro_body_computer", 5, 130, "", 0, light_microscope_container); /**Monitor*/
                
				/** Lens on the microscope*/
                loadImages(queue.getResult("lens_rotate10"), "lens_rotate10", 90, 365, "", 0, light_microscope_container); /** 10X (low power objective lens) */
                loadImages(queue.getResult("lens_rotate40"), "lens_rotate40", 90, 365, "", 0, light_microscope_container);/** 40X (High power objective lens) */
                loadImages(queue.getResult("lens_rotate100"), "lens_rotate100", 90, 365, "", 0, light_microscope_container); /** 100X (Oil immersion objective lens) */
                
				/** Microscope parts*/
                loadImages(queue.getResult("top_portion"), "top_portion", 33, 66, "", 0, light_microscope_container);
                loadImages(queue.getResult("middle_flat_round_object"), "middle_flat_round_object", 73, 470, "", 0, light_microscope_container);
                loadImages(queue.getResult("middle_flat_round_object_top"), "middle_flat_round_object_top", 100, 468, "", 0, light_microscope_container);
                
				/** Microscope On/Off Switch*/
                loadImages(queue.getResult("top_switch_off"), "top_switch_off", 257, 331, "pointer", 0, light_microscope_container); /** Top switches */
                loadImages(queue.getResult("top_switch_on"), "top_switch_on", 257, 333, "pointer", 0, light_microscope_container);
                loadImages(queue.getResult("side_switch_off"), "side_switch_off", 324, 539, "pointer", 0, light_microscope_container); /** side switches */
                loadImages(queue.getResult("side_switch_on"), "side_switch_on", 324, 539, "pointer", 0, light_microscope_container);
                loadImages(queue.getResult("middle_flat_round_object_holder"), "middle_flat_round_object_holder", 181, 530, "", 0, light_microscope_container);
                loadImages(queue.getResult("down_switch_off"), "down_switch_off", 210, 605, "pointer", 0, light_microscope_container);
                loadImages(queue.getResult("down_switch_on"), "down_switch_on", 210, 605, "pointer", 0, light_microscope_container);
                
				/** Microscope controlling arrows*/
                loadImages(queue.getResult("arrow_one"), "arrow_one", 202, 575, "", 0, light_microscope_container);
                loadImages(queue.getResult("arrow_two"), "arrow_two", 190, 580, "", 180, light_microscope_container);
                loadImages(queue.getResult("arrow_three"), "arrow_three", 202, 598, "", 0, light_microscope_container);
                loadImages(queue.getResult("arrow_four"), "arrow_four", 190, 603, "", 180, light_microscope_container);
                loadImages(queue.getResult("rotate_line1"), "rotate_line1", 208, 553, "", 0, light_microscope_container);
                loadImages(queue.getResult("arrow_five"), "arrow_five", 213, 567, "", 315, light_microscope_container);
                loadImages(queue.getResult("arrow_six"), "arrow_six", 218, 590, "", 425, light_microscope_container);
                loadImages(queue.getResult("arrow_seven"), "arrow_seven", 230, 573, "", 310, light_microscope_container);
                loadImages(queue.getResult("arrow_eight"), "arrow_eight", 235, 586, "", 425, light_microscope_container);
                
				/** Initial position of the slider*/
                loadImages(queue.getResult("slide"), "slide", 390, 15, "", 0, light_microscope_container);
                
				/** Cells inside the Binocular*/
                loadImages(queue.getResult("monitorCell_0_binoView"), "monitorCell_group_1", 0, 0, "", 0, cell_group_container_one); /** Unstained Onion epidermal cell */
                loadImages(queue.getResult("monitorCell_1_binoView"), "monitorCell_group_2", 0, 0, "", 0, cell_group_container_one); 
                loadImages(queue.getResult("monitorCell_2_binoView"), "monitorCell_group_3", 0, 0, "", 0, cell_group_container_one);
                loadImages(queue.getResult("monitorCell_3_binoView"), "monitorCell_group_4", 0, 0, "", 0, cell_group_container_one); 
                loadImages(queue.getResult("monitorCell_4_binoView"), "monitorCell_group_5", 0, 0, "", 0, cell_group_container_one);
                loadImages(queue.getResult("monitorCell_5_binoView"), "monitorCell_group_6", 0, 0, "", 0, cell_group_container_one); 
                loadImages(queue.getResult("monitorCell_2_binoView"), "monitorCell_group_7", 0, 0, "", 0, cell_group_container_one);
                loadImages(queue.getResult("monitorCell_7_binoView"), "monitorCell_group_8", 0, 0, "", 0, cell_group_container_one); 
                loadImages(queue.getResult("monitorCell_8_binoView"), "monitorCell_group_9", 0, 0, "", 0, cell_group_container_one);
                loadImages(queue.getResult("monitorCell_9_binoView"), "monitorCell_group_10", 0, 0, "", 0, cell_group_container_one);
                
				/** Binocular view section*/
                loadImages(queue.getResult("bino_view_black"), "bino_view_black", -29, 0, "", 0, binocular_controls_container); /** Binocular Mask*/
                
				/** Binocular controls section*/
                loadImages(queue.getResult("toolbox"), "toolbox", 0, 480, "", 0, binocular_controls_container);
                
				/** Binocular turner*/
                loadImages(queue.getResult("turner_big"), "turner_big", 550, 530, "", 0, binocular_controls_container);
                loadImages(queue.getResult("turnerbig_line1"), "turnerbig_line1", 575, 533, "", 0, binocular_controls_container);
                loadImages(queue.getResult("turnerbig_line2"), "turnerbig_line2", 575, 533, "", 0, binocular_controls_container);
                loadImages(queue.getResult("turnersmall_line1"), "turnersmall_line1", 615, 565, "", 0, binocular_controls_container);
                loadImages(queue.getResult("arrowtop_big"), "arrowtop_big", 583, 560, "", 0, binocular_controls_container);
                loadImages(queue.getResult("arrowbottom_big"), "arrowbottom_big", 599, 615, "", 140, binocular_controls_container);
                loadImages(queue.getResult("arrowtop_small"), "arrowtop_small", 621, 569, "", 0, binocular_controls_container);
                loadImages(queue.getResult("arrowbottom_small"), "arrowbottom_small", 629, 605, "", 136, binocular_controls_container);
                
				/** Binocular Small Controller*/
                loadImages(queue.getResult("small_controller"), "small_controller", 420, 530, "", 0, binocular_controls_container);
                loadImages(queue.getResult("small_controller_arrow_larg_right"), "small_controller_arrow_larg_right", 472, 565, "", 0, binocular_controls_container);
                loadImages(queue.getResult("small_controller_arrow_larg_left"), "small_controller_arrow_larg_left", 437, 579, "", 180, binocular_controls_container);
                loadImages(queue.getResult("small_controller_arrow_rightbtm"), "small_controller_arrow_rightbtm", 469, 625, "", 0, binocular_controls_container);
                loadImages(queue.getResult("small_controller_arrow_leftbtm"), "small_controller_arrow_leftbtm", 440, 640, "", 180, binocular_controls_container);
                
				/** Binocular light intensity Controller*/
                loadImages(queue.getResult("lightintensity_top"), "lightintensity_top", 325, 525, "", 0, binocular_controls_container);
                loadImages(queue.getResult("lightintensity_btm"), "lightintensity_btm", 358, 640, "", 180, binocular_controls_container);
                
				/** Binocular light On/Off Controller*/
                loadImages(queue.getResult("switch_largebg"), "switch_largebg", 200, 530, "", 0, binocular_controls_container);
                loadImages(queue.getResult("switch_large_on"), "switch_large_on", 220, 540, "pointer", 0, binocular_controls_container);
                loadImages(queue.getResult("switch_large_off"), "switch_large_off", 220, 540, "pointer", 0, binocular_controls_container);
                
				/** Binocular System On/Off Controller*/
                loadImages(queue.getResult("light_switch_largebg"), "light_switch_largebg", 53, 530, "", 0, binocular_controls_container);
                loadImages(queue.getResult("light_switch_on"), "light_switch_on", 81, 550, "pointer", 0, binocular_controls_container);
                loadImages(queue.getResult("light_switch_off"), "light_switch_off", 81, 550, "pointer", 0, binocular_controls_container);
                
				/** Adding the label to the binocular controls */
                setText("systemOn_OFF", 25, 515, _("System on/Off"), "#000000", 1, binocular_controls_container);
                setText("lightOn_OFF", 175, 515, _("Light on/Off"), "#000000", 1, binocular_controls_container);
                setText("light_intensity", 285, 515, _("Light intensity"), "#000000", 1, binocular_controls_container);
                setText("turning", 399, 515, _("Left and Right turning"), "#000000", 1, binocular_controls_container);
                setText("zoom", 570, 515, _("Zoom In/Out"), "#000000", 1, binocular_controls_container);
                
				/** Adding the rectangle for increasing the hit area of the small arrows in the microscope */
                createRect("arrow_rect_one","rectangle_one",180,570,light_microscope_container,10,10);
                createRect("arrow_rect_two","rectangle_two",198,570,light_microscope_container,10,10);
                createRect("arrow_rect_three","rectangle_three",198,594,light_microscope_container,10,10);
                createRect("arrow_rect_four","rectangle_four",183,594,light_microscope_container,10,10);
                createRect("arrow_rect_five","rectangle_five",214,560,light_microscope_container,10,10);
                createRect("arrow_rect_six","rectangle_six",214,585,light_microscope_container,10,10);
                createRect("arrow_rect_seven","rectangle_seven",230,570,light_microscope_container,10,10);
                createRect("arrow_rect_eight","rectangle_eight",230,581,light_microscope_container,10,10);
				
				/** adding the rectangle shape for the Binocular section buttons.  */
                createRect("binocular_rect_one","binocular_rectangle_one",325,526,binocular_controls_container, 32, 32);
                createRect("binocular_rect_two","binocular_rectangle_two",325,608,binocular_controls_container, 32, 32);
                createRect("binocular_rect_three","binocular_rectangle_three",425,560,binocular_controls_container, 18, 18);
                createRect("binocular_rect_four","binocular_rectangle_four",466,560,binocular_controls_container, 18, 18);
                createRect("binocular_rect_five","binocular_rectangle_five",425,625,binocular_controls_container, 18, 18);
                createRect("binocular_rect_six","binocular_rectangle_six",466,625,binocular_controls_container, 18, 18);
                createRect("binocular_rect_seven","binocular_rectangle_seven",580,555,binocular_controls_container, 18, 18);
                createRect("binocular_rect_eight","binocular_rectangle_eight",580,605 ,binocular_controls_container, 18, 18);
                createRect("binocular_rect_nine","binocular_rectangle_nine",610,559 ,binocular_controls_container, 22, 22);
                createRect("binocular_rect_ten","binocular_rectangle_ten",610,599 ,binocular_controls_container, 22, 22);
                initialisationOfVariables(); /** Initializing the variables */
                initialisationOfImages(); /** Function call for images used in the apparatus visibility */
                translationLabels(); /** Translation of strings using gettext */
                
				/** Microscope switch ON/OFF function */
                function switchOnOff(top_switch_on_alpha,top_switch_Off_alpha,monitor_black_alpha,switch_large_on_aplha,switch_large_off_aplha,binocular_system_on_alpha,light_On_flag){
                    light_microscope_container.getChildByName("top_switch_on").alpha = top_switch_on_alpha; /** Switch ON image hide by giving alpha value "0" */
                    light_microscope_container.getChildByName("top_switch_off").alpha = top_switch_Off_alpha;  /**Switch OFF image showing by giving alpha value "1" */
                    binocular_controls_container.getChildByName("switch_large_on").alpha = switch_large_on_aplha; /** Setting the alpha value 0 to the switch ON button inside the binocular view section for hiding the "Switch ON " image. */
                    binocular_controls_container.getChildByName("switch_large_off").alpha = switch_large_off_aplha;; /** Setting the alpha value 1 to the switch OFF button inside the binocular view section for showing the  "Switch OFF " image.   */
                    if(system_off_flag){ /**system Off flag is used to check whether system is on or off condition*/
                        light_microscope_container.getChildByName("monitor_black").alpha = monitor_black_alpha;  /** Showing the black rectangle inside the monitor bu giving the alpha value "1"  */
                        binocular_light_systemOn_rect.alpha = binocular_system_on_alpha;   
                        if(light_On_flag==0 ){ /** light on flag  which is used to check the light-Off switch is in off condition.*/ 
                            binocular_light_systemOn_rect.graphics.beginFill("#000000").drawRect(0, 0, 700, 460); /** Setting the binocular system rectangle is filled with black color. */
                        }
                    }
                    else if(!system_off_flag){ /**system Off flag is used to check whether system is on or off condition*/  
                        binocular_light_systemOn_rect.graphics.beginFill("#000000").drawRect(0, 0, 700, 460); /** Setting the binocular system rectangle is filled with black color. */
                    }  
                }
                
				/** Microscope bottom side On/OFF switch functionality. side switch*/
                function microscopeBottomSwitchOnOff(down_switch_on_aplha,down_switch_off_apha){
                    light_microscope_container.getChildByName("down_switch_on").alpha = down_switch_on_aplha; /** giving the alpha value to the down switch- ON. */
                    light_microscope_container.getChildByName("down_switch_off").alpha = down_switch_off_apha;/** giving the alpha value to the down switch -OFF. */
                }
                
				/**Microscope system On/Off function */
                function microscopeSideWitchOnOff(side_switch_off_aplha,side_switch_on_aplha){
                    light_microscope_container.getChildByName("side_switch_off").alpha = side_switch_off_aplha;/** giving the alpha value to the side switch- OFF. */
                    light_microscope_container.getChildByName("side_switch_on").alpha = side_switch_on_aplha; /** giving the alpha value to the side switch- ON. */
                    binocular_controls_container.getChildByName("light_switch_on").alpha = side_switch_on_aplha;
                    binocular_controls_container.getChildByName("light_switch_off").alpha = side_switch_off_aplha;
                }
                
				/**Function for moving the slide up and down */
                function slideMoveUpDown(posive_negative_flag,rectangle_button ){
                    if(posive_negative_flag==1){ /**Checking the button is left or right using the posive_negative_flag.*/
                        up_down_click_count++;
                        current_cellIn_monitor.y = current_cellIn_monitor_Y + up_down_click_count;
                        light_microscope_container.getChildByName("slide").y++;
                        light_microscope_container.getChildByName("middle_flat_round_object_top").y++;
                        light_microscope_container.getChildByName("rectangle_two").mouseEnabled = true;
                    }
                    else{
                        up_down_click_count--;
                        current_cellIn_monitor.y = current_cellIn_monitor_Y + up_down_click_count;
                        light_microscope_container.getChildByName("slide").y--;
                        light_microscope_container.getChildByName("middle_flat_round_object_top").y--;
                        light_microscope_container.getChildByName("rectangle_one").mouseEnabled = true;
                    }
                    if(up_down_click_count == 5) {
                        rectangle_button.mouseEnabled = false; /** disable the click functionality of current button while the left-right click count value is 5 */
                    }else if (up_down_click_count <= -5) {
                        rectangle_button.mouseEnabled = false; /** disable the click functionality of current button while the left-right click count value is greater than or equal to 5*/
                    }
                }
                
				function slideMoveLeftRight(posive_negative_flag,rectangle_button ){
                    if(posive_negative_flag==1){ /**Checking the button is left or right using the posive_negative_flag. */
                        left_right_click_count++; /** Which count the click.*/
                        current_cellIn_monitor.x = current_cellIn_monitor_X + left_right_click_count;
                        light_microscope_container.getChildByName("slide").x++;
                        light_microscope_container.getChildByName("middle_flat_round_object_top").x++;
                        light_microscope_container.getChildByName("rectangle_four").mouseEnabled = true;
                    }else{
                        left_right_click_count--;
                        current_cellIn_monitor.x = current_cellIn_monitor_X + left_right_click_count;
                        light_microscope_container.getChildByName("slide").x--;
                        light_microscope_container.getChildByName("middle_flat_round_object_top").x--;
                        light_microscope_container.getChildByName("rectangle_three").mouseEnabled = true;
                    }
                    if(left_right_click_count == 5) {
                        rectangle_button.mouseEnabled = false; /** disable the click functionality of current button while the left-right click count value is 5 */
                    }else if (left_right_click_count <= -5) {
                        rectangle_button.mouseEnabled = false; /** disable the click functionality of current button while the left-right click count value is greater than or equal to 5*/
                    }
                } 
                
				/** Microscope system on /Off function.  */
                function microscopeSystemOffOn(systemOnFlag){
                    if(lightFlag==true){ /** light flag is used to check the light is "ON" or "OFF" condition */
                        if(systemOnFlag==1){/**System OFF */
							binocular_light_systemOn_rect.alpha = 1;/** setting the alpha value of the binocular light is "1"  for showing the light is in "OFF"*/
                            binocular_light_systemOn_rect.graphics.beginFill("#000000").drawRect(0, 0, 700, 460); /**black color rectangle drawing for light OFF  */    
                            light_microscope_container.getChildByName("monitor_black").alpha = 1;  /** Showing the black rectangle inside the monitor by giving the alpha value "1"  */
                        }else{/**System ON */
                            system_off_flag=true;/**Setting the system ON flag is false */
                            binocular_light_systemOn_rect.alpha = 0;
                            light_microscope_container.getChildByName("monitor_black").alpha = 0;/** Hiding the black rectangle inside the monitor bu giving the alpha value "0"  */
                        }
                    }
                    else{
                        system_off_flag=false; /**Setting the system of flag is false */
                    }
                }
                
				/** Microscope switch off function */
                light_microscope_container.getChildByName("top_switch_on").on("pressup", function(evt) {
                    lightFlag=false;
                    switchOnOff(0,1,1,0,1,1,0);/** passing the alpha value of corresponding objects. */
                });
                
				/**Microscope switch on function */
                light_microscope_container.getChildByName("top_switch_off").on("pressup", function(evt) {
					lightFlag=true;
                    switchOnOff(1,0,0,1,0,0,1);/** passing the alpha value of corresponding objects. */
                });
                
				/**Microscope bottom switch on  function */
                light_microscope_container.getChildByName("down_switch_off").on("pressup", function(evt) {
                    microscopeBottomSwitchOnOff(1,0);/** passing the alpha value of corresponding objects. */
                });
                
				/**Microscope bottom switch off  function */
                light_microscope_container.getChildByName("down_switch_on").on("pressup", function(evt) {
                    microscopeBottomSwitchOnOff(0,1);/** passing the alpha value of corresponding objects. */
                });
                
				/** Microscope system OFf function */
                light_microscope_container.getChildByName("side_switch_on").on("pressup", function(evt) {
                    microscopeSideWitchOnOff(1,0);/** passing the alpha value of corresponding objects. */ 
                    microscopeSystemOffOn(1)
                    system_off_flag=false;
                });
                
				/** Microscope system ON function */
                light_microscope_container.getChildByName("side_switch_off").on("pressup", function(evt) {
                    microscopeSideWitchOnOff(0,1);/** passing the alpha value of corresponding objects. */
                    microscopeSystemOffOn(0);
                    system_off_flag=true;
                });
                
				/** Slide move down function */
                light_microscope_container.getChildByName("rectangle_one").on("pressup", function(evt) {
                    slideMoveUpDown(1,light_microscope_container.getChildByName("rectangle_one"));
                });
                
				/** Slide move up function */
                light_microscope_container.getChildByName("rectangle_two").on("pressup", function(evt) {
                   slideMoveUpDown(0,light_microscope_container.getChildByName("rectangle_two"));
                });
                
				/** Slide move right function */
                light_microscope_container.getChildByName("rectangle_three").on("pressup", function(evt) {
                    slideMoveLeftRight(1,light_microscope_container.getChildByName("rectangle_three") );
                });
                
				/** Slide move left function */
                light_microscope_container.getChildByName("rectangle_four").on("pressup", function(evt) {
                    slideMoveLeftRight(0,light_microscope_container.getChildByName("rectangle_four"));
                });
				
                function sectionArrowOnOff(first_sect_value,second_sect_value){ /** Function for enabling and disabling section arrows in both microscope and binocular view.  */
					light_microscope_container.getChildByName("rectangle_five").mouseEnabled = first_sect_value;
                    light_microscope_container.getChildByName("rectangle_seven").mouseEnabled = first_sect_value;
                    binocular_controls_container.getChildByName("binocular_rectangle_seven").mouseEnabled = first_sect_value;
                    binocular_controls_container.getChildByName("binocular_rectangle_nine").mouseEnabled = first_sect_value;
					light_microscope_container.getChildByName("rectangle_six").mouseEnabled = second_sect_value;
                    light_microscope_container.getChildByName("rectangle_eight").mouseEnabled = second_sect_value;
                    binocular_controls_container.getChildByName("binocular_rectangle_eight").mouseEnabled = second_sect_value;
                    binocular_controls_container.getChildByName("binocular_rectangle_ten").mouseEnabled = second_sect_value;
                };
				
				/** Function for decreasing and increasing the blur effect of the cells in both microscope and binocular.*/
                function blurArrowFunction(val,obj,obj_top,obj_slide,monitor_blur,bino_blur,optr,check_var,flag_1,flag_2,flag_3,stage_flag){
					if(stage_flag==true){/**counting the mouse click using mechanical stage up value for first section arrows */
						mechanical_stageup_value=mechanical_stageup_value + val;
					}else{/**counting the mouse click using mechanical stage up value for second section arrows */
						mechanical_small_stageup_value=mechanical_small_stageup_value + val;
					}
					round_object.y=round_object.y + obj;/**changing the position of slide and slide containing object */
					round_object_top.y=round_object_top.y+obj_top;/**changing the position of slide and slide containing object */
					slide.y=slide.y+obj_slide;/**changing the position of slide and slide containing object */
					sectionArrowOnOff(flag_1,flag_1);/** Enable Section arrows*/
					blurCells(initial_blur_value=initial_blur_value+monitor_blur,0,0,current_cellIn_monitor, 286, 213);/**Function for blur the monitor cell */
					blurCells(initial_blur_value=initial_blur_value+bino_blur,0,0,current_cellIn_binocular,1172, 914);/**Function for blur the binocular cell */
					if (eval(mechanical_stageup_value+optr+check_var)&&stage_flag==true) {/**after certain click the first section of the arrows get disable and enable */
						sectionArrowOnOff(flag_2,flag_3);
					} else if (eval(mechanical_small_stageup_value+optr+check_var)&&stage_flag==false) {/**after certain click the second section of the arrows get disable and enable */
						sectionArrowOnOff(flag_2,flag_3);
					}					
				};
				
                /** Mechanical stage movement big -Up  */
                light_microscope_container.getChildByName("rectangle_five").on("pressup", function(evt) {
                    blurArrowFunction(1,-1,-1,-1,-1,-2,">=",8,true,false,true,true);/**Calling the blurArrowFunction */
                });
                
				/** Mechanical stage movement big -Down */
                light_microscope_container.getChildByName("rectangle_six").on("pressup", function(evt) {
					blurArrowFunction(-1,1,1,1,1,2,"<=",-2,true,true,false,true);/**Calling the blurArrowFunction */
                });
                
				/** Mechanical stage movement small - Up */
                light_microscope_container.getChildByName("rectangle_seven").on("pressup", function(evt) {
					blurArrowFunction(1,-0.5,-0.5,-0.5,-0.2,-1,">=",18,true,false,true,false);/**Calling the blurArrowFunction */
                });
                
				/** Mechanical stage movement small - down */
                light_microscope_container.getChildByName("rectangle_eight").on("pressup", function(evt) {
                    blurArrowFunction(-1,0.5,0.5,0.5,0.2,1,"<=",-12,true,true,false,false);/**Calling the blurArrowFunction */
                });
                
				/** Binocular system OFF function */
                binocular_controls_container.getChildByName("light_switch_on").on("pressup", function(evt) {
                    microscopeSideWitchOnOff(1,0);/** passing the alpha value of corresponding objects. */ 
                    microscopeSystemOffOn(1);/**Setting the microscope in OFF condition */
                    system_off_flag=false;
                });
                
				/** Binocular system ON function */
                binocular_controls_container.getChildByName("light_switch_off").on("pressup", function(evt) {
                    microscopeSideWitchOnOff(0,1);/** passing the alpha value of corresponding objects. */ 
                    microscopeSystemOffOn(0);/**Setting the microscope in ON condition */
                    system_off_flag=true;
                });
                
				/** Binocular Light OFF function */
                binocular_controls_container.getChildByName("switch_large_on").on("pressup", function(evt) {
                    lightFlag=false;/**Setting the lightFlag value is false when the binocular light OFF */
                    switchOnOff(0,1,1,0,1,1,0);
                 });
                
				/** Binocular Light ON function */
                binocular_controls_container.getChildByName("switch_large_off").on("pressup", function(evt) {
                    lightFlag=true;/**Setting the lightFlag value is true when the binocular light ON */
                    switchOnOff(1,0,0,1,0,0,1);    
                });
                binocular_controls_container.getChildByName("binocular_rectangle_one").on("pressup", function(evt) {/** Binocular light Intensity-up Arrow functionality  */
                    binocular_controls_container.getChildByName("binocular_rectangle_two").mouseEnabled = true;/**Enabling the second light intensity arrow */
                    if (alpha_count_white.toFixed(1) == 0 && intensity_flag == true) {
                        binocular_light_intensity.graphics.beginFill("#FFFFFF").drawRect(0, 0, 700, 460); /** Drawing a white rectangle for light intensity - Up Arrow*/
                    }
                    alpha_count_white += 0.1;/** counting the click  */
                    binocular_light_intensity.alpha = alpha_count_white.toFixed(1);/**Setting the alpha values using the mouse-click  */
                    current_binocular_cell_alpha = alpha_count_white.toFixed(1)
                    intensity_flag = false;
                    if (alpha_count_white.toFixed(1) < -0.1) {
						binocular_light_intensity.alpha = Math.abs(alpha_count_white.toFixed(1));
                        current_binocular_cell_alpha = Math.abs(alpha_count_white.toFixed(1))
                    }
                    else if (alpha_count_white.toFixed(1) == 0) {
                        intensity_flag = true
                    }
                    /** Stop the click functionality of up arrow*/
                    else if (alpha_count_white.toFixed(1) == 1.0) {
                        binocular_controls_container.getChildByName("binocular_rectangle_one").mouseEnabled = false;
                    }
                });
                
				/** Binocular light Intensity-down Arrow functionality  */
                binocular_controls_container.getChildByName("binocular_rectangle_two").on("pressup", function(evt) {
                    binocular_controls_container.getChildByName("binocular_rectangle_one").mouseEnabled = true;
                    alpha_count_white -= 0.1;
                    binocular_light_intensity.alpha = alpha_count_white.toFixed(1);
                    current_binocular_cell_alpha = alpha_count_white.toFixed(1);
                    if (alpha_count_white.toFixed(1) == -0.1) {
                        binocular_light_intensity.graphics.beginFill("#000000").drawRect(0, 0, 700, 460);
                    }
                    else if (alpha_count_white.toFixed(1) < -0.1) {
                        binocular_light_intensity.alpha = Math.abs(alpha_count_white.toFixed(1));
                        current_binocular_cell_alpha = Math.abs(alpha_count_white.toFixed(1));
                    }
                    /** Stop the click functionality of down arrow*/
                    else if (alpha_count_white.toFixed(1) == -0.9) {
                        binocular_controls_container.getChildByName("binocular_rectangle_two").mouseEnabled = false;
                    }
                });
                
				/** Binocular Small Controller move-up functionality  */
                binocular_controls_container.getChildByName("binocular_rectangle_three").on("pressup", function(evt) {
                    binocular_controls_container.getChildByName("binocular_rectangle_four").mouseEnabled = true;
                    cell_group_container_one.y -= 4; /** Changing the position of the binocular cells */
                    if (cell_group_container_one.y == -24) {
                        binocular_controls_container.getChildByName("binocular_rectangle_three").mouseEnabled = false;
                    }
                });
                
				/** Binocular Small Controller move-down functionality */
                binocular_controls_container.getChildByName("binocular_rectangle_four").on("pressup", function(evt) {
                    binocular_controls_container.getChildByName("binocular_rectangle_three").mouseEnabled = true;
                    cell_group_container_one.y += 4;/** Changing the position of the binocular cells */
                    if (cell_group_container_one.y == 24) {
                        binocular_controls_container.getChildByName("binocular_rectangle_four").mouseEnabled = false;
                    }
                });
                
				/** Binocular Small Controller move-left functionality  */
                binocular_controls_container.getChildByName("binocular_rectangle_five").on("pressup", function(evt) {
                    binocular_controls_container.getChildByName("binocular_rectangle_six").mouseEnabled = true;
                    cell_group_container_one.x -= 4;/** Changing the position of the binocular cells */
                    if (cell_group_container_one.x == -12) {
                        binocular_controls_container.getChildByName("binocular_rectangle_five").mouseEnabled = false;
                    }
                });
                
				/** Binocular Small Controller move-right functionality */
                binocular_controls_container.getChildByName("binocular_rectangle_six").on("pressup", function(evt) {
                    binocular_controls_container.getChildByName("binocular_rectangle_five").mouseEnabled = true;
                    cell_group_container_one.x += 4;/** Changing the position of the binocular cells */
                    if (cell_group_container_one.x == 12) {
                        binocular_controls_container.getChildByName("binocular_rectangle_six").mouseEnabled = false;
                    }
                });
                
				/** Binocular blur functionality large-Up  */
                binocular_controls_container.getChildByName("binocular_rectangle_seven").on("pressup", function(evt) {
                    blurArrowFunction(1,-1,-1,-1,-1,-2,">=",8,true,false,true,true);/**Calling the  blurArrowFunction function to the large arrows in the binocular.*/
                });
                
				/** Binocular blur functionality large-down  */
                binocular_controls_container.getChildByName("binocular_rectangle_eight").on("pressup", function(evt) {
                    blurArrowFunction(-1,1,1,1,1,2,"<=",-2,true,true,false,true);/**Calling the  blurArrowFunction function to the large arrows in the binocular.*/
                });
                
				/** Binocular blur functionality small-up  */
                binocular_controls_container.getChildByName("binocular_rectangle_nine").on("pressup", function(evt) {
                    blurArrowFunction(1,-0.5,-0.5,-0.5,-0.2,-1,">=",18,true,false,true,false);/**Calling the  blurArrowFunction function to the small arrows in the binocular.*/
                });
                
				/** Binocular blur functionality small-down  */
                binocular_controls_container.getChildByName("binocular_rectangle_ten").on("pressup", function(evt) {
                    blurArrowFunction(-1,0.5,0.5,0.5,0.2,1,"<=",-12,true,true,false,false);/**Calling the  blurArrowFunction function to the large arrows in the binocular.*/
                });
                
				/** Cell blur function.*/
                blurCells = function(blur_value,posX,posY, blur_cells_name, blur_image_width, blur_image_height) {
                    blur_filter = new createjs.BlurFilter(blur_value);
                    blur_cells_name.filters = [blur_filter];
                    blur_cells_name.cache(posX,posY, blur_image_width, blur_image_height);
                }
                blurCells(5,0,0,current_cellIn_monitor, 286, 213);/** giving blur effect to the cells inside the monitor. */
                blurCells(5,0,0,cell_group_container_one.getChildByName("monitorCell_group_1"), 1172, 914);/** giving blur effect to the cells inside the binocular. */
            }
            
			/**function for creating multiple rectangular using the createRect function which is used to increase the hit are of small arrows. */
			function createRect(rect,rectName,xPos,yPos,container,container_width,container_height){
				rect=new createjs.Shape();/** creating new rectangle  */
				rect.graphics.beginFill("#FFFFFF").drawRect(xPos,yPos, container_width, container_height);/**Adding the white color and position to the rectangle. */
				rect.cursor="pointer";/** Giving cursor-pointer effect to the rectangle. */
				rect.alpha=0.01;/**Setting the alpha value of rectangle */
				rect.name=rectName;/** Giving the name to the rectangle */
				container.addChild(rect); /** Adding the rectangle to the corresponding container. */
			}
			
			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				helpArray = [_("help1"), _("help2"), _("help3"), _("help4"), _("Next"), _("Close")];
				scope.heading = _("Light Microscope");
				scope.variables = _("Variables");
				scope.reset = _("Reset");
				scope.select_View = _("Select View :");
				scope.resetPositionText = ("Reset Position");
				scope.selectViewPlaceholder = _("Monitor out");
				scope.selectLense_Placeholder = _("10X (low power objective lens");
				scope.selectLense_label = _("Select lense :");
				scope.selectView_label = _("Select view :");
				scope.selectsample_label = _("Select sample :");
				scope.selectSamplePlaceholder = _("Unstained Onion epidermal cell");
				scope.copyright = _("copyright");
				scope.selectViewArray = [{optionsView: _('Monitor out'),type: 0}, {optionsView: _('Binocular'),type: 1}];
				scope.selectLenseArray = [{optionsLense: _('10X (low power objective lens)'),type: 0}, {optionsLense: _('40X (High power objective lens)'),type: 1}, {optionsLense: _('100X (Oil immersion objective lens)'),type: 2}];
				scope.selectsampleArray = [{optionsSample: _('Unstained Onion epidermal cell'),type: 0}, {optionsSample: _('Gram negative rods'),type: 1}, {optionsSample: _('Gram positive cocci'),type: 2}, {optionsSample: _('Gram positive rods'),type: 3}, {optionsSample: _('Gram negative cocci'),type: 4}, {optionsSample: _('Bacillus Subtilis (rods)'),type: 5}, {optionsSample: _('Staphylococcus aurcus ( coccus)'),type: 6}, {optionsSample: _('Onion Cell'),type: 7}, {optionsSample: _('Cheek Cell'),type: 8}, {optionsSample: _('Onion Root Tips'),type: 9}];
				scope.$apply();
            }
        }
    }
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
    light_microscope_stage.update();
}

/** Function for changing the user view */
function changeViewFn(scope) {
    var _view_changeindexval = scope.view_Mdl;
    if (_view_changeindexval == 0) {
        binocular_controls_container.alpha = 0;
        light_microscope_container.alpha = 1;
        zoom_Controls_container.alpha = 1;
        cell_group_container_one.alpha = 0
    } else {
        binocular_controls_container.alpha = 1;
        light_microscope_container.alpha = 0;
        zoom_Controls_container.alpha = 0;
        cell_group_container_one.alpha = 1
    }
}

/** Function for changing the lens in the microscope */
function changeLenseFn(scope) {
    if (scope.lense_Mdl == 0) {
        setLensFn(1,0,0,1,1,1,1);
    } else if (scope.lense_Mdl == 1) {
        setLensFn(0,1,0,1.5,1.5,1.2,1.2);
    } else {
       	setLensFn(0,0,1,1.8,1.8,1.5,1.5);
    }
}

/** Function for changing the lens in the microscope */
function setLensFn(lens_rotate10,lens_rotate40,lens_rotate100,binocular_scale_x,binocular_scale_y,monitor_scale_x,monitor_scale_y)
{
	light_microscope_container.getChildByName("lens_rotate10").alpha = lens_rotate10;
    light_microscope_container.getChildByName("lens_rotate40").alpha = lens_rotate40;
    light_microscope_container.getChildByName("lens_rotate100").alpha = lens_rotate100;/**showing the 100X lens on the front position */
    cell_group_container_one.scaleX = binocular_scale_x;/**Scaling the binocular cells */
    cell_group_container_one.scaleY = binocular_scale_y;
    current_cellIn_monitor.scaleX = monitor_scale_x;
    current_cellIn_monitor.scaleY = monitor_scale_y;/**Scaling the monitor cells */	
}

function cellName() { /** Adding the name of the cells in an array  */
    /** small cells into an array */
    cellName_Array=new Array();/** Creating the new cell array - Cells into the monitor */
    binocular_cell_array=new Array();/** Creating the new binocular array - Cells into the binocular */
    for(var i=0;i<10;i++){
        var _cells_count="cell_"+i;/**Generating the call name for cells inside the monitor  */
        var _monitor_cell_name="monitor_cell_"+i;
        _cells_count=light_microscope_container.getChildByName(_monitor_cell_name);/**Adding the cell name to the corresponding container */
        cellName_Array[i]=_cells_count; /**pushing the cell name to the array */
        /** Large cells into an array  */
        var _binocular_cell_count="binocular_cell_"+i;/**Generating the call name for cells inside the binocular  */
        var _binocular_cell_name="monitorCell_group_"+(i+1);
        _binocular_cell_count=cell_group_container_one.getChildByName(_binocular_cell_name);/**Adding the cell name to the corresponding container */
        binocular_cell_array[i]=_binocular_cell_count;
    }
}

/**change the cell sample inside the monitor and binocular */
function changeSampleFn(scope) {
    cellName();
    var _sample_val = scope.sample_Mdl; /**getting the value of the drop-down menu */
    for (var i = 0; i < cellName_Array.length; i++) { /**Hiding all the cells inside the monitor and binocular */
        cellName_Array[i].visible = false;
        binocular_cell_array[i].visible = false;
    }
    cellName_Array[_sample_val].visible = true; /**Displaying the selected cell in the monitor */
    binocular_cell_array[_sample_val].visible = true; /**Displaying the selected cell in the binocular view */
    blurCells(initial_blur_value,0,0,cellName_Array[_sample_val], 286, 213); /**applying the blur effect to the cells inside the monitor */
    blurCells(initial_blur_value,0,0,binocular_cell_array[_sample_val],1172, 914);
    current_cellIn_monitor = cellName_Array[_sample_val]; /** setting the current cell in the monitor for adding the blur effects into it.  */
    current_cellIn_binocular = binocular_cell_array[_sample_val]; /** setting the current cell in the binocular for adding the blur effects into it.  */
    /** initializing   the position of the cells inside the monitor. */
    current_cellIn_monitor.scaleY = 1;
    current_cellIn_monitor.scaleX = 1;
    current_cellIn_monitor_X = 380;
    current_cellIn_monitor_Y = 406;
    left_right_click_count = 0;
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
    _text.name = name;
    _text.text = value;
    _text.color = color;
    container.addChild(_text); /** Adding text to the container */
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
    for(var i=0;i<10;i++){
        if(name == "monitor_cell_"+i){
			_bitmap.mask = cellmask;
        }
        else if(i==0){
            _bitmap.filters = [blur_filter];
            _bitmap.cache(0, 0, _bitmap.image.width, _bitmap.image.height);
		}
    }
    blur_image_width = _bitmap.image.width; /**Passing the width of the cell for blur function */
    blur_image_height = _bitmap.image.height; /**Passing the height of the cell for blur function */
}

/** All variables initializing in this function */
function initialisationOfVariables() {
    current_cellIn_monitor = light_microscope_container.getChildByName("monitor_cell_0"); /** Initializing the current cell inside the monitor  */
    current_cellIn_binocular = cell_group_container_one.getChildByName("monitorCell_group_1");/** Initializing the current cell inside the binocular  */
    current_cellIn_monitor_X = 380; /** Initializing  x position of the cell in monitor.*/
    current_cellIn_monitor_Y = 406;/** Initializing  Y position of the cell in monitor.*/
    left_right_click_count = 0; /** which is used to count the  click for slider movement.*/
    up_down_click_count = 0;/** which is used to count the click  for slider movement. */
    mechanical_stageup_value = 0;/** which is used to count the mouse click using mechanical stage up value  */
    mechanical_small_stageup_value = 0; /**counting the mouse click using mechanical stage up value  */
    initial_blur_value = 5; /** Initializing the initial blur value for the cell inside the microscope and binocular.  */
    current_binocular_cell_alpha = 0;/** Initializing the light intensity alpha value , current_binocular_cell_alpha= 0*/
    intensity_flag = true; /** Initializing the intensity_flag true for checking the color of the light is white. */
    current_cellIn_binocular;/** Initializing current cells inside the binocular. */
    system_off_flag=true;/**system Off flag is used to check whether system is on or off condition*/
    lightFlag=true;/** light flag is used to check the light is "ON" or "OFF" condition */
    alpha_count_white=alpha_count_black = 0; /** Initializing the click count. */
    light_microscope_container.x = -38;/**Setting the microscope container x position  */
    light_microscope_container.y = -70;/**Setting the microscope container y position  */
    light_microscope_container.scaleX = light_microscope_container.scaleY *= 1.1;/**Scaling the microscope container  */
	round_object=light_microscope_container.getChildByName("middle_flat_round_object");/**used for changing position of slide and slide containing object*/
	round_object_top=light_microscope_container.getChildByName("middle_flat_round_object_top");/**used for changing position of slide and slide containing object*/
	slide=light_microscope_container.getChildByName("slide");/**used for changing position of slide and slide containing object*/
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
    light_microscope_container.getChildByName("monitor_cell_0").alpha = 0;light_microscope_container.getChildByName("top_switch_on").alpha = 0;light_microscope_container.getChildByName("down_switch_on").alpha = 0;
    light_microscope_container.getChildByName("side_switch_off").alpha = 0;light_microscope_container.getChildByName("lens_rotate40").alpha = 0;light_microscope_container.getChildByName("lens_rotate100").alpha = 0;
    light_microscope_container.getChildByName("top_switch_off").alpha= 1;light_microscope_container.getChildByName("monitor_black").alpha= 1;
    for(var i=0;i<9;i++){ /** Hiding the unwanted cells inside the monitor after it's loaded */
		var _monitor_cell_name="monitor_cell_"+(i+1);
        light_microscope_container.getChildByName(_monitor_cell_name).visible = false;
        var _monitor_cell_group_name="monitorCell_group_"+(i+2);
        cell_group_container_one.getChildByName(_monitor_cell_group_name).visible = false;
    }
    cell_group_container_one.getChildByName("monitorCell_group_1").visible = true;/**Showing the first cell inside the binocular view */
    binocular_controls_container.getChildByName("switch_large_off").alpha = 0;/** Hiding switch-ON/OFF button */
    binocular_controls_container.getChildByName("light_switch_off").alpha = 0;/** Hiding light-ON/OFF button */
    binocular_controls_container.alpha = 0;/** Hiding binocular container. */
    cell_group_container_one.alpha = 0;/** Hiding binocular cell group. */
    binocular_controls_container.getChildByName("bino_view_black").scaleX = 1;/**Scaling the black mask area. */
    binocular_controls_container.getChildByName("bino_view_black").scaleY = 1;
    binocular_controls_container.getChildByName("toolbox").scaleX = 0.97;/**Scaling the tool box area. */
    binocular_controls_container.getChildByName("toolbox").scaleY = 0.97;
    current_cellIn_monitor.scaleY = 1; /** Scaling the current cells inside the monitor */
    current_cellIn_monitor.scaleX = 1;
    cell_group_container_one.scaleX = 1;/** Scaling the current cells inside the binocular. */
    cell_group_container_one.scaleY = 1;
	    
	/**Animating the slider form the top to the microscope*/
    var moveSlider = createjs.Tween.get(light_microscope_container.getChildByName("slide")).to({x: 95,y: 473},1500).call(function() {
        light_microscope_container.getChildByName("monitor_cell_0").alpha = 1;
        light_microscope_container.getChildByName("monitor_black").alpha = 0;
        light_microscope_container.getChildByName("top_switch_on").alpha = 1;
        light_microscope_container.getChildByName("top_switch_off").alpha = 0;
    });
}

/** Resetting the experiment */
function reset(scope) {
    window.location.reload();
}