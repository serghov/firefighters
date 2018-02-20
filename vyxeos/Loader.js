import * as RODIN from 'rodin/main';

export class Loader extends RODIN.Sculpt {
    constructor(r, cb) {
        super();
        this.r = r || 0.5;
        this.r2 = 0.001;


        const showAnim = new RODIN.AnimationClip("showAnim", {
            material: {
                opacity: {from: 0, to: 1.0}
            }
        });

        const hoverCirGeo = new THREE.CircleGeometry(this.r * 3.5, 32);
        const hoverCirMesh = new THREE.Mesh(hoverCirGeo, new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0
        }));
        this.hoverCir = new RODIN.Sculpt(hoverCirMesh);
        this.hoverCir._threeObject.renderOrder = 11;
        this.hoverCir.position.z = -0.01;
        this.add(this.hoverCir);



        const bgGeo = new THREE.CircleGeometry(this.r, 32);
        const bgThree = new THREE.Mesh(bgGeo, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            map: RODIN.Loader.loadTexture('./img/assets/Start_transparent.png'),
        }));
        this.bg = new RODIN.Sculpt(bgThree);
        this.bg._threeObject.renderOrder = 12;
        this.add(this.bg);

        const whiteGeo = new THREE.CircleGeometry(this.r * 0.8, 32);
        const whiteThree = new THREE.Mesh(whiteGeo, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true
        }));
        this.white = new RODIN.Sculpt(whiteThree);
        this.white._threeObject.renderOrder = 12;
        this.white.position.set(0, 0, -0.002);
        this.add(this.white);

        const glowGeo = new THREE.CircleGeometry(this.r * 1.1, 32);
        const glowMesh = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: RODIN.Loader.loadTexture('./img/assets/glow.png'),
        }));
        this.glow = new RODIN.Sculpt(glowMesh);
        this.glow._threeObject.renderOrder = 12;
        this.glow.position.set(0, 0, -0.003);
        this.add(this.glow);

        const glowAnim = new RODIN.AnimationClip("glowAnim", {
            scale: {
                x: {from: 0.85, to: 1.1},
                y: {from: 0.85, to: 1.1},
                z: {from: 0.85, to: 1.1}
            }
        });
        glowAnim.duration(600);
        glowAnim.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);
        const glowBackAnim = new RODIN.AnimationClip("glowBackAnim", {
            scale: {
                x: {from: 1.1, to: 0.85},
                y: {from: 1.1, to: 0.85},
                z: {from: 1.1, to: 0.85}
            }
        });
        glowBackAnim.duration(600);
        glowBackAnim.easing(RODIN.AnimationClip.EASING.Sinusoidal.InOut);
        this.glow.animation.add(glowAnim);
        this.glow.animation.add(glowBackAnim);
        this.glow.animation.start("glowAnim");
        this.glow.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
            if (e.animation === 'glowAnim') {
                this.glow.animation.start("glowBackAnim");
            }
            if (e.animation === 'glowBackAnim') {
                this.glow.animation.start("glowAnim");
            }
        });

        const ringGeometry = new THREE.RingGeometry(this.r * 0.8, this.r2, 32, 1, 0, 0);
        const ringThree = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({
            color: 0x732879,
            side: THREE.DoubleSide,
            transparent: true
        }));
        this.ring = new RODIN.Sculpt(ringThree);
        this.ring._threeObject.renderOrder = 12;
        this.add(this.ring);
        this.ring.position.set(0, 0, -0.001);
        this.ring.hovered = false;
        this.ring.length = 0;

        this.hoverCir.on(RODIN.CONST.GAMEPAD_MOVE, (e) => {
            const x =  e.uv.x - 0.5;
            const y =  e.uv.y - 0.5;
            const d = 2.5*(Math.sqrt(0.5) - Math.sqrt(x*x + y*y))/Math.sqrt(0.5)
            const val = 0.1 + d*d;
            RODIN.GamePad.cardboard.gazePoint.Sculpt.scale.set(val,val,val);
        });

        this.bg.on(RODIN.CONST.GAMEPAD_HOVER, () => {
            this.ring.hovered = true;
        });
        this.bg.on(RODIN.CONST.GAMEPAD_HOVER_OUT, () => {
            this.ring.hovered = false;
        });
        this.cb = cb;
        this.ring.on(RODIN.CONST.UPDATE, () => {
            if (this.ring.hovered && this.ring.length <= 2 * Math.PI) {
                let g = new THREE.RingGeometry(this.r * 0.8, this.r2, 64, 1, 0, this.ring.length);
                this.ring._threeObject.geometry.dispose();
                this.ring._threeObject.geometry = g;

                if ((2 * Math.PI - this.ring.length ) > 0.0628) {
                    this.ring.length += (2 * Math.PI) / 100;
                } else {
                    this.ring.length = 0;
                    this.cb();
                    RODIN.GamePad.cardboard.gazePoint.Sculpt.scale.set(.64, .64, .64);
                }
            }

            if (!this.ring.hovered && this.ring.length >= 0) {
                let g = new THREE.RingGeometry(this.r * 0.8, this.r2, 64, 1, 0, this.ring.length);
                this.ring._threeObject.geometry.dispose();
                this.ring._threeObject.geometry = g;

                if ((this.ring.length ) > 0.63) {
                    this.ring.length -= (2 * Math.PI) / 10;
                } else {
                    this.ring.length = 0;
                }
            }
        });

        this.bg.animation.add(showAnim);
        this.white.animation.add(showAnim);
        this.glow.animation.add(showAnim);
        this.ring.animation.add(showAnim);
    }


    show(delay) {
        setTimeout(() => {
            this.visible = true;
            this.bg.animation.start("showAnim");
            this.white.animation.start("showAnim");
            this.glow.animation.start("showAnim");
            this.ring.animation.start("showAnim");
        }, delay);
    }
    hide(){
        this.visible = false;
        this.bg.material.opacity = 0;
        this.white.material.opacity = 0;
        this.glow.material.opacity = 0;
        this.ring.material.opacity = 0;
    }
}
