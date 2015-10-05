/**
 *
 * Created by Peng on 15/10/3.
 */

cc.TAG_LAYER = 1;

var layerTestSceneIdx = -1;
var LAYERTEST2_LAYER1_TAG = 1;
var LAYERTEST2_LAYER2_TAG = 2;

var LayerTestScene = cc.Scene.extend({
    runThisTest:function (num) {
        layerTestSceneIdx = (num || num == 0) ? (num - 1) : -1;
        this.addChild(nextLayerTest());
        cc.director.runScene(this);
    }
});

var LayerTest = BaseTestLayer.extend({
    _title:null,


    title:function () {
        return "No title";
    },
    subtitle:function () {
        return "";
    },

    onRestartCallback:function (sender) {
        var s = new LayerTestScene();
        s.addChild(restartLayerTest());
        cc.director.runScene(s);

    },
    onNextCallback:function (sender) {
        var s = new LayerTestScene();
        s.addChild(nextLayerTest());
        cc.director.runScene(s);

    },
    onBackCallback:function (sender) {
        var s = new LayerTestScene();
        s.addChild(previousLayerTest());
        cc.director.runScene(s);

    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfLayerTest.length-1) - layerTestSceneIdx );
    },

    getTestNumber:function() {
        return layerTestSceneIdx;
    }

});

var LayerTest1 = LayerTest.extend({
    onEnter : function() {
        this._super();

        if( 'touches' in cc.sys.capabilities )
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved:function (touches, event) {
                    event.getCurrentTarget().updateSize(touches[0].getLocation());
                }
            }, this);
        else if ('mouse' in cc.sys.capabilities )
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().updateSize(event.getLocation());
                }
            }, this);

        var winSize = cc.director.getWinSize();

        var layer = new cc.LayerColor(cc.color(255, 0, 0, 128));
        layer.ignoreAnchor = false;
        layer.anchorX = 0.5;
        layer.anchorY = 0.5;
        layer.setContentSize(200, 200);
        layer.x = winSize.width / 2;
        layer.y = winSize.height / 2;
        this.addChild(layer, 1, cc.TAG_LAYER);
    },

    updateSize:function (location) {
        //----start0----updateSize
        var l = this.getChildByTag(cc.TAG_LAYER);

        var winSize = cc.director.getWinSize();

        l.width = Math.abs(location.x - winSize.width / 2) * 2;
        l.height = Math.abs(location.y - winSize.height / 2) * 2;
        //----end0----
    }
});

var LayerTest2 = LayerTest.extend({
    onEnter : function() {
        this._super();

        var s = cc.director.getWinSize();
        var layer1 = new cc.LayerColor(cc.color(255, 255, 0, 80), 100, 300);
        layer1.x = s.width / 3;
        layer1.y = s.height / 2;
        layer1.ignoreAnchorPointForPosition(false);
        this.addChild(layer1, 1, LAYERTEST2_LAYER1_TAG);


    }
});

var arrayOfLayerTest = [
    LayerTest1
];

var nextLayerTest = function () {
    layerTestSceneIdx++;
    layerTestSceneIdx = layerTestSceneIdx % arrayOfLayerTest.length;

    return new arrayOfLayerTest[layerTestSceneIdx]();
};
var previousLayerTest = function () {
    layerTestSceneIdx--;
    if (layerTestSceneIdx < 0)
        layerTestSceneIdx += arrayOfLayerTest.length;

    return new arrayOfLayerTest[layerTestSceneIdx]();
};
var restartLayerTest = function () {
    return new arrayOfLayerTest[layerTestSceneIdx]();
};