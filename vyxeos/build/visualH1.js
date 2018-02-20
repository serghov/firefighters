System.register(['rodin/main'], function (_export, _context) {
    "use strict";

    var RODIN;
    return {
        setters: [function (_rodinMain) {
            RODIN = _rodinMain;
        }],
        execute: function () {
            const visualH1 = new RODIN.Sculpt();

            _export('visualH1', visualH1);

            visualH1.position.set(0, 1.6, 0);

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
                map: RODIN.Loader.loadTexture("./img/assets/Visual_H1@4x.png"),
                transparent: true
            }));

            warningScreen._threeObject.renderOrder = 0;

            visualH1.add(warningScreen);
            warningScreen.position.set(0, 0, -3.5);

            visualH1.start = function (angle) {
                RODIN.Scene.platform.add(visualH1);
                warningScreen.material.map.anisotropy = 16;
                if (angle) {
                    visualH1.rotation.y = angle;
                }
            };

            visualH1.end = function () {};

            visualH1.countDown = function (time) {
                setTimeout(() => {
                    visualH1.end();
                }, time);
                timeAnim.duration(time);
                timeBar.animation.add(timeAnim);
                timeBar.animation.start("timeAnim");
                visualH1.add(timeBar);
                timeBar.position.set(0, -0.87, -3.45);
            };
        }
    };
});