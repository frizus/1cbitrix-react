<?
namespace Frizus\Reactjs;

use Bitrix\Main\Data\Cache as BitrixCache;

/**
 * Класс для упрощения работы с кешем
 * Как работать:
 * $cache = new \Frizus\Reactjs\Cache($cacheTime, $cacheId);
 * if (!$cache->get()) {
 * 	$cache->vars = ...;
 * 	$cache->set((array)<теги управлемого кеша>);
 * 	// теги управляемого кеша:
 * 	// iblock_id_<IBLOCK_ID> - кеш очищается при изменении любого элемента указанного инфоблока
 * 	// список из остальных тегов не нашел, так что
 *  // другие теги можно искать поисковиком в папке bitrix по словам:
 * 	// $CACHE_MANAGER->RegisterTag, $CACHE_MANAGER->ClearByTag,
 * 	// $GLOBALS['CACHE_MANAGER']->RegisterTag, $GLOBALS['CACHE_MANAGER']->ClearByTag,
 * 	// $GLOBALS["CACHE_MANAGER"]->RegisterTag, $GLOBALS["CACHE_MANAGER"]->ClearByTag
 * }
 * [$cache->vars использование]
 *
 * Class Cache
 * @package Frizus\Reactjs
 */
class Cache
{
	private $obj;

	private $cacheTime;

	private $cacheId;

	private $cachePath;

	public $vars;

	public function __construct($cacheTime, $cacheId)
	{
		$this->cacheTime = $cacheTime;
		$this->cacheId = SITE_ID . '|' . LANGUAGE_ID . (defined('SITE_TEMPLATE_ID') ? '|' . SITE_TEMPLATE_ID : '') . '|' . $cacheId;
		$this->cachePath = $this->getCachePath($cacheId);
		$this->obj = BitrixCache::createInstance();
	}

	public function set($tags = [])
	{
		if ($this->cacheTime <= 0) {
			return;
		}

		if(!empty($tags) && defined("BX_COMP_MANAGED_CACHE")) {
			global $CACHE_MANAGER;
			$CACHE_MANAGER->StartTagCache($this->cachePath);
			foreach($tags as $tag) {
				$CACHE_MANAGER->RegisterTag($tag);
			}
			$CACHE_MANAGER->EndTagCache();
		}

		$this->obj->startDataCache($this->cacheTime, $this->cacheId, $this->cachePath);
		$this->obj->endDataCache($this->vars);
	}

	public function get()
	{
		if ($this->cacheTime > 0 && $this->obj->initCache($this->cacheTime, $this->cacheId, $this->cachePath)) {
			$this->vars = $this->obj->getVars();
			return true;
		}
	}

	private function getCachePath($cacheId)
	{
		global $BX_STATE;

		if ($BX_STATE === 'WA') {
			$salt = BitrixCache::getSalt();
		} else {
			$salt = '/' . mb_substr(md5($BX_STATE), 0, 3);
		}

		$id = '/' . SITE_ID . $cacheId . $salt;
		return $id;
	}
}