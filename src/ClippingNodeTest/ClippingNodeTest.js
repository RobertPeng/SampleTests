
var TAG_TITLELABEL = 1;
var TAG_SUBTITLELABEL = 2;
var TAG_STENCILNODE = 100;
var TAG_CLIPPERNODE = 101;
var TAG_CONTENTNODE = 102;

var clippingNodeTestSceneIdx = -1;

var BaseClippingNodeTest = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
        this.setup();
    },

    onRestartCallback:function (sender) {
        var s = new ClippingNodeTestScene();
        s.addChild(restartClippingNodeTest());
        cc.director.runScene(s);
    },
    onNextCallback:function (sender) {
        var s = new ClippingNodeTestScene();
        s.addChild(nextClippingNodeTest());
        cc.director.runScene(s);
    },
    onBackCallback:function (sender) {
        var s = new ClippingNodeTestScene();
        s.addChild(previousClippingNodeTest());
        cc.director.runScene(s);
    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfClippingNodeTest.length-1) - clippingNodeTestSceneIdx );
    },

    getTestNumber:function() {
        return clippingNodeTestSceneIdx;
    }

});

var BasicTest = BaseClippingNodeTest.extend({
    title:function () {
        return "Basic Test";
    },

    subtitle:function () {
        return "";
    },

    setup:function () {
        var winSize = cc.director.getWinSize();

        var stencil = this.stencil();
        stencil.tag = TAG_STENCILNODE;
        stencil.x = 50;
        stencil.y = 50;

        var clipper = this.clipper();
        clipper.tag = TAG_CLIPPERNODE;
        clipper.anchorX = 0.5;
        clipper.anchorY = 0.5;
        clipper.x = winSize.width / 2 - 50;
        clipper.y = winSize.height / 2 - 50;
        clipper.stencil = stencil;
        this.addChild(clipper);

        var content = this.content();
        content.x = 50;
        content.y = 50;
        clipper.addChild(content);
        //content.x = 400;
        //content.y = 225;
        //this.addChild(content);
    },

    actionRotate:function () {
        return cc.rotateBy(1.0, 90.0).repeatForever();
    },

    actionScale:function () {
        var scale = cc.scaleBy(1.33, 1.5);
        return cc.sequence(scale, scale.reverse()).repeatForever();
    },

    shape:function () {
        var shape = new cc.DrawNode();
        var triangle = [cc.p(-100, -100),cc.p(100, -100), cc.p(0, 100)];

        var green = cc.color(0, 255, 0, 255);
        shape.drawPoly(triangle, green, 3, green);
        return shape;
    },

    grossini:function () {
        var grossini = new cc.Sprite(res.s_pathGrossini);
        grossini.scale = 1.5;
        return grossini;
    },

    stencil:function () {
        return null;
    },

    clipper:function () {
        return new cc.ClippingNode();
    },

    content:function () {
        return null;
    }
});

var ShapeTest = BasicTest.extend({
    title:function () {
        return "Shape Basic Test";
    },

    subtitle:function () {
        return "A DrawNode as stencil and Sprite as content";
    },

    stencil:function () {
        var node = this.shape();
        node.runAction(this.actionRotate());
        return node;
    },

    content:function () {
        var node = this.grossini();
        node.runAction(this.actionScale());
        return node;
    }
});

var ScrollViewDemo = BaseClippingNodeTest.extend({
    _scrolling: false,
    _lastPoint: null,

    title: function () {
        return "Scroll View Demo";
    },

    subtitle: function () {
        return "Move/drag to scroll the content";
    },

    setup: function () {
        var clipper = new cc.ClippingNode();
        clipper.tag = TAG_CLIPPERNODE;
        clipper.width = 200;
        clipper.height = 200;
        clipper.anchorX = 0.5;
        clipper.anchorY = 0.5;
        clipper.x = this.width / 2;
        clipper.y = this.height / 2;
        clipper.runAction(cc.rotateBy(1, 45).repeatForever());
        this.addChild(clipper);

        var stencil = new cc.DrawNode();
        var rectangle = [cc.p(0,0), cc.p(clipper.width, 0),
            cc.p(clipper.width, clipper.height),
            cc.p(0, clipper.height)];

        var white = cc.color(255, 255, 255, 255);
        stencil.drawPoly(rectangle, white, 1, white);
        clipper.stencil = stencil;

        var content = new cc.Sprite(res.s_back2_png);
        content.tag = TAG_CONTENTNODE;
        content.anchorX = 0.5;
        content.anchorY = 0.5;
        content.x = clipper.width / 2;
        content.y = clipper.height / 2;
        clipper.addChild(content);

        this._scrolling = false;

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function (touches, event) {
                if (!touches || touches.length == 0)
                    return;
                var target = event.getCurrentTarget();

                var touch = touches[0];
                var clipper = target.getChildByTag(TAG_CLIPPERNODE);
                var point = clipper.convertToNodeSpace(touch.getLocation());
                var rect = cc.rect(0, 0, clipper.width, clipper.height);
                target._scrolling = cc.rectContainsPoint(rect, point);
                target._lastPoint = point;
            },

            onTouchesMoved: function (touches, event) {
                var target = event.getCurrentTarget();
                if (!target._scrolling)
                    return;

                if (!touches || touches.length == 0)
                    return;
                var touch = touches[0];
                var clipper = target.getChildByTag(TAG_CLIPPERNODE);
                var point = clipper.convertToNodeSpace(touch.getLocation());
                var diff = cc.pSub(point, target._lastPoint);
                var content = clipper.getChildByTag(TAG_CONTENTNODE);
                content.setPosition(cc.pAdd(content.getPosition(), diff));
                target._lastPoint = point;
            },

            onTouchesEnded: function (touches, event) {
                var target = event.getCurrentTarget();
                if (!target._scrolling) return;
                target._scrolling = false;
            }
        }), this);
    }
});

var arrayOfClippingNodeTest = [
    ScrollViewDemo,
    ShapeTest
];

var nextClippingNodeTest = function () {
    clippingNodeTestSceneIdx++;
    clippingNodeTestSceneIdx = clippingNodeTestSceneIdx % arrayOfClippingNodeTest.length;

    return new arrayOfClippingNodeTest[clippingNodeTestSceneIdx]();
};

var previousClippingNodeTest = function () {
    clippingNodeTestSceneIdx--;
    if (clippingNodeTestSceneIdx < 0)
        clippingNodeTestSceneIdx += arrayOfClippingNodeTest.length;

    return new arrayOfClippingNodeTest[clippingNodeTestSceneIdx]();
};

var restartClippingNodeTest = function () {
    return new arrayOfClippingNodeTest[clippingNodeTestSceneIdx]();
};

var ClippingNodeTestScene = cc.Scene.extend({
    runThisTest:function (num) {
        clippingNodeTestSceneIdx = (num || num == 0) ? (num - 1) : -1;
        cc.director.runScene(this);
        var layer = nextClippingNodeTest();
        this.addChild(layer);
    }
});