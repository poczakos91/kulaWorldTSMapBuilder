/// <reference path="../../libs/ts/jquery/jquery.d.ts"/>
/// <reference path="camera/camerahandler.ts"/>
/// <reference path="model/map.ts"/>
/// <reference path="directionMap.ts"/>

class KeyEventHandler {
    cameraHandler: CameraHandler;
    map: MapModel;

    constructor(cameraHandler: CameraHandler) {
        this.cameraHandler = cameraHandler;

        var body = $('body');
        body.on("keydown", this.listenKeyDowns.bind(this));
    }

    addMap(map: MapModel) {
        this.map = map;
    }

    listenKeyDowns(e) {
        console.log(e.which);
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
            case 87 :                                   //FORWARD
                this.map.moveCursor(Direction.v.forward);
                break;
            case 83 :                                   //BACKWARD
                this.map.moveCursor(Direction.v.backward);
                break;
            case 32 :                                   //SPACE (create cube)
                this.map.createCube();
                break;
            case 88 :                                   //X (remove cube)
                this.map.deleteCube();
                break;
            case 66:                                    //'b' just for testing

                break;
        }
    }
}