/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../faceMap.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CubeView = (function (_super) {
    __extends(CubeView, _super);
    function CubeView(size, color, posx, posy, posz, cubeID) {
        var cubeGeometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshLambertMaterial({ color: color, vertexColors: THREE.FaceColors });
        _super.call(this, cubeGeometry, material);
        this.position.set(posx, posy, posz);
        this.i = this.j = 0;
        this.ownID = cubeID;
        this.redFaces = [];
        this.finishFaces = { i: -1, j: -1 };
        this.startFaces = { i: -1, j: -1 };
    }
    CubeView.prototype.paintFace = function (face, color) {
        switch (face) {
            case "top":
                this.i = 4;
                this.j = 5;
                break;
            case "bottom":
                this.i = 6;
                this.j = 7;
                break;
            case "left":
                this.i = 0;
                this.j = 1;
                break;
            case "right":
                this.i = 2;
                this.j = 3;
                break;
            case "front":
                this.i = 8;
                this.j = 9;
                break;
            case "rear":
                this.i = 10;
                this.j = 11;
        }
        this.geometry.faces[this.i].color.setHex(color);
        this.geometry.faces[this.j].color.setHex(color);
        if (color == 0x00ff00) {
            this.startFaces.i = this.i;
            this.startFaces.j = this.j;
        }
        if (color == 0x0000ff) {
            this.finishFaces.i = this.i;
            this.finishFaces.j = this.j;
        }
        this.geometry.colorsNeedUpdate = true;
    };
    CubeView.prototype.chooseNeighbourFace = function (faceIndex) {
        var faceIndex2 = faceIndex % 2 == 0 ? faceIndex + 1 : faceIndex - 1;
        for (var i = 0; i < this.redFaces.length; i++) {
            if ((faceIndex == this.redFaces[i].face1 && faceIndex2 == this.redFaces[i].face2) || (faceIndex == this.redFaces[i].face2 && faceIndex2 == this.redFaces[i].face1)) {
                this.geometry.faces[faceIndex].color.setHex(0xffffff);
                this.geometry.faces[faceIndex2].color.setHex(0xffffff);
                this.geometry.colorsNeedUpdate = true;
                this.redFaces.splice(i, 1);
                return;
            }
        }
        var face = this.triangleToVector(faceIndex);
        this.redFaces.push({
            face: face,
            face1: faceIndex,
            face2: faceIndex2
        });
        this.geometry.faces[faceIndex].color.setHex(0xff0000);
        this.geometry.faces[faceIndex2].color.setHex(0xff0000);
        this.geometry.colorsNeedUpdate = true;
    };
    CubeView.prototype.removeRedFaces = function () {
        for (var i = 0; i < this.redFaces.length; i++) {
            this.geometry.faces[this.redFaces[i].face1].color.setHex(0xffffff);
            this.geometry.faces[this.redFaces[i].face2].color.setHex(0xffffff);
            this.geometry.colorsNeedUpdate = true;
        }
        this.redFaces = [];
        if (this.finishFaces.i != -1) {
            this.geometry.faces[this.finishFaces.i].color.setHex(0x0000ff);
            this.geometry.faces[this.finishFaces.j].color.setHex(0x0000ff);
        }
        if (this.startFaces.i != -1) {
            this.geometry.faces[this.startFaces.i].color.setHex(0x00ff00);
            this.geometry.faces[this.startFaces.j].color.setHex(0x00ff00);
        }
    };
    CubeView.prototype.triangleToVector = function (triangleIndex) {
        switch (triangleIndex) {
            case 0: return Face.v.left.clone();
            case 1: return Face.v.left.clone();
            case 2: return Face.v.right.clone();
            case 3: return Face.v.right.clone();
            case 4: return Face.v.top.clone();
            case 5: return Face.v.top.clone();
            case 6: return Face.v.bottom.clone();
            case 7: return Face.v.bottom.clone();
            case 8: return Face.v.front.clone();
            case 9: return Face.v.front.clone();
            case 10: return Face.v.rear.clone();
            case 11: return Face.v.rear.clone();
        }
    };
    CubeView.prototype.triangleToString = function (triangleIndex) {
        switch (triangleIndex) {
            case 0: return Face.s.left;
            case 1: return Face.s.left;
            case 2: return Face.s.right;
            case 3: return Face.s.right;
            case 4: return Face.s.top;
            case 5: return Face.s.top;
            case 6: return Face.s.bottom;
            case 7: return Face.s.bottom;
            case 8: return Face.s.front;
            case 9: return Face.s.front;
            case 10: return Face.s.rear;
            case 11: return Face.s.rear;
        }
    };
    return CubeView;
})(THREE.Mesh);
//# sourceMappingURL=cubeview.js.map