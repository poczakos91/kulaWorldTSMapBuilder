/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="directionMap.ts"/>
var KeyEventHandler = (function () {
    function KeyEventHandler(cameraHandler) {
        this.cameraHandler = cameraHandler;
        this.oPushed = false;
        this.pPushed = false;
        this.kPushed = false;
        this.contextListenKeyDowns = this.listenKeyDowns.bind(this);
        this.contextListenKeyUp = this.listenKeyUp.bind(this);
        this.contextListenMouseDown = this.listenMouseDown.bind(this);
    }
    KeyEventHandler.prototype.addMap = function (map) {
        this.map = map;
        this.addListeners();
    };
    KeyEventHandler.prototype.listenKeyDowns = function (e) {
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
            case 82:
                this.cameraHandler.camera.position.set(0, 0, -10);
                this.cameraHandler.camera.up.set(0, 1, 0);
                break;
            case 79:
                this.oPushed = true;
                break;
            case 80:
                this.pPushed = true;
                break;
            case 75:
                this.kPushed = true;
                break;
        }
    };
    KeyEventHandler.prototype.listenKeyUp = function (e) {
        switch (e.which) {
            case 79:
                this.oPushed = false;
                break;
            case 80:
                this.pPushed = false;
                break;
            case 75:
                this.kPushed = false;
                break;
        }
    };
    KeyEventHandler.prototype.listenMouseDown = function (e) {
        var vec = new THREE.Vector3((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5);
        vec.unproject(this.cameraHandler.camera);
        var rayCaster = new THREE.Raycaster(this.cameraHandler.camera.position, vec.sub(this.cameraHandler.camera.position).normalize());
        var intersects = rayCaster.intersectObjects(this.map.cubeViews, false);
        //switching starting cube and face
        if (this.oPushed) {
            if (intersects.length) {
                if (this.map.start) {
                    this.map.getCubeByID(this.map.start.startingCube).view.paintFace(this.map.start.startingFace, 0xffffff);
                    this.map.getCubeByID(this.map.start.startingCube).view.startFaces = { i: -1, j: -1 };
                }
                intersects[0].object.paintFace(intersects[0].object.triangleToString(intersects[0].faceIndex), 0x0000ff);
                //randomly choosing a starting direction
                var startingDirection = new THREE.Vector3(1, 1, 1).sub(intersects[0].object.triangleToVector(intersects[0].faceIndex));
                if (startingDirection.x == 2)
                    startingDirection.x = 0;
                if (startingDirection.y == 2)
                    startingDirection.y = 0;
                if (startingDirection.z == 2)
                    startingDirection.z = 0;
                if (startingDirection.x == 1)
                    startingDirection.x = 0;
                else
                    startingDirection.y = 0;
                this.map.start = {
                    startingCube: intersects[0].object.ownID,
                    startingFace: intersects[0].object.triangleToString(intersects[0].faceIndex),
                    startingDirection: Direction.vectorToString(startingDirection),
                    color: "0xffffff",
                    texture: { colorMapURL: "res/img/BasketballColor.jpg" }
                };
            }
        }
        else if (this.pPushed) {
            if (intersects.length) {
                if (this.map.finish) {
                    this.map.getCubeByID(this.map.finish.id).view.paintFace(this.map.finish.face, 0xffffff);
                    this.map.getCubeByID(this.map.start.startingCube).view.finishFaces = { i: -1, j: -1 };
                }
                intersects[0].object.paintFace(intersects[0].object.triangleToString(intersects[0].faceIndex), 0x00ff00);
                this.map.finish = {
                    id: intersects[0].object.ownID,
                    face: intersects[0].object.triangleToString(intersects[0].faceIndex)
                };
            }
        }
        else if (this.kPushed) {
            if (intersects.length) {
                var selectedCube = this.map.getCubeByID(intersects[0].object.ownID);
                selectedCube.addKey(selectedCube.view.triangleToString(intersects[0].faceIndex));
            }
        }
    };
    KeyEventHandler.prototype.addListeners = function () {
        var body = $('body');
        body.on("keydown", this.contextListenKeyDowns);
        body.on("keyup", this.contextListenKeyUp);
        body.on("mousedown", this.contextListenMouseDown);
    };
    KeyEventHandler.prototype.removeListeners = function () {
        var body = $('body');
        body.unbind("keydown", this.contextListenKeyDowns);
        body.unbind("keyup", this.contextListenKeyUp);
        body.unbind("mousedown", this.contextListenMouseDown);
    };
    return KeyEventHandler;
})();
//# sourceMappingURL=keyeventhandler.js.map