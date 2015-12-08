/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../view/cubeview.ts"/>
var Cube = (function () {
    function Cube(id, size, color, position) {
        this.id = id;
        this.position = position.clone();
        this.keys = [];
        this.view = new CubeView(size, color, this.position.x * size, this.position.y * size, this.position.z * size, this.id);
    }
    Cube.prototype.getView = function () {
        return this.view;
    };
    Cube.prototype.addKey = function (toFace) {
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i] === toFace) {
                this.view.removeKey(toFace);
                this.keys.splice(i, 1);
                return;
            }
        }
        this.keys.push(toFace);
        this.view.addKey(toFace);
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
            keys: this.keys
        };
        return cubeDesc;
    };
    return Cube;
})();
//# sourceMappingURL=cube.js.map