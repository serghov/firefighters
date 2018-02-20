import * as RODIN from 'rodin/main';
import {Loader} from './Loader.js';

export const visualB = new RODIN.Sculpt();
visualB.position.set(0, 1.6, 0);

const next = new Loader(0.35,  () => {visualB.end();});
next.position.set(4.2/2.2,-2.4/2.2,0.15);
next._threeObject.renderOrder = 2;
const warningScreen = new RODIN.Plane(4.2, 2.4, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_B@4x.png"),
    transparent: true
}));

warningScreen._threeObject.renderOrder = 0;

visualB.add(warningScreen);
warningScreen.position.set(0, 0, -3.6);

visualB.start = function () {
    RODIN.Scene.add(visualB);
    warningScreen.material.map.anisotropy = 16;
    next.parent = null;
};

visualB.end = function () {
};

visualB.init = function (time) {
    warningScreen.add(next);
    next.hide();
    next.show();
}
