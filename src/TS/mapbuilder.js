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
var MapBuilder = (function () {
    function MapBuilder() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
        this.lighting = new Lighting(this.scene);
        this.background = new Space(this.scene);
        this.cameraHandler = new CameraHandler();
        this.keyHandler = new KeyEventHandler(this.cameraHandler);
        window.addEventListener('resize', this.onWindowResize.bind(this));
        $("#WebGL-output").append(this.renderer.domElement);
        this.renderer.render(this.scene, this.cameraHandler.camera);
    }
    MapBuilder.prototype.onWindowResize = function () {
        this.cameraHandler.camera.aspect = window.innerWidth / window.innerHeight;
        this.cameraHandler.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    MapBuilder.prototype.showMap = function (rawMap) {
        this.map = new MapModel();
        this.map.generateModel(JSON.parse(rawMap));
        this.scene.add(this.map.view);
        this.keyHandler.addMap(this.map);
        this.idleLoop = new Idle(this.renderer, this.scene, this.cameraHandler);
        this.idleLoop.onIdle();
    };
    MapBuilder.prototype.saveMap = function () {
        var mapName = $("#mapNameTextField").text();
        var jsonMap = {
            name: mapName,
            vesion: '0.0.1',
            backgroundObjects: [],
            cubeSize: 1,
            target: this.map.getTarget(),
            messageorientation: {
                position: {
                    x: 0,
                    y: 4,
                    z: -4
                },
                rotation: {
                    x: 0,
                    y: Math.PI,
                    z: 0
                },
                size: 0.8
            },
            ball: this.map.getBall(),
            elements: this.map.getCubes()
        };
        $.ajax({
            url: "src/PHP/createMap.php",
            type: "POST",
            data: { fileName: mapName + ".json", data: JSON.stringify(jsonMap) }
        }).done(function (data) {
            console.log("SUCCESS");
        });
    };
    return MapBuilder;
})();
//# sourceMappingURL=mapbuilder.js.map