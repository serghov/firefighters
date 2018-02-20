System.register(['rodin/main'], function (_export, _context) {
    "use strict";

    var RODIN;
    return {
        setters: [function (_rodinMain) {
            RODIN = _rodinMain;
        }],
        execute: function () {
            const visualH = new RODIN.Sculpt();

            _export('visualH', visualH);

            visualH.position.set(0, 1.6, 0);

            const timeBar = new RODIN.Plane(2.4, 0.05, new THREE.MeshBasicMaterial({
                color: 0x340838
            }));
            const timebarSift = -0.03;
            const timeAnim = new RODIN.AnimationClip("timeAnim", {
                scale: {
                    x: { from: 0.0001, to: 1.0 }
                },
                position: {
                    x: { from: -(2.4 / 2) + timebarSift, to: timebarSift }
                }
            });
            timeBar.on(RODIN.CONST.ANIMATION_COMPLETE, e => {
                if (e.animation === 'timeAnim') {
                    timeBar.parent = null;
                }
            });

            const warningScreen = new RODIN.Plane(3.842, 2.21, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_H@4x.png"),
                transparent: true
            }));

            warningScreen._threeObject.renderOrder = 0;

            visualH.add(warningScreen);
            warningScreen.position.set(0, 0, -3.5);

            visualH.start = function (angle) {
                // console.log("angle H", angle)
                RODIN.Scene.platform.add(visualH);
                warningScreen.material.map.anisotropy = 16;
                if (angle) {
                    visualH.rotation.y = angle;
                }
            };

            visualH.end = function () {};

            visualH.countDown = function (time) {
                setTimeout(() => {
                    visualH.end();
                }, time);
                timeAnim.duration(time);
                timeBar.animation.add(timeAnim);
                timeBar.animation.start("timeAnim");
                visualH.add(timeBar);
                timeBar.position.set(0, -0.87, -3.45);
            };
        }
    };
});