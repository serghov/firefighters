import * as R from 'rodin/main';
import {weatherInfo} from './weatherInfo.js';

const mainURL = 'img/Weather icons/';
const url256 = mainURL + '256/';

export class infoInterface extends R.Sculpt {
    constructor(height) {
        super();

        this.weatherIcon = new R.Plane(0.3, new THREE.MeshBasicMaterial({
            transparent: true,
            map: R.Loader.loadTexture(url256 + weatherInfo[5].icon),
        }));
        this.weatherIcon.position.set(0, height/3 - 0.15, 0.01);
        this.add(this.weatherIcon);
    }
}