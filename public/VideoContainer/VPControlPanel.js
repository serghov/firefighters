/**
 * Created by Reinchard on 10/6/2017.
 */
import * as R from 'rodin/main';

const player = new R.MaterialPlayer({
    HD: "/video/360.mp4",
    default: "HD"
});
let bufferAnimation = new R.AnimationClip("bufferAnimation", {
    rotation: {
        x: 0,
        y: {
            from: -Math.PI / 2,
            to: Math.PI / 2,
        },
        z: 0
    }
});
bufferAnimation.loop(true);
bufferAnimation.duration(1000);

let hoverAnimation = new R.AnimationClip("hoverAnimation", {
    scale: {
        x: 1.1,
        y: 1.1,
        z: 1.1
    }
});
hoverAnimation.duration(200);

let hoverOutAnimation = new R.AnimationClip("hoverOutAnimation", {
    scale: {
        x: 1,
        y: 1,
        z: 1
    }
});
hoverOutAnimation.duration(200);

let scaleOutAnimation = new R.AnimationClip("scaleOutAnimation", {
    scale: {
        x: 0.01,
        y: 0.01,
        z: 0.01
    }
});
scaleOutAnimation.duration(150);

let scaleInAnimation = new R.AnimationClip("scaleInAnimation", {
    scale: {
        x: 1,
        y: 1,
        z: 1
    }
});
scaleInAnimation.duration(150);


const secondsToH_MM_SS = (length, separator = ":") => {
    length = Math.round(length);
    let hours = Math.floor(length / 3600);
    length %= 3600;
    let minutes = Math.floor(length / 60);
    if (minutes < 10 && hours != 0) {
        minutes = "0" + minutes;
    }
    let seconds = length % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return ((hours != 0 ? hours + separator : "") + minutes + separator + seconds);
};

export class VPcontrolPanel extends R.Sculpt {

    constructor({scene, player, title = "Untitled Video", cover = null, distance = 1.5, width = 1.5}) {

        super(new THREE.Object3D());
        this.vpScene = scene;
        this.panel = new R.Sculpt();
        this.player = player;
        this.cover = cover;
        this.width = width;
        this.elementsPending = 0;
        this.timeBarButton = null;
        this.coverEl = null;
        this.title = title;

        this.panelCenter = new R.Sculpt();

        this.panel.parent = this.panelCenter;
        this.panel.position.set(0, 0.15, -distance);
        this.panelCenter.parent = this;
        this.panelCenter.position.set(0, 0, 0);

        this.createTitle();
        this.createBackButton();
        this.createPlayPauseButtons();
        this.createTimeLine();
        this.createTimeBar();
        this.createAudioToggle();
        this.createHDToggle();
        this.createBackGround(distance, width);
        this.createBufferingLogo(distance);
        this.cover && this.createCover(distance, width);
        this.hoverOutTime = Infinity;
        this.hasCloseAction = false;


        this.hoverAction = (evt) => {
            this.hoverOutTime = Infinity;
        };
        this.hoverOutAction = (evt) => {
            this.hoverOutTime = R.Time.now;
        };

        this.player.onBufferStart = () => {
            this.bufferEl.visible = true;
        };

        this.player.onBufferEnd = () => {
            this.bufferEl.visible = false;
        };

        this.vpScene.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            this.buttonDownTime = R.Time.now;
        });

        this.vpScene.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
            if (this.buttonDownTime && R.Time.now - this.buttonDownTime >= 250) return;
            this.toggleControls();
        });
        this.vpScene.preRender(() => {
            if (R.Time.now - this.hoverOutTime > 3000 && !this.hasCloseAction) {
                this.hideControls();
                this.hasCloseAction = true;
            }
        });
    }

    hideControls() {
        this.panel.parent = null;
    }

    showControls() {
        this.panel.parent = this.panelCenter;
        let vector = R.Avatar.active.HMDCamera._threeObject.getWorldDirection();
        let newRot = Math.atan(vector.x / vector.z) + (vector.z < 0 ? Math.PI : 0) + Math.PI;
        if (Math.abs(this.rotation.y - newRot) >= Math.PI / 3) {
            this.panelCenter.rotation.y = newRot;
        }
        this.hasCloseAction = false;
        this.hoverOutTime = R.Time.now;
    }

    toggleControls() {
        if (this.panel.parent == this.panelCenter) {
            this.hideControls();
        }
        else {
            this.showControls();
        }
    }

    readyCheck() {
        if (!this.elementsPending) {
            this.emitAsync(R.CONST.READY, new R.RodinEvent(this));
        }
    }

    createBackGround(distance, width) {
        let r = Math.sqrt(distance * distance + width * width / 4) * 2;

        let sphere = new R.Sculpt(new THREE.Mesh(
            new THREE.SphereBufferGeometry(r, 12, 12),
            new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 0.3,
                //wireframe:true,
                side: THREE.BackSide
            })
        ));

        sphere._threeObject.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -r));
        sphere.parent = this.panel;
        sphere.position.set(0, 0, r);
    }


    createCover(distance, width) {
        let r = Math.sqrt(distance * distance + width * width / 4) * 3;

        let coverMesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(r, 720, 4),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: new THREE.TextureLoader().load(this.cover),
                side: THREE.DoubleSide
            })
        );

        coverMesh.scale.set(-1, 1, 1);

        this.coverEl = new R.Sculpt(coverMesh);
        this.coverEl.on(R.CONST.READY, (evt) => {
            this.coverEl.position.y = 1.6;
            this.coverEl.parent = this;
        });
    }

    createBackButton() {
        let backParams = {name: "back", width: this.width / 6, height: this.width / 6, ppm: 500};

        backParams.background = {
            image: {
                url: "img/videoPlayer/backButton.png"
            },
            opacity: 0.5
        };
        this.elementsPending++;

        let back = new R.Element(backParams);
        back.on(R.CONST.READY, (evt) => {
            evt.target.parent = this.panel;
            evt.target.position.set(/*-this.width / 2.2*/0, -this.width / 2.4, 0);
            evt.target.animation.add(hoverAnimation, hoverOutAnimation);
            this.elementsPending--;
            this.readyCheck();
        });
        back.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            evt.target.animation.start("hoverAnimation");
        });
        back.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            evt.target.animation.start("hoverOutAnimation");
        });
        back.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            this.pauseButton.scale.set(1, 1, 1);
            this.playButton.scale.set(1, 1, 1);
            this.pauseButton.parent = null;
            this.playButton.parent = this.panel;
            if (!isNaN(this.player.getLength())) {
                this.player.pause();
                this.player.jumpTo(0);
            }
            R.Scene.go('Main');
            player.play();
        });
    }

    createTitle() {
        let titleParams = {
            text: this.title,
            color: 0xffffff,
            fontFamily: "Arial",
            fontSize: this.width * 0.04,
            ppm: 1000
        };
        let titleButton = new R.Text(titleParams);
        this.elementsPending++;

        titleButton.on(R.CONST.READY, (evt) => {
            titleButton.parent = this.panel;
            titleButton.position.set(0, this.width / 4, 0);
            this.elementsPending--;
            this.readyCheck();
        });
    }

    createPlayPauseButtons() {
        let playParams = {name: "play", width: this.width / 5, height: this.width / 5};

        playParams.background = {
            color: 0x666666,
            opacity: 0.3
        };

        playParams.border = {
            radius: this.width / 10
        };

        playParams.image = {
            url: "img/videoPlayer/play.png",
            width: this.width / 15,
            height: this.width / 15,
            position: {h: 54, v: 50}
        };

        let playButton = new R.Element(playParams);
        this.playButton = playButton;
        this.elementsPending++;

        playButton.on(R.CONST.READY, (evt) => {
            playButton.parent = this.panel;
            playButton.position.set(0, 0, 0);
            playButton.animation.add(hoverAnimation, hoverOutAnimation, scaleOutAnimation, scaleInAnimation);
            this.elementsPending--;
            this.readyCheck();
        });

        playButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            !evt.target.animation.isPlaying() && evt.target.animation.start("hoverAnimation");
        });

        playButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            !evt.target.animation.isPlaying() && evt.target.animation.start("hoverOutAnimation");
        });

        playButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();
            if (this.visible) {
                evt.target.animation.start("scaleOutAnimation");
            }
        });

        playButton.on(R.CONST.ANIMATION_COMPLETE, (evt) => {
            if (evt.animation === "scaleOutAnimation") {
                playButton.parent = null;
                pauseButton.parent = this.panel;
                pauseButton.animation.start("scaleInAnimation");
                if (this.cover && this.coverEl) {
                    this.coverEl.visible = false;
                }
                this.player.play();
            }
        });


        let pauseParams = {name: "pause", width: this.width / 5, height: this.width / 5};

        pauseParams.background = {
            color: 0x666666,
            opacity: 0.3
        };

        pauseParams.border = {
            radius: this.width / 10
        };

        pauseParams.image = {
            url: "img/videoPlayer/pause.png",
            width: this.width * 0.04,
            height: this.width * 0.06,
            position: {h: 50, v: 50}
        };

        let pauseButton = new R.Element(pauseParams);
        this.pauseButton = pauseButton;
        this.elementsPending++;

        pauseButton.on(R.CONST.READY, (evt) => {
            pauseButton.parent = this.panel;
            pauseButton.position.set(0, 0, 0);
            pauseButton.parent = null;
            evt.target.animation.add(hoverAnimation, hoverOutAnimation, scaleOutAnimation, scaleInAnimation);
            this.elementsPending--;
            this.readyCheck();
        });

        pauseButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            !evt.target.animation.isPlaying() && evt.target.animation.start("hoverAnimation");
        });

        pauseButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            !evt.target.animation.isPlaying() && evt.target.animation.start("hoverOutAnimation");
        });

        pauseButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();
            if (this.visible) {
                evt.target.animation.start("scaleOutAnimation");
            }
        });

        pauseButton.on(R.CONST.ANIMATION_COMPLETE, (evt) => {
            if (evt.animation === "scaleOutAnimation") {
                pauseButton.parent = null;
                playButton.parent = this.panel;
                playButton.animation.start("scaleInAnimation");
                this.player.pause();
            }

            if (evt.animation === 'scaleInAnimation') {
            }
        });
    }


    createBufferingLogo(distance) {
        const bufferingParams = {name: "buffering", width: this.width / 6, height: this.width / 6};

        bufferingParams.background = {
            color: 0x666666,
            opacity: 0.3
        };

        bufferingParams.border = {
            radius: this.width / 12,
            width: this.width / 500,
            color: 0xffffff
        };

        bufferingParams.image = {
            url: "img/videoPlayer/rodin.png",
            width: this.width / 30,
            height: this.width / 25,
            position: {h: 54, v: 35}
        };
        bufferingParams.label = {
            text: "loading",
            fontSize: this.width / 37.5,
            color: 0xffffff,
            position: {
                h: 50,
                v: 65
            }
        };

        this.bufferEl = new R.Element(bufferingParams);
        this.elementsPending++;

        this.bufferEl.on(R.CONST.READY, (evt) => {
            this.panel.add(this.bufferEl);
            this.bufferEl.position.set(0, -0.9, -distance + bufferingParams.width / 2);
            this.bufferEl.visible = false;
            this.bufferEl.animation.add(bufferAnimation);
            this.bufferEl.animation.start("bufferAnimation");
            this.elementsPending--;
            this.readyCheck();
        });
    }


    createTimeLine() {
        const color = 0xff9a2b;

        const timeLineBGParams = {
            name: "timeLineBG",
            width: this.width,
            height: this.width / 50,
            background: {
                color: 0xaaaaaa,
                opacity: 0.5
            }
        };

        const timeLineParams = {
            name: "timeLine",
            width: this.width,
            height: this.width / 50,
            background: {
                color: color
            },
            transparent: false
        };

        const caretParams = {
            name: "caret",
            width: this.width * 0.024,
            height: this.width * 0.024,
            border: {
                radius: this.width * 0.012
            },
            background: {
                color: 0xffffff
            },
            transparent: false
        };

        const pointerParams = {
            name: "pointer",
            width: this.width * 0.046,
            height: this.width * 0.046,
            border: {
                width: this.width / 500,
                color: 0xffffff,
                radius: this.width * 0.023
            },
            label: {
                text: "I",
                fontSize: this.width / 37.5,
                color: 0xff0000,
                position: {
                    h: 50,
                    v: 55
                }
            }
        };

        const pointerTimeParams = {
            name: "pointerTimeParams",
            text: "0:00",
            color: 0xffffff,
            fontFamily: "Arial",
            fontSize: this.width / 37.5,
            ppm: 1000
        };

        let timeLineBG = new R.Element(timeLineBGParams);
        this.elementsPending++;


        timeLineBG.on(R.CONST.READY, (evt) => {
            timeLineBG.parent = this.panel;
            timeLineBG.position.set(0, -this.width / 3.75, 0);
            this.elementsPending--;
            this.readyCheck();
        });


        timeLineBG.on(R.CONST.GAMEPAD_MOVE, (evt) => {
            this.hoverAction(evt);
            if (pointer.isReady) {
                pointer.visible = true;
                pointer.position.x = evt.uv.x - this.width / 2;
            }

            if (pointerTime.isReady) {
                let time = secondsToH_MM_SS(this.player.getLength() * evt.uv.x / this.width);
                pointerTime.position.x = evt.uv.x - this.width / 2;
                if (time === pointerTime.lastTime && pointerTime.visible) return;
                pointerTimeParams.text = time;
                pointerTime.reDraw(pointerTimeParams);
                pointerTime.visible = true;
                pointerTime.lastTime = time;
            }
        });

        timeLineBG.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            if (pointer.isReady) {
                pointer.visible = false;
            }
            if (pointerTime.isReady) {
                pointerTime.visible = false;
            }
        });

        timeLineBG.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();
            this.player.jumpTo(evt.uv.x / this.width);
        });

        let timeLine = new R.Element(timeLineParams);
        this.elementsPending++;

        timeLine.on(R.CONST.READY, () => {
            timeLine.parent = this.panel;
            timeLine.position.set(0, -this.width / 3.75, 0.0001);
            timeLine.scale.set(0.0001, 1, 1);
            this.elementsPending--;
            this.readyCheck();
        });

        this.timeLine = timeLine;
        timeLine.on(R.CONST.UPDATE, (evt) => {
            let time = this.player.getTime();
            time = time ? time : 0.0001;
            let duration = this.player.getLength();
            if (!duration) return;
            let scale = time / duration;
            timeLine.scale.set(scale, 1, 1);
            timeLine.position.x = (scale - 1) * this.width / 2;
        });


        let caret = new R.Element(caretParams);
        this.elementsPending++;

        caret.on(R.CONST.READY, (evt) => {
            caret.parent = this.panel;
            caret.position.y = -this.width / 3.75;
            caret.position.z = 0.0002;
            caret.position.x = -this.width / 2;
            this.elementsPending--;
            this.readyCheck();
        });

        caret.on('update', (evt) => {
            if (timeLine.isReady) {
                caret.position.x = timeLine.scale.x * this.width - this.width / 2;
            }
        });


        let pointer = new R.Element(pointerParams);
        this.elementsPending++;

        pointer.on(R.CONST.READY, (evt) => {
            pointer.parent = this.panel;
            pointer.position.y = -this.width / 3.75;
            pointer.position.z = 0.0004;
            pointer._threeObject.material.depthWrite = false;
            pointer.position.x = -this.width / 2;
            pointer.visible = false;
            this.elementsPending--;
            this.readyCheck();
        });

        let pointerTime = new R.Text(pointerTimeParams);
        this.elementsPending++;

        pointerTime.on(R.CONST.READY, (evt) => {
            pointerTime.parent = this.panel;
            pointerTime.position.y = -this.width * 0.21;
            pointerTime.position.z = 0.0004;
            pointerTime.position.x = 0;
            pointerTime.visible = false;
            this.elementsPending--;
            this.readyCheck();
        });

        this.caret = caret;
        this.pointer = pointer;
        this.pointerTime = pointerTime;
    }

    createTimeBar() {
        let timeBarParams = {
            text: "0:00/0:00",
            color: 0xffffff,
            fontFamily: "Arial",
            fontSize: this.width / 30,
            ppm: 1000
        };
        this.timeBarButton = new R.Text(timeBarParams);
        this.elementsPending++;
        this.timeBarButton.on(R.CONST.READY, (evt) => {
            this.timeBarButton.parent = this.panel;
            this.timeBarButton.position.set(-this.width / 2, -this.width / 3, 0);
            this.elementsPending--;
            this.readyCheck();
        });

        this.timeBarButton.on('update', (evt) => {
            const t = this.player.getTime();
            const l = this.player.getLength();

            let time = secondsToH_MM_SS(isNaN(l) ? 0 : t);
            let total = secondsToH_MM_SS(isNaN(l) ? 0 : l);
            if (time === evt.target.lastTime) return;
            timeBarParams.text = time + "/" + total;
            evt.target.reDraw(timeBarParams);

            if (!isNaN(this.player.getLength())) {
                evt.target.lastTime = time;
            }

            evt.target._threeObject.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(evt.target._threeObject.geometry.parameters.width / 2, 0, 0));
        });
    }


    createAudioToggle() {
        let muteParams = {name: "mute", width: this.width * 0.04, height: this.width * 0.04, ppm: 1000};

        muteParams.image = {
            url: "img/videoPlayer/audioON.png",
            width: this.width * 0.04,
            height: this.width * 0.04,
            position: {h: 50, v: 50}
        };

        let muteButton = new R.Element(muteParams);
        this.elementsPending++;

        muteButton.on(R.CONST.READY, (evt) => {
            muteButton.parent = this.panel;
            muteButton.position.set(-this.width / 2, -this.width / 3.02, 0);
            evt.target.animation.add(hoverAnimation, hoverOutAnimation);
            this.elementsPending--;
            this.readyCheck();
        });

        muteButton.on('update', (evt) => {
            if (this.timeBarButton) {
                muteButton.position.x = this.timeBarButton.position.x + this.timeBarButton.scale.x * this.timeBarButton._threeObject.geometry.parameters.width + this.width / 30;
            }
        });

        muteButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            evt.target.animation.start("hoverAnimation");
        });

        muteButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            evt.target.animation.start("hoverOutAnimation");
        });

        muteButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();
            this.player.mute(true);
            muteButton.parent = null;
            unmuteButton.parent = this.panel;
            unmuteButton.position.set(-this.width / 2, -this.width / 3.02, 0);
        });

        let unmuteParams = {name: "unmute", width: this.width * 0.04, height: this.width * 0.04, ppm: 1000};

        unmuteParams.image = {
            url: "img/videoPlayer/audioOFF.png",
            width: this.width * 0.04,
            height: this.width * 0.04,
            opacity: 0.6,
            position: {h: 50, v: 50}
        };

        let unmuteButton = new R.Element(unmuteParams);
        this.elementsPending++;

        unmuteButton.on(R.CONST.READY, (evt) => {
            unmuteButton.parent = this.panel;
            unmuteButton.position.set(-this.width / 2, -this.width / 3.02, 0);
            evt.target.animation.add(hoverAnimation, hoverOutAnimation);
            this.elementsPending--;
            this.readyCheck();
            unmuteButton.parent = null;
        });

        unmuteButton.on('update', (evt) => {
            if (this.timeBarButton) {
                unmuteButton.position.x = this.timeBarButton.position.x + this.timeBarButton.scale.x * this.timeBarButton._threeObject.geometry.parameters.width + this.width / 30;
            }
        });

        unmuteButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            evt.target.animation.start("hoverAnimation");
        });

        unmuteButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            evt.target.animation.start("hoverOutAnimation");
        });

        unmuteButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();
            this.player.mute(false);
            unmuteButton.parent = null;
            muteButton.parent = this.panel;
            muteButton.position.set(-this.width / 2, -this.width / 3.02, 0);
        });

    }

    createHDToggle() {
        let HDParams = {
            text: "HD",
            color: 0xffffff,
            fontFamily: "Arial",
            fontSize: this.width / 30,
            ppm: 1000
        };
        let HDButton = new R.Text(HDParams);

        this.elementsPending++;

        HDButton.on(R.CONST.READY, (evt) => {
            HDButton.parent = this.panel;
            HDButton.position.set(this.width * 0.48, -this.width / 3.02, 0);
            evt.target.animation.add(hoverAnimation, hoverOutAnimation);
            this.elementsPending--;
            this.readyCheck();
        });

        HDButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            evt.target.animation.start("hoverAnimation");
        });

        HDButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            evt.target.animation.start("hoverOutAnimation");
        });

        HDButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();

            let playAfter = this.player.isPlaying();
            this.player.switchTo("SD");

            HDButton.parent = null;
            SDButton.parent = this.panel;
            SDButton.position.set(this.width * 0.48, -this.width / 3.02, 0);

            if (playAfter) {
                this.player.play();
            }
        });


        let SDParams = {
            text: "SD",
            color: 0xffffff,
            fontFamily: "Arial",
            fontSize: this.width / 30,
            ppm: 1000
        };
        let SDButton = new R.Text(SDParams);

        this.elementsPending++;

        SDButton.on(R.CONST.READY, (evt) => {
            SDButton.parent = this.panel;
            SDButton.position.set(this.width * 0.48, -this.width / 3.02, 0);
            evt.target.animation.add(hoverAnimation, hoverOutAnimation);
            this.elementsPending--;
            this.readyCheck();
            SDButton.parent = null;
        });

        SDButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            evt.target.animation.start("hoverAnimation");
        });

        SDButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            evt.target.animation.start("hoverOutAnimation");
        });

        SDButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();

            let playAfter = this.player.isPlaying();
            this.player.switchTo("HD");

            SDButton.parent = null;
            HDButton.parent = this.panel;
            HDButton.position.set(this.width * 0.48, -this.width / 3.02, 0);

            if (playAfter) {
                this.player.play();
            }
        });


        let LDParams = {
            text: "LD",
            color: 0xffffff,
            fontFamily: "Arial",
            fontSize: this.width / 30,
            ppm: 1000
        };
        let LDButton = new R.Text(LDParams);

        this.elementsPending++;

        LDButton.on(R.CONST.READY, (evt) => {
            LDButton.position.set(this.width * 0.48, -this.width / 3.02, 0);
            evt.target.animation.add(hoverAnimation, hoverOutAnimation);
            this.elementsPending--;
            this.readyCheck();
        });

        LDButton.on(R.CONST.GAMEPAD_HOVER, (evt) => {
            this.hoverAction(evt);
            evt.target.animation.start("hoverAnimation");
        });

        LDButton.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            this.hoverOutAction(evt);
            evt.target.animation.start("hoverOutAnimation");
        });

        LDButton.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            evt.stopPropagation();

            let playAfter = this.player.isPlaying();
            this.player.switchTo("HD");

            LDButton.parent = null;
            HDButton.parent = this.panel;
            HDButton.position.set(this.width * 0.48, -this.width / 3.02, 0);

            if (playAfter) {
                this.player.play();
            }
        });
    }
}