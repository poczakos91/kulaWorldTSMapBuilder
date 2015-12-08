/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="directionMap.ts"/>

class KeyEventHandler {
    cameraHandler: CameraHandler;
    map: MapModel;
    oPushed: boolean;
    pPushed: boolean;
    kPushed: boolean;
    contextListenKeyDowns: any;
    contextListenKeyUp: any;
    contextListenMouseDown: any;

    constructor(cameraHandler: CameraHandler) {
        this.cameraHandler = cameraHandler;
        this.oPushed = false;
        this.pPushed = false;
        this.kPushed = false;

        this.contextListenKeyDowns = this.listenKeyDowns.bind(this);
        this.contextListenKeyUp = this.listenKeyUp.bind(this);
        this.contextListenMouseDown = this.listenMouseDown.bind(this);
    }

    addMap(map: MapModel) {
        this.map = map;
        this.addListeners();
    }

    listenKeyDowns(e) {
        switch(e.which) {
            case 38 :                                   //UP
                this.map.moveCursor(Direction.v.up);
                break;
            case 40 :                                   //DOWN
                this.map.moveCursor(Direction.v.down);
                break;
            case 37 :                                   //LEFT
                this.map.moveCursor(Direction.v.left);
                break;
            case 39 :                                   //RIGHT
                this.map.moveCursor(Direction.v.right);
                break;
            case 87 :                                   //FORWARD (w)
                this.map.moveCursor(Direction.v.forward);
                break;
            case 83 :                                   //BACKWARD (s)
                this.map.moveCursor(Direction.v.backward);
                break;
            case 32 :                                   //SPACE (create cube)
                this.map.createCube();
                break;
            case 88 :                                   //x (remove cube)
                this.map.deleteCube();
                break;
            case 82:                                    //r (reset camera to starting position)
                this.cameraHandler.camera.position.set(0,0,-10);
                this.cameraHandler.camera.up.set(0,1,0);
                break;
            case 79:                                    //o (enables of switching starting cube and face)
                this.oPushed = true;
                break;
            case 80:                                    //p (enables of switching target cube and face)
                this.pPushed = true;
                break;
            case 75:                                    //k (enables of adding keys to the map)
                this.kPushed = true;
                break;
        }
    }

    listenKeyUp(e) {
        switch(e.which) {
            case 79:                                      //O (disables of switching starting cube and face)
                this.oPushed = false;
                break;
            case 80:                                      //P (disables of switching target cube and face)
                this.pPushed = false;
                break;
            case 75:                                    //k (enables of adding keys to the map)
                this.kPushed = false;
                break;
        }
    }

    listenMouseDown(e) {
        var vec: THREE.Vector3 = new THREE.Vector3((e.clientX/window.innerWidth)*2-1, -(e.clientY/window.innerHeight)*2+1, 0.5);
        vec.unproject(this.cameraHandler.camera);
        var rayCaster: THREE.Raycaster = new THREE.Raycaster(this.cameraHandler.camera.position, vec.sub(this.cameraHandler.camera.position).normalize());
        var intersects = rayCaster.intersectObjects(this.map.cubeViews, false);
        //switching starting cube and face
        if(this.oPushed) {
            if(intersects.length) {
                if(this.map.start) {
                    this.map.getCubeByID(this.map.start.startingCube).view.paintFace(this.map.start.startingFace, 0xffffff);
                    this.map.getCubeByID(this.map.start.startingCube).view.startFaces = {i: -1,j: -1};
                }
                (<CubeView>intersects[0].object).paintFace((<CubeView>intersects[0].object).triangleToString(intersects[0].faceIndex), 0x0000ff);
                //randomly choosing a starting direction
                var startingDirection: THREE.Vector3 = new THREE.Vector3(1,1,1).sub((<CubeView>intersects[0].object).triangleToVector(intersects[0].faceIndex));
                if(startingDirection.x == 2) startingDirection.x = 0;
                if(startingDirection.y == 2) startingDirection.y = 0;
                if(startingDirection.z == 2) startingDirection.z = 0;
                if(startingDirection.x == 1) startingDirection.x = 0;
                else startingDirection.y = 0;
                this.map.start = {
                    startingCube: (<CubeView>intersects[0].object).ownID,
                    startingFace: (<CubeView>intersects[0].object).triangleToString(intersects[0].faceIndex),
                    startingDirection: Direction.vectorToString(startingDirection),
                    color: "0xffffff",
                    texture: {colorMapURL: "res/img/BasketballColor.jpg"}
                }
            }
        }
        //switching target cube and face
        else if(this.pPushed) {
            if(intersects.length) {
                if(this.map.finish) {
                    this.map.getCubeByID(this.map.finish.id).view.paintFace(this.map.finish.face, 0xffffff);
                    this.map.getCubeByID(this.map.start.startingCube).view.finishFaces = {i:-1, j:-1};
                }
                (<CubeView>intersects[0].object).paintFace((<CubeView>intersects[0].object).triangleToString(intersects[0].faceIndex), 0x00ff00);
                this.map.finish = {
                    id: (<CubeView>intersects[0].object).ownID,
                    face: (<CubeView>intersects[0].object).triangleToString(intersects[0].faceIndex)
                }
            }
        }
        //adding key to a cube's face
        else if(this.kPushed) {
            if(intersects.length) {
                var selectedCube = this.map.getCubeByID((<CubeView>intersects[0].object).ownID);
                selectedCube.addKey(selectedCube.view.triangleToString(intersects[0].faceIndex));
            }
        }
    }

    addListeners() {
        var body = $('body');
        body.on("keydown", this.contextListenKeyDowns);
        body.on("keyup", this.contextListenKeyUp);
        body.on("mousedown", this.contextListenMouseDown);
    }

    removeListeners() {
        var body = $('body');
        body.unbind("keydown", this.contextListenKeyDowns);
        body.unbind("keyup", this.contextListenKeyUp);
        body.unbind("mousedown", this.contextListenMouseDown);
    }
}