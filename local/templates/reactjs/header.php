<?if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)die();?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="<?=\CUtil::GetAdditionalFileURL(SITE_TEMPLATE_PATH . '/' . COption::GetOptionString('frizus.reactjs', 'theme_color', 'blue') .  '.css', true)?>" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div id="root"></div>