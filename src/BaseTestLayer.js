/**
 * Created by zhangpeng on 15/9/28.
 */

var BASE_TEST_MENUITEM_PREV_TAG = 1;
var BASE_TEST_MENUITEM_RESET_TAG = 2;
var BASE_TEST_MENUITEM_NEXT_TAG = 3;

var BASE_TEST_MENU_TAG = 10;
var BASE_TEST_TITLE_TAG = 11;
var BASE_TEST_SUBTITLE_TAG = 12;

var BaseTestLayer = cc.Layer.extend({
    onEnter : function() {
        this._super();

        var winSize = cc.director.getWinSize();

        var item1 = new cc.MenuItemImage(res.s_pathB1, res.s_pathB2, this.onBackCallback, this);
        var item2 = new cc.MenuItemImage(res.s_pathR1, res.s_pathR2, this.onRestartCallback, this);
        var item3 = new cc.MenuItemImage(res.s_pathF1, res.s_pathF2, this.onNextCallback, this);

        item1.tag = BASE_TEST_MENUITEM_PREV_TAG;
        item2.tag = BASE_TEST_MENUITEM_RESET_TAG;
        item3.tag = BASE_TEST_MENUITEM_NEXT_TAG;

        var menu = new cc.Menu(item1, item2, item3);

        menu.x = 0;
        menu.y = 0;
        var width = item2.width, height = item2.height;
        item1.x =  winSize.width/2 - width*2;
        item1.y = height/2 ;
        item2.x =  winSize.width/2;
        item2.y = height/2 ;
        item3.x =  winSize.width/2 + width*2;
        item3.y = height/2 ;

        this.addChild(menu, 102, BASE_TEST_MENU_TAG);
    },

    onRestartCallback:function (sender) {
        // override me
    },

    onNextCallback:function (sender) {
        // override me
    },

    onBackCallback:function (sender) {
        // override me
    }
});