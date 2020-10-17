<?
if(!$USER->IsAdmin())
	return;

$moduleId = frizus_reactjs::MODULE_ID;
CModule::IncludeModule($moduleId);

IncludeModuleLangFile(__FILE__);

$arAllOptions = [
	['theme_color', GetMessage($moduleId . "_THEME_COLOR"), 'blue', ['selectbox', [
		'blue' => GetMessage($moduleId . '_THEME_COLOR_BLUE'),
		'cyan' => GetMessage($moduleId . '_THEME_COLOR_CYAN'),
		'indigo' => GetMessage($moduleId . '_THEME_COLOR_INDIGO'),
		'orange' => GetMessage($moduleId . '_THEME_COLOR_ORANGE'),
		'red' => GetMessage($moduleId . '_THEME_COLOR_RED'),
		'teal' => GetMessage($moduleId . '_THEME_COLOR_TEAL'),
		'yellow' => GetMessage($moduleId . '_THEME_COLOR_YELLOW'),
	]]],
	['phone', GetMessage($moduleId . '_PHONE'), [], ['array', [
		'href' => GetMessage($moduleId . '_ENTITY_HREF'),
		'text' => GetMessage($moduleId . '_ENTITY_TEXT'),
		'help' => GetMessage($moduleId . '_ENTITY_HELP'),
	]]],
	['email', GetMessage($moduleId . '_EMAIL'), [], ['array', [
		'href' => GetMessage($moduleId . '_ENTITY_HREF'),
		'text' => GetMessage($moduleId . '_ENTITY_TEXT'),
		'help' => GetMessage($moduleId . '_ENTITY_HELP'),
	]]],
	['logo', GetMessage($moduleId . '_LOGO'), null, ['image']],
];

$aTabs = [
	["DIV" => "edit1", "TAB" => GetMessage($moduleId . "_TAB_SET"), "ICON" => "ib_settings", "TITLE" => GetMessage($moduleId . "_TAB_TITLE_SET")],
];
$tabControl = new CAdminTabControl("tabControl", $aTabs);

if(($_SERVER["REQUEST_METHOD"]=="POST") && ((bool)$_POST['Update']>0) && check_bitrix_sessid())
{
	foreach($arAllOptions as $arOption)
	{
		$name=$arOption[0];

		if ($arOption[3][0]=='array') {
			$val = [];
			foreach(array_keys($arOption[3][1]) as $key) {
				foreach($_REQUEST[$name . '_' . $key] as $request_key => $request_value) {
					$val[$request_key][$key] = trim($request_value);
				}
			}

			foreach($val as $key => $value) {
				$isEmpty = true;
				foreach(array_keys($arOption[3][1]) as $key2) {
					if ($value[$key2] != '') {
						$isEmpty = false;
						break;
					}
				}

				if ($isEmpty) {
					unset($val[$key]);
				}
			}

			$val = serialize($val);
		} elseif ($arOption[3][0] == 'image') {
			$arFile = $_REQUEST[$name];
			if (!is_array($arFile)) {
				if (isset($_REQUEST[$name . '_del']) && $_REQUEST[$name . '_del'] == 'Y') {
					CFile::Delete($arFile);
					$val = '';
				} else {
					$val = $arFile;
				}
			} else {
				// https://dev.1c-bitrix.ru/support/forum/messages/forum6/topic102239/message659192/#message659192
				if (isset($arFile['tmp_name']) && !file_exists($arFile['tmp_name'])) {
					$tmpFilesDir = \CTempFile::GetAbsoluteRoot();
					$arFile['tmp_name'] = $tmpFilesDir . $arFile['tmp_name'];
				}

				$val = (int)COption::GetOptionString($moduleId, $name, $arOption[2]);
				if ($val > 0) {
					$arFile['old_file'] = $val;
					$arFile['del'] = true;
				}
				$arFile['MODULE_ID'] = $moduleId;
				$val = CFile::SaveFile($arFile, $moduleId);
				if (!$val) {
					$val = '';
				}
			}
		} else {
				$val=$_REQUEST[$name];
				if($arOption[3][0]=="checkbox" && $val!="Y")
					$val="N";
		}
		COption::SetOptionString($moduleId, $name, $val, $arOption[1]);
	}
	if(strlen($_POST['Update'])>0 && strlen($_REQUEST["back_url_settings"])>0)
		LocalRedirect($_REQUEST["back_url_settings"]);
	else
		LocalRedirect($APPLICATION->GetCurPage()."?mid=".urlencode($mid)."&lang=".urlencode(LANGUAGE_ID)."&back_url_settings=".urlencode($_REQUEST["back_url_settings"])."&".$tabControl->ActiveTabParam());
}


$tabControl->Begin();
?>
<form method="post" action="<?echo $APPLICATION->GetCurPage()?>?mid=<?=urlencode($mid)?>&amp;lang=<?echo LANGUAGE_ID?>">
	<?$tabControl->BeginNextTab();?>

	<?
	foreach($arAllOptions as $arOption):
		$val = COption::GetOptionString($moduleId, $arOption[0], $arOption[2]);
		$type = $arOption[3];
		if ($type[0] == 'array') {
			$val = unserialize($val);
		}
		?>
		<tr>
			<td width="40%" nowrap <?if($type[0]=="textarea") echo 'class="adm-detail-valign-top"'?>>
				<label for="<?echo htmlspecialcharsbx($arOption[0])?>"><?echo $arOption[1]?>:</label>
			<td width="60%">
				<?if($type[0]=="checkbox"):?>
					<input type="checkbox" id="<?echo htmlspecialcharsbx($arOption[0])?>" name="<?echo htmlspecialcharsbx($arOption[0])?>" value="Y"<?if($val=="Y")echo" checked";?>>
				<?elseif($type[0]=="text"):?>
					<input type="text" size="<?echo $type[1]?>" maxlength="255" value="<?echo htmlspecialcharsbx($val)?>" name="<?echo htmlspecialcharsbx($arOption[0])?>">
				<?elseif($type[0]=="textarea"):?>
					<textarea rows="<?echo $type[1]?>" cols="<?echo $type[2]?>" name="<?echo htmlspecialcharsbx($arOption[0])?>"><?echo htmlspecialcharsbx($val)?></textarea>
				<?elseif($type[0]=="selectbox"):?>
					<select name="<?echo htmlspecialcharsbx($arOption[0])?>">
						<?
						foreach ($type[1] as $key => $value)
						{
							?><option value="<?= $key ?>"<?= ($key == $val) ? " selected" : "" ?>><?= $value ?></option><?
						}
						?>
					</select>
				<?elseif($type[0]=="array"):?>
					<table>
						<thead>
							<tr>
								<?foreach($type[1] as $value):?>
									<th>
										<?=$value?>
									</th>
								<?endforeach?>
							</tr>
						</thead>
						<tbody>
							<?foreach($val as $valValue):?>
								<tr>
									<?foreach($type[1] as $key => $value):?>
										<td>
											<input type="text" name="<?=$arOption[0]?>_<?=$key?>[]" value="<?=$valValue[$key]?>" size="13">
										</td>
									<?endforeach?>
								</tr>
							<?endforeach?>
							<tr>
								<?foreach($type[1] as $key => $value):?>
									<td>
										<input type="text" name="<?=$arOption[0]?>_<?=$key?>[]" value="" size="13">
									</td>
								<?endforeach?>
							</tr>
							<tr>
								<td colspan="<?=count($type[1])?>" align="center">
									<input type="button" class="<?=$arOption[0]?>_button" value="Еще">
								</td>
							</tr>
						</tbody>
					</table>
					<?CJSCore::Init(array('jquery'));?>
					<script>
						$('.<?=$arOption[0]?>_button').click(function(e) {
							e.preventDefault();
							var elemTr = $(this).closest('tr').prev('tr');
							var elemTrClone = elemTr.clone();

							elemTrClone.find(':input').val('');
							elemTr.after(elemTrClone);
						});
					</script>
				<?elseif($type[0]=='image'):?>
					<?=\Bitrix\Main\UI\FileInput::createInstance(array(
						"name" => $arOption[0],
						"description" => false,
						"upload" => true,
						"allowUpload" => "I",
						"medialib" => true,
						"fileDialog" => true,
						"cloud" => true,
						"delete" => true,
						"maxCount" => 1
					))->show(
						$val > 0 ? $val : 0,
						$_SERVER['REQUEST_METHOD'] == 'POST'
					);
					?>
				<?endif?>
			</td>
		</tr>
	<?endforeach?>

	<?$tabControl->Buttons();?>
	<input type="submit" name="Update" value="<?=GetMessage($moduleId . "_SAVE")?>" title="<?=GetMessage($moduleId . "_OPT_SAVE_TITLE")?>" class="adm-btn-save">
	<?if(strlen($_REQUEST["back_url_settings"])>0):?>
		<input type="button" name="Cancel" value="<?=GetMessage($moduleId . "_OPT_CANCEL")?>" title="<?=GetMessage($moduleId . "_OPT_CANCEL_TITLE")?>" onclick="window.location='<?echo htmlspecialcharsbx(CUtil::addslashes($_REQUEST["back_url_settings"]))?>'">
		<input type="hidden" name="back_url_settings" value="<?=htmlspecialcharsbx($_REQUEST["back_url_settings"])?>">
	<?endif?>
	<?=bitrix_sessid_post();?>
	<?$tabControl->End();?>
</form>