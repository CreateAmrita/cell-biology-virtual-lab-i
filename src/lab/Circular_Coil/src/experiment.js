(function() {
	angular.module('users')
		.directive("experiment", directiveFunction)
})();

var circular_coil_stage, exp_canvas, line_flag, line, wire_numbers, insert_key_flag, reverse_key_flag, initial_adj_flag;

var current_needle_rotation, current_measure_rotation, current_base_rotation, rotate_compass_float;

var degree_of_deflection, rotate_apparatus_float, indexVal;

var wires_array = []; /** Connecting wire image id's in this array */

var number_of_turns, radius_in_mtr, current_int, apparatus_rotatn, magnetic_field;

var rhvalue_int, voltage_int, permeability, permeability_const;

var tick; /** Tick timer for stage updation */

var circular_coil_container, initial_view_container, compassbox_move_container, distance_compass;

var noOfTurnsArray = [];

var helpArray = [];

function directiveFunction() {
	return {
		restrict: "A",
		link: function(scope, element, attrs, dialogs) {
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
			exp_canvas = document.getElementById("demoCanvas");
			exp_canvas.width = element[0].width;
			exp_canvas.height = element[0].height;

			queue = new createjs.LoadQueue(true);
			queue.installPlugin(createjs.Sound);
			queue.on("complete", handleComplete, this);
			queue.loadManifest([{
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_to_move",
				src: "././images/clock_to_move.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "needle",
				src: "././images/needle.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "black_needle_knob",
				src: "././images/black_needle_knob.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "clock_glacing",
				src: "././images/clock_glacing.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "upper_round_clock",
				src: "././images/upper_round_clock.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "rheostat_top_move",
				src: "././images/rheostat_top_move.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "main_key",
				src: "././images/main_key.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "main_key_top",
				src: "././images/main_key_top.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "round_key1",
				src: "././images/round_key1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "round_key2",
				src: "././images/round_key2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "round_key3",
				src: "././images/round_key3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "round_key4",
				src: "././images/round_key4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "battery_to_voltmeter",
				src: "././images/battery_to_voltmeter.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "battery_to_keyport",
				src: "././images/battery_to_keyport.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "keyport_to_rheostat",
				src: "././images/keyport_to_rheostat.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "rheostat_to_round_keybox",
				src: "././images/rheostat_to_round_keybox.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "round_keybox_to_voltmeter",
				src: "././images/round_keybox_to_voltmeter.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "white_keybox_to_key1",
				src: "././images/white_keybox_to_key1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "white_keybox_to_key2",
				src: "././images/white_keybox_to_key2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "white_keybox_to_key3",
				src: "././images/white_keybox_to_key3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "white_keybox_to_key4",
				src: "././images/white_keybox_to_key4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "black_keybox_to_key1",
				src: "././images/black_keybox_to_key1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "black_keybox_to_key2",
				src: "././images/black_keybox_to_key2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "black_keybox_to_key3",
				src: "././images/black_keybox_to_key3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "black_keybox_to_key4",
				src: "././images/black_keybox_to_key4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "ciruit_diagram",
				src: "././images/ciruit_diagram.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_background",
				src: "././images/zoomed_background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_black_round",
				src: "././images/zoomed_black_round.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_measures",
				src: "././images/zoomed_measures.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_black_needle_base",
				src: "././images/zoomed_black_needle_base.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_needle",
				src: "././images/zoomed_needle.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_needle_top",
				src: "././images/zoomed_needle_top.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoomed_glacing",
				src: "././images/zoomed_glacing.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			circular_coil_stage = new createjs.Stage("demoCanvas");
			circular_coil_stage.enableDOMEvents(true);
			circular_coil_stage.enableMouseOver();
			createjs.Touch.enable(circular_coil_stage);

			circular_coil_container = new createjs.Container(); /** Creating the circular coil container */
			circular_coil_container.name = "circular_coil_container";
			circular_coil_stage.addChild(circular_coil_container); /** Append it in the stage */

			compassbox_move_container = new createjs.Container(); /** Creating the compass box move container */
			compassbox_move_container.name = "compassbox_move_container";
			circular_coil_stage.addChild(compassbox_move_container); /** Append it in the stage */

			initial_view_container = new createjs.Container(); /** Creating the initial view container */
			initial_view_container.name = "initial_view_container";
			circular_coil_stage.addChild(initial_view_container); /** Append it in the stage */
			initial_view_container.alpha = 0;

			circleDeclaration(); /** Circle declaration for connect the wires is created in this function */
			tick = setInterval(updateTimer, 100); /** Stage update function in a timer */
			line = new createjs.Shape(); /** Line is created for connect the wires */
			
			function handleComplete() {
				loadImages(queue.getResult("background"), "background", -60, -20, "", 0, circular_coil_container);
				loadImages(queue.getResult("clock_to_move"), "clock_to_move", 490, 200, "", 0, compassbox_move_container);
				loadImages(queue.getResult("needle"), "needle", 572, 228, "", 0, compassbox_move_container);
				loadImages(queue.getResult("black_needle_knob"), "black_needle_knob", 572, 228, "", 0, compassbox_move_container);
				loadImages(queue.getResult("clock_glacing"), "clock_glacing", 517, 200, "", 0, compassbox_move_container);
				loadImages(queue.getResult("upper_round_clock"), "upper_round_clock", 461, 130, "", 0, circular_coil_stage);
				loadImages(queue.getResult("rheostat_top_move"), "rheostat_top_move", 225, 460, "", 0, circular_coil_container);
				loadImages(queue.getResult("main_key"), "main_key", 60, 417, "", 0, circular_coil_container);
				loadImages(queue.getResult("main_key_top"), "main_key_top", 37, 435, "", 0, circular_coil_container);
				loadImages(queue.getResult("round_key1"), "round_key1", 283, 327, "", 0, circular_coil_container);
				loadImages(queue.getResult("round_key2"), "round_key2", 319, 327, "", 0, circular_coil_container);
				loadImages(queue.getResult("round_key3"), "round_key3", 324, 350, "", 0, circular_coil_container);
				loadImages(queue.getResult("round_key4"), "round_key4", 285, 350, "", 0, circular_coil_container);
				loadImages(queue.getResult("battery_to_voltmeter"), "battery_to_voltmeter", 120, 201, "", 0, circular_coil_container);
				loadImages(queue.getResult("battery_to_keyport"), "battery_to_keyport", -7, 201, "", 0, circular_coil_container);
				loadImages(queue.getResult("keyport_to_rheostat"), "keyport_to_rheostat", 89, 420, "", 0, circular_coil_container);
				loadImages(queue.getResult("rheostat_to_round_keybox"), "rheostat_to_round_keybox", 340, 346, "", 0, circular_coil_container);
				loadImages(queue.getResult("round_keybox_to_voltmeter"), "round_keybox_to_voltmeter", 246, 206, "", 0, circular_coil_container);
				loadImages(queue.getResult("white_keybox_to_key1"), "white_keybox_to_key1", 305, 292, "", 0, circular_coil_container);
				loadImages(queue.getResult("white_keybox_to_key2"), "white_keybox_to_key2", 303, 280, "", 0, circular_coil_container);
				loadImages(queue.getResult("white_keybox_to_key3"), "white_keybox_to_key3", 305, 260, "", 0, circular_coil_container);
				loadImages(queue.getResult("white_keybox_to_key4"), "white_keybox_to_key4", 307, 246, "", 0, circular_coil_container);
				loadImages(queue.getResult("black_keybox_to_key1"), "black_keybox_to_key1", 312, 295, "", 0, circular_coil_container);
				loadImages(queue.getResult("black_keybox_to_key2"), "black_keybox_to_key2", 312, 276, "", 0, circular_coil_container);
				loadImages(queue.getResult("black_keybox_to_key3"), "black_keybox_to_key3", 311, 261, "", 0, circular_coil_container);
				loadImages(queue.getResult("black_keybox_to_key4"), "black_keybox_to_key4", 308, 243, "", 0, circular_coil_container);
				loadImages(queue.getResult("ciruit_diagram"), "ciruit_diagram", 30, 0, "", 0, circular_coil_container);
				loadImages(queue.getResult("zoomed_background"), "zoomed_background", 355, 310, "", 0, initial_view_container);
				loadImages(queue.getResult("zoomed_black_round"), "zoomed_black_round", 358, 333, "", 0, initial_view_container);
				loadImages(queue.getResult("zoomed_measures"), "zoomed_measures", 356, 333, "", -50, initial_view_container);
				loadImages(queue.getResult("zoomed_black_needle_base"), "zoomed_black_needle_base", 355, 325, "", 30, initial_view_container);
				loadImages(queue.getResult("zoomed_needle"), "zoomed_needle",355,330, "", 30, initial_view_container);
				loadImages(queue.getResult("zoomed_needle_top"), "zoomed_needle_top", 335, 305, "", 0, initial_view_container);
				loadImages(queue.getResult("zoomed_glacing"), "zoomed_glacing", 365, 335, "", 0, initial_view_container);
				/** Text box loading */
				setText("voltmeterTxt", 290, 191, "0", "black", 1.3, circular_coil_container);
				setText("voltmeterSymbol", 333, 198, "A", "black", 0.8, circular_coil_container);
				initialisationOfVariables(); /** Initializing the variables */
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				translationLabels(); /** Translation of strings using gettext */
			}

			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				helpArray = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("Next"), _("Close")];
				scope.heading = _("Magnetic Field Along The Axis of A Circular Coil Carrying Current");
				scope.variables = _("Variables");//+" x 10";
				scope.no_of_turns = _("Number of turns of the coil");
				scope.initial_adjust_btn_lbl = _("Initial Adjustment");
				scope.insert_key_btn_lbl = _("Insert Key");
				scope.reverse_current_btn_lbl = _("Reverse Current");
				scope.radius_of_coils = _("Radius of the coil ");
				scope.compassbox_position = _("Compass box position ");
				scope.adjust_rheostat = _("Adjust rheostat");
				scope.rotate_compass = _("Rotate compass box");
				scope.rotate_apparatus = _("Rotate apparatus");
				scope.cm = _("cm");
				scope.show_result = _("Show Result");
				scope.reset = _("Reset");
				scope.result = _("Result");
				scope.magnetic_field = _("Magnetic field at");
				scope.show_normal = _("Show Normal");
				scope.copyright = _("copyright");
				/** The noOfTurnsArray contains the values and indexes of the dropdown */
				scope.noOfTurnsArray = [{
					turns: 10,
					indexVal: 0
				}, {
					turns: 15,
					indexVal: 1
				}, {
					turns: 20,
					indexVal: 2
				}, {
					turns: 25,
					indexVal: 3
				}, {
					turns: 35,
					indexVal: 4
				}, {
					turns: 45,
					indexVal: 5
				}];				
				scope.$apply();
			}
		}
	}
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
	circular_coil_stage.update();
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container) {
	var text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
	text.x = textX;
	text.y = textY;
	text.textBaseline = "alphabetic";
	text.name = name;
	text.text = value;
	text.color = color;
	container.addChild(text); /** Adding text to the container */
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container) {
	var _bitmap = new createjs.Bitmap(image).set({});
	if ( name == "zoomed_background" || name == "zoomed_black_round" || name == "zoomed_measures" || name == "zoomed_needle" || name == "zoomed_black_needle_base" || name == "black_needle_knob" || name == "needle" || name == "zoomed_glacing" ) {
		_bitmap.regX = _bitmap.image.width / 2;
		_bitmap.regY = _bitmap.image.height / 2;
	}
	_bitmap.x = xPos;
	_bitmap.y = yPos;
	_bitmap.scaleX = _bitmap.scaleY = 0.88;
	_bitmap.name = name;
	_bitmap.alpha = 1;
	_bitmap.rotation = rot;
	_bitmap.cursor = cursor;
	container.addChild(_bitmap); /** Adding bitmap to the container */
}

/** Assigning the names for each wire */
function getWiresName() {
	white1 = circular_coil_container.getChildByName("white_keybox_to_key1");
	white2 = circular_coil_container.getChildByName("white_keybox_to_key2");
	white3 = circular_coil_container.getChildByName("white_keybox_to_key3");
	white4 = circular_coil_container.getChildByName("white_keybox_to_key4");
	black1 = circular_coil_container.getChildByName("black_keybox_to_key1");
	black2 = circular_coil_container.getChildByName("black_keybox_to_key2");
	black3 = circular_coil_container.getChildByName("black_keybox_to_key3");
	black4 = circular_coil_container.getChildByName("black_keybox_to_key4");
	wires_array = [
		[white2, black1],
		[white3, black2],
		[white4, black3],
		[white3, black1],
		[white3, black1],
		[white4, black2],
		[white4, black1],
		[white4, black1]
	];
}

/** All variables initialising in this function */
function initialisationOfVariables() {
	wire_numbers = 0; /** Count of wires */
	distance_compass = 0;
	number_of_turns = 10;
	permeability_const = 0.000001256;
	radius_in_mtr = 0.05;
	current_int = 1;
	rhvalue_int = 5;
	voltage_int = 5;
	permeability = 0;
	apparatus_rotatn = 0;
	indexVal = 0;
	current_needle_rotation = 0;
	current_measure_rotation = 0;
	current_base_rotation = 0;
	/** Initially displayed the circular coil container and compass box move container */
	circular_coil_container.alpha = 1; 
	initial_measure_rotation = 50;
	compassbox_move_container.alpha = 1;
	initial_view_container.alpha = 0; /** Initial view container is not displayed initially */
	line_flag = false; /** Draw line flag for connect wires */
	insert_key_flag = false; /** Insert key and reverse key flag */
	reverse_key_flag = false;
	initial_adj_flag = false; /** Initial adjustment flag */
	circular_coil_container.getChildByName("voltmeterTxt").text = 0;	
	/** Following buttons and sliders are disabled first except initial adjustment button */
	hide_show_sliders = false; /** It hides the sliders rotate compass box and rotate apparatus */
	control_disable = true; /** It disables the controls drop down box, reverse current, radius of coil, adjust rheostat, check box, reset */
	initial_adj_disable = false; /** It enables the Initial adjustment button */
	insert_key_disable = true; /** It disables the insert key button */
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
	circular_coil_container.getChildByName("battery_to_voltmeter").visible = false;
	circular_coil_container.getChildByName("battery_to_keyport").visible = false;
	circular_coil_container.getChildByName("keyport_to_rheostat").visible = false;
	circular_coil_container.getChildByName("rheostat_to_round_keybox").visible = false;
	circular_coil_container.getChildByName("round_keybox_to_voltmeter").visible = false;
	circular_coil_container.getChildByName("white_keybox_to_key1").visible = false;
	circular_coil_container.getChildByName("white_keybox_to_key2").visible = false;
	circular_coil_container.getChildByName("white_keybox_to_key3").visible = false;
	circular_coil_container.getChildByName("white_keybox_to_key4").visible = false;
	circular_coil_container.getChildByName("black_keybox_to_key1").visible = false;
	circular_coil_container.getChildByName("black_keybox_to_key2").visible = false;
	circular_coil_container.getChildByName("black_keybox_to_key3").visible = false;
	circular_coil_container.getChildByName("black_keybox_to_key4").visible = false;
	circular_coil_container.getChildByName("round_key2").visible = false;
	circular_coil_container.getChildByName("round_key4").visible = false;
	circular_coil_container.getChildByName("main_key").visible = false;
	
}

/** Button event for showing the normal view */
function initialAdjustmentfn(scope, dialogs) {
	if ( !initial_adj_flag ) { /** If the initial view is displayed */
		scope.hide_show_sliders = true; /** It shows the sliders rotate compass box and rotate apparatus */
		initial_adj_flag = true;
		circular_coil_container.alpha = 0; /** Circular coil container and compass box container alpha set as 0 */
		compassbox_move_container.alpha = 0;
		initial_view_container.alpha = 1; /** Initial view container displayed */
		circular_coil_stage.getChildByName("upper_round_clock").visible = false;
		scope.initial_adjust_btn_lbl = _("Show Normal"); /** Button value changed as Show Normal */
	} else { /** If the normal view is displayed */
		initial_adj_flag = false; /** Set insert key flag as false */
		scope.hide_show_sliders = false; /** It hides the sliders rotate compass box and rotate apparatus */
		circular_coil_container.alpha = 1; /** Set alpha 1 of circular coil and compass box move containers */
		compassbox_move_container.alpha = 1;
		initial_view_container.alpha = 0; /** Initial view container not displayed */
		circular_coil_stage.getChildByName("upper_round_clock").visible = true;
		scope.initial_adjust_btn_lbl = _("Zoom Compass"); /** Button value changed as Initial Adjustment */
		if( rotate_compass_float >= 100 ){
			if ((apparatus_rotatn >= 207 && apparatus_rotatn <= 209) || (apparatus_rotatn >= 389 && apparatus_rotatn <= 391)) 		{
				/** Check whether the '0' reading of the apparatus coined to the needle, 
				then the circuit is ready for the connection*/
				scope.rotate_apparatus_disable = true;
				createCircleForConnection(scope); /** Ready for wire connection */
			}
			else{ /** if initial adjustment fails */
				dialogs.error();
			}
		} else { /** Second division of the compass reading */
			if ((apparatus_rotatn >= 28 && apparatus_rotatn <= 31) || (apparatus_rotatn >= 207 && apparatus_rotatn <= 210)) {
				/** Check whether the '0' reading of the apparatus coined to the needle, 
				then the circuit is ready for the connection */
				scope.rotate_apparatus_disable = true;
				createCircleForConnection(scope); /** Ready for wire connection */	
			} else { /** If initial adjustment fails */
				dialogs.error();
			}
		}
	}				
}

/** Radius of the coil slider function */
function radiusSliderFN(scope) {
	radius_in_mtr = scope.Radius / 100;
	scope.radius = scope.Radius;
	magneticFieldCalculation(scope); /** Finding the magnetic field in this function */
}

/** Compass box move slider */
function compassBoxSliderFN(scope) {
	distance_compass = scope.compassPosition / 100;
	scope.compass_position = scope.compassPosition;
	var _scalex = 0.995 - (scope.compassPosition / 650);
	var _scaley = 1.04 - (scope.compassPosition / 70);
	compassbox_move_container.scaleX = _scalex; /** Scaling the compass move container */
	compassbox_move_container.scaleY = _scaley;
	magneticFieldCalculation(scope); /** Finding the magnetic field in this function */
}

/** Adjust rheostat slider function */
function adjRheostatSliderFN(scope) {
	rhvalue_int = scope.adjustRheostat;
	/** Rheostat key position changes according to the slider value */
	var _x_move = 215 + (rhvalue_int * 2); /** Adjusting the x value of rheostat */
	circular_coil_container.getChildByName("rheostat_top_move").x = _x_move;
	magneticFieldCalculation(scope); /** Calculation */
}

/** Function for find the current rotation */
function currentRotation(scope) {
	current_needle_rotation = initial_view_container.getChildByName("zoomed_needle").rotation;
	current_measure_rotation = initial_view_container.getChildByName("zoomed_measures").rotation;
	current_base_rotation = initial_view_container.getChildByName("zoomed_black_needle_base").rotation;
}

var measure_rotate, initial_measure_rotation;
/** Rotate compass slider changing function */
function rotateCompassSliderFN(scope) {
	rotate_compass_float = scope.rotateCompass;
	if ( (rotate_compass_float >= 48 && rotate_compass_float <= 56) || (rotate_compass_float >= 224 && rotate_compass_float <= 232) ) {
		/** Rotate the compass in such a way that the 90 reading in the compass come horizontal to the apparatus */
		scope.rotate_apparatus_disable = false;
	} else {
		scope.rotate_apparatus_disable = true;
	}
	measure_rotate = rotate_compass_float - initial_measure_rotation;
	var zoomed_measure_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_measures")).to({
		rotation: (measure_rotate)
	}, 100); /** Rotate the measures in the zoomed view */
}

/** Rotate apparatus slider changing function */
function rotateApparatusSliderFN(scope) {
	scope.rotate_compass_disable = true; /** It disables the rotate compass slider */
	rotate_apparatus_float = scope.rotateApparatus;
	apparatus_rotatn = Math.round(rotate_apparatus_float + measure_rotate);
	/** Rotate full apparatus including background except needle rotation using tween */
	var zoomed_background_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_background")).to({
		rotation: (rotate_apparatus_float)
	}, 500);
	var zoomed_black_round_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_black_round")).to({
		rotation: (rotate_apparatus_float)
	}, 500);
	var zoomed_measures_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_measures")).to({
		rotation: (apparatus_rotatn)
	}, 500);
}

/** Circle declarations for connect the wires is created in this function */
function circleDeclaration() {
	voltmeter_circle1 = new createjs.Shape();
	voltmeter_circle2 = new createjs.Shape();
	battery_circle1 = new createjs.Shape();
	battery_circle2 = new createjs.Shape();
	key_circle1 = new createjs.Shape();
	key_circle2 = new createjs.Shape();
	rheostat_circle1 = new createjs.Shape();
	rheostat_circle2 = new createjs.Shape();
	keybox_circle1 = new createjs.Shape();
	keybox_circle2 = new createjs.Shape();
	keybox_circle3 = new createjs.Shape();
	keybox_circle4 = new createjs.Shape();
	compassbox_circle1 = new createjs.Shape();
	compassbox_circle2 = new createjs.Shape();
}

/** Create circle functions */
function createCircleForConnection(scope) {
	drawShapeArc(voltmeter_circle1, "voltmeter_circle1", 279, 215, "red", 20, circular_coil_container, scope);
	drawShapeArc(voltmeter_circle2, "voltmeter_circle2", 356, 215, "#025782", 20, circular_coil_container, scope);
	drawShapeArc(battery_circle1, "battery_circle1", 128, 213, "red", 20, circular_coil_container, scope);
	drawShapeArc(battery_circle2, "battery_circle2", 40, 213, "black", 20, circular_coil_container, scope);
	drawShapeArc(key_circle1, "key_circle1", 50, 430, "black", 20, circular_coil_container, scope);
	drawShapeArc(key_circle2, "key_circle2", 95, 430, "white", 20, circular_coil_container, scope);
	drawShapeArc(rheostat_circle1, "rheostat_circle1", 245, 580, "white", 20, circular_coil_container, scope);
	drawShapeArc(rheostat_circle2, "rheostat_circle2", 532, 480, "#869218", 20, circular_coil_container, scope);
	drawShapeArc(keybox_circle2, "keybox_circle2", 345, 350, "#869218", 20, circular_coil_container, scope);
	drawShapeArc(keybox_circle4, "keybox_circle4", 280, 350, "#025782", 20, circular_coil_container, scope);
	drawShapeArc(keybox_circle1, "keybox_circle1", 310, 335, "white", 20, circular_coil_container, scope);
	drawShapeArc(keybox_circle3, "keybox_circle3", 318, 368, "#660000", 20, circular_coil_container, scope);
	drawShapeArc(compassbox_circle1, "compassbox_circle1", 475, 305, "#660000", 20, circular_coil_container, scope);
	drawShapeArc(compassbox_circle2, "compassbox_circle2", 470, 282, "white", 20, circular_coil_container, scope);
}

/** Create circle shape here */
function drawShapeArc(shapeName, name, xPos, yPos, color, radius, container, scope) {
	container.addChild(shapeName);
	shapeName.name = name;
	shapeName.cursor = "pointer";
	shapeName.alpha = 0.01;
	initialX = xPos;
	initialY = yPos;
	shapeName.graphics.setStrokeStyle(2);
	shapeName.graphics.beginFill(color).drawCircle(0, 0, radius);
	shapeName.x = xPos;
	shapeName.y = yPos;
	shapeName.on("mousedown", function(evt) {
		this.parent.addChild(this);
		this.offset = {
			x: this.x - evt.stageX / circular_coil_stage.scaleX,
			y: this.y - evt.stageY / circular_coil_stage.scaleY
		};
	});
	shapeName.on("pressmove", function(evt) {
		this.x = (evt.stageX / circular_coil_stage.scaleX) + this.offset.x;
		this.y = (evt.stageY / circular_coil_stage.scaleY) + this.offset.y;
		shapeName.x = this.x;
		shapeName.y = this.y;
		line.graphics.clear();
		if ( line_flag == false ) {
			line.graphics.moveTo(xPos, yPos).setStrokeStyle(3).beginStroke(color).lineTo(this.x, this.y);
			container.addChild(line);
		}
		shapeName.on("pressup", function(evt) {			
			line.graphics.clear();
			shapeName.x = xPos;
			shapeName.y = yPos;		
			line.graphics.clear();
			if ( line_flag ) {
				wire_numbers++;
				checkConnectionComplete(scope); /** Check the connection complete or not */
				line_flag = false; /** Set line flag as false */
			} else {
				shapeName.alpha = 0.01;
			}
		});
		shapeName.on("mouseup", function(evt) {			
			shapeName.x = xPos;
			shapeName.y = yPos;
			line.graphics.clear();
			line.graphics.clear();
		});
		checkHitLead(name,shapeName.x, shapeName.y); /** Check hit occur in lead with wires */
		scope.$apply();
	});
}

/** Lead hit with wires */
function checkHitLead(name,xPos, yPos) {
	switch (name) { /** Hit check with one spot to other */
		case "voltmeter_circle1":
			checkHit(circular_coil_container.getChildByName("battery_circle1"), "battery_to_voltmeter", name,xPos, yPos);
			break;
		case "battery_circle1":
			checkHit(circular_coil_container.getChildByName("voltmeter_circle1"), "battery_to_voltmeter", name,xPos, yPos);
			break;
		case "battery_circle2":
			checkHit(circular_coil_container.getChildByName("key_circle1"), "battery_to_keyport", name,xPos, yPos);
			break;
		case "key_circle1":
			checkHit(circular_coil_container.getChildByName("battery_circle2"), "battery_to_keyport", name,xPos, yPos);
			break;
		case "key_circle2":
			checkHit(circular_coil_container.getChildByName("rheostat_circle1"), "keyport_to_rheostat", name, xPos, yPos);
			break;
		case "rheostat_circle1":
			checkHit(circular_coil_container.getChildByName("key_circle2"), "keyport_to_rheostat", name,xPos, yPos);
			break;
		case "rheostat_circle2":
			checkHit(circular_coil_container.getChildByName("keybox_circle2"), "rheostat_to_round_keybox", name,xPos, yPos);
			break;
		case "keybox_circle2":
			checkHit(circular_coil_container.getChildByName("rheostat_circle2"), "rheostat_to_round_keybox", name,xPos, yPos);
			break;
		case "keybox_circle4":
			checkHit(circular_coil_container.getChildByName("voltmeter_circle2"), "round_keybox_to_voltmeter", name,xPos, yPos);
			break;
		case "voltmeter_circle2":
			checkHit(circular_coil_container.getChildByName("keybox_circle4"), "round_keybox_to_voltmeter", name,xPos, yPos);
			break;
		case "keybox_circle1":
			checkHit(circular_coil_container.getChildByName("compassbox_circle2"), "white_keybox_to_key2", name,xPos, yPos);
			break;
		case "compassbox_circle2":
			checkHit(circular_coil_container.getChildByName("keybox_circle1"), "white_keybox_to_key2", name,xPos, yPos);
			break;
		case "keybox_circle3":
			checkHit(circular_coil_container.getChildByName("compassbox_circle1"), "black_keybox_to_key1", name,xPos, yPos);
			break;
		case "compassbox_circle1":
			checkHit(circular_coil_container.getChildByName("keybox_circle3"), "black_keybox_to_key1", name,xPos, yPos);
			break;
			
	}
}

/** Hit check function */
function checkHit(spot, wire, name,xPos, yPos) {
	spot.alpha = 0.8; /** Shows the destination point */
	var ptL = spot.globalToLocal(xPos, yPos);	
	if ( spot.hitTest(ptL.x, ptL.y) ) {
		line_flag = true;
		line.graphics.clear();
		circular_coil_container.removeChild(line);
		circular_coil_container.getChildByName(wire).visible = true;
		spot.alpha = 0.01;
		spot.mouseEnabled = false;
		circular_coil_container.getChildByName(name).mouseEnabled = false;
	} else {
		releaseHit(spot, name);
	}
}

/** Function for releasing the drag for hit */
function releaseHit(spot, name) {
	circular_coil_container.getChildByName(name).on("pressup", function(evt) {
		spot.alpha = 0.01; /** Invisible the shape on release hit */
	});
}

/** Check the connection complete or not */
function checkConnectionComplete(scope) {
	if ( wire_numbers == 7 ) {
		scope.insert_key_disable = false; /** It enables the insert key button */
		scope.$apply();
	}
}

/** Drop down list change function */
function noOfTurnsSelection(scope) {
	getWiresName();
	var turns_count = (scope.Turns-10)/5;
	for ( i = 0; i < wires_array.length; i++ ) { /** Wires for invisible */
		wires_array[i][0].visible = false;
		wires_array[i][1].visible = false;
	}
	wires_array[turns_count][0].visible = true;
	wires_array[turns_count][1].visible = true;
	number_of_turns = scope.Turns;
	magneticFieldCalculation(scope);
}

/** Insert key button function */
function insertKeyFunction(scope) {
	if ( !insert_key_flag ) { /** If insert key */
		circular_coil_container.getChildByName("main_key").visible = true;
		circular_coil_container.getChildByName("voltmeterTxt").text = 1;
		scope.insert_key_btn_lbl = _("Remove Key"); /** Button value changed as Remove key */
		scope.control_disable = false; /** Enabled the sliders and buttons */
		insert_key_flag = true; /** Set insert key flag as true */
		magneticFieldCalculation(scope);
	} else { /** If remove key */
		circular_coil_container.getChildByName("main_key").visible = false;
		circular_coil_container.getChildByName("voltmeterTxt").text = 0;
		scope.insert_key_btn_lbl = _("Insert Key"); /** Button value changed as Insert key */
		scope.control_disable = true; /** Disabled the sliders and buttons */
		insert_key_flag = false; /** Set insert key flag as false */
		 /** Rotation of compass needle in initial view */
		var zoomed_needle_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_needle")).to({
		rotation: (30)
	}, 500); /** Needle coined 0-0 line when key is removed */
		var zoomed_needlebase_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_black_needle_base")).to({
		rotation: (30)
	}, 500); /** Rotate the base of the needle */
	compassbox_move_container.getChildByName("black_needle_knob").rotation = 30;
		compassbox_move_container.getChildByName("needle").rotation = 30;
	}
}

/** Reverse current button function */
function reverseCurrentFunction(scope) {
	var rev_rotation;
	if ( !reverse_key_flag ) {
		circular_coil_container.getChildByName("round_key1").visible = false;
		circular_coil_container.getChildByName("round_key3").visible = false;
		circular_coil_container.getChildByName("round_key2").visible = true;
		circular_coil_container.getChildByName("round_key4").visible = true;
		rev_rotation = (initial_view_container.getChildByName("zoomed_needle").rotation - (degree_of_deflection * 2));
		reverse_key_flag = true; /** Set reverse key flag as true */
	} else {
		rev_rotation = (initial_view_container.getChildByName("zoomed_needle").rotation + (degree_of_deflection * 2));
		circular_coil_container.getChildByName("round_key1").visible = true;
		circular_coil_container.getChildByName("round_key3").visible = true;
		circular_coil_container.getChildByName("round_key2").visible = false;
		circular_coil_container.getChildByName("round_key4").visible = false;
		reverse_key_flag = false; /** Set reverse key flag as false */
	}
	/** Rotate the needle of the compass based on the reverse current calculation */
	var zoomed_needle_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_needle")).to({
		rotation: (rev_rotation)
	}, 500);
	var zoomed_needlebase_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_black_needle_base")).to({
		rotation: (rev_rotation)
	}, 500);
	compassbox_move_container.getChildByName("black_needle_knob").rotation = rev_rotation;
	compassbox_move_container.getChildByName("needle").rotation = rev_rotation;
}

/** Show result check box function */
function showresultFN(scope) {
	if ( scope.resultValue == true ) {
        if ( insert_key_flag == true ) {     
            scope.hide_show_result=true;
	/** Display the result */	
	scope.magnetic_field_value=(magnetic_field*Math.pow(10,5)).toFixed(3)+" x 10"; /** Display the result */
	}
	 } else {
	  scope.hide_show_result=false;
	}
}

/** Resetting the experiment */
function reset(scope) {
	window.location.reload();
}

/** Calculations starts here */

/** Finding the magnetic field in this function */
function magneticFieldCalculation(scope) {
	/** Mainly using these formulas B=µ0 r²n*i/(2*(r²+x²)3/2), B=B0 tanθ*/
	var tan_theta;
	var erth_centr_magfield;
	var erth_magfield = 0.000035; /** earth magnetic field, which is a constant 3.5* 10^-5 */

	var deflection_radian; /** Deflection angle in radians*/
	/** current I= V/R , where V is the volateg and  R is the resistance */
	current_int = voltage_int / rhvalue_int;

	/** Voltmeter text display */
	circular_coil_container.getChildByName("voltmeterTxt").text = current_int.toFixed(3); /** Voltmeter reading */

	/** Permeability calculation µ0 r²n*i */
	permeability = permeability_const * Math.pow(radius_in_mtr, 2) * number_of_turns * current_int;
	var distance_radius_sqr = Math.pow(radius_in_mtr, 2) + Math.pow(distance_compass, 2);

	/** (r²+x²)3/2 */
	var distance_radius_threebyTwo = Math.pow(distance_radius_sqr, (3 / 2));

	/** B= BH tanθ; where B=µ0 r²n*i/(2*(r²+x²)3/2) */
	tan_theta = permeability / (2 * erth_magfield * distance_radius_threebyTwo);

	/** deflection (radian)=Math.atan(θ) */
	deflection_radian = Math.atan(tan_theta);

	/** 1 degree=1 radian* 180/Math.PI */
	degree_of_deflection = deflection_radian * (180 / Math.PI);	
	magnetic_field = erth_magfield * tan_theta;
	var rot;
	if ( !reverse_key_flag ) {
		rot=30 +degree_of_deflection;
	} else { /** For reverse current rotation */
		rot=-(degree_of_deflection)+30;
	}
	/** Rotating, compass needle and compass base depend upon the magnetic field and deflection */
	var zoomed_needle_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_needle")).to({
		rotation: (rot)
	}, 500);
	var zoomed_needlebase_tween = createjs.Tween.get(initial_view_container.getChildByName("zoomed_black_needle_base")).to({
		rotation: (rot)
	}, 500);
	compassbox_move_container.getChildByName("black_needle_knob").rotation = rot;
	compassbox_move_container.getChildByName("needle").rotation = rot;	
	showresultFN(scope); /** Display results in the result tab */
}

/** Calculation ends here */