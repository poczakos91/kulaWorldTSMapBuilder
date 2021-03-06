/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/threejs/OBJMTLLoader.d.ts"/>
/// <reference path="../faceMap.ts"/>

class CubeView extends THREE.Mesh {
    i: number;
    j: number;
    ownID: number;
    redFaces: {face: THREE.Vector3; face1: number; face2: number}[];
    finishFaces: {i: number; j: number};
    startFaces: {i: number; j:number};
    objects: {name: string; onFace: string; object: THREE.Object3D}[];

    constructor(size: number, color: number, posx: number, posy: number, posz: number, cubeID: number) {
        var cubeGeometry = new THREE.BoxGeometry(size,size,size);
        var material = new THREE.MeshLambertMaterial({color: color, vertexColors: THREE.FaceColors});
        super(cubeGeometry,material);
        this.position.set(posx, posy, posz);
        this.i = this.j = 0;
        this.ownID = cubeID;
        this.redFaces = [];
        this.finishFaces = {i: -1, j: -1};
        this.startFaces = {i: -1, j: -1};
        this.objects = [];
    }

    paintFace(face:string, color: number) {
        switch (face) {
            case "top": this.i=4;this.j=5; break;
            case "bottom": this.i=6;this.j=7; break;
            case "left": this.i=0;this.j=1; break;
            case "right": this.i=2;this.j=3; break;
            case "front": this.i=8;this.j=9; break;
            case "rear": this.i=10;this.j=11;
        }
        this.geometry.faces[this.i].color.setHex(color);
        this.geometry.faces[this.j].color.setHex(color);

        if(color == 0x00ff00) {
            this.startFaces.i = this.i;
            this.startFaces.j = this.j;
        }
        if(color == 0x0000ff) {
            this.finishFaces.i = this.i;
            this.finishFaces.j = this.j;
        }
        this.geometry.colorsNeedUpdate = true;
    }

    triangleToVector(triangleIndex: number): THREE.Vector3 {
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
            case 10:return Face.v.rear.clone();
            case 11:return Face.v.rear.clone();
        }
    }

    triangleToString(triangleIndex: number): string {
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
            case 10:return Face.s.rear;
            case 11:return Face.s.rear;
        }
    }

    addKey(toFace: string) {
        var loader = new THREE.OBJMTLLoader();

        loader.load(
            'res/models/key/key.obj',
            'res/models/key/key.mtl',
            function (object: THREE.Object3D) {
                object.position.add(Face.v[toFace].clone().multiplyScalar(0.6));
                switch (toFace) {
                    case Face.s.bottom : object.rotateX(Math.PI); break;
                    case Face.s.rear : object.rotateX(-Math.PI/2); break;
                    case Face.s.front : object.rotateX(Math.PI/2); break;
                    case Face.s.left : object.rotateZ(-Math.PI/2); break;
                    case Face.s.right : object.rotateZ(Math.PI/2); break;
                }
                object.scale.set(0.005,0.005,0.005);
                this.add(object);
                this.objects.push({name: "key", onFace: toFace, object: object});
            }.bind(this),
            function(){},
            function(reason){
                console.log("something went wrong during the loading of the key model");
                console.log(reason);
            });
    }

    addCoin(toFace: string) {
        var loader = new THREE.OBJMTLLoader();
        loader.load(
            'res/models/coin/coin.obj',
            'res/models/coin/coin.mtl',
            function (object: THREE.Object3D) {
                object.position.add(Face.v[toFace].clone().multiplyScalar(0.8));
                switch (toFace) {
                    case Face.s.bottom :object.rotateX(Math.PI);break;
                    case Face.s.rear :object.rotateX(-Math.PI/2);break;
                    case Face.s.front :object.rotateX(Math.PI/2);break;
                    case Face.s.left :object.rotateZ(-Math.PI/2);break;
                    case Face.s.right :object.rotateZ(Math.PI/2);break;
                }
                object.scale.set(0.01,0.01,0.01);
                this.add(object);
                this.objects.push({name: "coin", onFace: toFace, object: object});
            }.bind(this),
            function(){},
            function(reason){
                console.log("something went wrong during the loading of the key model");
                console.log(reason);
            });
    }

    addTrap(toFace: string) {
        var loader = new THREE.OBJMTLLoader();
        loader.load(
            'res/models/trap/trap.obj',
            'res/models/trap/trap.mtl',
            function (object: THREE.Object3D) {
                object.position.add(Face.v[toFace].clone().multiplyScalar(0.55));
                switch (toFace) {
                    case Face.s.bottom :object.rotateX(Math.PI);break;
                    case Face.s.rear :object.rotateX(-Math.PI/2);break;
                    case Face.s.front :object.rotateX(Math.PI/2);break;
                    case Face.s.left :object.rotateZ(-Math.PI/2);break;
                    case Face.s.right :object.rotateZ(Math.PI/2);break;
                }
                object.scale.set(0.015,0.015,0.015);
                this.add(object);
                this.objects.push({name: "trap", onFace: toFace, object: object});
            }.bind(this),
            function(){},
            function(reason){
                console.log("something went wrong during the loading of the key model");
                console.log(reason);
            });
    }

    removeObject(fromFace: string) {
        for(var i=0;i<this.objects.length;i++) {
            if(this.objects[i].onFace === fromFace) {
                this.remove(this.objects[i].object);
                this.objects.splice(i,1);
            }
        }
    }

    update(delta) {
        for(var i= 0;i<this.objects.length;i++) {
            var rot = Math.PI*2*delta;
            switch (this.objects[i].onFace) {
                case Face.s.top :       this.objects[i].object.rotateY(rot); break;
                case Face.s.bottom :    this.objects[i].object.rotateY(rot); break;
                case Face.s.rear :      this.objects[i].object.rotateZ(rot); break;
                case Face.s.front :     this.objects[i].object.rotateZ(rot); break;
                case Face.s.left :      this.objects[i].object.rotateX(rot); break;
                case Face.s.right :     this.objects[i].object.rotateX(rot); break;
            }
        }
    }
}
