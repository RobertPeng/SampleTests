/**
 * Created by John on 15/10/6.
 */

cc.BuilderReader.registerController("HelloCocosBuilderLayer", {
    _openTest : function(ccbFileName) {
        //cc.BuilderReader.setResourcePath("res/ccbpub/ccb/");
        var node = cc.BuilderReader.load(ccbFileName, this);
        //this["mTestTitleLabelTTF"].setString(ccbFileName);
        var scene = new cc.Scene();
        if(node)
            scene.addChild(node);

        cc.director.pushScene(new cc.TransitionFade(0.5, scene, cc.color(0, 0, 0)));
    },

    "onMenuTestClicked" : function() {
        this._openTest("res/ccbpub/ccb/TestMenus.ccbi");
    },

    "onSpriteTestClicked" : function() {
        this._openTest("res/ccbpub/ccb/TestSprites.ccbi");
    },

    "onButtonTestClicked" : function() {
        this._openTest("res/ccbpub/ccb/TestButtons.ccbi");
    },

    "onAnimationsTestClicked" : function() {

    },

    "onParticleSystemTestClicked" : function() {
        this._openTest("res/ccbpub/ccb/TestParticleSystems.ccbi");
    },

    "onScrollViewTestClicked" : function() {
        this._openTest("res/ccbpub/ccb/TestScrollViews.ccbi");
    },

    "onTimelineCallbackSoundClicked" : function() {
        this._openTest("res/ccbpub/ccb/TestTimelineCallback.ccbi");
    }
});