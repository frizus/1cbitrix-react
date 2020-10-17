<?
IncludeModuleLangFile(__FILE__);
if (class_exists('frizus_reactjs')) return;
class frizus_reactjs extends CModule
{
	const MODULE_ID = 'frizus.reactjs';
	var $MODULE_ID = 'frizus.reactjs';
	public $bNotOutput;
	public $MODULE_VERSION;
	public $MODULE_VERSION_DATE;
	public $MODULE_DESCRIPTION;
	public $MODULE_NAME;
	public $MODULE_GROUP_RIGHTS = 'N';
	public $NEED_MAIN_VERSION = '18.0.0';

	public function __construct()
	{
		$arModuleVersion = array();
		include(dirname(__FILE__).'/version.php');
		if (is_array($arModuleVersion) && array_key_exists('VERSION', $arModuleVersion))
		{
			$this->MODULE_VERSION = $arModuleVersion['VERSION'];
			$this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
		}
		$this->PARTNER_NAME = 'Frizus';
		$this->PARTNER_URI = '';
		$this->MODULE_NAME = GetMessage($this->MODULE_ID.'_MODULE_NAME');
		$this->MODULE_DESCRIPTION = GetMessage($this->MODULE_ID.'_MODULE_DESC');
	}

	public function DoInstall()
	{
		global $APPLICATION;
		
		if (strlen($this->NEED_MAIN_VERSION)<=0 || version_compare(SM_VERSION, $this->NEED_MAIN_VERSION)>=0)
		{
			$this->InstallFiles();
			$this->InstallDB();
			$this->InstallEvents();
		}
		else
		{
			$APPLICATION->ThrowException(GetMessage($this->MODULE_ID.'_NEED_RIGHT_VER', array('#NEED#' => $this->NEED_MAIN_VERSION)));
			return false;
		}
	}

	public function DoUninstall()
	{
		$this->UnInstallFiles();
		$this->UnInstallDB();
		$this->UnInstallEvents();
	}

	public function InstallDB()
	{
		RegisterModule($this->MODULE_ID);

		return true;
	}

	public function UnInstallDB()
	{
		UnRegisterModule($this->MODULE_ID);

		return true;
	}

	public function InstallEvents() { return true; }

	public function UnInstallEvents() { return true; }

	public function InstallFiles() { return true; }

	public function UnInstallFiles() { return true; }
}