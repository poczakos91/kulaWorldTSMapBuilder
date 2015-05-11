/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="directionMap.ts"/>
var KeyEventHandler = (function () {
    function KeyEventHandler(cameraHandler) {
        this.cameraHandler = cameraHandler;
        var body = $('body');
        body.on("keydown", this.listenKeyDowns.bind(this));
    }
    KeyEventHandler.prototype.addMap = function (map) {
        this.map = map;
    };
    KeyEventHandler.prototype.listenKeyDowns = function (e) {
        console.log(e.which);
        switch (e.which) {
            case 38:
                this.map.moveCursor(Direction.v.up);
                break;
            case 40:
                this.map.moveCursor(Direction.v.down);
                break;
            case 37:
                this.map.moveCursor(Direction.v.left);
                break;
            case 39:
                this.map.moveCursor(Direction.v.right);
                break;
            case 87:
                this.map.moveCursor(Direction.v.forward);
                break;
            case 83:
                this.map.moveCursor(Direction.v.backward);
                break;
            case 32:
                this.map.createCube();
                break;
            case 88:
                this.map.deleteCube();
                break;
            case 66:
                break;
        }
    };
    return KeyEventHandler;
})();
//# sourceMappingURL=keyeventhandler.js.map