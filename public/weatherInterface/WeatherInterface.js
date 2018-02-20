import * as R from 'rodin/main';
import {infoInterface} from './infoInterface.js';
import {bottomInterfaceGrid} from './bottomInterfaceGrid.js';

export class WeatherInterface extends R.Sculpt {
    constructor() {
        const material = new THREE.MeshBasicMaterial({color:0xffffff, map:new THREE.TextureLoader().load("img/wPanel.png"), transparent:true});
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.409, 2.048, 2, 2), material);
        super(plane);
    }
}

