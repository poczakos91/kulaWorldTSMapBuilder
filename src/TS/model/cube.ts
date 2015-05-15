/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../view/cubeview.ts"/>

class Cube {
    id: number;
    position: THREE.Vector3;
    neighbours: NeighbourDescription[];
    view: CubeView;

    constructor(id: number, size: number, color: number, position: THREE.Vector3, neighbours?: NeighbourDescription[]) {
        this.id = id;
        this.position = position.clone();
        if(neighbours) {
            this.neighbours = neighbours;
        }
        else {
            this.neighbours = [];
        }

        this.view = new CubeView(size, color, this.position.x*size, this.position.y*size, this.position.z*size, this.id);
    }

    getView(): CubeView {
        return this.view;
    }

    addNeighbour(neighbour: NeighbourDescription) {
        for(var i=0;i<this.neighbours.length;i++) {
            if(this.neighbours[i].toCube == neighbour.toCube && this.neighbours[i].toFace === neighbour.toFace && this.neighbours[i].fromFace === neighbour.fromFace) {
                return;
            }
        }
        this.neighbours.push(neighbour);
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
            neighbours: this.neighbours
        };
        return cubeDesc;
    }
}
