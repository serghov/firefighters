/**
 * Created by Reinchard on 10/6/2017.
 */
import * as R from 'rodin/main';
import {Thumbnail} from './videoThumbnail.js'
import {Dot} from './Dots/Dots.js';
import {setView} from './Grid/SimpleGrid.js'

let videoList = [{
    "title": "Fire Report",
    "description": "Fire Report",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/1.jpg"
}, {
    "title": "Fire Report",
    "description": "Fire Report",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/2.jpg"
}, {
    "title": "Fire Report",
    "description": "Fire Report",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/3.jpg"
}, {
    "title": "Fire Report",
    "description": "Fire Report",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/1.jpg"
}, {
    "title": "Fire Report",
    "description": "Fire Report",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/2.jpg"
}, {
    "title": "Fire Report",
    "description": "Fire Report",
    "url": {
        "SD": "video/360.mp4",
        "HD": "video/360.mp4"
    },
    "thumbnail": "img/thumbs/3.jpg"
}];

let view = null;

class VideoContainer {
    constructor() {
        this.height = 2.5;
        this.width = 1.3;
        this.mainContainer = new R.Sculpt();
        this.mainContainer.on(R.CONST.READY, () => {

            this.leftInterface = new R.Plane(  this.width, this.height, new THREE.MeshBasicMaterial({color: 0x223341}));

            this.infoText = new R.Text3D({
                text: 'Videos',
                color: 0x66b1ee,
                font: 'fonts/Roboto-Regular.ttf',
                fontSize: this.width/20,
            });

            this.infoText.on(R.CONST.READY, (e) => {
                this.infoText.center();
                this.infoText.position.set(0, this.height/2.2, .05);
                this.mainContainer.add(this.infoText);
            });
            //
            // this.mainContainer.position.set(-1.4, .1, -1.2);
            // this.mainContainer.rotation.y = Math.PI / 6;
            this.leftInterface.on(R.CONST.READY, this.createThumbs.bind(this));
            this.setDots = this.setDots.bind(this);
            this.dotsContainer = new R.Sculpt();
            this.leftInterface.add(this.dotsContainer);
            this.dotsContainer.on(R.CONST.READY, () => {
                this.dotsContainer.position.y = (videoList.length * 0.05 + videoList.length * Dot.height) / 2;
                this.dotsContainer.rotation.y = 0;
            });
            this.mainContainer.add(this.leftInterface);
        })
    }

    createThumbs() {
        this.thumbsList = videoList.map((video, $index) => {
            let thumb = new Thumbnail(video, this.width*0.85, this.height*0.27);
            thumb.on(R.CONST.READY, this.setThumbnailPosition.bind(this, thumb, $index));
            return thumb;
        });
        setView(this.thumbsList, this.mainContainer, this.width*0.85, this.height*0.3);
    }

    setThumbnailPosition(thumb, $index) {
        this.setDots(thumb, $index);
        thumb.on('select', (data) => {
            let selected = Dot.instances.filter((d) => {
                d.dot.isActive = false;
                d.dot.activeColor = '0x3a4650';
                return d.id === data.id;
            })[0];
            selected.activeColor = '0x66b1ee';
            selected.isActive = true;
        })
    }

    setDots(thumb, $index) {
        if($index > videoList.length - 2) return;
        let dot = new Dot(this.height/200);
        thumb.dot = dot;
        dot.id = $index;
        dot.element.on(R.CONST.READY, () => {
            this.dotsContainer.add(dot.element);
            dot.element.position.set(this.width*0.6, -$index * this.height/20, 0);
            dot.element.id = $index;
            if ($index === 0) {
                dot.isActive = true;
                dot.activeColor = '0x66b1ee';
            }
        });
    }
}

export default new VideoContainer();