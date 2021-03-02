<?
namespace Frizus\Reactjs;

class Iblock
{
	public static function getIdByCode($code)
	{
		static $ids;

		if (!isset($ids)) {
			$cache = new Cache(3600000, '/iblock/' . __FUNCTION__);
			if (!$cache->get()) {
				\CModule::IncludeModule('iblock');

				$rsIBlocks = \CIBlock::GetList();
				$arIBlockIds = [];
				$tags = [];

				while ($arIBlock = $rsIBlocks->Fetch()) {
					if (!strlen($arIBlock['CODE'])) {
						continue;
					}

					$arIBlockIds[$arIBlock['CODE']] = $arIBlock['ID'];
					$tags[] = 'iblock_id_'. $arIBlock['ID'];
				}

				$cache->vars = $arIBlockIds;

				$cache->set($tags);
			}

			$ids = &$cache->vars;
		}

		return array_key_exists($code, $ids) ? $ids[$code] : false;
	}
}