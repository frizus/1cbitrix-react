<?
@define("ERROR_404","Y");
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/header.php');
CHTTP::SetStatus("404 Not Found");

require($_SERVER['DOCUMENT_ROOT'].'/bitrix/footer.php');
?>