/** This file will call functions to load all the images and texts in the experiment */
function loadImagesTexts(){
	/** Images loading in the canvas */
	loadImages(queue.getResult("background"),"background",stage_width/-20.5,stage_height/-10,1.15,"",0);
	loadImages(queue.getResult("glass_tube_half"),"glass_tube_half",stage_width/1.4,stage_height/2.7,0.05,"",0);
	loadImages(queue.getResult("down_arrow_click"),"down_arrow_click",stage_width/1.57,stage_height/1.49,0.057,"",0);
    loadImages(queue.getResult("down_arrow"),"down_arrow",stage_width/1.57,stage_height/1.49,0.057,"pointer",0);
    loadImages(queue.getResult("down_arrow_click"),"up_arrow_click",stage_width/1.437,stage_height/1.28,0.057,"",180);
    loadImages(queue.getResult("down_arrow"),"up_arrow",stage_width/1.437,stage_height/1.28,0.057,"pointer",180);
	loadImages(queue.getResult("screen_arrow"),"screen_arrow",stage_width/6,stage_height/2.4,0.021,"",0);
	loadImages(queue.getResult("switch_to_move"),"switch_to_move",stage_width/1.42,stage_height/3,0.118,"pointer",0);
	loadImages(queue.getResult("glass_tube_icon"),"glass_tube_icon",stage_width/1.40,stage_height/1.16,0.118,"pointer",0);
	loadImages(queue.getResult("glass_tube_liquid_icon"),"glass_tube_liquid_icon",stage_width/1.28,stage_height/1.16,0.118,"pointer",0);
	loadImages(queue.getResult("glass_tube_liquid_icon"),"glass_tube_liquid_icon_dup",stage_width/1.18,stage_height/1.16,0.118,"pointer",0);
	/** Textbox loading */
	setText("reading1",stage_width/5,stage_height/2.29,"405 nm","black",stage_width/400);
	setText("reading2",stage_width/5,stage_height/2.08,"490 nm","black",stage_width/395);
	setText("reading3",stage_width/5,stage_height/1.9,"550 nm","black",stage_width/390);
}