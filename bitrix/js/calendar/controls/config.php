<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/controls.bundle.css',
	'js' => 'dist/controls.bundle.js',
	'rel' => [
		'ui.icons.b24',
		'calendar.planner',
		'ui.entity-selector',
		'main.core',
		'main.core.events',
		'main.popup',
		'calendar.controls',
		'calendar.util',
	],
	'skip_core' => false,
	'lang' => '/bitrix/modules/calendar/classes/general/editeventform_js.php'
];