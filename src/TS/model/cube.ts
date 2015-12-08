/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../view/cubeview.ts"/>

class Cube {
    id: number;
    position: THREE.Vector3;
    view: CubeView;
    keys: string[];

    constructor(id: number, size: number, color: number, position: THREE.Vector3) {
        this.id = id;
        this.position = position.clone();
        this.keys = [];

        this.view = new CubeView(size, color, this.position.x*size, this.position.y*size, this.position.z*size, this.id);
    }

    getView(): CubeView {
        return this.view;
    }

    addKey(toFace: string) {
        for(var i=0;i<this.keys.length;i++) {
            if(this.keys[i] === toFace) {
                this.view.removeKey(toFace);
                this.keys.splice(i,1);
                return;
            }
        }
        this.keys.push(toFace);
        this.view.addKey(toFace);
    }

    toJSON(): Object {
        var cubeDesc: CubeDescription = {
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
    }
}
