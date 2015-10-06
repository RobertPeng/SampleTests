/**
 * Created by John on 15/10/6.
 */

cc.BuilderReader.registerController("TestButtonsLayer", {
    "onCCControlButtonClicked" : function(sender, controlEvent) {
        var str = (function() {
            switch (controlEvent) {
                case cc.CONTROL_EVENT_TOUCH_DOWN : return "Touch Down.";
                case cc.CONTROL_EVENT_TOUCH_DRAG_INSIDE : return "Touch Drag Inside.";
                case cc.CONTROL_EVENT_TOUCH_DRAG_OUTSIDE : return "Touch Drag Outside.";
                case cc.CONTROL_EVENT_TOUCH_DRAG_ENTER : return "Touch Drag Enter.";
                case cc.CONTROL_EVENT_TOUCH_DRAG_EXIT : return "Touch Drag Exit.";
                case cc.CONTROL_EVENT_TOUCH_UP_INSIDE : return "Touch Up Inside.";
                case cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE : return "Touch Up Outside.";
                case cc.CONTROL_EVENT_TOUCH_CANCEL : return "Touch Cancel.";
                case cc.CONTROL_EVENT_VALUECHANGED : return "Value Changed.";
            }
            return "";
        })();
        this["mCCControlEventLabel"].setString(str);
    }
});
