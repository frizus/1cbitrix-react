<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'js' => [
		'/bitrix/js/im/tools/localstorage/dist/localstorage.bundle.js',
	],
	'rel' => [
		'main.polyfill.core',
	],
	'skip_core' => true,
];