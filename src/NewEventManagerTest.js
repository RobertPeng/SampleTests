/**
 * Created by John on 15/10/5.
 */

var eventDispatcherSceneIdx = -1;

var EventDispatcherTestScene = cc.Scene.extend({
    runThisTest:function (num) {
        eventDispatcherSceneIdx = (num || num == 0) ? (num - 1) : -1;
        this.addChild(nextDispatcherTest());
        cc.director.runScene(this);
    }
});

var EventDispatcherTestDemo = BaseTestLayer.extend({
    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(160,32,32,255));
    },

    title:function () {
        return "No title";
    },

    subtitle:function () {
        return "";
    },

    onBackCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(previousDispatcherTest());
        cc.director.runScene(s);
    },

    onRestartCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(restartDispatcherTest());
        cc.director.runScene(s);
    },

    onNextCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(nextDispatcherTest());
        cc.director.runScene(s);
    },
    // varmation
    numberOfPendingTests:function() {
        return ( (arrayOfEventDispatcherTest.length-1) - eventDispatcherSceneIdx );
    },

    getTestNumber:function() {
        return eventDispatcherSceneIdx;
    }
});

var CustomEventTest =  EventDispatcherTestDemo.extend({
    _listener1: null,
    _listener2: null,
    _item1Count: 0,
    _item2Count: 0,

    onEnter:function(){
        //----start3----onEnter
        this._super();

        var origin = cc.director.getVisibleOrigin(), size = cc.director.getVisibleSize(), selfPointer = this;

        cc.MenuItemFont.setFontSize(20);

        var statusLabel = new cc.LabelTTF("No custom event 1 received!", "", 20);
        statusLabel.setPosition(origin.x + size.width / 2, origin.y + size.height - 90);
        this.addChild(statusLabel);

        this._listener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_custom_event1",
            callback: function(event){
                statusLabel.setString("Custom event 1 received, " + event.getUserData() + " times");
            }
        });
        cc.eventManager.addListener(this._listener1, 1);

        var sendItem = new cc.MenuItemFont("Send Custom Event 1", function(sender){
            ++selfPointer._item1Count;
            var event = new cc.EventCustom("game_custom_event1");
            event.setUserData(selfPointer._item1Count.toString());
            cc.eventManager.dispatchEvent(event);
        });
        sendItem.setPosition(origin.x + size.width/2, origin.y + size.height/2);

        var statusLabel2 = new cc.LabelTTF("No custom event 2 received!", "", 20);
        statusLabel2.setPosition(origin.x + size.width/2, origin.y + size.height-120);
        this.addChild(statusLabel2);

        this._listener2 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_custom_event2",
            callback: function(event){
                statusLabel2.setString("Custom event 2 received, " + event.getUserData() + " times");
            }
        });

        cc.eventManager.addListener(this._listener2, 1);
        var sendItem2 = new cc.MenuItemFont("Send Custom Event 2", function(sender){
            ++selfPointer._item2Count;
            var event = new cc.EventCustom("game_custom_event2");
            event.setUserData(selfPointer._item2Count.toString());
            cc.eventManager.dispatchEvent(event);
        });
        sendItem2.setPosition(origin.x + size.width/2, origin.x + size.height/2 - 40);

        var menu = new cc.Menu(sendItem, sendItem2);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, 1);
        //----end3----
    },

    onExit:function(){
        //----start3----onExit
        cc.eventManager.removeListener(this._listener1);
        cc.eventManager.removeListener(this._listener2);
        this._super();
        //----end3----
    },

    title:function(){
        return "Send custom event";
    },

    subtitle:function(){
        return "";
    }
});

var RandomTest = EventDispatcherTestDemo.extend({
    onEnter:function() {
        this._super();

        var foo = {0:'hello',1:'world',length:2,slice:Array.prototype.slice};
        console.log(Array.prototype.slice.call(foo, 0));
    }
});

var arrayOfEventDispatcherTest = [
    RandomTest,
    CustomEventTest
];

var nextDispatcherTest = function () {
    eventDispatcherSceneIdx++;
    eventDispatcherSceneIdx = eventDispatcherSceneIdx % arrayOfEventDispatcherTest.length;

    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};
var previousDispatcherTest = function () {
    eventDispatcherSceneIdx--;
    if (eventDispatcherSceneIdx < 0)
        eventDispatcherSceneIdx += arrayOfEventDispatcherTest.length;

    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};
var restartDispatcherTest = function () {
    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};