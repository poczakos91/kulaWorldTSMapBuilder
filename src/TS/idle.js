/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
var Idle = (function () {
    function Idle(renderer, scene, cameraHandler) {
        this.renderer = renderer;
        this.scene = scene;
        this.cameraHandler = cameraHandler;
        this.onIdleWithContext = this.onIdle.bind(this);
    }
    Idle.prototype.onIdle = function () {
        this.animationFrameID = window.requestAnimationFrame(this.onIdleWithContext);
        this.renderer.render(this.scene, this.cameraHandler.camera);
        this.cameraHandler.update();
    };
    Idle.prototype.removeOnIdle = function () {
        window.cancelAnimationFrame(this.animationFrameID);
    };
    return Idle;
})();
//# sourceMappingURL=idle.js.map