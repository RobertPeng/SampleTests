/**
 * Created by Peng on 15/9/22.
 */

var TAG_GROSSINI = 5561;
var TAG_SEQUENCE = 5562;

var CrashTest = cc.Layer.extend({
    ctor : function () {
        this._super();
    },

    onEnter : function() {
        this._super();

        var child = new cc.Sprite(res.s_pathGrossini);
        child.x = 200;
        child.y = 200;
        this.addChild(child, 1);

        child.runAction(cc.rotateBy(1.5, 90));
        child.runAction(cc.sequence(
            cc.delayTime(1.4),
            cc.fadeOut(1.1)
        ));

        //this.runAction(cc.sequence(
        //    cc.delayTime(1.4),
        //    cc.callFunc(this.onRemoveThis, this)
        //));

        this.scheduleUpdate();
        this.schedule(this.testSchedule, 3);
        console.log("aabb");
    },

    onRemoveThis : function() {
        this.parent.removeChild(this);
    },

    getExpectedResult : function() {

    },

    getCurrentResult : function() {

    },

    update : function(dt) {
        //console.log("ccdd "+dt);
    },

    testSchedule : function (dt) {
        this.unschedule(this.testSchedule);
        console.log("eeff "+dt);
    }
});

var LogicTest = cc.Layer.extend({
    onEnter : function() {
        this._super();

        var grossini = new cc.Sprite(res.s_pathGrossini);
        this._grossini = grossini;
        grossini.x = 200;
        grossini.y = 200;
        this.addChild(grossini, 0, 2);

        grossini.runAction(cc.sequence(
            cc.moveBy(1, cc.p(150, 0)),
            cc.callFunc(this.onBugMe, this))
        );
    },

    onBugMe : function (node) {
        node.stopAllActions();
        node.runAction(cc.ScaleTo(2, 2));
    }
});

var PauseTest = cc.Layer.extend({
    ctor : function() {
        this._super();
        this.scheduleUpdate();
    },

    onEnter : function() {
        this._super();

        var grossini = new cc.Sprite(res.s_pathGrossini);
        this.addChild(grossini, 0, TAG_GROSSINI);
        grossini.x = 200;
        grossini.y = 200;

        var action = cc.moveBy(1, cc.p(150, 0));
        cc.director.getActionManager().addAction(action, grossini, true);

        this.schedule(this.onTestPause, 3);
    },

    onTestPause : function(dt) {
        this.unschedule(this.onTestPause);
        var node = this.getChildByTag(TAG_GROSSINI);
        cc.director.getActionManager().resumeTarget(node);
    },

    update : function (dt) {
        //console.log("p update")
    }
});

var RemoveTest = cc.Layer.extend({
    onEnter : function() {
        this._super();

        var s = cc.director.getWinSize();
        var l = new cc.LabelTTF("Should not crash", "Thonburi", 16);
        this.addChild(l);
        l.x = s.width / 2;
        l.y = 245;

        //var move = cc.MoveBy(2, cc.p(300, 0));
        var move = cc.rotateBy(1.5, 90);
        var callback = cc.callFunc(this.stopAction, this);
        var sequence = cc.sequence(move, callback);
        sequence.tag = TAG_SEQUENCE;

        var child = new cc.Sprite(res.s_pathGrossini);
        child.x = 200;
        child.y = 200;

        this.addChild(child, 1, TAG_GROSSINI);
        child.runAction(sequence);
    },

    stopAction:function () {
        //----start3----onEnter
        var sprite = this.getChildByTag(TAG_GROSSINI);
        sprite.stopActionByTag(TAG_SEQUENCE);
        //----end3----
    }
});

var ResumeTest = cc.Layer.extend({
    onEnter : function () {
        this._super();

        var s = cc.director.getWinSize();
        var l = new cc.LabelTTF("Grossini only rotate/scale in 3 seconds", "Thonburi", 16);
        this.addChild(l);
        l.x = s.width / 2;
        l.y = 245;

        var grossini = new cc.Sprite(res.s_pathGrossini);
        this._grossini = grossini;
        this.addChild(grossini, 0, TAG_GROSSINI);
        grossini.x = s.width / 2;
        grossini.y = s.height / 2;

        grossini.runAction(cc.scaleBy(2, 2));

        cc.director.getActionManager().pauseTarget(grossini);
        grossini.runAction(cc.rotateBy(2, 360));

        this.schedule(this.resumeGrossini, 3.0);
    },

    resumeGrossini : function(dt) {
        this.unschedule(this.resumeGrossini);

        var grossini = this.getChildByTag(TAG_GROSSINI);
        cc.director.getActionManager().resumeTarget(grossini);
    }
});



var ActionTestScene = cc.Scene.extend({
    onEnter : function() {
        this._super();
        var layer = new ResumeTest();
        this.addChild(layer);
    }
});