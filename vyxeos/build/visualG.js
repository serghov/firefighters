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
            const visualG = new RODIN.Sculpt();

            _export('visualG', visualG);

            visualG.position.set(0, 1.6, 0);
            // visualG.rotation.y = Math.PI;

            const sphereR = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({ color: 0xffffff, map: RODIN.Loader.loadTexture("./img/assets/Vyxeos_Nucleus_VR3_4x4t.jpg") }));
            const sphereL = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({ color: 0xffffff, map: RODIN.Loader.loadTexture("./img/assets/Vyxeos_Nucleus_VR3_4x4t.jpg") }));

            // const sphereR = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({color:0xffffff, map:RODIN.Loader.loadTexture("img/assets/Vyxeos_Nucleus_VR3_4x4t.jpg")}));
            // const sphereL = new RODIN.Sphere(90, 720, 4, new THREE.MeshBasicMaterial({color:0xffffff, map:RODIN.Loader.loadTexture("img/assets/Vyxeos_Nucleus_VR3_4x4t.jpg")}));

            RODIN.messenger.once(RODIN.CONST.ALL_SCULPTS_READY, () => {
                sphereL.material.map.repeat.set(1, 0.5);
                sphereR.material.map.offset.set(0, 0.5);
                sphereR.material.map.repeat.set(1, 0.5);
                sphereL._threeObject.layers.set(2);
                sphereL._threeObject.layers.enable(2);
                sphereR._threeObject.layers.enable(1);
                sphereR.scale.x = -1;
                sphereL.scale.x = -1;
            });
            visualG.add(sphereR);
            visualG.add(sphereL);

            sphereR.rotation.y = -Math.PI / 2 - 0.2;
            sphereL.rotation.y = -Math.PI / 2 - 0.2;

            const holder = new RODIN.Sculpt();
            visualG.add(holder);
            holder.position.set(0, 0, -3);
            holder.scale.set(1.2, 1.2, 1.2);

            const plane3 = new RODIN.Plane(1.1, 2, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Release@4x.png"),
                transparent: true
            }));
            holder.add(plane3);
            plane3.position.set(-1.22, 0, 0);
            plane3.rotation.y = Math.atan(1.22 / 3);

            /*const insideLCell = new RODIN.Plane(0.7, 0.158, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Inside_Leukemia_cell@4x.png"),
                transparent: true
            }));
            holder.add(insideLCell);
            insideLCell.material.map.anisotropy = 16;
            insideLCell.position.set(-0.25, -0.45 , 0);*/

            const endoplasmic = new RODIN.Plane(0.686, 0.158, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Endoplasmic@4x.png"),
                transparent: true
            }));
            holder.add(endoplasmic);
            endoplasmic.position.set(0, -2.2, -3);
            endoplasmic.scale.set(2.7, 2.7, 2.7);

            const vyxeos = new RODIN.Plane(0.64, 0.335, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Vyxeos_viposome@4x.png"),
                transparent: true
            }));
            holder.add(vyxeos);
            vyxeos.position.set(0.22, 0.825, 0);
            vyxeos.rotation.y = Math.atan(0.22 / -3);

            const ratio = new RODIN.Plane(0.79, 0.32, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Fixed-Molar-Ratio@4x.png"),
                transparent: true
            }));
            holder.add(ratio);
            ratio.position.set(0.48, 0.52, 0);
            ratio.rotation.y = Math.atan(0.48 / -3);

            const circleGeo = new THREE.CircleGeometry(0.09, 32);
            const circleThree = new THREE.Mesh(circleGeo, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/circle.png"),
                transparent: true
            }));
            const circle = new RODIN.Sculpt(circleThree);
            holder.add(circle);
            circle.position.set(0.02, 0.28, 0);

            const daunorubicin = new RODIN.Plane(0.68, 0.345, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Daunorubicin@4x.png"),
                transparent: true
            }));
            holder.add(daunorubicin);
            daunorubicin.position.set(-0.34, -0.14, -0.02);
            daunorubicin.rotation.y = Math.atan(0.34 / 3.02);

            const cytarabine = new RODIN.Plane(0.55, 0.32, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Cytarabine@4x.png"),
                transparent: true
            }));
            holder.add(cytarabine);
            cytarabine.position.set(-0.13, -0.485, -0.02);
            cytarabine.rotation.y = Math.atan(0.13 / 3.02);

            const cellNucleus = new RODIN.Plane(0.45, 0.163, new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: RODIN.Loader.loadTexture("./img/assets/Visual_G_Cell_Nucleus@4x.png"),
                transparent: true
            }));
            holder.add(cellNucleus);
            cellNucleus.position.set(2.4, -0.1, -3);
            cellNucleus.scale.set(2.7, 2.7, 2.7);
            cellNucleus.rotation.y = Math.atan(2.4 / -6);

            const holderNext2 = new RODIN.Sculpt();
            holderNext2.position.set(0, 0, 0);
            visualG.add(holderNext2);

            const next2Angle = -Math.PI / 1.55;
            const next2 = new Loader(0.35, () => {
                visualG.end(next2Angle + visualG.rotation.y);
            });
            holderNext2.add(next2);
            next2.position.set(0, -1.2, -3);
            holderNext2.rotation.set(0, next2Angle, 0);

            const holderNext3 = new RODIN.Sculpt();
            holderNext3.position.set(0, 0, 0);
            visualG.add(holderNext3);

            const next3Angle = Math.PI / 1.09;
            const next3 = new Loader(0.35, () => {
                visualG.end(next3Angle + visualG.rotation.y);
            });
            holderNext3.add(next3);
            next3.position.set(0, 1.1, -3);
            holderNext3.rotation.set(0, next3Angle, 0);

            visualG.start = function (angle) {
                cellNucleus.material.map.anisotropy = 16;
                cytarabine.material.map.anisotropy = 16;
                daunorubicin.material.map.anisotropy = 16;
                circle.material.map.anisotropy = 16;
                ratio.material.map.anisotropy = 16;
                vyxeos.material.map.anisotropy = 16;
                endoplasmic.material.map.anisotropy = 16;
                plane3.material.map.anisotropy = 16;
                ratio._threeObject.renderOrder = 14;
                RODIN.Scene.platform.add(visualG);
                if (angle) {
                    visualG.rotation.y = angle;
                }
            };

            visualG.end = function () {};

            visualG.countDown = function (time) {
                setTimeout(() => {
                    visualG.end();
                }, time);
            };
        }
    };
});