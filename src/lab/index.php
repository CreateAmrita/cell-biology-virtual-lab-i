<?php
header('Expires: Thu, 01-Jan-70 00:00:01 GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header("Modified-by: Amrita VL ",true);
/////////
include('vl_config.php');
include('templateConfig.php');
ini_set('display_errors', 0);
//get the parent url
$parentUrl= $_SERVER['HTTP_REFERER'];
//for sim development
//$parentUrl=$_SERVER['REQUEST_URI'];
//get lan pos from the url
$lanPos= stripos($parentUrl, 'lan');
//find the language variable from url string
$language=substr($parentUrl, $lanPos+4 , 5);
$languageArray=unserialize(LANG_ARRAY);
if($language)
{	
//check that language in language array defined in the config  page
	if(!array_key_exists($language,$languageArray))
	{
		$currentLang=DEFAULT_LANG;
	}
	else
	{
		$currentLang=$language;
	}
}
else
{ 	// if there is no language id set default lang as current language
	$currentLang=DEFAULT_LANG;  
}
$olabSaveArray=unserialize(OLAB_OT_SAVE);
$olabFullScrnArray=unserialize(OLAB_OT_FULLSCREEN);
$olabExitArray=unserialize(OLAB_OT_EXIT);
$olabCpyRightArray=unserialize(OLAB_OT_COPY_RIGHT);
//files loading time... in seconds...
$maxallowedtime=90;
if(AUTHENTICATION_STATUS=='OFF')
{
	$token_id=$_GET['linktoken'];
	if($token_id=="")
	{
		$token_id=$_GET['token'];
		$url="http://".AUTH_HOST."/auth_token/?token=$token_id&format=text";
	}else{
		$url="http://".AUTH_HOST."/auth_token/?linktoken=$token_id&format=text";
	}
	if($token_id)
	{
		$main_url=$url ;
		$ch = curl_init($main_url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		//getting the response from the virtual lab server
		$response = curl_exec($ch);      
		$response = trim($response); 
		curl_close($ch);
	}
	if($response=='yes')
	{
		session_start();
		$_SESSION['auth_token']='yes';
		$_SESSION['expire'] = time()+ ($maxallowedtime);
	}else
	{
		session_start();
		$now = time(); 
		//echo $now .">". $_SESSION['expire'];
		if($now > $_SESSION['expire'])
		{
			session_destroy();
		}

		if(($_SESSION['auth_token']!='yes')||($_SESSION['expire']=="")){
				echo "Invalid Token... Error 001";
				exit();
		}
		
	}
}
$cat=$_GET['cat'];
$sub=$_GET['sub'];
$temp_id=$_GET['tempId'];
//$exp_name=$_GET['exp'];
////////////////////////////////

if($sub==""){
$sub="BIO";
$cat="lab";
$exp_name=$_GET["exp_id"];
}
$temp_id='vlab_resp';
///////////////
//$sim_id='../POE/Spread_Pest_Population_invasion';
//$sim_id="../".$cat."/".$exp_name;
$sim_id=$exp_name;
/////////////////
////////////

$sim_file=$sim_id.'/html5.php';

$temp_dir='template/';

////////////
////////////////
$sim_title="";
$comp_name="Amrita Virtual Lab";
///////////
$copy_name="Copyright &copy; Amrita University 2009 - ". date("Y");


////////
///////////////

include("functions.php");
/////
getHeader();
///////////

include("$sim_file");
////////////
getFooter();
?>
