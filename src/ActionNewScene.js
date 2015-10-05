/**
 * Created by Peng on 15/9/28.
 */

var ActionDemo = cc.Layer.extend({
    _grossini:null,
    _tamara:null,
    _kathia:null,

    ctor : function () {
        this._super();

        this._grossini = new cc.Sprite(res.s_pathGrossini);
        this._tamara = new cc.Sprite(res.s_pathSister1);
        this._kathia = new cc.Sprite(res.s_pathSister2);

        this.addChild(this._grossini);
        this.addChild(this._tamara);
        this.addChild(this._kathia);
    },

    centerSprite : function() {
        var winSize = cc.director.getWinSize();

        this._grossini.x = winSize.width / 2;
        this._grossini.y = winSize.height / 2;
        this._tamara.x = winSize.width / 4;
        this._tamara.y = winSize.height / 2;
        this._kathia.x = 3 * winSize.width / 4;
        this._kathia.y = winSize.height / 2;
    }
});

var ActionManual = cc.Layer.extend({
    _grossini:null,
    _tamara:null,
    _kathia:null,

    ctor : function() {
        this._super();

        this._grossini = new cc.Sprite(res.s_pathGrossini);
        this._tamara = new cc.Sprite(res.s_pathSister1);
        this._kathia = new cc.Sprite(res.s_pathSister2);

        this.addChild(this._grossini);
        this.addChild(this._tamara);
        this.addChild(this._kathia);
    },

    onEnter : function() {
        this._super();

        winSize = cc.director.getWinSize();

        this._tamara.attr({
            x: 100,
            y: 70,
            opacity: 128,
            scaleX: 2.5,
            scaleY: -1.0
        });

        this._grossini.attr({
            x: winSize.width / 2,
            y: winSize.height / 2,
            rotation: 120,
            color: cc.color(255, 0, 0)
        });

        this._kathia.x = winSize.width - 100;
        this._kathia.y = winSize.height / 2;
        this._kathia.color = cc.color(0, 0, 255);
    }
});

var ActionMove = cc.Layer.extend({
    ctor : function() {
        this._super();

        var winSize = cc.director.getWinSize();

        this._grossini = new cc.Sprite(res.s_pathGrossini);
        this._tamara = new cc.Sprite(res.s_pathSister1);
        this._kathia = new cc.Sprite(res.s_pathSister2);

        this.addChild(this._grossini);
        this.addChild(this._tamara);
        this.addChild(this._kathia);

        this._grossini.x = winSize.width / 2;
        this._grossini.y = winSize.height / 2;
        this._tamara.x = winSize.width / 4;
        this._tamara.y = winSize.height / 2;
        this._kathia.x = 3 * winSize.width / 4;
        this._kathia.y = winSize.height / 2;
    },

    onEnter : function() {
        this._super();

        var winSize = cc.director.getWinSize();

        var actionTo = cc.moveTo(2, cc.p(winSize.width - 40, winSize.height - 40));
        var actionBy = cc.moveBy(1, cc.p(80, 80));
        var actionByBack = actionBy.reverse();

        this._tamara.runAction(actionTo);
        this._grossini.runAction(cc.sequence(actionBy, actionByBack));
        this._kathia.runAction(cc.moveTo(1, cc.p(40, 40)));
    }
});

var ActionScale = ActionDemo.extend({
    onEnter : function() {
        this._super();

        this.centerSprite();

        var actionTo = cc.scaleTo(2, 0.5);
        var actionBy = cc.scaleBy(2, 2);
        var actionBy2 = cc.scaleBy(2, 0.25, 4.5);

        this._tamara.runAction(actionTo);
        this._kathia.runAction(cc.sequence(actionBy2, cc.delayTime(0.25), actionBy2.reverse()));
        this._grossini.runAction(cc.sequence(actionBy, cc.delayTime(0.25), actionBy.reverse()));
    }
});

var ActionRotate = ActionDemo.extend({
    onEnter : function(){
        this._super();

        this.centerSprite();

        var actionTo = cc.rotateTo(2, 45);
        var actionTo2 = cc.rotateTo(2, -45);
        var actionTo0 = cc.rotateTo(2, 0);
        this._tamara.runAction(cc.sequence(actionTo, cc.delayTime(0.25), actionTo0));

        var actionBy = cc.rotateBy(2, 360);
        //this._grossini.runAction(actionBy);
        var actionByBack = actionBy.reverse();
        this._grossini.runAction(cc.sequence(actionBy, cc.delayTime(0.25), actionByBack));

        this._kathia.runAction(cc.sequence(actionTo2, cc.delayTime(0.25), actionTo0.clone()));
    }
});

var ActionRotateXY = ActionDemo.extend({
    onEnter : function() {
        this._super();
        this.centerSprite();

        var actionTo = cc.rotateTo(2, 37.2, -37.2);
        var actionToBack = cc.rotateTo(2, 0, 0);
        var actionBy = cc.rotateBy(2, 0, -90);
        var actionBy2 = cc.rotateBy(2, 45.0, 45.0);

        var delay = cc.delayTime(0.25);

        this._tamara.runAction(cc.sequence(actionTo, delay, actionToBack));
        this._grossini.runAction(cc.sequence(actionBy, delay.clone(), actionBy.reverse()));
        this._kathia.runAction(cc.sequence(actionBy2, delay.clone(), actionBy2.reverse()));

        var ba = cc.sys.isNative;
        var bb = cc.sys.capabilities;
        var bc = JSON.stringify(bb);

        if (!cc.sys.isNative && !("opengl" in cc.sys.capabilities)) {
            var label = new cc.LabelTTF("Not support Actions on HTML5-canvas", "Times New Roman", 30);
            label.x = winSize.width / 2;
            label.y = winSize.height / 2 + 50;
            this.addChild(label, 100);
        }
    }
});

var ActionSkew = ActionDemo.extend({
    onEnter : function() {
        this._super();

        this.centerSprite();

        var actionTo = cc.skewTo(2, 37.2, -37.2);
        var actionToBack = cc.skewTo(2, 0, 0);
        var actionBy = cc.skewBy(2, 0, -90);
        var actionBy2 = cc.skewBy(2, 45.0, 45.0);

        var delay = cc.delayTime(0.25);

        this._tamara.runAction(cc.sequence(actionTo, delay, actionToBack));
        this._grossini.runAction(cc.sequence(actionBy,delay.clone(), actionBy.reverse()));
        this._kathia.runAction(cc.sequence(actionBy2, delay.clone(), actionBy2.reverse()));
    }
});

var ActionSkewRotateScale = ActionDemo.extend({
    onEnter : function() {
        this._super();

        var winSize = cc.director.getWinSize();

        var boxW = 100, boxH = 100;
        var box = new cc.LayerColor(cc.color(255, 255, 0, 255));
        box.anchorX = 0;
        box.anchorY = 0;
        box.x = (winSize.width - boxW) / 2;
        box.y = (winSize.height - boxH) / 2;
        box.width = boxW;
        box.height = boxH;

        var markrside = 10.0;
        var uL = new cc.LayerColor(cc.color(255, 0, 0, 255));
        box.addChild(uL);
        uL.width = markrside;
        uL.height = markrside;
        uL.x = 0;
        uL.y = boxH - markrside;
        uL.anchorX = 0;
        uL.anchorY = 0;

        var uR = new cc.LayerColor(cc.color(0, 0, 255, 255));
        box.addChild(uR);
        uR.attr({
            width : markrside,
            height : markrside,
            x : boxW - markrside,
            y : boxH - markrside,
            anchorX : 0,
            anchorY : 0
        });

        this.addChild(box);

        var actionTo = cc.skewTo(2, 0, 2);
        var rotateTo = cc.rotateTo(2, 61.0);
        var actionScaleTo = cc.scaleTo(2, -0.44, 0.47);

        var actionScaleToBack = cc.scaleTo(2, 1.0, 1.0);
        var rotateToBack = cc.rotateTo(2, 0);
        var actionToBack = cc.skewTo(2, 0, 0);

        var delay = cc.delayTime(0.25);

        box.runAction(cc.sequence(actionTo, delay, actionToBack));
        box.runAction(cc.sequence(rotateTo, delay.clone(), rotateToBack));
        box.runAction(cc.sequence(actionScaleTo, delay.clone(), actionScaleToBack));
    }
});

var ActionBezier = ActionDemo.extend({
    onEnter:function () {
        //----start8----onEnter

        this._super();

        var s = cc.director.getWinSize();

        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Bezier curve, make it (0,0)
        //

        this.centerSprite();

        var delay = cc.delayTime(0.25);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints = [ cc.p(0, 374),
            cc.p(300, -374),
            cc.p(300, 100) ];

        var bezierForward = cc.bezierBy(2, controlPoints);
        var bezierForwardBack = bezierForward.reverse();

        this._grossini.runAction(cc.sequence(bezierForward, delay, bezierForwardBack, delay.clone()).repeatForever());

        this._tamara.x = 80;
        this._tamara.y = 160;
        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints2 = [ cc.p(100, s.height / 2),
            cc.p(200, -s.height / 2),
            cc.p(240, 160) ];
        var bezierTo1 = cc.bezierTo(2, controlPoints2);
        this._tamara.runAction(bezierTo1);

        // // sprite 3
        var controlPoints3 = controlPoints2.slice();
        this._kathia.x = 400;
        this._kathia.y = 160;
        var bezierTo2 = cc.bezierTo(2, controlPoints3);
        this._kathia.runAction(bezierTo2);
    }
});

var ActionBezierToCopy = ActionDemo.extend({
    onEnter: function () {
        //----start9----onEnter
        this._super();

        this.centerSprite();

        var winSize = cc.director.getWinSize();
        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints2 = [ cc.p(100, winSize.height / 2),
            cc.p(200, -winSize.height / 2),
            cc.p(240, 160) ];
        var bezierTo1 = cc.bezierTo(2, controlPoints2);

        this._tamara.x = 80;
        this._tamara.y = 160;

        this._kathia.x = 80;
        this._kathia.y = 160;
        var bezierTo2 = bezierTo1.clone();

        this._tamara.runAction(bezierTo1);
        this._kathia.runAction(bezierTo2);
    }
});

var ActionNewScene = cc.Scene.extend({
    onEnter : function() {
        this._super();
        var layer = new ActionBezierToCopy();
        this.addChild(layer);
    }
});