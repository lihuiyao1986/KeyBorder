;
(function($, window, document, undefined) {
	
	var KeyBord = function($container, $input, $options) {
		this.$container = $container,
			this.$input = $input,
			this.defaults = {
				itemSize: 80, //每个键盘item的大小
				digitalKeybordContainer: "digtal-keybord", // 放置数字键盘的容器
				charKeybordContainer: "char-keybord", // 放置字母键盘的容器
				itemSpaceing: 2, //键盘按钮的间隔
				digitalKeybordColums: 3, //数字键盘每行显示的列数
				charKeybordColumns: 7, //字母键盘每行显示的列数
				isUpperCharKeybord: false, //是否是大写的字母键盘
				digitalHiddenSwitch: true, //数字键盘是否隐藏切换按钮
				isZepTo: false //是否是zepto
			},
			this.options = $.extend({}, this.defaults, $options)
	};

	KeyBord.prototype = {
		createDigitalKeybordHtml: function($keybordContainer, isHidden) {
			$keybordContainer.append(this.createHtml(this.digitalItems(), this.options.digitalKeybordColums, this.options.itemSize, this.options.digitalKeybordContainer, isHidden));
			return this;
		},
		createCharKeybordHtml: function($keybordContainer, isHidden) {
			if(this.options.isUpperCharKeybord) {
				$keybordContainer.append(this.createHtml(this.lowerCharItems(), this.options.charKeybordColumns, this.options.itemSize, this.options.charKeybordContainer, isHidden));
			} else {
				$keybordContainer.append(this.createHtml(this.upperCharItems(), this.options.charKeybordColumns, this.options.itemSize, this.options.charKeybordContainer, isHidden));
			}
			return this;
		},
		bindEvents: function() {
			var self = this;
			var eventName = this.options.isZepTo ? "tap" : "click";
			$(document).on(eventName, ".keybord-item", function() {
				if($(this).is("." + self.options.digitalKeybordContainer + "-item")) {
					if($(this).data("id") == "delete") {
						if(self.$input && self.$input.length > 0) {
							if(self.$input.val().length > 0) {
								self.$input.val(self.$input.val().substring(0, self.$input.val().length - 1));
							}
						}
					} else if($(this).data("id") == "switch") {
						$("." + self.options.digitalKeybordContainer).hide();
						$("." + self.options.charKeybordContainer).show();
					} else {
						if(self.$input && self.$input.length > 0) {
							self.$input.val(self.$input.val() + $(this).text());
						}
					}
				} else {
					if($(this).data("id") == "delete") {
						if(self.$input.val().length > 0) {
							self.$input.val(self.$input.val().substring(0, self.$input.val().length - 1));
						}
					} else if($(this).data("id") == "switch") {
						$("." + self.options.charKeybordContainer).hide();
						$("." + self.options.digitalKeybordContainer).show();
					} else {
						if(self.$input && self.$input.length > 0) {
							self.$input.val(self.$input.val() + $(this).text());
						}
					}
				}
			});
			return this;
		},
		digitalItems: function() { //小写字母键盘
			var result = [];
			for(var indx = 0; indx <= 8; indx++) {
				result.push({
					"label": (indx + 1) + "",
					"value": (indx + 1) + ""
				});
			}
			if(!this.options.digitalHiddenSwitch) {
				result.push({
					"label": "0",
					"value": "0"
				});
				result.push({
					"label": "字母",
					"value": "switch"
				});
			} else {
				result.push({
					"label": "0",
					"value": "0",
					"spanColumn": 2
				});
			}
			result.push({
				"label": "删除",
				"value": "delete"
			});
			return result;
		},
		upperCharItems: function() { //大写字母键盘
			var result = [];
			for(var i = 65; i < 91; i++) {
				result.push({
					"label": String.fromCharCode(i),
					"value": String.fromCharCode(i)
				});
			}
			result.push({
				"label": "数字",
				"value": "switch"
			});
			result.push({
				"label": "删除",
				"value": "delete"
			});
			return result;
		},
		lowerCharItems: function() {
			var result = [];
			for(var i = 97; i < 123; i++) {
				result.push({
					"label": String.fromCharCode(i),
					"value": String.fromCharCode(i)
				});
			}
			result.push({
				"label": "数字",
				"value": "switch"
			});
			result.push({
				"label": "删除",
				"value": "delete"
			});
			return result;
		},
		createHtml: function(items, colums, itemSize, tbNode, isHidden, cellSpace) {
			tbNode = tbNode || "digtal-keybord";
			colums = colums || 3;
			itemSize = itemSize || "60px";
			items = items || [];
			cellSpace = cellSpace || 2;
			var hiddenStyle = isHidden ? 'style="display:none;"' : '';
			var html = '<table ' + hiddenStyle + ' class="' + tbNode + '" cellpadding="0" cellspacing="' + cellSpace + '">';
			html += "<tbody class='" + tbNode + "-tb'>";
			for(var indx in items) {
				var item = items[indx];
				var spanColumn = item.spanColumn || 1;
				if(indx % colums == 0) {
					html += "<tr>";
					html += "<td colspan='" + spanColumn + "'><button data-id='" + item.value + "' class='" + tbNode + "-item keybord-item' style='height:" + itemSize + "px;width:" + (itemSize * spanColumn + 1) + "px'>" + item.label + "</button></td>";
				} else if(indx % colums == colums - 1) {
					html += "<td colspan='" + spanColumn + "'><button data-id='" + item.value + "' class='" + tbNode + "-item keybord-item' style='height:" + itemSize + "px;width:" + (itemSize * spanColumn + 1) + "px'>" + item.label + "</button></td>";
					html += "</tr>";
				} else {
					html += "<td colspan='" + spanColumn + "'><button data-id='" + item.value + "' class='" + tbNode + "-item keybord-item' style='height:" + itemSize + "px;width:" + (itemSize * spanColumn + 1) + "px'>" + item.label + "</button></td>";
				}
			}
			html += "</tbody>";
			html += "</table>";
			return html;
		}
	};

	$.fn.KeyBord = function($input, options) {
		if($input && $input.length > 0) {
			$input.attr("readonly", true);
		}
		var keybordObj = new KeyBord(this, $input, options);
		keybordObj.createDigitalKeybordHtml(this).createCharKeybordHtml(this, true).bindEvents();
	}

})(jQuery, window, document);