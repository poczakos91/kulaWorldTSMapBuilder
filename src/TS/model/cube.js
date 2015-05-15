/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../view/cubeview.ts"/>
var Cube = (function () {
    function Cube(id, size, color, position, neighbours) {
        this.id = id;
        this.position = position.clone();
        if (neighbours) {
            this.neighbours = neighbours;
        }
        else {
            this.neighbours = [];
        }
        this.view = new CubeView(size, color, this.position.x * size, this.position.y * size, this.position.z * size, this.id);
    }
    Cube.prototype.getView = function () {
        return this.view;
    };
    Cube.prototype.addNeighbour = function (neighbour) {
        for (var i = 0; i < this.neighbours.length; i++) {
            if (this.neighbours[i].toCube == neighbour.toCube && this.neighbours[i].toFace === neighbour.toFace && this.neighbours[i].fromFace === neighbour.fromFace) {
                return;
            }
        }
        this.neighbours.push(neighbour);
    };
    Cube.prototype.toJSON = function () {
        var cubeDesc = {
            id: this.id,
            type: "cuboid",
            specials: [],
            color: "0xffffff",
            position: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            },
            neighbours: this.neighbours
        };
        return cubeDesc;
    };
    return Cube;
})();
//# sourceMappingURL=cube.js.map