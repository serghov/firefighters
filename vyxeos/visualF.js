import * as RODIN from 'rodin/main';
import {Loader} from './Loader.js';

export const visualF = new RODIN.Sculpt();
visualF.position.set(0, 1.6, 0);


const sphereR = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({color:0xffffff, map:RODIN.Loader.loadTexture("./img/assets/uptake4x4.jpg")}));
const sphereL = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({color:0xffffff, map:RODIN.Loader.loadTexture("./img/assets/uptake4x4.jpg")}));
// const sphereR = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({color:0xffffff, map:RODIN.Loader.loadTexture("img/assets/uptake4x4_025.jpg")}));
// const sphereL = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({color:0xffffff, map:RODIN.Loader.loadTexture("img/assets/uptake4x4_025.jpg")}));

RODIN.messenger.once(RODIN.CONST.ALL_SCULPTS_READY, ()=> {
    sphereL.material.map.repeat.set(1, 0.5);
    sphereR.material.map.offset.set(0, 0.5);
    sphereR.material.map.repeat.set(1, 0.5);
    sphereL._threeObject.layers.set(2);
    sphereL._threeObject.layers.enable(2);
    sphereR._threeObject.layers.enable(1);
    sphereR.scale.x = -1;
    sphereL.scale.x = -1;
});
visualF.add(sphereR);
visualF.add(sphereL);


sphereR.rotation.y = -Math.PI/2-0.2;
sphereL.rotation.y = -Math.PI/2-0.2;

const holder = new RODIN.Sculpt();
visualF.add(holder);
holder.position.set(0, 0, -3);
holder.scale.set(1.2,1.2,1.2);

const plane2 = new RODIN.Plane(1.1, 1.95, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_F_Leukemia@4x.png"),
    transparent: true
}));
holder.add(plane2);
plane2.position.set(-0.8, 0, 0);
plane2.rotation.y = Math.atan(0.8/3);

/*const lookAround = new RODIN.Plane(1.03, 0.7, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_F_Take@4x.png"),
    transparent: true
}));
holder.add(lookAround);
lookAround.material.map.anisotropy = 16;
lookAround.position.set(-0.96, -0.65, 0);*/
/*
const insideBone = new RODIN.Plane(0.7, 0.158, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_F_inside_bone@4x.png"),
    transparent: true
}));
holder.add(insideBone);
insideBone.material.map.anisotropy = 16;
insideBone.position.set(-0.14, 0.83, 0);*/

const normalBone = new RODIN.Plane(1, 0.21, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_F_Normal_bone@4x.png"),
    transparent: true
}));
holder.add(normalBone);
normalBone.scale.set(2, 2, 2);
normalBone.position.set(1, 2, -2.5);
normalBone.rotation.y = Math.atan(1/-5.5);

const vyxeos = new RODIN.Plane(0.55, 0.85, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_F_Vyxeos@4x.png"),
    transparent: true
}));
holder.add(vyxeos);
vyxeos.scale.set(2, 2, 2);
vyxeos.position.set(2.56, 0.38, -3);
vyxeos.rotation.y = Math.atan(2.58/-6);


const lekemiaCell = new RODIN.Plane(0.6, 0.21, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_F_Leukemia_1@4x.png"),
    transparent: true
}));
holder.add(lekemiaCell);
lekemiaCell.scale.set(1.5, 1.5, 1.5);
lekemiaCell.position.set(2.1, -1.1, -1.5);
lekemiaCell.rotation.y = -Math.atan(2.1/4.5);


/*const nextAngle = Math.PI;
const holderNext = new RODIN.Sculpt();
holderNext.position.set(0,0,0);
visualF.add(holderNext);

const next = new LabeledLoader(0.42,  () => {visualF.end(nextAngle);});
holderNext.add(next);
next.position.set(0,-0.3,-3);
holderNext.rotation.set(0,nextAngle,0);*/

const holderNext2 = new RODIN.Sculpt();
holderNext2.position.set(0,0,0);
visualF.add(holderNext2);

const next2Angle = -Math.PI/2.55;


const next2 = new Loader(0.35,  () => {visualF.end(next2Angle);});
holderNext2.add(next2);
next2.position.set(0,-0.2,-3);
holderNext2.rotation.set(0,next2Angle,0);

const holderNext3 = new RODIN.Sculpt();
holderNext3.position.set(0,0,0);
visualF.add(holderNext3);

const next3Angle = Math.PI/1.3;
const next3 = new Loader(0.35,  () => {visualF.end(next3Angle);});
holderNext3.add(next3);
next3.position.set(0,-0.05,-3);
holderNext3.rotation.set(0,next3Angle,0);

visualF.start = function (angle) {
    plane2.material.map.anisotropy = 16;
    normalBone.material.map.anisotropy = 16;
    vyxeos.material.map.anisotropy = 16;
    lekemiaCell.material.map.anisotropy = 16;
    RODIN.Scene.platform.add(visualF);
    if(angle){
        visualF.rotation.y = angle;
    }
};

visualF.end = function () {};

visualF.countDown = function(time){
    setTimeout(() => {visualF.end()}, time)
};