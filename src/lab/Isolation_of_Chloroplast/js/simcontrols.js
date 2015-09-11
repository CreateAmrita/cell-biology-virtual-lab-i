/** js file for define the functions.
 *Developed by Amrita CREATE (Center for Research in Advanced Technologies for Education),
 *VALUE (Virtual Amrita Laboratories Universalizing Education)
 *Amrita University, India
 *http://www.amrita.edu/create
 *author:Anitha;
 *Date of modified: 21-08-2015
 */

/** Variable declaration */
var isolation_stage, exp_canvas, stage_width, stage_height, switch_flag, reading_arrow_count, reading_value_count;
var enter_flag, hit_flag, glass_tube_flag, glass_tube_liq_flag, glass_tube_liq_dup_flag;

var gt; /** Object for Gettext.js */

var progressText = new createjs.Text("", "2em Tahoma, Geneva, sans-serif", "#000000");

/** Variable declaration ends */

/** Start controls for Heat transfer by radiation */
$(document).ready(function() {
	gt = new Gettext({
		'domain': 'messages'
	});
	$("#expName").html(_("Isolation of chloroplast")); /** Experiment name */
	exp_canvas = document.getElementById("experimentCanvas");
	exp_canvas.width = $("#canvasBox").width();
	exp_canvas.height = $("#canvasBox").width();
	stage_width = exp_canvas.width; /** Set stage width and height as canvas width and height */
	stage_height = exp_canvas.height;
	isolation_stage = new createjs.Stage(exp_canvas); /** Initialize createjs stage */
	createjs.Touch.enable(isolation_stage);
	isolation_stage.enableMouseOver(10); /** Enabled mouse over / out events */
	isolation_stage.mouseMoveOutside = true; /** Keep tracking the mouse even when it leaves the canvas */
	progressText.x = stage_width / 2.4 - progressText.getMeasuredWidth() / 2; /** Adding the Loading percentage text */
	progressText.y = stage_width / 2.4;
	isolation_stage.addChild(progressText); /** Add text to progress bar */
	queue = new createjs.LoadQueue(true); /** Initialize the queue */
	queue.on("progress", handleProgress); /** Loading progress bar */
	queue.on("complete", handleComplete, this);
	queue.loadManifest([{ /** Images into the queue */
		id: "background",
		src: simPath + "/images/background.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "glass_tube_half",
		src: simPath + "/images/glass_tube_half.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "down_arrow_click",
		src: simPath + "/images/down_arrow_click.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "down_arrow",
		src: simPath + "/images/down_arrow.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "screen_arrow",
		src: simPath + "/images/screen_arrow.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "switch_to_move",
		src: simPath + "/images/switch_to_move.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "glass_tube_icon",
		src: simPath + "/images/glass_tube_icon.svg",
		type: createjs.LoadQueue.IMAGE
	}, {
		id: "glass_tube_liquid_icon",
		src: simPath + "/images/glass_tube_liquid_icon.svg",
		type: createjs.LoadQueue.IMAGE
	}]);
	tick = setInterval(updateTimer, 100); /** Stage update function in a timer */
});

/** Initialize gettext function. Translate the string can be done by adding _ before the text */
var _ = function(msgid) {
	return gt.gettext(msgid);
};

/** Createjs stage updation happens in every interval */
function updateTimer() {
	isolation_stage.update();
}

/** Function for display the progress of loading */
function handleProgress(event) {
	progressText.text = (queue.progress * 100 | 0) + " % Loaded";
}

/** All variables initialising in this function */
function initialisationOfVariables() {    
    reading_arrow_count=0;
    reading_value_count=0;
    switch_flag=false;
    enter_flag=false;
    hit_flag=false;
    glass_tube_flag=false;
    glass_tube_liq_flag=false;
    glass_tube_liq_dup_flag=false;
    $("#enter").attr('disabled',true);
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initializeImages() {
    isolation_stage.getChildByName("glass_tube_half").alpha=0;
    isolation_stage.getChildByName("screen_arrow").visible=false;
    isolation_stage.getChildByName("reading1").visible=false;
    isolation_stage.getChildByName("reading2").visible=false;
    isolation_stage.getChildByName("reading3").visible=false;
	isolation_stage.getChildByName("switch_to_move").x=stage_width/1.42;	
    isolation_stage.getChildByName("switch_to_move").y=stage_height/3;
    isolation_stage.getChildByName("screen_arrow").x=stage_width/6;
    isolation_stage.getChildByName("screen_arrow").y=stage_height/2.4;
    isolation_stage.getChildByName("reading1").x=stage_width/5;
    isolation_stage.getChildByName("reading1").y=stage_height/2.29;
    isolation_stage.getChildByName("glass_tube_icon").x=stage_width/1.40;
    isolation_stage.getChildByName("glass_tube_icon").y=stage_height/1.16;
    isolation_stage.getChildByName("glass_tube_liquid_icon").x=stage_width/1.28;
    isolation_stage.getChildByName("glass_tube_liquid_icon").y=stage_height/1.16;
    isolation_stage.getChildByName("glass_tube_liquid_icon_dup").x=stage_width/1.18;
    isolation_stage.getChildByName("glass_tube_liquid_icon_dup").y=stage_height/1.16;
    isolation_stage.getChildByName("glass_tube_icon").alpha=100;
    isolation_stage.getChildByName("glass_tube_liquid_icon").alpha=100;
    isolation_stage.getChildByName("glass_tube_liquid_icon_dup").alpha=100;
    isolation_stage.getChildByName("reading1").text="405 nm";
    isolation_stage.getChildByName("reading2").text="490 nm";
    isolation_stage.getChildByName("reading3").text="550 nm";
}

/** Loading the images and initialize the html control events */
function handleComplete(event) {
	loadImagesTexts(); /** Images loading in the canvas from load_images_texts.js */
	initialisationOfVariables(); /** Initialize each variable with the initial value */
    initializeImages(); /** Function call for images used in the apparatus visibility */
    handleCanvasBtns(); /** All buttons in the canvas are handle by this function */
	controlsHandle(); /** All controls are handle by this function */	
    hit_rect = new createjs.Shape(); /** Add rectangle shape for the hit area making */
    hit_rect.name="hit_rect";
    hit_rect.graphics.beginFill("#660000").drawRect(0, 0, 150, 150);
    hit_rect.x = stage_width/1.5;
    hit_rect.y = stage_height/3.3;    
    isolation_stage.addChild(hit_rect);
    isolation_stage.getChildByName("hit_rect").alpha=0; /** Set that rectangle alpha as 0 */
}

/** Working of all canvas buttons are here */
function handleCanvasBtns() {
    $("#absorbance").bind("click",function(){ /** Absorbance button click event */
        if ( !enter_flag ) { /** If enter flag is false ie, enter button is not clicked */
            isolation_stage.getChildByName("screen_arrow").visible=true; /** All readings and arrow are displayed */
            isolation_stage.getChildByName("reading1").visible=true;
            isolation_stage.getChildByName("reading2").visible=true;
            isolation_stage.getChildByName("reading3").visible=true;
        }
    });
    isolation_stage.getChildByName("up_arrow").on("mousedown", function() { /** Reading value increasing arrow mouse down event */
        isolation_stage.getChildByName("up_arrow").visible=false; /** The image button invisible */
        if ( reading_arrow_count <= 1 ) { /** The screen arrow y position is changed with the reading arrow count */           
            reading_arrow_count++; 
            isolation_stage.getChildByName("screen_arrow").y=stage_height/(2.4-(reading_arrow_count/4.8));                   
        }
        if ( reading_value_count <= 3 ) { /** If reading value count <=2 */
            reading_value_count++;
            if ( (reading_value_count == 3) & (enter_flag==false) ) { /** If reading count turns 3 and enter flag false */
                isolation_stage.getChildByName("reading1").text="550 nm";
                isolation_stage.getChildByName("reading2").text="595 nm";
                isolation_stage.getChildByName("reading3").text="650 nm";
                $("#enter").attr('disabled',false); /** Enable the enter button */
            } 
        }
    });
    isolation_stage.getChildByName("up_arrow").on("pressup", function() { /** Reading value increasing arrow press up event */
        isolation_stage.getChildByName("up_arrow").visible=true; /** The image button visible */
    });
    isolation_stage.getChildByName("down_arrow").on("mousedown", function() { /** Reading value decreasing arrow mouse down event */
        isolation_stage.getChildByName("down_arrow").visible=false; /** The image button invisible */
        if ( reading_arrow_count > 0 ) { /** The screen arrow y position is changed with the reading arrow count */           
            reading_arrow_count--;
            isolation_stage.getChildByName("screen_arrow").y=stage_height/(2.4-(reading_arrow_count/4.8)); 
            $("#enter").attr('disabled',true);           
        }
        if ( reading_value_count > 0 ) { /** If reading value count greater than 0 */
            reading_value_count--;
            if ( (reading_value_count == 0) & (enter_flag==false) ) { /** If reading count is 0 and enter flag false */
                isolation_stage.getChildByName("reading1").text="405 nm";
                isolation_stage.getChildByName("reading2").text="495 nm";
                isolation_stage.getChildByName("reading3").text="550 nm";
            } 
        }
    });
    isolation_stage.getChildByName("down_arrow").on("pressup", function() { /** Reading value decreasing arrow press up event */
        isolation_stage.getChildByName("down_arrow").visible=true; /** The image button visible */
    });
    
    $("#enter").click(function(){ /** Enter button click event */
        enter_flag=true;
        isolation_stage.getChildByName("reading1").text="Absorbance 650 nm"; /** Screen reading */
        isolation_stage.getChildByName("reading2").text="";
        isolation_stage.getChildByName("reading3").text="";
        isolation_stage.getChildByName("reading1").x=stage_width/6;
        isolation_stage.getChildByName("screen_arrow").visible=false;
        if( enter_flag ) { /** If enter flag */
            isolation_stage.getChildByName("switch_to_move").on("click", function() { /** Moving switch click event */
                if ( switch_flag == false ) { /** If switch flag false */   
                    switch_flag=true;
                    var open_tween = createjs.Tween.get(isolation_stage.getChildByName("switch_to_move")).to({y:stage_height/4.2},500); /** Open the switch using tween */
                    isolation_stage.getChildByName("glass_tube_icon").on("pressmove", function(evt) { /** Glass tube icon drag function */
                        glass_tube_flag=true;
                        this.x = (evt.stageX/isolation_stage.scaleX)-20;
                        this.y = (evt.stageY/isolation_stage.scaleY)-20;
                        evt.x=this.x;
                        evt.y=this.y;
                        hitArea("glass_tube_icon",1.40); /** Hit area function */
                        $("#blank").attr("disabled", false);
                        $("#sample").attr("disabled", true);
                        $("#blank").click(function() { /** Blank button click */
                            if(hit_flag) {
                                isolation_stage.getChildByName("reading1").text="0.000 A";
                            } else {
                                isolation_stage.getChildByName("reading1").text="";
                            }
                        });                                              
                    });
                    isolation_stage.getChildByName("glass_tube_icon").on("pressup", function() { /** Glass tube icon press up event */
                        isolation_stage.getChildByName("reading1").text="";
                        pressUp("glass_tube_icon",1.40); /** If the glass tube icon is drag and release, this function is used */
                        glass_tube_flag=false;
                    });
                    
                    isolation_stage.getChildByName("glass_tube_liquid_icon").on("pressmove", function(evt) { /** Glass tube with liquid icon drag function */
                        glass_tube_liq_flag=true;
                        this.x = (evt.stageX/isolation_stage.scaleX)-20;
                        this.y = (evt.stageY/isolation_stage.scaleY)-20;
                        evt.x=this.x;
                        evt.y=this.y;
                        hitArea("glass_tube_liquid_icon",1.28);
                        $("#blank").attr("disabled", true);
                        $("#sample").attr("disabled", false);
                        $("#sample").click(function() {
                            isolation_stage.getChildByName("reading1").text="0.580 A";
                        });
                    });
                    isolation_stage.getChildByName("glass_tube_liquid_icon").on("pressup", function() { /** Glass tube with liquid icon press up event */
                        pressUp("glass_tube_liquid_icon",1.28); /** If the glass tube icon is drag and release, this function is used */
                        glass_tube_liq_flag=false;
                    });
                    
                    isolation_stage.getChildByName("glass_tube_liquid_icon_dup").on("pressmove", function(evt) { /** Glass tube with liquid duplicate icon drag function */
                        glass_tube_liq_dup_flag=true;
                        this.x = (evt.stageX/isolation_stage.scaleX)-20;
                        this.y = (evt.stageY/isolation_stage.scaleY)-20;
                        evt.x=this.x;
                        evt.y=this.y;
                        hitArea("glass_tube_liquid_icon_dup",1.18);
                        $("#sample").click(function() {
                            isolation_stage.getChildByName("reading1").text="0.610 A";
                        });
                    });
                    isolation_stage.getChildByName("glass_tube_liquid_icon_dup").on("pressup", function() { /** Glass tube with liquid icon duplicate press up event */
                        pressUp("glass_tube_liquid_icon_dup",1.18); /** If the glass tube icon is drag and release, this function is used */
                        glass_tube_liq_dup_flag=false;
                    });
                } else if ( !hit_flag ) { /** If hit flag is false */
                    switch_flag=false;
                    var close_tween = createjs.Tween.get(isolation_stage.getChildByName("switch_to_move")).to({y:stage_height/3},500); /** Close the switch using tween */                   
                }
            });
        }
    });
}

/** Hit function */
function hitArea(source,xpos) { 
    var destination = isolation_stage.getChildByName("hit_rect").globalToLocal(isolation_stage.getChildByName(source).x,isolation_stage.getChildByName(source).y);
    isolation_stage.getChildByName("reading1").text="";
    if ( (hit_flag==false) & (switch_flag==true) ){
        if (isolation_stage.getChildByName("hit_rect").hitTest(destination.x, destination.y)){
            hit_flag=true;            
            isolation_stage.getChildByName("glass_tube_half").alpha = 100;
            isolation_stage.getChildByName(source).alpha = 0;
        }
    } else {
        isolation_stage.getChildByName("glass_tube_half").on("click", function() {
            isolation_stage.getChildByName(source).alpha = 100;
            isolation_stage.getChildByName("glass_tube_half").alpha = 0;
            isolation_stage.getChildByName(source).x=stage_width/xpos;
            isolation_stage.getChildByName(source).y=stage_height/1.16;
            hit_flag=false;
        });
    }
}
/** If the glass tube icon is drag and release, this function is used */
function pressUp(source,xpos) {
    if( (!hit_flag) & (switch_flag) ) { /** If hit */        
        isolation_stage.getChildByName(source).x = stage_width/1.4;
        isolation_stage.getChildByName(source).y = stage_height/2.7;
    } else { /** If not hit */
        isolation_stage.getChildByName(source).x=stage_width/xpos;
        isolation_stage.getChildByName(source).y=stage_height/1.16;
    }
}

/** All controls are handle by this function */
function controlsHandle() {
	/** Translate the stings used in the experiment by adding '_' before it.
	 This is done for language translation. */
	$("#instructions").html(_("Instructions"));
    $("#instructionContents").html(_("1. Press the 'Absorbance' switch to get  the absorbance values.<br><br>2. Press the down arrow button till points to 650 nm.<br><br>3. Press the 'Enter' button. It will display absorbance value 650 nm.<br><br>4. Click on the lid of the cuvette slot.<br><br>5. Place the blank cuvette in to the cuvette slot.<br><br>6. Press the 'Blank' button.<br><br>7. Take out the blank cuvette and place the sample cuvette in to the slot.<br><br>8. Press the 'Sample' button.<br><br>9. Repeat the steps 7 & 8 to get the second sample reading."));
	$("#measurements").html(_("Measurements"));
    $("#resetBtn").val(_("Reset"));
    $("#resetBtn").click(function(){
        window.location.reload();
        //initialisationOfVariables(); /** Variables resetting here */	
       // initializeImages(); /** Function call for images used in the apparatus visibility. Resetting the images to its initial status. */
    });
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, sFactor, cursor, rotationX) {
	var bitmap = new createjs.Bitmap(image).set({});
	getBoundFn(bitmap, sFactor);
	bitmap.x = xPos;
	bitmap.y = yPos;
	bitmap.name = name;
	bitmap.alpha = 1;
	bitmap.rotation = rotationX;
	bitmap.cursor = cursor;
	isolation_stage.addChild(bitmap);
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize) {
	var text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
	text.x = textX;
	text.y = textY;
	text.textBaseline = "alphabetic";
	text.name = name;
	text.text = value;
	text.color = color;
	isolation_stage.addChild(text);
}

/** Image scaling function. Scale the bitmap depend upon the scaling factor. */
function getBoundFn(bitmap, sFactor) {
	var bounds = bitmap.getBounds();
	scaleFactor = Math.min(exp_canvas.width / bounds.width, exp_canvas.height / bounds.height);
	bitmap.scaleX = bitmap.scaleY = sFactor * scaleFactor;
}