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
            const visualE = new RODIN.Sculpt();

            _export('visualE', visualE);

            visualE.position.set(0, 1.6, 0);
            const holder = new RODIN.Sculpt();
            visualE.add(holder);
            holder.position.set(0, 0, -3.5);

            const bgScreen = new RODIN.Plane(4.4, 2.8, new THREE.MeshBasicMaterial({
                color: 0x350839
            }));
            visualE.add(bgScreen);
            bgScreen.position.set(0, 0, -3.6);

            const next = new Loader(0.35, () => {
                visualE.end();
            });
            next.position.set(4.4 / 2.2, -2.8 / 2.2, 0.15);
            next._threeObject.renderOrder = 2;
            next.on(RODIN.CONST.READY, () => {});

            const fade = new RODIN.AnimationClip("fade", {
                material: {
                    opacity: { from: 0, to: 1.0 }
                }
            });
            fade.duration(1500);
            /*const fade2 = new RODIN.AnimationClip("fade2", {
                material: {
                    "0":{
                        opacity: {from: 0, to: 1.0}
                    },
                    "1": {
                        opacity: {from: 0, to: 1.0}
                    }
                }
            });
            fade2.duration(3000);*/

            const basedOn = new RODIN.Plane(0.98, 1.3, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_E_Delivery@4x.png"),
                transparent: true,
                opacity: 0
            }));
            holder.add(basedOn);
            basedOn.scale.set(1.2, 1.2, 1.2);
            basedOn.position.set(-0.78, 0.04, 0);
            basedOn.animation.add(fade);
            basedOn.animation.getClip("fade").delay(2000);

            const image = new RODIN.Plane(2.1, 1.85, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Step-1-Bone-marrow@4x.jpg"),
                transparent: true,
                opacity: 0
            }));
            holder.add(image);
            image.position.set(0.25, 0.09, -0.05);
            image.animation.add(fade);
            image.animation.getClip("fade").delay(400);
            image._threeObject.renderOrder = -1;

            const zoomedLipo = new RODIN.Plane(1.12, 0.75, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_E_VYXEOS@4x.png"),
                transparent: true,
                opacity: 0
            }));
            holder.add(zoomedLipo);
            zoomedLipo.position.set(0.91, -0.37, 0);
            zoomedLipo.animation.add(fade);
            zoomedLipo.animation.getClip("fade").delay(4000);

            /*const focus = new RODIN.Plane(1.3, 0.063, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/focusText.png"),
                transparent: true,
                opacity: 0
            }));
            holder.add(focus);
            focus.position.set(0.55, -1.06, 0);
            focus.animation.add(fade);
            focus.animation.getClip("fade").delay(5000);*/

            holder.scale.set(1.2, 1.2, 1.2);

            visualE.start = function () {
                basedOn.material.map.anisotropy = 16;
                image.material.map.anisotropy = 16;
                zoomedLipo.material.map.anisotropy = 16;
                // focus.material.map.anisotropy = 16;

                RODIN.Scene.platform.add(visualE);

                basedOn.material.opacity = 0;
                // focus.material.opacity = 0;
                image.material.opacity = 0;
                zoomedLipo.material.opacity = 0;

                basedOn.animation.start("fade");
                image.animation.start("fade");
                zoomedLipo.animation.start("fade");
                // focus.animation.start("fade");
                next.hide();
                next.show(5000);
                bgScreen.add(next);
            };

            visualE.end = function () {};

            visualE.countDown = function (time) {
                setTimeout(() => {
                    visualE.end();
                }, time);
            };
        }
    };
});