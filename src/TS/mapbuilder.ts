/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="space.ts"/>
/// <reference path="lighting.ts"/>
/// <reference path="idle.ts"/>
/// <reference path="keyeventhandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="model/maploader.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class MapBuilder {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    background: Space;
    lighting: Lighting;
    idleLoop: Idle;
    cameraHandler: CameraHandler;
    map: MapModel;
    keyHandler: KeyEventHandler;

    constructor() {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.shadowMapEnabled = true;

        this.lighting = new Lighting(this.scene);

        this.background = new Space(this.scene);

        this.cameraHandler = new CameraHandler();
        this.keyHandler = new KeyEventHandler(this.cameraHandler);
        window.addEventListener('resize', this.onWindowResize.bind(this));


        $("#WebGL-output").append(this.renderer.domElement);
        this.renderer.render(this.scene,this.cameraHandler.camera);
    }

    private onWindowResize() {
        this.cameraHandler.camera.aspect = window.innerWidth/window.innerHeight;
        this.cameraHandler.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    showMap(rawMap) {
        this.map = new MapModel();
        this.map.generateModel(JSON.parse(rawMap));
        this.scene.add(this.map.view);
        this.keyHandler.addMap(this.map);

        this.idleLoop = new Idle(this.renderer,this.scene,this.cameraHandler);
        this.idleLoop.onIdle();
    }
}
