/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/threejs/three-trackballcontrols.d.ts"/>
/// <reference path="../faceMap.ts"/>

class CameraHandler {
    camera:THREE.PerspectiveCamera;
    tbControl:THREE.TrackballControls;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, 0, -10);
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));

        this.tbControl = new THREE.TrackballControls(this.camera);
        this.tbControl.noZoom = false;
        this.tbControl.noPan = true;
        this.tbControl.rotateSpeed = 5;
        this.tbControl.zoomSpeed = 10;
        this.tbControl.staticMoving = true;
        this.tbControl.minDistance = 5;
        this.tbControl.maxDistance = 100;
        this.tbControl.enabled = true;
    }

    update():void {
        this.tbControl.update();
    }
}