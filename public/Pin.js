import * as R from 'rodin/main';

export class Pin extends R.Sculpt {
    constructor(img, pos) {
        super();

        this.img = img;
        this.position.copy(pos);
        this.scale.set(4, 4, 4);

        const pinMaterial = new THREE.MeshBasicMaterial({color: 0x223341});

        const pinPoint = new R.Sphere(0.04, pinMaterial);
        this.add(pinPoint);

        const pinCylinder = new R.Cylinder(0.01, 0.01, 1.8, pinMaterial);
        pinCylinder.position.y = pinCylinder.height / 2;
        this.add(pinCylinder);

        const pinIcon = new R.Plane(0.4, new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture(this.img),
            transparent: true,
            side: THREE.DoubleSide
        }));
        pinIcon.position.y = pinCylinder.height + pinIcon.height / 2;
        pinIcon.rotation.y = Math.PI;
        this.add(pinIcon);

        pinIcon.on(R.CONST.UPDATE, (e) => {
            pinIcon.rotation.y = pinIcon.parent.parent.parent.rotation.y;
        });
    }
}