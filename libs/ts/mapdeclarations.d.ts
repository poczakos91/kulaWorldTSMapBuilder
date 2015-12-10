/**
 * This file specifies the types those needed to describe the json map structure in typescript
 */
/// <reference path="threejs/three.d.ts"/>

interface SimplePosition {
    x: number;
    y: number;
    z: number;
}

interface WinTextOrientation {
    position: SimplePosition;
    rotation: SimplePosition;
    size: number;
}

interface NeighbourDescription {
    fromFace: string;
    toCube: number;
    toFace: string;
    requiredDirection: string;
    requiredKeys: number[];
}

interface BallDescription {
    startingCube: number;
    startingFace: string;
    startingDirection: string;
    color: string;
    texture: {colorMapURL: string};
}

interface CubeDescription {
    id: number;
    type: string;
    specials: any[];
    color: string;
    position: SimplePosition;
    keys: string[];
    coins: string[];
    traps: string[];
}

interface TargetCube {
    id: number;
    face: string;
}

interface mapDescription {
    name: string;
    version: string;
    backgroundObjects: any[];
    cubeSize: number;
    target: TargetCube;
    messageOrientation: WinTextOrientation;
    ball: BallDescription;
    elements: CubeDescription[][][];
}