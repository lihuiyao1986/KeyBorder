# KeyBorder
字母数字键盘

## 效果图
![](./test.gif)

## 使用
  该插件是基于jquery或zepto的数字字母键盘
  
  $(document).ready(function() {
				var pageForm = {
					init:function(){
						$("#keybord-container").KeyBord($("#myInput"));
					}
				};
				pageForm.init();
});

options的参数 {</br>
				itemSize: "80px",// 每个键盘item的大小</br>
        digitalKeybordContainer: "digtal-keybord",//</br>
        charKeybordContainer: "char-keybord",</br>
				itemSpaceing: 2,</br>
				digitalKeybordColums: 3,</br>
				charKeybordColumns: 7,</br>
				isUpperCharKeybord: false,</br>
				isZepTo: false</br>
			},</br>
