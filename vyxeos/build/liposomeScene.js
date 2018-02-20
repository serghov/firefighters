System.register(["rodin/main"], function (_export, _context) {
    "use strict";

    var RODIN;
    return {
        setters: [function (_rodinMain) {
            RODIN = _rodinMain;
        }],
        execute: function () {
            class LiposomeScene extends RODIN.Sculpt {
                constructor() {
                    super(new THREE.Object3D());
                    const skybox = new RODIN.Sphere(90, 32, 32, new THREE.MeshBasicMaterial({ map: RODIN.Loader.loadTexture("./img/assets/Gradient.png") }));

                    skybox.on(RODIN.CONST.READY, e => {
                        e.target.scale.x = -1;
                        this.add(e.target);
                    });
                    this.liposomes = [];
                    let spriteMap = RODIN.Loader.loadTexture("./img/assets/Closed liposome.png");
                    // let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff, transparent: true} );
                    for (let i = 0; i < 20; i++) {
                        // const lipo = new RODIN.Sculpt(new THREE.Sprite( spriteMaterial ));
                        const lipo = new RODIN.Sculpt(new THREE.Mesh(new THREE.CircleGeometry(0.5, 32), new THREE.MeshBasicMaterial({ map: spriteMap, color: 0xffffff, transparent: true })));
                        lipo._threeObject.renderOrder = -1;
                        lipo.scale.set(2, 2, 2);
                        this.liposomes.push(new RODIN.Sculpt());
                        this.liposomes[i].add(lipo);
                        const pivot = new RODIN.Sculpt();
                        this.add(pivot);
                        pivot.add(this.liposomes[i]);

                        /*            lipo.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
                                        console.log(i, lipo.parent.parent.rotation.valueOf());
                                    })*/
                    }
                    this.liposomes[0].children[0].position.z = -8.84;
                    this.liposomes[1].children[0].position.z = -9.77;
                    this.liposomes[2].children[0].position.z = -7.90;
                    this.liposomes[3].children[0].position.z = -15.34;
                    this.liposomes[4].children[0].position.z = -10.59;
                    this.liposomes[5].children[0].position.z = -7.39;
                    this.liposomes[6].children[0].position.z = -13.20;
                    this.liposomes[7].children[0].position.z = -8.38;
                    this.liposomes[8].children[0].position.z = -20.97;
                    this.liposomes[9].children[0].position.z = -9.00;
                    this.liposomes[10].children[0].position.z = -10.28;
                    this.liposomes[11].children[0].position.z = -18.82;
                    this.liposomes[12].children[0].position.z = -6.48;
                    this.liposomes[13].children[0].position.z = -8.76;
                    this.liposomes[14].children[0].position.z = -7.50;
                    this.liposomes[15].children[0].position.z = -14.24;
                    this.liposomes[16].children[0].position.z = -6.61;
                    this.liposomes[17].children[0].position.z = -7.51;
                    this.liposomes[18].children[0].position.z = -19.46;
                    this.liposomes[19].children[0].position.z = -10.61;
                    this.liposomes[0].rotation.set(1.22, 0.99, 2.00);
                    this.liposomes[1].rotation.set(1.35, 0.58, -1.85);
                    this.liposomes[2].rotation.set(-1.88, -0.00, 2.35);
                    this.liposomes[3].rotation.set(1.11, 1.21, -2.13);
                    this.liposomes[4].rotation.set(2.38, -0.94, -0.85);
                    this.liposomes[5].rotation.set(1.65, 0.11, 0.39);
                    this.liposomes[6].rotation.set(2.06, 0.18, -1.22);
                    this.liposomes[7].rotation.set(-2.07, 1.04, -2.70);
                    this.liposomes[8].rotation.set(-1.62, 0.97, -3.13);
                    this.liposomes[9].rotation.set(0.18, -0.58, -0.29);
                    this.liposomes[10].rotation.set(2.79, -1.44, 2.76);
                    this.liposomes[11].rotation.set(2.66, -0.59, -0.63);
                    this.liposomes[12].rotation.set(0.70, -0.37, 2.82);
                    this.liposomes[13].rotation.set(-2.67, 0.00, 3.04);
                    this.liposomes[14].rotation.set(2.98, -0.09, -2.03);
                    this.liposomes[15].rotation.set(0.91, -1.32, -2.98);
                    this.liposomes[16].rotation.set(-1.41, -0.06, 2.44);
                    this.liposomes[17].rotation.set(1.49, -0.69, -0.31);
                    this.liposomes[18].rotation.set(-1.79, -0.16, -2.57);
                    this.liposomes[19].rotation.set(-2.21, -1.15, 1.04);
                }

                rotate(x) {
                    // this.liposomes[9].parent.rotation.y += x / Math.pow(this.liposomes[9].children[0].position.z, 2)+2.8;
                    this.liposomes[0].parent.rotation.y += this.liposomes[0].parent.velocity;
                    this.liposomes[1].parent.rotation.y += this.liposomes[1].parent.velocity;
                    this.liposomes[2].parent.rotation.y += this.liposomes[2].parent.velocity;
                    this.liposomes[3].parent.rotation.y += this.liposomes[3].parent.velocity;
                    this.liposomes[4].parent.rotation.y += this.liposomes[4].parent.velocity;
                    this.liposomes[5].parent.rotation.y += this.liposomes[5].parent.velocity;
                    this.liposomes[6].parent.rotation.y += this.liposomes[6].parent.velocity;
                    this.liposomes[7].parent.rotation.y += this.liposomes[7].parent.velocity;
                    this.liposomes[8].parent.rotation.y += this.liposomes[8].parent.velocity;
                    this.liposomes[9].parent.rotation.y += this.liposomes[9].parent.velocity;
                    this.liposomes[10].parent.rotation.y += this.liposomes[10].parent.velocity;
                    this.liposomes[11].parent.rotation.y += this.liposomes[11].parent.velocity;
                    this.liposomes[12].parent.rotation.y += this.liposomes[12].parent.velocity;
                    this.liposomes[13].parent.rotation.y += this.liposomes[13].parent.velocity;
                    this.liposomes[14].parent.rotation.y += this.liposomes[14].parent.velocity;
                    this.liposomes[15].parent.rotation.y += this.liposomes[15].parent.velocity;
                    this.liposomes[16].parent.rotation.y += this.liposomes[16].parent.velocity;
                    this.liposomes[17].parent.rotation.y += this.liposomes[17].parent.velocity;
                    this.liposomes[18].parent.rotation.y += this.liposomes[18].parent.velocity;
                    this.liposomes[19].parent.rotation.y += this.liposomes[19].parent.velocity;
                }

                setSpeed(x) {
                    this.liposomes[0].parent.velocity = x / Math.pow(this.liposomes[0].children[0].position.z, 2);
                    this.liposomes[1].parent.velocity = x / Math.pow(this.liposomes[1].children[0].position.z, 2);
                    this.liposomes[2].parent.velocity = x / Math.pow(this.liposomes[2].children[0].position.z, 2);
                    this.liposomes[3].parent.velocity = x / Math.pow(this.liposomes[3].children[0].position.z, 2);
                    this.liposomes[4].parent.velocity = x / Math.pow(this.liposomes[4].children[0].position.z, 2);
                    this.liposomes[5].parent.velocity = x / Math.pow(this.liposomes[5].children[0].position.z, 2);
                    this.liposomes[6].parent.velocity = x / Math.pow(this.liposomes[6].children[0].position.z, 2);
                    this.liposomes[7].parent.velocity = x / Math.pow(this.liposomes[7].children[0].position.z, 2);
                    this.liposomes[8].parent.velocity = x / Math.pow(this.liposomes[8].children[0].position.z, 2);
                    this.liposomes[9].parent.velocity = x / Math.pow(this.liposomes[9].children[0].position.z, 2);
                    this.liposomes[10].parent.velocity = x / Math.pow(this.liposomes[10].children[0].position.z, 2);
                    this.liposomes[11].parent.velocity = x / Math.pow(this.liposomes[11].children[0].position.z, 2);
                    this.liposomes[12].parent.velocity = x / Math.pow(this.liposomes[12].children[0].position.z, 2);
                    this.liposomes[13].parent.velocity = x / Math.pow(this.liposomes[13].children[0].position.z, 2);
                    this.liposomes[14].parent.velocity = x / Math.pow(this.liposomes[14].children[0].position.z, 2);
                    this.liposomes[15].parent.velocity = x / Math.pow(this.liposomes[15].children[0].position.z, 2);
                    this.liposomes[16].parent.velocity = x / Math.pow(this.liposomes[16].children[0].position.z, 2);
                    this.liposomes[17].parent.velocity = x / Math.pow(this.liposomes[17].children[0].position.z, 2);
                    this.liposomes[18].parent.velocity = x / Math.pow(this.liposomes[18].children[0].position.z, 2);
                    this.liposomes[19].parent.velocity = x / Math.pow(this.liposomes[19].children[0].position.z, 2);
                }

            }

            _export("LiposomeScene", LiposomeScene);
        }
    };
});