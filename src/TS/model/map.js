/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../model/cube.ts"/>
/// <reference path="../view/mapview.ts"/>
/// <reference path="../view/cubeview.ts"/>
/// <reference path="../keyeventhandler.ts"/>
/// <reference path="../faceMap.ts"/>
/// <reference path="../directionMap.ts"/>
var MapModel = (function () {
    function MapModel() {
    }
    MapModel.prototype.generateModel = function (rawMap) {
        this.cubes = [];
        this.cubeViews = [];
        for (var i = 0; i < rawMap.elements.length; i++) {
            for (var j = 0; j < rawMap.elements[i].length; j++) {
                for (var k = 0; k < rawMap.elements[i][j].length; k++) {
                    var cube = rawMap.elements[i][j][k];
                    if (cube.id != undefined) {
                        this.cubes.push(new Cube(cube.id, rawMap.cubeSize, parseInt(cube.color, 16), new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z), cube.neighbours));
                        this.cubeViews.push(this.cubes[this.cubes.length - 1].view);
                    }
                }
            }
        }
        //coloring the target cube's target face on the map
        if (rawMap.target.id !== undefined && rawMap.target.id != -1) {
            this.getCubeByID(rawMap.target.id).getView().paintFace(rawMap.target.face, 0x00ff00);
            this.finish = rawMap.target;
        }
        //coloring the ball's starting position
        if (rawMap.ball.startingCube !== undefined && rawMap.ball.startingCube != -1) {
            this.getCubeByID(rawMap.ball.startingCube).getView().paintFace(rawMap.ball.startingFace, 0x0000ff);
            this.start = rawMap.ball;
        }
        this.view = new MapView();
        this.view.appendChildrenFromModel(this.cubes);
        this.view.position.set(0, 0, 0);
        this.makeWireframe();
        this.actPos = new THREE.Vector3();
        this.wireframe[this.actPos.x][this.actPos.y][this.actPos.z].material.visible = true;
    };
    MapModel.prototype.makeWireframe = function () {
        this.wireframe = [];
        for (var i = -5; i < 5; i++) {
            this.wireframe[i] = [];
            for (var j = -5; j < 5; j++) {
                this.wireframe[i][j] = [];
                for (var k = -5; k < 5; k++) {
                    this.wireframe[i][j][k] = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0x00aa00, visible: false, transparent: true, opacity: 0.2, vertexColors: THREE.FaceColors }));
                    this.wireframe[i][j][k].position.set(i, j, k);
                    this.view.add(this.wireframe[i][j][k]);
                }
            }
        }
    };
    MapModel.prototype.moveCursor = function (direction) {
        this.wireframe[this.actPos.x][this.actPos.y][this.actPos.z].material.visible = false;
        this.actPos.add(direction);
        if (this.actPos.x < -5)
            this.actPos.x = -5;
        if (this.actPos.x > 4)
            this.actPos.x = 4;
        if (this.actPos.y < -5)
            this.actPos.y = -5;
        if (this.actPos.y > 4)
            this.actPos.y = 4;
        if (this.actPos.z < -5)
            this.actPos.z = -5;
        if (this.actPos.z > 4)
            this.actPos.z = 4;
        this.wireframe[this.actPos.x][this.actPos.y][this.actPos.z].material.visible = true;
    };
    MapModel.prototype.createCube = function () {
        if (!this.isThereCube(this.actPos)) {
            var newCube = new Cube(this.cubes.length, 1, 0xffffff, this.actPos, []);
            this.view.add(newCube.view);
            this.cubes.push(newCube);
            this.cubeViews.push(newCube.view);
        }
    };
    MapModel.prototype.deleteCube = function () {
        var cube = this.isThereCube(this.actPos);
        debugger;
        if (cube) {
            for (var i = 0; i < this.cubes.length; i++) {
                for (var j = 0; j < this.cubes[i].neighbours.length; j++) {
                    if (this.cubes[i].neighbours[j].toCube === cube.id) {
                        this.cubes[i].neighbours.splice(j, 1);
                        j--;
                    }
                }
            }
            this.cubes.splice(this.cubes.indexOf(cube), 1);
            this.cubeViews.splice(this.cubeViews.indexOf(cube.view), 1);
            this.view.remove(cube.view);
        }
    };
    /**
     * check the position for cube
     * @param pos
     * @returns {any} if there's a cube than this cube, else false
     */
    MapModel.prototype.isThereCube = function (pos) {
        for (var i = 0; i < this.cubes.length; i++) {
            if (this.cubes[i].position.x == pos.x && this.cubes[i].position.y == pos.y && this.cubes[i].position.z == pos.z) {
                return this.cubes[i];
            }
        }
        return false;
    };
    MapModel.prototype.getCubeByID = function (id) {
        for (var i = this.cubes.length - 1; i >= 0; i--) {
            if (this.cubes[i].id == id)
                return this.cubes[i];
        }
        throw "There is no cube with the given id: " + id;
    };
    MapModel.prototype.getTarget = function () {
        return this.finish;
    };
    MapModel.prototype.getBall = function () {
        return this.start;
    };
    MapModel.prototype.getCubes = function () {
        var elements = [];
        elements[0] = [];
        elements[0][0] = [];
        for (var i = 0; i < this.cubes.length; i++) {
            elements[0][0][i] = this.cubes[i].toJSON();
        }
        return elements;
    };
    return MapModel;
})();
//# sourceMappingURL=map.js.map