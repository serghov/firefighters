import * as RODIN from 'rodin/main';

export const visualJ = new RODIN.Sculpt();
visualJ.position.set(0, 1.6, 0);

const bgScreen = new RODIN.Plane(4.2, 2.4, new THREE.MeshBasicMaterial({
    color: 0x350839,
}));
visualJ.add(bgScreen);
bgScreen.position.set(0, 0.05, -3.6);

/*const timeBar = new RODIN.Plane(3.842, 0.01, new THREE.MeshBasicMaterial({
    color: 0x24BCD3
}));
const timeAnim = new RODIN.AnimationClip("timeAnim", {
    scale: {
        x: {from: 0.0001, to: 1.0}
    },
    position: {
        x: {from: -(3.842/2), to: 0}
    }
});
timeBar.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
    if (e.animation === 'timeAnim') {
        timeBar.parent = null;
    }
});*/
const fade = new RODIN.AnimationClip("fade", {
    material: {
        opacity: {from: 0, to: 1.0}
    }
});
fade.duration(3000);


const logo = new RODIN.Plane(3.842, 0.48, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_J@Logo4x.png"),
    transparent: true,
    opacity:0
}));
logo.animation.add(fade);
logo.animation.getClip("fade").duration(3000);
logo.animation.getClip("fade").delay(400);


visualJ.add(logo);
logo.position.set(0, 0.8, -3.5);

const lineW = 3.842;

const line = new RODIN.Plane(lineW, 0.015, new THREE.MeshBasicMaterial({
    color: 0x24BCD3
}));



const slideAnim = new RODIN.AnimationClip("slideAnim", {
    scale: {
        x: {from: 0.0001, to: 1.0}
    },
    position: {
        x: {from: -(3.842/2), to: 0}
    }
});
slideAnim.delay(2000);
slideAnim.duration(1000);
line.animation.add(slideAnim);



const text = new RODIN.Plane(3.842, 0.75, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_J@Text4x.png"),
    transparent: true,
    opacity:0
}));


visualJ.add(text);
text.position.set(0, -0.225, -3.5);
text.animation.add(fade);
text.animation.getClip("fade").duration(3000);
text.animation.getClip("fade").delay(400);

const footer = new RODIN.Plane(3.842, 0.19, new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: RODIN.Loader.loadTexture("./img/assets/Visual_J@Footer4x.png"),
    transparent: true,
    opacity:0
}));


visualJ.add(footer);
footer.position.set(0, -0.90, -3.5);
footer.animation.add(fade)
footer.animation.getClip("fade").duration(3000);
footer.animation.getClip("fade").delay(400);


visualJ.start = function () {
    // line.scale.set(0.0001, 1, 1);
    visualJ.add(line);
    // line.position.set(-3.842/2+0.015, 0.37, -3.5);
    line.position.set(0, 0.37, -3.5);
    // line.animation.start("slideAnim");
    logo.material.map.anisotropy = 16;
    text.material.map.anisotropy = 16;
    footer.material.map.anisotropy = 16;

    logo.material.opacity = 0;
    text.material.opacity = 0;
    footer.material.opacity = 0;

    logo.animation.start("fade");
    text.animation.start("fade");
    footer.animation.start("fade");
    RODIN.Scene.platform.add(visualJ);
};

visualJ.end = function () {};

visualJ.countDown = function(time){
    setTimeout(() => {visualJ.end()}, time)
    // timeAnim.duration(time);
    // timeBar.animation.add(timeAnim);
    // timeBar.animation.start("timeAnim");
    // visualJ.add(timeBar);
    // timeBar.position.set(0, -0.87, -3.45);
}