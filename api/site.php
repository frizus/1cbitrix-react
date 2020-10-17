<?
define("STOP_STATISTICS", true);
define('NO_AGENT_CHECK', true);
define('DisableEventsCheck', true);
define('BX_SECURITY_SHOW_MESSAGE', true);
define("PUBLIC_AJAX_MODE", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
	CHTTP::SetStatus("405 Method Not Allowed");
	die();
}
$userIsAuthorized = $GLOBALS['USER']->IsAuthorized();
$data = [
	'phone' => unserialize(COption::GetOptionString('frizus.reactjs', 'phone')),
	'email' => unserialize(COption::GetOptionString('frizus.reactjs', 'email')),
	'topMenu' => [
		[
			'href' => '/',
			'text' => 'Главная',
		]
	],
	'userIsAuthorized' => $userIsAuthorized,
	'logo' => CFile::GetPath(COption::GetOptionString('frizus.reactjs', 'logo')),
];
if ($userIsAuthorized) {
	$data['userLogin'] = $GLOBALS['USER']->GetLogin();
	$data['userMenu'] = [
		[
			'href' => '/order-history/',
			'text' => 'Заказы',
		],
		[
			'href' => '/user/logout/',
			'text' => 'Выйти',
		],
	];
}
header('Content-Type: application/json');
echo json_encode($data);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");