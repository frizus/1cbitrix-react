<?php
$arUrlRewrite=array (
	array (
		'CONDITION' => '#^/stssync/calendar/#',
		'RULE' => '',
		'ID' => 'bitrix:stssync.server',
		'PATH' => '/bitrix/services/stssync/calendar/index.php',
		'SORT' => 100,
	),
	array (
		'CONDITION' => '#^\\/?\\/mobileapp/jn\\/(.*)\\/.*#',
		'RULE' => 'componentName=$1',
		'ID' => NULL,
		'PATH' => '/bitrix/services/mobileapp/jn.php',
		'SORT' => 100,
	),
	array (
		'CONDITION' => '#^/bitrix/services/ymarket/#',
		'RULE' => '',
		'ID' => '',
		'PATH' => '/bitrix/services/ymarket/index.php',
		'SORT' => 100,
	),
	array (
		'CONDITION' => '#^/rest/#',
		'RULE' => '',
		'ID' => NULL,
		'PATH' => '/bitrix/services/rest/index.php',
		'SORT' => 100,
	),
);
