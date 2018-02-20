System.register(['rodin/main', './Loader.js'], function (_export, _context) {
    "use strict";

    var RODIN, Loader;
    return {
        setters: [function (_rodinMain) {
            RODIN = _rodinMain;
        }, function (_LoaderJs) {
            Loader = _LoaderJs.Loader;
        }],
        execute: function () {
            const visualC = new RODIN.Sculpt();

            _export('visualC', visualC);

            visualC.position.set(0, 1.6, 0);

            const bgScreen = new RODIN.Plane(4.2, 2.4, new THREE.MeshBasicMaterial({
                color: 0x350839
            }));
            visualC.add(bgScreen);
            bgScreen.position.set(0, 0, -3.6);

            const next = new Loader(0.35, () => {
                visualC.end();
            });
            next.position.set(4.2 / 2.2, -2.4 / 2.2, 0.15);
            next._threeObject.renderOrder = 2;
            next.on(RODIN.CONST.READY, () => {
                bgScreen.add(next);
            });

            const fade = new RODIN.AnimationClip("fade", {
                material: {
                    opacity: { from: 0, to: 1.0 }
                }
            });
            fade.duration(3000);
            fade.delay(400);

            const lineW = 3.842;

            const line = new RODIN.Plane(lineW, 0.015, new THREE.MeshBasicMaterial({
                color: 0x24BCD3
            }));
            visualC.add(line);
            line.position.set(0, 0.35, -3.5);

            const content = new RODIN.Plane(4.096, 2.3, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/C@4x.png"),
                transparent: true
            }));

            visualC.add(content);
            content.position.set(0, 0, -3.5);
            content.animation.add(fade);

            visualC.start = function () {
                RODIN.Scene.platform.add(visualC);
                content.material.opacity = 0;

                content.material.map.anisotropy = 16;

                content.animation.start("fade");
                next.hide();
                next.show(2000);
            };

            visualC.end = function () {};
        }
    };
});