<!DOCTYPE HTML>
<html>
<head>
 <!-- Enable IE9 Standards mode -->
<meta http-equiv="X-UA-Compatible" content="IE=9" >
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title><?php echo $GLOBALS['sim_title']; ?></title>
<!--<link rel="stylesheet" type="text/css" media="all" href="<?php /*echo getTempCss('reset.css');*/ ?>" />-->
<!--<link rel="stylesheet" type="text/css" media="all" href="<?php/* echo getTempCss('normalize.css'); */?>" />-->
<link rel="stylesheet" type="text/css" media="all" href="<?php echo getTempCss('grid.css'); ?>" />
<link href="<?php echo getTempCss('mainstyle.css'); ?>" rel="stylesheet" type="text/css" />
<link href="<?php echo getTempCss('resp.css'); ?>" rel="stylesheet" type="text/css" />
<script src="../lib/js/jquery-latest.js"></script>
<!--[if IE]><script src="js/excanvas.js"></script><![endif]-->
<?php getIncludes(); ?>
<!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->
<script src="../lib/js/js-webshim/1.9.7/minified/extras/modernizr-custom.js"></script>
<script> 

if( !Modernizr.inputtypes.range ){  

document.write("<script type=\"text/javascript\" src=\"js/js-webshim/1.9.7/minified/polyfiller.js\"></"+"script>");
        $(document).ready(function(){
		$.webshims.setOptions("waitReady", false);
      $.webshims.polyfill('forms-ext');
			});  
    };  

// Set up the yepnope (Modernizr.load) directives... 

</script>
<link href="<?php echo getTempCss('responsive.css'); ?>" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="layout" class="main">
<header id="silumatorTemp">
  <div class="g99 logo">
  <img src="<?php echo getTempImage('logo.gif'); ?>" alt="" width="89" height="47" /></div>
  <!-- end .g99 -->
    <div class="g495 mainTitle">
    <p id="expName"><?php echo $GLOBALS['sim_title']; ?></p>
  </div>
  <!-- end .g495 -->

  <!-- end .g198 -->
<div class="g792 bannerFoot"></div>
    <!-- end .grid_8 -->
</header><!-- /header -->
<div class="body">
<a href="javascript:" id="menuLink" class="menu-link">
    <!-- Hamburger icon -->
    <span></span>
</a><script type="text/javascript">
$(function() {
 	squarify('#canvasBox');
	siteResize();
 });
 

function squarify(element) {
	if($(document).innerWidth() > $(document).innerHeight()) {
		var pgValue = $(document).innerHeight()-120;
		$("#menu").css('height',(pgValue)+'px');
		$(".controlHolder").css('height',(pgValue)+'px');
		$(".controlHolder ul").css('min-height',(pgValue-2)+'px');
		} else if($(document).innerHeight() > $(document).innerWidth()) {
			if($(document).innerWidth() < 767) {
				var pgValue = $(document).innerWidth() - 55;
				$(".controlHolderl ul").css('min-height',(pgValue)+'px');
				$(".controlHolder").css('height',(pgValue - 15)+'px');
				$("#menu").css('height',(pgValue)+'px');
		} else {
			var pgValue = $(document).innerWidth() - 55;
			$(".controlHolder ul").css('min-height',(pgValue)+'px');
			$(".controlHolder").css('height',(pgValue - 15)+'px');
			$("#menu").css('height',(pgValue)+'px');
		}
	}
	
	$(element).css('width',(pgValue)+'px');
	$(element).css('height',(pgValue)+'px');
}
	
function siteResize() {
	var pgWidth = $('#canvasBox').width() + $(".controlHolder").width() + 55;
	var siteWidth = (pgWidth); //Controls site width
	$(".main").css('width',(siteWidth)+'px');
}

$(window).resize(function(e) {
	squarify('#canvasBox');
	siteResize();
});
	
window.onload = function() {
	$('.controlHolder').wrap("<div id='menu'></div>");
	$("#menu").append('<div class="g198 menuSet"><a href="#"><img src="<?php echo getTempImage('saveIco.gif'); ?>" alt="Save" width="23" height="22" border="0" /></a><a href="#"><img src="<?php echo getTempImage('printIco.gif'); ?>" width="26" height="22" border="0" /></a><a href="#"><img src="<?php echo getTempImage('helpIco.gif'); ?>" alt="Help" width="25" height="22" border="0" /></a><a href="#"><img src="<?php echo getTempImage('zoomIco.gif'); ?>"alt="Fullscreen" width="23" height="22" border="0" /></a></div>');
	squarify('#canvasBox');
	siteResize();
}
</script>
