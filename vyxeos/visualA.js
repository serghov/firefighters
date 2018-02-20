import * as RODIN from 'rodin/main';
import {Loader} from './Loader.js';

export const visualA = new RODIN.Sculpt();
visualA.position.set(0, 1.6, 0);

const background = new RODIN.Sphere(2, 32, 32, new THREE.MeshBasicMaterial({
    color: 0x72267a,
    // color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    side: THREE.BackSide,
    // wireframe:true
}));
background.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 2) );
background._threeObject.renderOrder = 1;
visualA.add(background);
background.position.set(0,0,-3);

const text = new RODIN.Plane(1.2, 0.256, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Atext.png"),
    transparent: true
}));

text.on(RODIN.CONST.READY, (e) => {
    visualA.add(text);
    text._threeObject.renderOrder = 2;
    text.position.y = .5;
    text.position.z = -2;
});

const startScreen = new Loader(0.3,  () => {visualA.end();});
startScreen.position.set(0,0,-2);
startScreen._threeObject.renderOrder = 2;
visualA.add(startScreen);
/*
const start =  new RODIN.Text3D({
    text: "START",
    color: 0xffffff,
    font: "./fonts/Product_sans_bold.json",
    fontSize: 0.07,
    material: new THREE.MeshBasicMaterial({color: 0xffffff/!*, opacity: 0, transparent: true*!/}),
    align: "center"
});

start.on(RODIN.CONST.READY, (e) => {
    startScreen.add(start);
    start.position.y = -0.38
});
*/

visualA.start = function(){
    RODIN.Scene.platform.add(visualA);
};
visualA.end = function(){};
