/**
 * Created by John on 15/10/6.
 */

var CocosBuilderTestScene = cc.Scene.extend({
    runThisTest : function() {
        cc.BuilderReader.setResourcePath("res/ccbpub/");
        var node = cc.BuilderReader.load("res/ccbpub/HelloCocosBuilder.ccbi");
        if(node)
            this.addChild(node);
        cc.director.runScene(this);
    }
});