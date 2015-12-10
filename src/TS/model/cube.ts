/// <reference path="../../../libs/ts/threejs/three.d.ts"/>
/// <reference path="../../../libs/ts/mapdeclarations.d.ts"/>
/// <reference path="../view/cubeview.ts"/>

class Cube {
    id: number;
    position: THREE.Vector3;
    view: CubeView;
    keys: string[];
    traps: string[];
    coins: string[];

    constructor(id: number, size: number, color: number, position: THREE.Vector3, keys: string[], coins: string[], traps: string[]) {
        this.id = id;
        this.position = position.clone();
        this.keys = [];
        this.traps = [];
        this.coins = [];

        this.view = new CubeView(size, color, this.position.x*size, this.position.y*size, this.position.z*size, this.id);
        if((keys && keys.length>0) || (coins && coins.length>0) || (traps && traps.length>0)) {
            debugger;
        }
        this.keys = [];
        this.coins = [];
        this.traps = [];
        if(keys) {
            for(var i=0;i<keys.length;i++) this.addKey(keys[i]);
        }
        if(coins) {
            for(var i=0;i<coins.length;i++) this.addCoin(coins[i]);
        }
        if(traps) {
            for(var i=0;i<traps.length;i++) this.addTrap(traps[i]);
        }
    }

    getView(): CubeView {
        return this.view;
    }

    addKey(toFace: string) {
        var objectName = this.removeObjectFromFace(toFace);
        if(objectName === "key") return;
        this.keys.push(toFace);
        this.view.addKey(toFace);
    }

    addCoin(toFace: string) {
        var objectName = this.removeObjectFromFace(toFace);
        if(objectName === "coin") return;
        this.coins.push(toFace);
        this.view.addCoin(toFace);
    }

    addTrap(toFace: string) {
        var objectName = this.removeObjectFromFace(toFace);
        if(objectName === "trap") return;
        this.traps.push(toFace);
        this.view.addTrap(toFace);
    }

    removeObjectFromFace(fromFace: string): string {
        for(var i=0;i<this.keys.length;i++) {
            if(this.keys[i] === fromFace) {
                this.view.removeObject(fromFace);
                this.keys.splice(i,1);
                return "key";
            }
        }
        for(i=0;i<this.coins.length;i++) {
            if(this.coins[i] === fromFace) {
                this.view.removeObject(fromFace);
                this.coins.splice(i,1);
                return "coin";
            }
        }
        for(i=0;i<this.traps.length;i++) {
            if(this.traps[i] === fromFace) {
                this.view.removeObject(fromFace);
                this.coins.splice(i,1);
                return "trap";
            }
        }
        return null;
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
            keys: this.keys,
            coins: this.coins,
            traps: this.traps
        };
        return cubeDesc;
    }
}
