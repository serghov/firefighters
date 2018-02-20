import * as RODIN from 'rodin/main';

export class LabeledLoader extends RODIN.Sculpt {
    constructor(r, cb) {
        super();
        this.r = r || 0.5;
        this.r2 = 0.001;

        const bgGeo = new THREE.PlaneGeometry(this.r*2.5, this.r, 32);
        const bgThree = new THREE.Mesh(bgGeo, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            map: RODIN.Loader.loadTexture('./img/assets/Labeled_Start_transparent.png'),
        }));
        bgThree.material.map.anisotropy = 16;
        this.bg = new RODIN.Sculpt(bgThree);
        this.bg._threeObject.renderOrder = 2;
        this.add(this.bg);
        this.label

        const whiteGeo = new THREE.CircleGeometry(this.r * 0.33, 32);
        const whiteThree = new THREE.Mesh(whiteGeo, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent:true
        }));
        this.white = new RODIN.Sculpt(whiteThree);
        this.white._threeObject.renderOrder = 1;
        this.white.position.set(this.r*0.7,  this.r * 0.05, -0.002);
        this.add(this.white);

        const ringGeometry = new THREE.RingGeometry(this.r * 0.33, this.r2, 32, 1, 0, 0);
        const ringThree = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({
            color: 0x732879,
            side: THREE.DoubleSide
        }));
        this.ring = new RODIN.Sculpt(ringThree);
        this.ring._threeObject.renderOrder = 2;
        this.add(this.ring);
        this.ring.position.set(this.r*0.7, this.r * 0.05, -0.001);
        this.ring.hovered = false;
        this.ring.length = 0;

        this.bg.on(RODIN.CONST.GAMEPAD_HOVER, () => {
            RODIN.GamePad.cardboard.gazePoint.Sculpt.visible = true;
        });
        this.bg.on(RODIN.CONST.GAMEPAD_HOVER_OUT, () => {
            RODIN.GamePad.cardboard.gazePoint.Sculpt.visible = false;
        });
        this.white.on(RODIN.CONST.GAMEPAD_HOVER, () => {
            this.ring.hovered = true;
        });
        this.white.on(RODIN.CONST.GAMEPAD_HOVER_OUT, () => {
            this.ring.hovered = false;
        });
        this.cb = cb;
        this.ring.on(RODIN.CONST.UPDATE, () => {
            if (this.ring.hovered && this.ring.length <= 2 * Math.PI) {
                let g = new THREE.RingGeometry(this.r * 0.33, this.r2, 64, 1, 0, this.ring.length);
                this.ring._threeObject.geometry.dispose();
                this.ring._threeObject.geometry = g;

                if ((2 * Math.PI - this.ring.length ) > 0.0628) {
                    this.ring.length += (2 * Math.PI) / 100;
                } else {
                    this.ring.length = 0;
                    this.cb();
                }
            }

            if (!this.ring.hovered && this.ring.length >= 0) {
                let g = new THREE.RingGeometry(this.r * 0.33, this.r2, 64, 1, 0, this.ring.length);
                this.ring._threeObject.geometry.dispose();
                this.ring._threeObject.geometry = g;

                if ((this.ring.length ) > 0.63) {
                    this.ring.length -= (2 * Math.PI) / 10;
                } else {
                    this.ring.length = 0;
                }
            }
        });
    }
    get material() {
        return [this.bg.material, this.white.material]
    }
}
