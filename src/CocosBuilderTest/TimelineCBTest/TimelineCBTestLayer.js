/**
 * Created by John on 15/10/7.
 */

cc.BuilderReader.registerController("TestTimelineLayer", {
    "onCallback1" : function(sender) {
        var label = this["helloLabel"];
        label.runAction(cc.rotateBy(1, 360));
        label.setString("Callback 1");
    },

    "onCallback2" : function(sender) {
        var label = this["helloLabel"];
        label.runAction(cc.rotateBy(1, -360));
        label.setString("Callback 2");
    }
});
