/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>

class Idle {
    animationFrameID: number;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    cameraHandler: CameraHandler;
    onIdleWithContext: any;

    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, cameraHandler: CameraHandler) {
        this.renderer = renderer;
        this.scene = scene;
        this.cameraHandler = cameraHandler;
        this.onIdleWithContext = this.onIdle.bind(this);
    }

    onIdle(): void {
        this.animationFrameID = window.requestAnimationFrame(this.onIdleWithContext);
        this.renderer.render(this.scene, this.cameraHandler.camera);
        this.cameraHandler.update();
    }

    removeOnIdle(): void {
        window.cancelAnimationFrame(this.animationFrameID);
    }
}

