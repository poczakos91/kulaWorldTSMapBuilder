/// <reference path="../../libs/ts/threejs/three.d.ts"/>
/**
 * Created by poczakos on 5/1/2015.
 */

class Lighting {
    constructor(scene: THREE.Scene) {
        var spotLight0 = new THREE.SpotLight(0xffffff);
        spotLight0.position.set(-10, 10, 0);
        spotLight0.lookAt(new THREE.Vector3());
        scene.add(spotLight0);

        var spotLight1 = new THREE.SpotLight(0xffffff);
        spotLight1.position.set(10, -10, 0);
        spotLight1.lookAt(new THREE.Vector3());
        scene.add(spotLight1);

        var spotLight2 = new THREE.SpotLight(0xffffff);
        spotLight2.position.set(0, 10, -10);
        spotLight2.lookAt(new THREE.Vector3());
        scene.add(spotLight2);

        var spotLight3 = new THREE.SpotLight(0xffffff);
        spotLight3.position.set(0, 10, 10);
        spotLight3.lookAt(new THREE.Vector3());
        scene.add(spotLight3);
    }
}