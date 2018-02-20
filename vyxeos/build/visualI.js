System.register(['rodin/main'], function (_export, _context) {
    "use strict";

    var RODIN;
    return {
        setters: [function (_rodinMain) {
            RODIN = _rodinMain;
        }],
        execute: function () {
            const visualI = new RODIN.Sculpt();

            _export('visualI', visualI);

            visualI.position.set(0, 1.6, 0);

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
                map: RODIN.Loader.loadTexture("./img/assets/Visual_I@4x.png"),
                transparent: true
            }));

            warningScreen._threeObject.renderOrder = 0;

            visualI.add(warningScreen);
            warningScreen.position.set(0, 0, -3.5);

            visualI.start = function () {
                RODIN.Scene.platform.add(visualI);
                warningScreen.material.map.anisotropy = 16;
            };

            visualI.end = function () {};

            visualI.countDown = function (time) {
                setTimeout(() => {
                    visualI.end();
                }, time);
                timeAnim.duration(time);
                timeBar.animation.add(timeAnim);
                timeBar.animation.start("timeAnim");
                visualI.add(timeBar);
                timeBar.position.set(0, -0.87, -3.45);
            };
        }
    };
});