BX.CLBlock = function(arParams)
{
	this.arData = [];
	this.arData["Subscription"] = [];
	this.createTaskPopup = null;

	this.entity_type = null;
	this.entity_id = null;
	this.event_id = null;
	this.event_id_fullset = false;
	this.type = null;
};

BX.CLBlock.prototype.DataParser = function(str)
{
	str = str.replace(/^\s+|\s+$/g, '');
	while (str.length > 0 && str.charCodeAt(0) == 65279)
		str = str.substring(1);

	if (str.length <= 0)
		return false;

	if (str.substring(0, 1) != '{' && str.substring(0, 1) != '[' && str.substring(0, 1) != '*')
		str = '"*"';

	eval("arData = " + str);

	return arData;
};

function __logFilterShow()
{
	if (BX('bx_sl_filter').style.display == 'none')
	{
		BX('bx_sl_filter').style.display = 'block';
		BX('bx_sl_filter_hidden').style.display = 'none';
	}
	else
	{
		BX('bx_sl_filter').style.display = 'none';
		BX('bx_sl_filter_hidden').style.display = 'block';
	}
}

if (!window.XMLHttpRequest)
{
	var XMLHttpRequest = function()
	{
		try { return new ActiveXObject("MSXML3.XMLHTTP") } catch(e) {}
		try { return new ActiveXObject("MSXML2.XMLHTTP.3.0") } catch(e) {}
		try { return new ActiveXObject("MSXML2.XMLHTTP") } catch(e) {}
		try { return new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {}
	}
}

var LBlock = new BX.CLBlock();

function __logOnAjaxInsertToNode(params)
{
	var
		arPos = false,
		counterNode = null,
		counterNodeWaiter = null;


	if (BX('sonet_log_more_container'))
	{
		counterNode = BX.findChild(BX('sonet_log_more_container'), { tag: 'span', className: 'feed-new-message-inf-text' }, false);
		if (counterNode)
		{
			counterNodeWaiter = BX.findChild(counterNode, { tag: 'span', 'className': 'feed-new-message-icon' }, false);
			if (counterNodeWaiter)
			{
				BX.addClass(counterNodeWaiter, 'new-message-balloon-icon-rotating');
			}
		}

		arPos = BX.pos(BX('sonet_log_more_container'));
		oLF.nodeTmp1Cap = document.body.appendChild(BX.create('div', {
			style: {
				position: 'absolute',
				width: arPos.width + 'px',
				height: arPos.height + 'px',
				top: arPos.top + 'px',
				left: arPos.left + 'px',
				zIndex: 1000
			}
		}));
	}

	if (BX('sonet_log_counter_2_container'))
	{
		counterNode = BX.findChild(BX('sonet_log_counter_2_container'), { tag: 'span', className: 'feed-new-message-inf-text' }, false);
		if (counterNode)
		{
			counterNodeWaiter = BX.findChild(counterNode, { tag: 'span', 'className': 'feed-new-message-icon' }, false);
			if (counterNodeWaiter)
			{
				BX.addClass(counterNodeWaiter, 'new-message-balloon-icon-rotating');
			}
		}

		arPos = BX.pos(BX('sonet_log_more_container'));
		oLF.nodeTmp2Cap = document.body.appendChild(BX.create('div', {
			style: {
				position: 'absolute',
				width: arPos.width + 'px',
				height: arPos.height + 'px',
				top: arPos.top + 'px',
				left: arPos.left + 'px',
				zIndex: 1000
			}
		}));
	}

	BX.unbind(BX('sonet_log_counter_2_container'), 'click', __logOnAjaxInsertToNode);
}

function __logShowPostMenu(bindElement, ind, entity_type, entity_id, event_id, fullset_event_id, user_id, log_id, bFavorites, arMenuItemsAdditional)
{
	BX.PopupMenu.destroy("post-menu-" + ind);

	var itemFavorites = null;

	if (BX.message('sonetLbUseFavorites') != 'N')
	{
		itemFavorites = { 
			text : (bFavorites ? BX.message('sonetLMenuFavoritesTitleY') : BX.message('sonetLMenuFavoritesTitleN')), 
			className : "menu-popup-no-icon", 
			onclick : function(e) { __logChangeFavorites(log_id, 'log_entry_favorites_' + log_id, (bFavorites ? 'N' : 'Y'), true); return BX.PreventDefault(e); } 
		};
	}

	var arItems = [
		(
			bindElement.getAttribute("data-log-entry-url").length > 0 ?
			{
				text : '<span id="post-menu-' + ind + '-href-text">' + BX.message("sonetLMenuHref") + '</span>',
				className : "menu-popup-no-icon feed-entry-popup-menu feed-entry-popup-menu-href",
				href : bindElement.getAttribute("data-log-entry-url")
			} : null
		),
		(
			bindElement.getAttribute("data-log-entry-url").length > 0
			? {
				text : '<span id="post-menu-' + ind + '-link-text">' + BX.message("sonetLMenuLink") + '</span>' +
					'<span id="post-menu-' + ind + '-link-icon-animate" class="post-menu-link-icon-wrap">' +
						'<span class="post-menu-link-icon" id="post-menu-' + ind + '-link-icon-done" style="display: none;">' +

						'</span>' +
					'</span>',
				className : "menu-popup-no-icon feed-entry-popup-menu feed-entry-popup-menu-link", 
				onclick : function() {

					var id = 'post-menu-' + ind + '-link',
						menuItemText = BX(id + '-text'),
						menuItemIconDone = BX(id + '-icon-done');

					if (BX.clipboard.isCopySupported())
					{
						if (menuItemText && menuItemText.getAttribute('data-block-click') == 'Y')
						{
							return;
						}

						BX.clipboard.copy(bindElement.getAttribute("data-log-entry-url"));
						if (
							menuItemText
							&& menuItemIconDone
						)
						{
							menuItemIconDone.style.display = 'inline-block';
							BX.removeClass(BX(id + '-icon-animate'), 'post-menu-link-icon-animate');

							BX.adjust(BX(id + '-text'), {
								attrs: {
									'data-block-click': 'Y'
								}
							});

							setTimeout(function() {
								BX.addClass(BX(id + '-icon-animate'), 'post-menu-link-icon-animate');
							}, 1);

							setTimeout(function() {

								BX.adjust(BX(id + '-text'), {
									attrs: {
										'data-block-click': 'N'
									}
								});
							}, 500);
						}

						return;
					}

					var
						it = BX.proxy_context,
						height = parseInt(!!it.getAttribute("bx-height") ? it.getAttribute("bx-height") : it.offsetHeight);

					if (it.getAttribute("bx-status") != "shown")
					{
						it.setAttribute("bx-status", "shown");
						if (!BX(id) && !!BX(id + '-text'))
						{
							var
								node = BX(id + '-text'),
								pos = BX.pos(node),
								pos2 = BX.pos(node.parentNode);
								pos3 = BX.pos(BX.findParent(node, {'className': 'menu-popup-item'}, true));

							pos["height"] = pos2["height"] - 1;

							BX.adjust(it, {
								attrs : {"bx-height" : it.offsetHeight},
								style : { 
									overflow : "hidden", 
									display : 'block'
								},
								children : [
									BX.create('BR'),
									BX.create('DIV', { 
										attrs : {id : id},
										children : [
											BX.create('SPAN', {attrs : {"className" : "menu-popup-item-left"}}),
											BX.create('SPAN', {attrs : {"className" : "menu-popup-item-icon"}}),
											BX.create('SPAN', {attrs : {"className" : "menu-popup-item-text"},
												children : [
													BX.create('INPUT', {
															attrs : {
																id : id + '-input',
																type : "text",
																value : bindElement.getAttribute('data-log-entry-url') } ,
															style : {
																height : pos["height"] + 'px',
																width : (pos3["width"]-21) + 'px'
															},
															events : { click : function(e){ this.select(); BX.PreventDefault(e); } }
														}
													)
												]
											})
										]
									}),
									BX.create('SPAN', {"className" : "menu-popup-item-right"})
								]
							});
						}
						(new BX.fx({
							time: 0.2,
							step: 0.05,
							type: 'linear',
							start: height,
							finish: height * 2,
							callback: BX.delegate(function(height) {this.style.height = height + 'px';}, it)
						})).start();
						BX.fx.show(BX(id), 0.2);
						BX(id + '-input').select();
					}
					else
					{
						it.setAttribute("bx-status", "hidden");
						(new BX.fx({
							time: 0.2,
							step: 0.05,
							type: 'linear',
							start: it.offsetHeight,
							finish: height,
							callback: BX.delegate(function(height) {this.style.height = height + 'px';}, it)
						})).start();
						BX.fx.hide(BX(id), 0.2);
					}
				}
			}
			: null
		),
		itemFavorites,
		(
			BX.message('sonetLCanDelete') == 'Y' ?
			{
				text : BX.message('sonetLMenuDelete'),
				className : "menu-popup-no-icon",
				onclick : function(e) {
					if (confirm(BX.message('sonetLMenuDeleteConfirm')))
					{
						__logDelete(log_id, 'log-entry-' + log_id, ind);
					}
					return BX.PreventDefault(e);
				}
			} : null
		),
		(
			bindElement.getAttribute("data-log-entry-createtask") == "Y"
				? {
					text : BX.message('sonetLMenuCreateTask'),
					className : "menu-popup-no-icon",
					onclick : function(e) {
						oLF.createTask({
							entryEntityType: bindElement.getAttribute('data-log-entry-entity-type'),
							entityType: bindElement.getAttribute('data-log-entry-entity-type'),
							entityId: bindElement.getAttribute('data-log-entry-entity-id'),
							logId: parseInt(bindElement.getAttribute('data-log-entry-log-id'))
						});
						this.popupWindow.close();
						return e.preventDefault();
					}
				}
				: null
		)
	];

	if (
		!!arMenuItemsAdditional
		&& BX.type.isArray(arMenuItemsAdditional)
	)
	{
		for (var i = 0; i < arMenuItemsAdditional.length; i++)
			if (typeof arMenuItemsAdditional[i].className == 'undefined')
				arMenuItemsAdditional[i].className = "menu-popup-no-icon";

		arItems = BX.util.array_merge(arItems, arMenuItemsAdditional);
	}

	var arParams = {
		offsetLeft: -14,
		offsetTop: 4,
		lightShadow: false,
		angle: {position: 'top', offset : 50},
		events : {
			onPopupShow : function(ob)
			{
				if (BX('log_entry_favorites_' + log_id))
				{
					var menuItems = BX.findChildren(ob.contentContainer, {'className' : 'menu-popup-item-text'}, true);
					if (menuItems != null)
					{
						for (var i = 0; i < menuItems.length; i++)
						{
							if (
								menuItems[i].innerHTML == BX.message('sonetLMenuFavoritesTitleY')
								|| menuItems[i].innerHTML == BX.message('sonetLMenuFavoritesTitleN')
							)
							{
								var favoritesMenuItem = menuItems[i];
								break;
							}
						}
					}

					if (favoritesMenuItem != undefined)
					{
						if (BX.hasClass(BX('log_entry_favorites_' + log_id), 'feed-post-important-switch-active'))
							BX(favoritesMenuItem).innerHTML = BX.message('sonetLMenuFavoritesTitleY');
						else
							BX(favoritesMenuItem).innerHTML = BX.message('sonetLMenuFavoritesTitleN');
					}
				}

				if (BX('post-menu-' + ind + '-link'))
				{
					var linkMenuItem = BX.findChild(ob.popupContainer, {className: 'feed-entry-popup-menu-link'}, true, false);
					if (linkMenuItem)
					{
						var height = parseInt(!!linkMenuItem.getAttribute("bx-height") ? linkMenuItem.getAttribute("bx-height") : 0);
						if (height > 0)
						{
							BX('post-menu-' + ind + '-link').style.display = "none";
							linkMenuItem.setAttribute("bx-status", "hidden");
							linkMenuItem.style.height = height + 'px';
						}
					}
				}
			}
		}
	};

	BX.PopupMenu.show("post-menu-" + ind, bindElement, arItems, arParams);
}

function __logGetNextPageLinkEntities(entities, correspondences)
{
	if (!!window.__logGetNextPageFormName && !!entities && !!correspondences &&
		!!window["UC"] && !!window["UC"][window.__logGetNextPageFormName] &&
		!!window["UC"][window.__logGetNextPageFormName].linkEntity)
	{
		window["UC"][window.__logGetNextPageFormName].linkEntity(entities);
		for (var ii in correspondences)
		{
			if (
				!!ii
				&& correspondences.hasOwnProperty(ii)
				&& !!correspondences[ii]
			)
			{
				window["UC"][window.__logGetNextPageFormName].entitiesCorrespondence[ii] = correspondences[ii];
			}
		}
	}
}

function __logChangeFavorites(log_id, node, newState, bFromMenu)
{
	if (
		!log_id
		|| !BX(node)
	)
	{
		return;
	}

	var menuItem = null;

	if (!!bFromMenu)
	{
		menuItem = BX.proxy_context;
		if (!BX.hasClass(BX(menuItem), 'menu-popup-item-text'))
		{
			menuItem = BX.findChild(BX(menuItem), {'className': 'menu-popup-item-text'}, true);
		}
	}

	var nodeToAdjust = (
		BX.hasClass(BX(node), 'feed-post-important-switch')
			? BX(node)
			: BX.findChild(BX(node), { 'className': 'feed-post-important-switch' })
	);

	newState = (
		BX.hasClass(BX(nodeToAdjust), "feed-post-important-switch-active")
			? 'N'
			: 'Y'
	);

	if (newState == "Y")
	{
		BX.addClass(BX(nodeToAdjust), "feed-post-important-switch-active");
		BX(nodeToAdjust).title = BX.message('sonetLMenuFavoritesTitleY');
		if (menuItem)
		{
			BX(menuItem).innerHTML = BX.message('sonetLMenuFavoritesTitleY');
		}
	}
	else
	{
		BX.removeClass(BX(nodeToAdjust), "feed-post-important-switch-active");
		BX(nodeToAdjust).title = BX.message('sonetLMenuFavoritesTitleN');
		if (menuItem)
		{
			BX(menuItem).innerHTML = BX.message('sonetLMenuFavoritesTitleN');
		}
	}

	BX.ajax.runAction('socialnetwork.api.livefeed.changeFavorites', {
		data: {
			logId: log_id,
			value: newState
		},
		analyticsLabel: {
			b24statAction: (newState == 'Y' ? 'addFavorites' : 'removeFavorites')
		}
	}).then(function(response) {
		if (
			BX.type.isNotEmptyString(response.data.newValue)
			&& BX.util.in_array(response.data.newValue, ['Y', 'N'])
		)
		{
			if (response.data.newValue == "Y")
			{
				BX.addClass(BX(nodeToAdjust), "feed-post-important-switch-active");
				BX(nodeToAdjust).title = BX.message('sonetLMenuFavoritesTitleY');
				if (menuItem)
				{
					BX(menuItem).innerHTML = BX.message('sonetLMenuFavoritesTitleY');
				}
			}
			else
			{
				BX.removeClass(BX(nodeToAdjust), "feed-post-important-switch-active");
				BX(nodeToAdjust).title = BX.message('sonetLMenuFavoritesTitleN');
				if (menuItem)
				{
					BX(menuItem).innerHTML = BX.message('sonetLMenuFavoritesTitleN');
				}
			}
		}
	}, function(response) {
	});
}

function __logDelete(log_id, node, ind)
{
	if (!log_id)
	{
		return;
	}

	if (!BX(node))
	{
		return;
	}

	BX.ajax.runAction('socialnetwork.api.livefeed.deleteEntry', {
		data: {
			logId: log_id
		},
		analyticsLabel: {
			b24statAction: 'deleteLogEntry'
		}
	}).then(function(response) {
		if (response.data.success)
		{
			if (typeof ind != 'undefined')
			{
				BX.PopupMenu.destroy("post-menu-" + ind);
			}
			__logDeleteSuccess(BX(node));
		}
		else
		{
			__logDeleteFailure(BX(node));
		}
	}, function(response) {
		__logDeleteFailure(BX(node));
	});
}

function __logDeleteSuccess(node)
{
	if (
		typeof node == 'undefined' 
		|| !node
		|| !BX(node)
	)
	{
		return;
	}

	(new BX.fx({
		time: 0.5,
		step: 0.05,
		type: 'linear',
		start: BX(node).offsetHeight,
		finish: 56,
		callback: BX.delegate(function(height) { 
			this.style.height = height + 'px';
		}, BX(node)),
		callback_start: BX.delegate(function() { 
			this.style.overflow = 'hidden';
			this.style.minHeight = 0;
		}, BX(node)),
		callback_complete: BX.delegate(function() {
			this.style.marginBottom = 0;
			BX.cleanNode(this);
			BX.addClass(this, 'feed-post-block-deleted');
			this.appendChild(BX.create('DIV', {
				props: {
					'className': 'feed-add-successfully'
				},
				children: [
					BX.create('span', {
						props: {
							'className': 'feed-add-info-text'
						},
						children: [
							BX.create('span', {
								props: {
									'className': 'feed-add-info-icon'
								}
							}),
							BX.create('span', {
								html: BX.message('sonetLMenuDeleteSuccess')
							})
						]
					})
				]
			}));
		}, BX(node))
	})).start();
}

function __logDeleteFailure(node)
{
	if (
		typeof node == 'undefined' 
		|| !node
		|| !BX(node)
	)
	{
		return;
	}

	node.insertBefore(BX.create('DIV', {
		props: {
			'className': 'feed-add-error'
		},
		style: {
			'marginLeft': '84px',
			'marginRight': '37px',
			'marginTop': '18px',
			'marginBottom': '4px'
		},
		children: [
			BX.create('span', {
				props: {
					'className': 'feed-add-info-text'
				},
				children: [
					BX.create('span', {
						props: {
							'className': 'feed-add-info-icon'
						}
					}),
					BX.create('span', {
						html: BX.message('sonetLMenuDeleteFailure')
					})
				]
			})
		]
	}), node.firstChild);
}

window.__socOnUCFormClear = function(obj) {
	LHEPostForm.reinitDataBefore(obj.editorId);
};
window.__socOnUCFormAfterShow = function(obj, text, data)
{
	data = (!!data ? data : {});

	var eId = obj.entitiesCorrespondence[obj.id.join('-')][0], id = obj.entitiesCorrespondence[obj.id.join('-')][1];
	BX.show(BX('feed_comments_block_' + eId));
	BX.onCustomEvent(window, "OnBeforeSocialnetworkCommentShowedUp", ['socialnetwork']);
	obj.form.action = obj.url.replace(/\#eId\#/, eId).replace(/\#id\#/, id);

	var
		post_data = {
			ENTITY_XML_ID : obj.id[0],
			ENTITY_TYPE : obj.entitiesId[obj.id[0]][0],
			ENTITY_ID : obj.entitiesId[obj.id[0]][1],
			parentId : obj.id[1],
			comment_post_id : obj.entitiesId[obj.id[0]][1],
			edit_id : obj.id[1],
			act : (obj.id[1] > 0 ? 'edit' : 'add'),
			logId : obj.entitiesId[obj.id[0]][2]
		};
	for (var ii in post_data)
	{
		if (!obj.form[ii])
		{
			obj.form.appendChild(BX.create('INPUT', {attrs : {name : ii, type: "hidden"}}));
		}
		obj.form[ii].value = post_data[ii];
	}
	__socOnLightEditorShow(text, data);
};
window.__socOnUCFormSubmit =  function(obj, post_data) {
	post_data["r"] = Math.floor(Math.random() * 1000);
	post_data["sessid"] = BX.bitrix_sessid();
	post_data["log_id"] = obj.entitiesCorrespondence[obj.id.join('-')][0];
	post_data["p_smile"] = BX.message('sonetLPathToSmile');
	post_data["p_ubp"] = BX.message('sonetLPathToUserBlogPost');
	post_data["p_gbp"] = BX.message('sonetLPathToGroupBlogPost');
	post_data["p_umbp"] = BX.message('sonetLPathToUserMicroblogPost');
	post_data["p_gmbp"] = BX.message('sonetLPathToGroupMicroblogPost');
	post_data["p_user"] = BX.message('sonetLPathToUser');
	post_data["p_le"] = BX.message('sonetLEPath');
	post_data["f_id"] = BX.message('sonetLForumID');
	post_data["bapc"] = BX.message('sonetLBlogAllowPostCode');
	post_data["site"] = BX.message('SITE_ID');
	post_data["lang"] = BX.message('LANGUAGE_ID');
	post_data["nt"] = BX.message('sonetLNameTemplate');
	post_data["sl"] = BX.message('sonetLShowLogin');
	post_data["as"] = BX.message('sonetLAvatarSizeComment');
	post_data["dtf"] = BX.message('sonetLDateTimeFormat');
	post_data["message"] = post_data["REVIEW_TEXT"];
	post_data["action"] = 'add_comment';
	post_data["RATING_TYPE"] = BX.message("sonetRatingType");
	post_data["pull"] = "Y";
	post_data["crm"] = BX.message('sonetLIsCRM');
	obj.form["bx-action"] = obj.form.action;
	obj.form.action = BX.message('sonetLESetPath');
};
window.__socOnUCFormResponse = function(obj, data)
{
	obj.form.action = obj.form["bx-action"];
	var return_data = {errorMessage : data},
		eId = obj.entitiesCorrespondence[obj.id.join('-')][0],
		res = {};

	if (!(!!data && typeof data == "object"))
	{}
	else if (data[0] == '*')
	{
		return_data = {errorMessage : BX.message("sonetLErrorSessid")};
	}
	else if (data["status"] == 'error')
		return_data['errorMessage'] = data["message"];
	else
	{
		if (!(data["commentID"] > 0) || !!data["strMessage"])
		{
			return_data['errorMessage'] = data["strMessage"];
		}
		else if (data['return_data'])
		{
			return_data = data['return_data'];
		}
		else
		{
			var
				arComment = data["arCommentFormatted"],
				arComm = data["arComment"],
				ratingNode = (!!window["__logBuildRating"] ? window["__logBuildRating"](data["arComment"], data["arCommentFormatted"]) : null),
				thisId = (!!arComm["SOURCE_ID"] ? arComm["SOURCE_ID"] : arComm["ID"]);

			res = {
				"ID" : thisId, // integer
				"ENTITY_XML_ID" : obj.id[0], // string
				"FULL_ID" : [obj.id[0], thisId],
				"NEW" : "N", //"Y" | "N"
				"APPROVED" : "Y", //"Y" | "N"
				"POST_TIMESTAMP" : data["timestamp"] - BX.message('USER_TZ_OFFSET'),
				"POST_TIME" : arComment["LOG_TIME_FORMAT"],
				"POST_DATE" : arComment["LOG_TIME_FORMAT"],
				"~POST_MESSAGE_TEXT" : arComment["MESSAGE"],
				"POST_MESSAGE_TEXT" : arComment["MESSAGE_FORMAT"],
				"PANELS" : {
					"MODERATE" : false
				},
				"URL" : {
					"LINK" : (
						(typeof arComm["URL"] != 'undefined' && arComm["URL"] != null && arComm["URL"].length > 0)
							? arComm["URL"]
							: BX.message('sonetLEPath').replace("#log_id#", arComm["LOG_ID"]) + '?commentId=' + arComm["ID"] + '#com' + (parseInt(arComm["SOURCE_ID"]) > 0 ? arComm["SOURCE_ID"] : arComm["ID"])
					)
				},
				"AUTHOR" : {
					"ID" : arComment["USER_ID"],
					"NAME" : arComment["CREATED_BY"]["FORMATTED"],
					"URL" : arComment["CREATED_BY"]["URL"],
					"AVATAR" : arComment["AVATAR_SRC"] },
				"BEFORE_ACTIONS" : (!!ratingNode ? ratingNode : ''),
				"AFTER" : arComment["UF"]
			};

				if (
					typeof (data["hasEditCallback"]) != 'undefined'
					&& data["hasEditCallback"] == "Y"
				)
				{
					res["PANELS"]["EDIT"] = "Y";
					res["URL"]["EDIT"] = "__logEditComment('" + obj.id[0] + "', '" + arComm["ID"] + "', '" + arComm["LOG_ID"] + "');";
				}

				if (
					typeof (data["hasDeleteCallback"]) != 'undefined'
					&& data["hasDeleteCallback"] == "Y"
				)
				{
					res["PANELS"]["DELETE"] = "Y";
					res["URL"]["DELETE"] = BX.message('sonetLESetPath') + '?lang=' + BX.message('LANGUAGE_ID') + '&action=delete_comment&delete_comment_id=' + arComm["ID"] + '&post_id=' + arComm["LOG_ID"] + '&site=' + BX.message('SITE_ID');
				}

			return_data = {
				'errorMessage' : '',
				'okMessage' : '',
				'status' : true,
				'message' : '',
				'messageCode' : arComment["MESSAGE"],
				'messageId' : [obj.id[0], thisId],
				'~message' : '',
				'messageFields' : res
			};
		}


		var node = BX("log_entry_follow_" + eId, true),
			strFollowOld = (!!node ? (node.getAttribute("data-follow") == "Y" ? "Y" : "N") : false);
		if (strFollowOld == "N")
		{
			BX.findChild(node, { tagName: 'a' }).innerHTML = BX.message('sonetLFollowY');
			node.setAttribute("data-follow", "Y");
		}

		node = BX("feed-comments-all-cnt-" + eId, true),
			val = (!!node ? (node.innerHTML.length > 0 ? parseInt(node.innerHTML) : 0) : false);
		if (val !== false)
			node.innerHTML = (val + 1);
	}

	obj.OnUCFormResponseData = return_data;
};

window.__socOnLightEditorShow = function(content, data){
	var res = {};
	if (data["arFiles"])
	{
		var tmp2 = {}, name, size;
		for (var ij = 0; ij < data["arFiles"].length; ij++)
		{
			name = BX.findChild(BX('wdif-doc-' + data["arFiles"][ij]), {className : "feed-com-file-name"}, true);
			size = BX.findChild(BX('wdif-doc-' + data["arFiles"][ij]), {className : "feed-con-file-size"}, true);

			tmp2['F' + ij] = {
				FILE_ID : data["arFiles"][ij],
				FILE_NAME : (name ? name.innerHTML : "noname"),
				FILE_SIZE : (size ? size.innerHTML : "unknown"),
				CONTENT_TYPE : "notimage/xyz"};
		}
		res["UF_SONET_COM_DOC"] = {
			USER_TYPE_ID : "file",
			FIELD_NAME : "UF_SONET_COM_FILE[]",
			VALUE : tmp2};
	}
	if (data["arDocs"])
		res["UF_SONET_COM_FILE"] = {
			USER_TYPE_ID : "webdav_element",
			FIELD_NAME : "UF_SONET_COM_DOC[]",
			VALUE : BX.clone(data["arDocs"])};
	if (data["arDFiles"])
		res["UF_SONET_COM_FILE"] = {
			USER_TYPE_ID : "disk_file",
			FIELD_NAME : "UF_SONET_COM_DOC[]",
			VALUE : BX.clone(data["arDFiles"])};
	LHEPostForm.reinitData(SLEC.editorId, content, res);
};

BitrixLF = function ()
{
	this.bLoadStarted = null;
	this.nextURL = null;
	this.scrollInitialized = null;
	this.bStopTrackNextPage = null;
	this.arMoreButtonID = null;
	this.logAjaxMode = null;
	this.nodeTmp1Cap = null;
	this.nodeTmp2Cap = null;
	this.cmdPressed = null;
	this.nextPageFirst = null;
	this.firstPageLastTS = 0;
	this.firstPageLastId = 0;
	this.filterId = null;
	this.filterApi = null;
	this.tagEntryIdList = [];
	this.inlineTagNodeList = [];
	this.signedParameters = '';
	this.componentName = '';
};

BitrixLF.prototype.initOnce = function(params)
{
	var loaderContainer = BX('feed-loader-container');

	if (BX.type.isNotEmptyString(params.signedParameters))
	{
		this.signedParameters = params.signedParameters;
	}
	if (BX.type.isNotEmptyString(params.componentName))
	{
		this.componentName = params.componentName;
	}

	if (loaderContainer)
	{
		BX.bind(loaderContainer, 'animationend', BX.proxy(this._onAnimationEnd, this));
		BX.bind(loaderContainer, 'webkitAnimationEnd', BX.proxy(this._onAnimationEnd, this));
		BX.bind(loaderContainer, 'oanimationend', BX.proxy(this._onAnimationEnd, this));
		BX.bind(loaderContainer, 'MSAnimationEnd', BX.proxy(this._onAnimationEnd, this));
	}

	BX.addCustomEvent("BX.Livefeed.Filter:beforeApply", BX.delegate(function(filterValues, filterPromise) {
		this.showRefreshFade();
	}, this));

	BX.addCustomEvent("BX.Livefeed.Filter:apply", BX.delegate(function(filterValues, filterPromise, filterParams) {
		if (typeof filterParams != 'undefined')
		{
			filterParams.autoResolve = false;
		}
		this.refresh({
			useBXMainFilter: 'Y'
		}, filterPromise);
	}, this));

	BX.addCustomEvent("BX.Livefeed.Filter:searchInput", BX.delegate(function(searchString) {
		if (
			typeof searchString != 'undefined'
			&& BX.util.trim(searchString).length > 0
		)
		{
			this.showRefreshFade();
		}
		else
		{
			this.hideRefreshFade();
		}
	}, this));

	if (
		typeof params != 'undefined'
		&& typeof params.crmEntityTypeName != 'undefined'
		&& params.crmEntityTypeName.length > 0
		&& typeof params.crmEntityId != 'undefined'
		&& parseInt(params.crmEntityId) > 0
	)
	{
		BX.addCustomEvent("onAfterActivitySave", BX.delegate(function() {
			this.refresh();
		}, this));
	}

	if (
		typeof params != 'undefined'
		&& typeof params.filterId != 'undefined'
		&& typeof BX.Main != 'undefined'
		&& typeof BX.Main.filterManager != 'undefined'
	)
	{
		var filterManager = BX.Main.filterManager.getById(params.filterId);
		this.filterId = params.filterId;

		if(filterManager)
		{
			this.filterApi = filterManager.getApi();
		}
	}

	BX.UserContentView.init();

	BX('log_internal_container').addEventListener('click', BX.delegate(function(e) {
		var tagValue = BX.getEventTarget(e).getAttribute('bx-tag-value');
		if (BX.type.isNotEmptyString(tagValue))
		{
			if (this.clickTag(tagValue))
			{
				e.preventDefault();
			}
		}
	}, this), true);

	var
		noTasksNotificationCloseIcon = BX('feed-notification-notasks-close-btn'),
		noTasksNotificationReadButton = BX('feed-notification-notasks-read-btn');

	if (noTasksNotificationCloseIcon)
	{
		BX.bind(noTasksNotificationCloseIcon, 'click', this.setNoTasksNotificationRead.bind(this));
	}
	if (noTasksNotificationReadButton)
	{
		BX.bind(noTasksNotificationReadButton, 'click', this.setNoTasksNotificationRead.bind(this));
	}
};

BitrixLF.prototype.init = function(params)
{
	this.bLoadStarted = false;
	this.nextURL = false;
	this.scrollInitialized = false;
	this.bStopTrackNextPage = false;
	this.counter.bLockCounterAnimate = false;
	this.arMoreButtonID = [];
	this.logAjaxMode = false;
	this.nodeTmp1Cap = false;
	this.nodeTmp2Cap = false;
	this.cmdPressed = false;
	this.nextPageFirst = true;
	this.useBXMainFilter = 'N';

	if (typeof params != 'undefined')
	{
		this.firstPageLastTS = (typeof params.firstPageLastTS != 'undefined' ? params.firstPageLastTS : 0);
		this.firstPageLastId = (typeof params.firstPageLastId != 'undefined' ? params.firstPageLastId : 0);
		this.useBXMainFilter = (typeof params.useBXMainFilter != 'undefined' ? params.useBXMainFilter : 'N');
	}
};

BitrixLF.prototype.initScroll = function()
{
	if (this.scrollInitialized)
	{
		return;
	}

	this.scrollInitialized = true;
	BX.bind(window, 'scroll', BX.throttle(BX.delegate(this.onFeedScroll, this), 100));
};

BitrixLF.prototype.onFeedScroll = function()
{
	// Live Feed Paging
	var windowSize = BX.GetWindowSize();
	if (this.bStopTrackNextPage == false)
	{
		var maxScroll = (windowSize.scrollHeight - windowSize.innerHeight) - 500;
		if (windowSize.scrollTop >= maxScroll && oLF.nextURL)
		{
			this.bStopTrackNextPage = true;
			this.getNextPage();
		}
	}

	//Live Feed New Message Block
	var counterWrap = BX("sonet_log_counter_2_wrap", true);
	var counterCont = BX("sonet_log_counter_2_container");

	if (
		counterWrap
		&& counterCont
	)
	{
		var top = counterWrap.parentNode.getBoundingClientRect().top;
		var counterRect = counterCont.getBoundingClientRect();

		if (top <= 0)
		{
			if (!BX.hasClass(counterWrap, "feed-new-message-informer-fixed"))
			{
				counterCont.style.left = (counterRect.left + counterRect.width/2) + 'px';
			}

			BX.addClass(counterWrap, "feed-new-message-informer-fixed feed-new-message-informer-fix-anim");
		}
		else
		{
			BX.removeClass(counterWrap, "feed-new-message-informer-fixed feed-new-message-informer-fix-anim");
			counterCont.style.left = 'auto';
		}
	}
};

BitrixLF.prototype.onFeedKeyDown = function(e)
{
	if (e == null)
	{
		e = window.event;
	}

	if (BX.util.in_array(e.keyCode, [224, 91, 93])) // cmd
	{
		this.cmdPressed = true;
	}
};

BitrixLF.prototype.onFeedKeyUp = function(e)
{
	if (e == null)
	{
		e = window.event;
	}

	if (BX.util.in_array(e.keyCode, [224, 91, 93])) // cmd
	{
		this.cmdPressed = false;
	}
	else if (
		e.keyCode == 35 // end
		|| (
			this.cmdPressed
			&& e.keyCode == 39
		) // cmd + right arrow
	)
	{
		this.bStopTrackNextPage = true;
		this.getNextPage();
	}
};

BitrixLF.prototype.getNextPage = function()
{
	var oNode = BX('feed-new-message-inf-wrap');

	if (this.bLoadStarted)
	{
		return false;
	}

	this.bLoadStarted = true;

	this.counter.bLockCounterAnimate = true;

	this.arMoreButtonID = [];

	if (
		!this.nextPageFirst
		&& oNode
	)
	{
		oNode.style.display = 'block';
	}
	else if (this.nextPageFirst)
	{
		BX.addClass(BX('feed-new-message-inf-wrap-first'), 'feed-new-message-inf-wrap-first-visible');
	}

	var
		nextUrl = new BX.Uri(this.nextURL),
		nextUrlParam = nextUrl.getQueryParams(),
		pageNumber = 1,
		prevPageLogId = '',
		ts = 0,
		noblog = 'N',
		found = null;

	for (var key in nextUrlParam)
	{
		if (!nextUrlParam.hasOwnProperty(key))
		{
			continue;
		}

		found = key.match(/^PAGEN_(\d+)$/i);
		if (found)
		{
			pageNumber = nextUrlParam[key];
		}
		else if(key == 'pplogid')
		{
			prevPageLogId = decodeURI(nextUrlParam[key]);
		}
		else if(key == 'ts')
		{
			ts = nextUrlParam[key];
		}
		else if(key == 'noblog')
		{
			noblog = nextUrlParam[key];
		}
	}

	BX.ajax.runAction('socialnetwork.api.livefeed.getNextPage', {
		signedParameters: this.signedParameters,
		data: {
			c: this.componentName,
			logajax: 'Y', // compatibility with socialnetwork.blog.post.comment
			noblog: noblog, // compatibility with socialnetwork.blog.post.comment
			params: {
				PAGE_NUMBER: pageNumber,
				LAST_LOG_TIMESTAMP: ts,
				PREV_PAGE_LOG_ID: prevPageLogId,
				siteTemplateId: BX.message('sonetLSiteTemplateId'),
				useBXMainFilter: this.useBXMainFilter
			}
		}
	}).then(function(response) {
		var responseData = response.data;

		this.bLoadStarted = false;

		if (oNode)
		{
			BX.cleanNode(oNode, true);
		}

		this.counter.bLockCounterAnimate = false;

		var
			lastEntryTimestamp = (typeof responseData.componentResult.LAST_TS != 'undefined' ? parseInt(responseData.componentResult.LAST_TS) : 0),
			lastEntryId = (typeof responseData.componentResult.LAST_ID != 'undefined' ? parseInt(responseData.componentResult.LAST_ID) : null);

		if (
			responseData.html.length > 0
			&& lastEntryTimestamp > 0
			&& (
				parseInt(this.firstPageLastTS) <= 0
				|| lastEntryTimestamp < parseInt(this.firstPageLastTS)
				|| (
					lastEntryTimestamp == parseInt(this.firstPageLastTS)
					&& lastEntryId !== null
					&& lastEntryId < parseInt(this.firstPageLastId)
				)
			)
		)
		{
			BX.onCustomEvent(window, 'OnUCMoreButtonListClear', []);

			var contentBlockId = 'content_block_' + (Math.floor(Math.random() * 1000));

			var pageNode = BX.create('DIV', {
				props: {
					id: contentBlockId,
					className: 'feed-wrap'
				},
				style: {
					display: (this.nextPageFirst ? 'none' : 'block')
				},
				html: responseData.html
			});

			BX('log_internal_container').appendChild(pageNode);
			BX.Runtime.html(pageNode, responseData.html);

			this.clearContainerExternal(false);

			if (this.nextPageFirst)
			{
				BX('feed-new-message-inf-text-first').style.display = 'block';
				BX('feed-new-message-inf-loader-first').style.display = 'none';
				BX.addClass(BX('feed-new-message-inf-wrap-first'), 'feed-new-message-inf-wrap-first-active');

				var f = function() {
					this.bStopTrackNextPage = false;
					if (BX(contentBlockId))
					{
						BX(contentBlockId).style.display = 'block';
					}
					BX.unbind(BX('sonet_log_more_container_first'), 'click', f);
					BX('feed-new-message-inf-wrap-first').style.display = 'none';
					this.recalcMoreButton();
					this.registerViewAreaList();
					this.recalcMoreButtonCommentsList();
				}.bind(this);
				BX.bind(BX('sonet_log_more_container_first'), 'click', f);
			}
			else
			{
				if (BX(contentBlockId))
				{
					BX(contentBlockId).style.display = 'block';
				}

				setTimeout(function() {
					this.bStopTrackNextPage = false;
				}.bind(this), 300);

				setTimeout(function() {
					this.recalcMoreButton();
					this.registerViewAreaList();
					this.recalcMoreButtonCommentsList();
				}.bind(this), 1000);
			}

			this.nextPageFirst = false;
		}
		else if (BX('feed-new-message-inf-wrap-first'))
		{
			BX('feed-new-message-inf-wrap-first').style.display = 'none';
		}
	}.bind(this), function(response) {
		this.bLoadStarted = false;
		this.bStopTrackNextPage = false;

		if (oNode)
		{
			oNode.style.display = 'none';
		}

		this.counter.bLockCounterAnimate = false;
		this.clearContainerExternal(false);
	}.bind(this));

	return false;
};

BitrixLF.prototype.refresh = function(params, filterPromise)
{
	if (this.bLoadStarted)
	{
		return;
	}

	params = (
		BX.type.isNotEmptyObject(params)
			? params
			: {}
	);

	params.siteTemplateId = BX.message('sonetLSiteTemplateId');

	var counterWrap = BX("sonet_log_counter_2_wrap", true);

	this.bLoadStarted = true;
	this.showRefreshFade();

	BX.onCustomEvent(window, 'OnUCMoreButtonListClear', []);
	this.arMoreButtonID = [];

	if (
		typeof params == 'undefined'
		|| typeof params.useBXMainFilter == 'undefined'
		|| params.useBXMainFilter != 'Y'
	)
	{
		BX.onCustomEvent(window, 'BX.Livefeed:refresh', []);
	}

	if (counterWrap)
	{
		var reloadNode = BX.findChild(counterWrap, { tag: 'span', className: 'feed-new-message-inf-text-reload' }, true);
		if (reloadNode)
		{
			reloadNode.style.display = 'none';
		}
	}

	this.counter.bLockCounterAnimate = true;
	this.bLoadStarted = false;

	BX.ajax.runAction('socialnetwork.api.livefeed.refresh', {
		signedParameters: this.signedParameters,
		data: {
			c: this.componentName,
			logajax: 'Y', // compatibility
			RELOAD: 'Y', // compatibility
			params: params
		}
	}).then(function(response) {

		var responseData = response.data;

		this.bLoadStarted = false;
		this.hideRefreshFade();

		if (filterPromise)
		{
			filterPromise.fulfill();
		}

		var
			emptyBlock = null,
			emptyLivefeed = (typeof responseData.componentResult.EMPTY != 'undefined' ? responseData.componentResult.EMPTY : 'N');

		if (
			emptyLivefeed == 'Y'
			&& BX('feed-empty-wrap')
		)
		{
			emptyBlock = BX('feed-empty-wrap');
		}

		var loaderContainer = null;
		if (BX('feed-loader-container'))
		{
			loaderContainer = BX('feed-loader-container');
		}

		this.counter.bLockCounterAnimate = false;
		BX.cleanNode('log_internal_container', false);

		if (emptyBlock)
		{
			BX('log_internal_container').appendChild(BX.create('DIV', {
				props: {
					className: 'feed-wrap'
				},
				children: [ emptyBlock ]
			}));
			emptyBlock.style.display = 'block';
			var emptyTextNode = BX.findChild(emptyBlock, { className: 'feed-wrap-empty'});
			if (emptyTextNode)
			{
				emptyTextNode.innerHTML = BX.message('SONET_C30_T_EMPTY_SEARCH');
			}
		}

		if (loaderContainer)
		{
			BX('log_internal_container').appendChild(loaderContainer);
		}

		if (responseData.html.length > 0)
		{
			this.clearContainerExternal(false);
			BX.LazyLoad.clearImages();

			var contentBlockId = 'content_block_' + (Math.floor(Math.random() * 1000));

			var pageNode = BX.create('DIV', {
				props: {
					id: contentBlockId,
					className: 'feed-wrap'
				},
				style: {
					display: 'block'
				},
				html: responseData.html
			});

			BX('log_internal_container').appendChild(pageNode);
			BX.Runtime.html(pageNode, responseData.html);

			setTimeout(function() {
				this.recalcMoreButton();
				this.recalcMoreButtonCommentsList();
			}.bind(this), 1);
			this.registerViewAreaList();

			this.bStopTrackNextPage = false;

			BX.onCustomEvent(window, 'OnUCMoreButtonListClear', []);

			if (
				counterWrap
				&& BX.hasClass(counterWrap, "feed-new-message-informer-fixed")
			)
			{
				var upBtn = BX("feed-up-btn-wrap", true);
				if (upBtn)
				{
					upBtn.style.display = "none";
					BX.removeClass(upBtn, 'feed-up-btn-wrap-anim');
				}

				var windowScroll = BX.GetWindowScrollPos();

				(new BX.easing({
					duration : 500,
					start : { scroll : windowScroll.scrollTop },
					finish : { scroll : 0 },
					transition : BX.easing.makeEaseOut(BX.easing.transitions.quart),
					step : function(state){
						window.scrollTo(0, state.scroll);
					},
					complete: function() {
						if (upBtn)
							upBtn.style.display = "block";
						BX.onCustomEvent(window, 'onGoUp');
					}
				})).animate();
			}
		}
	}.bind(this), function() {

		this.bLoadStarted = false;
		if (filterPromise)
		{
			filterPromise.reject();
		}

		this.hideRefreshFade();
		this.showRefreshError();

	}.bind(this));

	return false;
};

BitrixLF.prototype.showRefreshFade = function()
{
	if (!BX.hasClass(BX('log_internal_container'), 'log-internal-mask'))
	{
		BX.addClass(BX('log_internal_container'), 'log-internal-mask');
		BX.removeClass(BX('log_internal_container'), 'log-internal-nomask');

		var loaderContainer = BX('feed-loader-container');
		if (loaderContainer)
		{
			BX.style(loaderContainer, 'display', 'block');
			BX.removeClass(loaderContainer, 'livefeed-hide-loader');

			setTimeout(function() {
				BX.addClass(loaderContainer, 'livefeed-show-loader');
			}, 0);

		}
	}
};

BitrixLF.prototype.hideRefreshFade = function()
{
	BX.removeClass(BX('log_internal_container'), 'log-internal-mask');
	BX.addClass(BX('log_internal_container'), 'log-internal-nomask');

	var loaderContainer = BX('feed-loader-container');
	if (loaderContainer)
	{
		BX.removeClass(loaderContainer, 'livefeed-show-loader');
		BX.addClass(loaderContainer, 'livefeed-hide-loader');
	}
};

BitrixLF.prototype._onAnimationEnd = function(event)
{
	if (
		'animationName' in event
		&& event.animationName
		&& event.animationName === 'hideLoader'
	)
	{
		var loaderContainer = BX('feed-loader-container');
		BX.removeClass(loaderContainer, 'livefeed-show-loader');
		BX.removeClass(loaderContainer, 'livefeed-hide-loader');
		BX.style(loaderContainer, 'display', '');
	}
};

BitrixLF.prototype.recalcMoreButton = function()
{
	var
		i = null,
		arPos = null;

	if (
		typeof this.arMoreButtonID != 'undefined'
		&& this.arMoreButtonID.length > 0
	)
	{
		var arPosOuter = false;
		var obOuter = false;
		var obInner = false;

		for (i = 0; i < this.arMoreButtonID.length; i++)
		{
			if (
				!this.arMoreButtonID.hasOwnProperty(i)
				|| !BX.type.isNotEmptyObject(this.arMoreButtonID[i])
			)
			{
				continue;
			}

			arPos = BX.pos(BX(this.arMoreButtonID[i].bodyBlockID));

			if (typeof this.arMoreButtonID[i].outerBlockID != 'undefined')
			{
				obOuter = BX(this.arMoreButtonID[i].outerBlockID);
				if (obOuter)
				{
					arPosOuter = BX.pos(obOuter);
					if (arPosOuter.width < arPos.width)
					{
						obInner = BX.findChild(obOuter, {
							tag: 'div',
							className: 'feed-post-text-block-inner'
						}, false);
						obInner.style.overflowX = 'scroll'
					}
				}
			}

			this.recalcMoreButtonPost({
					arPos: arPos,
					moreButtonBlock: BX(this.arMoreButtonID[i].moreButtonBlockID),
					informerBlock: (typeof this.arMoreButtonID[i].informerBlockID != 'undefined' ? BX(this.arMoreButtonID[i].informerBlockID) : null)

			});
			delete this.arMoreButtonID[i];
		}
	}

	if (BX('log_internal_container'))
	{
		var onLoadImageList = BX.findChildren(
			BX('log_internal_container'),
			{
				attr: {
					'data-bx-onload': 'Y'
				}
			},
			true
		);
		if (onLoadImageList != null)
		{
			for (i = 0; i < onLoadImageList.length; i++)
			{
				onLoadImageList[i].addEventListener('load', BX.proxy(function(e) {

					var
						bodyBlock = null,
						outerBlock = BX.findParent(e.currentTarget, { className: 'feed-com-text' }, BX('log_internal_container'));

					if (!outerBlock) // post
					{
						outerBlock = BX.findParent(e.currentTarget, { className: 'feed-post-block' }, BX('log_internal_container'));
						if (outerBlock)
						{
							bodyBlock = BX.findChild(outerBlock, { className: 'feed-post-text-block-inner-inner'}, true);
							if (bodyBlock)
							{
								this.recalcMoreButtonPost({
									bodyBlock: bodyBlock,
									moreButtonBlock: BX.findChild(outerBlock, { className: 'feed-post-text-more'}, true),
									informerBlock: BX.findChild(outerBlock, { className: 'feed-post-text-more'}, true)
								});
							}
						}
					}

					e.currentTarget.setAttribute('data-bx-onload', 'N');
				}, this));
			}
		}
	}
};

BitrixLF.prototype.recalcMoreButtonPost = function(params)
{
	var arPos = (typeof params.arPos != 'undefined' ? params.arPos : BX.pos(params.bodyBlock));
	var postBlock = BX.findParent(BX(params.informerBlock), { className: 'feed-post-block' }, BX('log_internal_container'));
	if (!postBlock)
	{
		return;
	}

	if (arPos.height <= 284)
	{
		BX.addClass(postBlock, 'feed-post-block-short');
		BX.addClass(postBlock, 'feed-post-block-separator');
	}
	else
	{
		BX.removeClass(postBlock, 'feed-post-block-short');
	}
};

BitrixLF.prototype.recalcMoreButtonCommentsList = function()
{
	BX.onCustomEvent(window, 'OnUCMoreButtonListRecalc', []);
};

BitrixLF.prototype.showRefreshError = function()
{
	this.counter.bLockCounterAnimate = false;
	this.clearContainerExternal(false);
};

BitrixLF.prototype.LazyLoadCheckVisibility = function(image) // to check if expanded or not
{
	var img = image.node;

	var textType = 'comment';

	var textBlock = BX.findParent(img, {'className': 'feed-com-text'});
	if (!textBlock)
	{
		textType = 'post';
		textBlock = BX.findParent(img, {'className': 'feed-post-text-block'});
	}

	if (textBlock)
	{
		var moreBlock = BX.findChild(textBlock, {'tag':'div', 'className': 'feed-post-text-more'}, false);
		if (
			moreBlock 
			&& moreBlock.style.display != 'none'
		)
		{
			return img.parentNode.parentNode.offsetTop < (textType == 'comment' ? 220 : 270);
		}
	}

	return true;
};

BitrixLF.prototype.clearContainerExternal = function(mode)
{
	var
		counterNode = null,
		counterNodeWaiter = null,
		reloadNode = null;

	if (BX('sonet_log_more_container'))
	{
		counterNode = BX.findChild(BX('sonet_log_more_container'), { tag: 'span', className: 'feed-new-message-inf-text' }, false);
		if (counterNode)
		{
			counterNode.style.display = 'inline-block';
			counterNodeWaiter = BX.findChild(counterNode, { tag: 'span', className: 'feed-new-message-icon' }, false);
			if (counterNodeWaiter)
			{
				BX.removeClass(counterNodeWaiter, 'new-message-balloon-icon-rotating');
			}
		}
	}

	if (BX('sonet_log_counter_2_wrap'))
	{
		BX.removeClass(BX("sonet_log_counter_2_wrap"), "feed-new-message-informer-anim");
		BX("sonet_log_counter_2_wrap").style.visibility = "hidden";
	}

	if (BX('sonet_log_counter_2_container'))
	{
		counterNode = BX.findChild(BX('sonet_log_counter_2_container'), { tag: 'span', className: 'feed-new-message-inf-text' }, false);
		reloadNode = BX.findChild(BX('sonet_log_counter_2_container'), { tag: 'span', className: 'feed-new-message-inf-text-reload' }, false);

		if (counterNode && reloadNode)
		{
			counterNode.style.display = 'inline-block';
			reloadNode.style.display = 'none';

			counterNodeWaiter = BX.findChild(counterNode, { tag: 'span', className: 'feed-new-message-icon' }, false);
			if (counterNodeWaiter)
			{
				BX.removeClass(counterNodeWaiter, 'new-message-balloon-icon-rotating');
			}

			if (BX("sonet_log_counter_2_plus"))
			{
				BX.addClass(BX("sonet_log_counter_2_plus"), "feed-new-message-informer-counter-plus-hidden");
			}
		}
	}

	if (this.nodeTmp1Cap && this.nodeTmp1Cap.parentNode)
	{
		this.nodeTmp1Cap.parentNode.removeChild(this.nodeTmp1Cap);
	}

	if (this.nodeTmp2Cap && this.nodeTmp2Cap.parentNode)
	{
		this.nodeTmp2Cap.parentNode.removeChild(this.nodeTmp2Cap);
	}

	if (
		BX("sonet_log_counter_preset")
		&& this.logAjaxMode == 'new'
	)
	{
		BX("sonet_log_counter_preset").style.display = "none";
	}
};

BitrixLF.prototype.clearContainerExternalNew = function()
{
	this.logAjaxMode = 'new';
};

BitrixLF.prototype.clearContainerExternalMore = function()
{
	this.logAjaxMode = 'more';
};

BitrixLF.prototype.createTask = function(params)
{
	this.createTaskPopup = new BX.PopupWindow("BXCTP", null, {
		autoHide: false,
		zIndex: 0,
		offsetLeft: 0,
		offsetTop: 0,
		overlay: false,
		lightShadow: true,
		closeIcon: {
			right : "12px",
			top : "10px"
		},
		draggable: {
			restrict:true
		},
		closeByEsc: false,
		contentColor : 'white',
		contentNoPaddings: true,
		buttons: [],
		content: BX.create('DIV', {
			attrs: {
				id: 'BXCTP_content'
			},
			props: {
				className: 'feed-create-task-popup-content'
			}
		}),
		events: {
			onAfterPopupShow: function()
			{
				this.createTaskSetContent(BX.create('DIV', {
					props: {
						className: 'feed-create-task-popup-title'
					},
					html: BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_WAIT')
				}));

				BX.ajax.runAction('socialnetwork.api.livefeed.getRawEntryData', {
					data: {
						params: {
							entityType: params.entityType,
							entityId: params.entityId,
							logId: (BX.type.isNumber(params.logId) ? params.logId : null),
							additionalParams: {
								getSonetGroupAvailable: 'Y',
								getLivefeedUrl: 'Y',
								checkPermissions: {
									feature: 'tasks',
									operation: 'create_tasks'
								}
							}
						}
					}
				}).then(function(response) {

					var
						entryTitle = BX.type.isNotEmptyString(response.data.TITLE) ? response.data.TITLE : '',
						entryDescription = BX.type.isNotEmptyString(response.data.DESCRIPTION) ? response.data.DESCRIPTION : '',
						entryDiskObjects = BX.type.isNotEmptyObject(response.data.DISK_OBJECTS) ? response.data.DISK_OBJECTS : [],
						entryUrl = BX.type.isNotEmptyString(response.data.LIVEFEED_URL) ? response.data.LIVEFEED_URL : '',
						entrySuffix = BX.type.isNotEmptyString(response.data.SUFFIX) ? response.data.SUFFIX : '',
						groupsAvailable = BX.type.isNotEmptyObject(response.data.GROUPS_AVAILABLE) ? response.data.GROUPS_AVAILABLE : [],
						logId = typeof response.data.LOG_ID != 'undefined' ? parseInt(response.data.LOG_ID) : 0;

					if (
						(
							BX.type.isNotEmptyString(entryTitle)
							|| BX.type.isNotEmptyString(entryDescription)
						)
						&& BX.type.isNotEmptyString(entryUrl)
					)
					{
						var taskDescription = this.formatTaskDescription(entryDescription, entryUrl, params.entityType, entrySuffix);
						var taskData = {
							TITLE: entryTitle,
							DESCRIPTION: taskDescription,
							RESPONSIBLE_ID: BX.message('USER_ID'),
							CREATED_BY: BX.message('USER_ID'),
							UF_TASK_WEBDAV_FILES: entryDiskObjects
						};

						var sonetGroupIdList = [];
						for (var i in groupsAvailable)
						{
							if (groupsAvailable.hasOwnProperty(i))
							{
								sonetGroupIdList.push(groupsAvailable[i]);
							}
						}

						if (sonetGroupIdList.length == 1)
						{
							taskData.GROUP_ID = parseInt(sonetGroupIdList[0]);
						}

						BX.Tasks.Util.Query.runOnce('task.add', { data: taskData }).then(function(result) {

							var resultData = result.getData();

							if (
								BX.type.isNotEmptyObject(resultData)
								&& BX.type.isNotEmptyObject(resultData.DATA)
								&& typeof resultData.DATA.ID != 'undefined'
								&& parseInt(resultData.DATA.ID) > 0
							)
							{
								this.createTaskSetContentSuccess(resultData.DATA.ID);

								BX.ajax.runAction('socialnetwork.api.livefeed.createTaskComment', {
									data: {
										params: {
											postEntityType: (BX.type.isNotEmptyString(params.postEntityType) ? params.postEntityType : params.entityType),
											entityType: params.entityType,
											entityId: params.entityId,
											taskId: resultData.DATA.ID,
											logId: (
												BX.type.isNumber(params.logId)
													? params.logId
													: logId > 0 ? logId : null
											)
										}
									}
								}).then(function(response) {
								}, function(response) {
								});
							}
							else
							{
								this.createTaskSetContentFailure(result.getErrors().getMessages());
							}
						}.bind(this));
					}
					else
					{
						this.createTaskSetContentFailure([
							BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_ERROR_GET_DATA')
						]);
					}
				}.bind(this), function(response) {
					this.createTaskSetContentFailure([
						BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_ERROR_GET_DATA')
					]);
				}.bind(this));
			}.bind(this),
			onPopupClose: function() {
				this.createTaskPopup.destroy();
			}.bind(this)
		}
	});

	this.createTaskPopup.params.zIndex = (BX.WindowManager ? BX.WindowManager.GetZIndex() : 0);
	this.createTaskPopup.show();
};

BitrixLF.prototype.createTaskSetContentSuccess = function(taskId) {
	var self = this;
	var taskLink = BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_PATH').replace('#user_id#', BX.message('USER_ID')).replace('#task_id#', taskId);

	this.createTaskPopup.destroy();

	window.top.BX.UI.Notification.Center.notify({
		content: BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_SUCCESS_TITLE'),
		actions: [{
			title: BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_VIEW'),
			events: {
				click: function(event, balloon, action) {
					balloon.close();
					window.top.BX.SidePanel.Instance.open(taskLink);
				}
			}
		}]

	});
};

BitrixLF.prototype.createTaskSetContentFailure = function(errors)
{
	oLF.createTaskSetContent(BX.create('DIV', {
		children: [
			BX.create('DIV', {
				props: {
					className: 'feed-create-task-popup-title'
				},
				html: BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_FAILURE_TITLE')
			}),
			BX.create('DIV', {
				props: {
					className: 'feed-create-task-popup-description'
				},
				html: errors.join('<br>')
			})
		]
	}));

};

BitrixLF.prototype.createTaskSetContent = function(contentNode)
{
	if (BX('BXCTP_content'))
	{
		var containerNode = BX('BXCTP_content');
		BX.cleanNode(containerNode);
		containerNode.appendChild(contentNode);
	}
};

BitrixLF.prototype.formatTaskDescription = function(taskDescription, livefeedUrl, entityType, suffix)
{
	var result = taskDescription;
	suffix = (BX.type.isNotEmptyString(suffix) ? '_' + suffix : '');

	if (
		!!livefeedUrl
		&& !!entityType
		&& livefeedUrl.length > 0
	)
	{
		result += "\n\n" + BX.message('SONET_EXT_COMMENTAUX_CREATE_TASK_' + entityType + suffix).replace(
			'#A_BEGIN#', '[URL=' + livefeedUrl + ']'
		).replace(
			'#A_END#', '[/URL]'
		);
	}

	return result;
};

BitrixLF.prototype.registerViewAreaList = function()
{
	var
		container = BX('log_internal_container'),
		fullContentArea = null;

	if (container)
	{
		var viewAreaList = BX.findChildren(container, {
			tag: 'div',
			className: 'feed-post-contentview'
		}, true);
		for (var i = 0, length = viewAreaList.length; i < length; i++)
		{
			if (viewAreaList[i].id.length > 0)
			{
				fullContentArea = BX.findChild(viewAreaList[i], {
					tag: 'div',
					className: 'feed-post-text-block-inner-inner'
				});
				BX.UserContentView.registerViewArea(viewAreaList[i].id, (fullContentArea ? fullContentArea : null));
			}
		}
	}
};

BitrixLF.prototype.clickTag = function(tagValue)
{
	var result = false;

	if (
		BX.type.isNotEmptyString(tagValue)
		&& this.filterApi
	)
	{
		this.filterApi.setFields({
			TAG: tagValue
		});
		this.filterApi.apply();

		if (
			this.filterId
			&& typeof BX.Main != 'undefined'
			&& typeof BX.Main.filterManager != 'undefined'
			&& BX.Main.filterManager.getById(this.filterId)
			&& (
				BX.Main.filterManager.getById(this.filterId).getSearch().getSquares().length > 0
				|| BX.Main.filterManager.getById(this.filterId).getSearch().getSearchString().length > 0
			)
		)
		{
			var pagetitleContainer = BX.findParent(BX(this.filterId + '_filter_container'), { className: 'pagetitle-wrap'});
			if (pagetitleContainer)
			{
				BX.addClass(pagetitleContainer, "pagetitle-wrap-filter-opened");
			}
		}

		var windowScroll = BX.GetWindowScrollPos();

		(new BX.easing({
			duration : 500,
			start : { scroll : windowScroll.scrollTop },
			finish : { scroll : 0 },
			transition : BX.easing.makeEaseOut(BX.easing.transitions.quart),
			step : function(state){
				window.scrollTo(0, state.scroll);
			},
			complete: function() {
			}
		})).animate();

		result = true;
	}

	return result;
};

BitrixLF.prototype.expandPost = function(textBlock)
{
	if (BX(textBlock))
	{
		var postBlock = BX.findParent(BX(textBlock), { className: 'feed-post-block' }, BX('log_internal_container') );
		if (postBlock)
		{
			BX.addClass(postBlock, 'feed-post-block-short');
			BX.addClass(postBlock, 'feed-post-block-separator');
		}
	}
};

BitrixLF.prototype.setNoTasksNotificationRead = function(event)
{
	var notificationNode = BX.findParent(event.currentTarget, { className: 'feed-notification-container'}, true);
	if (notificationNode)
	{
		BX.ajax.runAction('socialnetwork.api.livefeed.readNoTasksNotification', {
			data: {}
		}).then(function(response) {
			if (response.data.success)
			{
				BX.style( notificationNode, "height", notificationNode.offsetHeight + "px" );
				setTimeout(function() { notificationNode.classList.add("feed-notification-container-collapsed")}, 10);
				setTimeout(function() { notificationNode.parentNode.removeChild(notificationNode)}, 250);
			}
		}, function(response) {});
	}
};

BitrixLF.prototype.counter = {

	decrementStack: 0,
	value: 0,
	bLockCounterAnimate: null,

	decrement: function(iDecrement)
	{
		iDecrement = parseInt(iDecrement);

		this.decrementStack += iDecrement;

		var counterNode = document.getElementById('sonet_log_counter_2');

		if (BX.type.isDomNode(counterNode))
		{
			var
				counterValue = this.value - this.decrementStack;

			if (counterValue > 0)
			{
				counterNode.innerHTML = counterValue;
			}
			else
			{
				this.changeAnimate(false, 0);
			}
		}
	},

	changeAnimate: function (bShow, count, bZeroCounterFromDB)
	{
		bZeroCounterFromDB = !!bZeroCounterFromDB;
		bShow = !!bShow;

		var
			counterTextNode = null,
			reloadNode = null,
			counterContainerNode = BX('sonet_log_counter_2_container');

		if (counterContainerNode)
		{
			counterTextNode = BX.findChild(counterContainerNode, { tag: 'span', className: 'feed-new-message-inf-text' }, false);
			reloadNode = BX.findChild(counterContainerNode, { tag: 'span', className: 'feed-new-message-inf-text-reload' }, false);
		}

		if (this.bLockCounterAnimate)
		{
			setTimeout(function() {
				this.changeAnimate(bShow, count)
			}.bind(this), 200);

			return false;
		}

		var
			counterWrapNode = BX('sonet_log_counter_2_wrap');

		if (bShow)
		{
			var
				counterNode = document.getElementById('sonet_log_counter_2'),
				counterPlusNode = document.getElementById('sonet_log_counter_2_plus');

			if (counterNode)
			{
				counterNode.innerHTML = count;
			}

			if (counterWrapNode)
			{
				counterWrapNode.style.visibility = "visible";
				counterWrapNode.classList.add("feed-new-message-informer-anim");
			}

			if (
				counterPlusNode
				&& reloadNode
				&& reloadNode.style.display != 'none'
				&& counterTextNode
			)
			{
				reloadNode.style.display = 'none';
				counterTextNode.style.display = 'inline-block';
				counterPlusNode.classList.remove("feed-new-message-informer-counter-plus-hidden");
			}
		}
		else if (counterWrapNode)
		{
			if (
				bZeroCounterFromDB
				&& counterWrapNode.classList.contains("feed-new-message-informer-anim")
			)
			{
				if (
					counterTextNode
					&& reloadNode
				)
				{
					counterTextNode.style.display = 'none';
					reloadNode.style.display = 'inline-block';

					var counterWaiterNode = BX.findChild(counterTextNode, { tag: 'span', className: 'feed-new-message-icon' }, false);
					if (counterWaiterNode)
					{
						counterWaiterNode.classList.remove('new-message-balloon-icon-rotating');
					}
				}
			}
			else
				setTimeout(function() {
					counterWrapNode.classList.remove("feed-new-message-informer-anim");
					counterWrapNode.style.visibility = "hidden";
				}, 400);
		}
	},

	changeCounterArray: function (arCount)
	{
		if (typeof arCount[BX.message('sonetLCounterType')] != 'undefined')
		{
			this.changeCounter(arCount[BX.message('sonetLCounterType')]);
		}
	},

	changeCounter: function(count)
	{
		count = parseInt(count);

		this.value = count;

		if (count <= 0)
		{
			this.decrementStack = 0;
		}

		var valueToShow = this.value - this.decrementStack;
		this.changeAnimate((valueToShow > 0), valueToShow, (valueToShow <= 0));
	}
};

if (typeof oLF == 'undefined')
{
	oLF = new BitrixLF;
	window.oLF = oLF;
}