/**
 * Created by Reinchard on 10/6/2017.
 */
import * as R from 'rodin/main';
// import {VPcontrolPanel} from './VPControlPanel.js';


export class VideoPlayerScene {
    constructor (url, title, scene){
        this.url = url;
        this.title = title;
        this.scene = scene;

        let player = new R.MaterialPlayer({
            HD: this.url.HD,
            SD: this.url.SD,
            default: "HD"
        }, false, 25, true);

        let material = new THREE.MeshBasicMaterial({
            map: player.getTexture()
        });

        let screen = new R.Sculpt(new THREE.Mesh(new THREE.PlaneBufferGeometry(3.820, 2.160), material));

        screen.position.set(0, 1.4, -4);
        R.Scene.add(screen);
        screen.player = player;
        player.play();

        screen.on(R.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
            e.target.player.pause();
            screen.parent = null;
        });
        screen.on(R.CONST.UPDATE, (e) => {
            e.target.player.update(R.Time.delta);
        });

    }
}