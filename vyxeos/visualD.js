import * as RODIN from 'rodin/main';
import {Loader} from './Loader.js';

export const visualD = new RODIN.Sculpt();
visualD.position.set(0, 1.6, 0);


const bgScreen = new RODIN.Plane(4.2, 2.4, new THREE.MeshBasicMaterial({
    color: 0x350839,
}));
visualD.add(bgScreen);
bgScreen.position.set(0, 0, -3.6);


const next = new Loader(0.35,  () => {visualD.end();});
next.position.set(4.2/2.2,-2.4/2.2,0.15);
next._threeObject.renderOrder = 2;
next.on(RODIN.CONST.READY, ()=>{
    bgScreen.add(next);
});


const fade = new RODIN.AnimationClip("fade", {
    material: {
        opacity: {from: 0, to: 1.0}
    }
});
fade.duration(3000);
fade.delay(400);

const lineW = 3.842;

const line = new RODIN.Plane(lineW, 0.015, new THREE.MeshBasicMaterial({
    color: 0x24BCD3
}));
visualD.add(line);
line.position.set(0, 0.33, -3.5);

const content = new RODIN.Plane(4.096, 2.3, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/D@4x.png"),
    transparent: true
}));


visualD.add(content);
content.position.set(0, 0, -3.5);
content.animation.add(fade);


visualD.start = function () {
    RODIN.Scene.platform.add(visualD);
    content.material.opacity = 0;

    content.material.map.anisotropy = 16;

    content.animation.start("fade");
    next.hide();
    next.show(2000);


};

visualD.end = function () {};
