/**
 * Created by John on 15/9/28.
 */


var TAG_SPRITE1 = 1;
var TAG_SPRITE2 = 2;

var nodeTestSceneIdx = -1;

var TestNodeDemo = BaseTestLayer.extend({

    onRestartCallback:function (sender) {
        var s = new NodeTestScene();
        s.addChild(restartNodeTest());
        cc.director.runScene(s);
    },

    onNextCallback:function (sender) {
        var s = new NodeTestScene();
        s.addChild(nextNodeTest());
        cc.director.runScene(s);
    },

    onBackCallback:function (sender) {
        var s = new NodeTestScene();
        s.addChild(previousNodeTest());
        cc.director.runScene(s);
    }
});

var CCNodeTest2 = TestNodeDemo.extend({
    onEnter:function () {
        //----start0----onEnter
        this._super();

        var winSize = cc.director.getWinSize();

        var sp1 = new cc.Sprite(res.s_pathSister1);
        var sp2 = new cc.Sprite(res.s_pathSister2);
        var sp3 = new cc.Sprite(res.s_pathSister1);
        var sp4 = new cc.Sprite(res.s_pathSister2);

        sp1.x = winSize.width / 4;
        sp1.y = winSize.height / 2;
        sp2.x = winSize.width / 4 * 3;
        sp2.y = winSize.height / 2;
        this.addChild(sp1);
        this.addChild(sp2);

        sp3.scale = 0.25;
        sp4.scale = 0.25;

        sp1.addChild(sp3);
        sp2.addChild(sp4);

        var a1 = cc.rotateBy(2, 360);
        var a2 = cc.scaleBy(2, 2);
        var delay = cc.delayTime(0.2);

        var action1 = cc.sequence(a1, a2, delay, a2.reverse()).repeatForever();
        var action2 = cc.sequence(a1.clone(), a2.clone(), delay.clone(), a2.reverse()).repeatForever();

        sp2.anchorX = 0;
        sp2.anchorY = 0;

        sp1.runAction(action1);
        sp2.runAction(action2);
    }
});

var CCNodeTest4 = TestNodeDemo.extend({
    onEnter:function () {
        //----start0----onEnter
        this._super();

        var winSize = cc.director.getWinSize();

        var sp1 = new cc.Sprite(res.s_pathSister1);
        var sp2 = new cc.Sprite(res.s_pathSister2);
        sp1.x = 150;
        sp1.y = winSize.height / 2;
        sp2.x = winSize.width - 150;
        sp2.y = winSize.height / 2;

        this.addChild(sp1, 0, 2);
        this.addChild(sp2, 0, 3);

        this.schedule(this.delay2, 2.0);
        this.schedule(this.delay4, 4.0);
    },

    delay2:function (dt) {
        //----start1----delay2
        var node = this.getChildByTag(2);
        var action1 = cc.rotateBy(1, 360);
        node.runAction(action1);
        //----end1----
    },

    delay4:function (dt) {
        //----start1----delay4
        this.unschedule(this.delay4);
        this.removeChildByTag(3, false);
        //----end1----
    }
});

var CCNodeTest5 = TestNodeDemo.extend({
    onEnter:function () {
        this._super();

        var winSize = cc.director.getWinSize();

        var sp1 = new cc.Sprite(res.s_pathSister1);
        var sp2 = new cc.Sprite(res.s_pathSister2);
        sp1.x = 150;
        sp1.y = winSize.height / 2;
        sp2.x = winSize.width - 150;
        sp2.y = winSize.height / 2;

        var rot = cc.rotateBy(2, 360);
        var rot_back = rot.reverse();
        var forever = cc.sequence(rot, rot_back).repeatForever();
        var forever2 = forever.clone();
        forever.tag = 101;
        forever2.tag = 102;

        this.addChild(sp1, 0, TAG_SPRITE1);
        this.addChild(sp2, 0, TAG_SPRITE2);

        sp1.runAction(forever);
        sp2.runAction(forever2);

        this.schedule(this.onAddAndRemove, 2.0);
    },

    onAddAndRemove:function (dt) {
        //----start2----onAddAndRemove
        var sp1 = this.getChildByTag(TAG_SPRITE1);
        var sp2 = this.getChildByTag(TAG_SPRITE2);

        // hack for JSB.
        sp1.retain();
        sp2.retain();

        this.removeChild(sp1, false);
        this.removeChild(sp2, true);

        this.testSP1 = this.getChildByTag(TAG_SPRITE1);
        this.testSP2 = this.getChildByTag(TAG_SPRITE2);

        this.addChild(sp1, 0, TAG_SPRITE1);
        this.addChild(sp2, 0, TAG_SPRITE2);

        // hack for JSB.
        sp1.release();
        sp2.release();
        //----end2----
    }
});

var CCNodeTest6 = TestNodeDemo.extend({
    onEnter: function () {
        this._super();

        winSize = cc.director.getWinSize();

        var sp1 = new cc.Sprite(res.s_pathSister1);
        var sp11 = new cc.Sprite(res.s_pathSister1);

        var sp2 = new cc.Sprite(res.s_pathSister2);
        var sp21 = new cc.Sprite(res.s_pathSister2);

        sp1.x = 150;
        sp1.y = winSize.height / 2;
        sp2.x = winSize.width - 150;
        sp2.y = winSize.height / 2;

        var rot = cc.rotateBy(2, 360);
        var rot_back = rot.reverse();
        var forever1 = cc.sequence(rot, rot_back).repeatForever();
        var forever11 = forever1.clone();

        var forever2 = forever1.clone();
        var forever21 = forever1.clone();

        this.addChild(sp1, 0, TAG_SPRITE1);
        sp1.addChild(sp11, 11);
        this.addChild(sp2, 0, TAG_SPRITE2);
        sp2.addChild(sp21, 21);

        sp1.runAction(forever1);
        sp11.runAction(forever11);
        sp2.runAction(forever2);
        sp21.runAction(forever21);

        this.schedule(this.onAddAndRemove, 2.0);
    },

    onAddAndRemove : function() {
        var sp1 = this.getChildByTag(TAG_SPRITE1);
        var sp2 = this.getChildByTag(TAG_SPRITE2);

        // hack for JSB.
        sp1.retain();
        sp2.retain();

        this.removeChild(sp1, false);
        this.removeChild(sp2, true);

        //Automation parameters
        this.autoParam1 = sp1.getChildByTag(11);
        this.autoParam2 = sp2.getChildByTag(21);

        this.addChild(sp1, 0, TAG_SPRITE1);
        this.addChild(sp2, 0, TAG_SPRITE2);

        // hack for JSB.
        sp1.release();
        sp2.release();
    }
});

var StressTest1 = TestNodeDemo.extend({
    ctor : function () {
        this._super();

        var winSize = cc.director.getWinSize();

        var sp1 = new cc.Sprite(res.s_pathSister1);
        this.addChild(sp1, 0, TAG_SPRITE1);
        this.width = 0
        this.height = 0;

        sp1.x = winSize.width / 2;
        sp1.y = winSize.height / 2;

        this.schedule(this.onShouldNotCrash, 1.0);
    },

    onShouldNotCrash : function(dt) {
        //----start4----onShouldNotCrash
        this.unschedule(this.onShouldNotCrash);

        var winSize = cc.director.getWinSize();

        // if the node has timers, it crashes
        var explosion = new cc.ParticleSun();
        explosion.texture = cc.textureCache.addImage(res.s_fire);

        explosion.x = winSize.width / 2;
        explosion.y = winSize.height / 2;

        this.addChild(explosion);

        this.runAction(
            cc.sequence(
                cc.rotateBy(2, 360),
                cc.callFunc(this.onRemoveMe, this)
            )
        );
    },

    onRemoveMe:function (node) {
        this.parent.removeChild(node, true);
        this.onNextCallback(this);
    }
});

var StressTest2 = TestNodeDemo.extend({
    ctor : function() {
        this._super();

        var winSize = cc.director.getWinSize();

        var sublayer = new cc.Layer();

        var sp1 = new cc.Sprite(res.s_pathSister1);
        sp1.x = 80;
        sp1.y = winSize.height / 2;

        var move = cc.moveBy(3, cc.p(350, 0));
        var move_ease_inout3 = move.clone().easing(cc.easeInOut(2.0));
        var move_ease_inout_back3 = move_ease_inout3.reverse();
        var seq3 = cc.sequence(move_ease_inout3, move_ease_inout_back3);
        sp1.runAction(seq3.repeatForever());
        sublayer.addChild(sp1, 1);


        var fire = new cc.ParticleFire();
        fire.texture = cc.textureCache.addImage(res.s_fire);
        fire.x = 80;
        fire.y = winSize.height / 2 - 50;

        var copy_seq3 = seq3.clone();

        fire.runAction(copy_seq3.repeatForever());
        sublayer.addChild(fire, 2);

        this.schedule(this.shouldNotLeak, 6.0);

        this.addChild(sublayer, 0, TAG_SPRITE1);

    },

    shouldNotLeak:function (dt) {
        //----start5----shouleNotLeak
        this.unschedule(this.shouldNotLeak);
        var sublayer = this.getChildByTag(TAG_SPRITE1);
        sublayer.removeAllChildren();
        //----end5----
    },
});

var NodeToWorld = TestNodeDemo.extend({
    ctor : function() {
        this._super();
        var back = new cc.Sprite(res.s_back3_png);
        this.addChild(back, 5);
        back.anchorX = 0;
        back.anchorY = 0;

        var item = new cc.MenuItemImage(res.s_playNormal, res.s_playSelect, this.onClicked);
        var menu = new cc.Menu(item);
        menu.alignItemsVertically();
        menu.x = back.width / 2;
        menu.y = back.height / 2;
        back.addChild(menu);

        var rot = cc.rotateBy(3, 360);
        var delay = cc.delayTime(0.3);
        var fe = cc.sequence(rot, delay).repeatForever();
        item.runAction(fe);

        var move = cc.moveBy(3, cc.p(200, 0));
        var move_back = move.reverse();
        var seq = cc.sequence(move, delay.clone(), move_back);
        var fe2 = seq.repeatForever();
        back.runAction(fe2);
    },

    onClicked : function() {
        cc.log("On Clicked");
    }
});

var BoundingBoxTest = TestNodeDemo.extend({
    ctor : function() {
        this._super();
        var winSize = cc.director.getWinSize();
        var sprite = new cc.Sprite(res.s_pathGrossini);
        this.addChild(sprite);
        sprite.x = winSize.width / 2;
        sprite.y = winSize.height / 2;
        var bb = sprite.getBoundingBox();
        cc.log("BoundingBox:");
        cc.log('origin = [' + bb.x + "," + bb.y + "]");
        cc.log('size = [' + bb.width + "," + bb.height + "]");
    }
});

var ConvertToNode = TestNodeDemo.extend({
    ctor : function() {
        this._super();
        if ('touches' in cc.sys.capabilities) {
            cc.eventManager.addListener(cc.EventListener.create({
                event : cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded : function(touches, event) {
                    var target = event.getCurrentTarget();
                    for(var it = 0; it < touches.length; it++) {
                        var touch = touches[it];
                        var location = touch.getLocation();
                        target.processEvent(location);
                    }
                }
            }), this);
        }
        else if('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event : cc.EventListener.MOUSE,
                onMouseUp : function (event) {
                    event.getCurrentTarget().processEvent(event.getLocation());
                }
            }, this);
        }

        var sprite = new cc.Sprite(res.s_pathGrossini);
        sprite.x = 100;
        sprite.y = 100;
        this.addChild(sprite, 0, 100);
    },

    processEvent : function(location) {
        cc.log("processEvent "+ JSON.stringify(location));
        var node = this.getChildByTag(100);
        var p1 = node.convertToNodeSpaceAR(location);
        var p2 = node.convertToNodeSpace(location);
        cc.log("AR : x=" + p1.x.toFixed(2) + ", y=" + p1.y.toFixed(2) + " -- Not AR : x = " + p2.x.toFixed(2) + ", y=" + p2.y.toFixed(2));

        //for (var i = 0; i < 3; i++) {
        //    var node = this.getChildByTag(100 + i);
        //    var p1 = node.convertToNodeSpaceAR(location);
        //    var p2 = node.convertToNodeSpace(location);
        //    cc.log("AR : x=" + p1.x.toFixed(2) + ", y=" + p1.y.toFixed(2) + " -- Not AR : x = " + p2.x.toFixed(2) + ", y=" + p2.y.toFixed(2));
        //}
    }
});

var NodeTestScene = cc.Scene.extend({
    //onEnter : function() {
    //    this._super();
    //    var layer = new CCNodeTest6();
    //    this.addChild(layer);
    //}

    runThisTest:function (num) {
        nodeTestSceneIdx = (num || num == 0) ? (num - 1) : -1;
        var layer = nextNodeTest();
        this.addChild(layer);

        cc.director.runScene(this);
    }
});

var arrayOfNodeTest = [
    ConvertToNode,
    BoundingBoxTest,
    NodeToWorld,
    StressTest1,
    StressTest2,
    CCNodeTest2,
    CCNodeTest4,
    CCNodeTest5,
    CCNodeTest6,
];

var nextNodeTest = function () {
    nodeTestSceneIdx++;
    nodeTestSceneIdx = nodeTestSceneIdx % arrayOfNodeTest.length;

    return new arrayOfNodeTest[nodeTestSceneIdx]();
};

var previousNodeTest = function () {
    nodeTestSceneIdx--;
    if (nodeTestSceneIdx < 0)
        nodeTestSceneIdx += arrayOfNodeTest.length;

    return new arrayOfNodeTest[nodeTestSceneIdx]();
};

var restartNodeTest = function () {
    return new arrayOfNodeTest[nodeTestSceneIdx]();
};
