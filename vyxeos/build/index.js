System.register(['rodin/main', './liposomeScene.js', './visualA.js', './visualB.js', './visualC.js', './visualD.js', './visualE.js', './visualF.js', './visualG.js', './visualH.js', './visualH1.js', './visualI.js', './visualJ.js'], function (_export, _context) {
    "use strict";

    var RODIN, LiposomeScene, visualA, visualB, visualC, visualD, visualE, visualF, visualG, visualH, visualH1, visualI, visualJ;
    return {
        setters: [function (_rodinMain) {
            RODIN = _rodinMain;
        }, function (_liposomeSceneJs) {
            LiposomeScene = _liposomeSceneJs.LiposomeScene;
        }, function (_visualAJs) {
            visualA = _visualAJs.visualA;
        }, function (_visualBJs) {
            visualB = _visualBJs.visualB;
        }, function (_visualCJs) {
            visualC = _visualCJs.visualC;
        }, function (_visualDJs) {
            visualD = _visualDJs.visualD;
        }, function (_visualEJs) {
            visualE = _visualEJs.visualE;
        }, function (_visualFJs) {
            visualF = _visualFJs.visualF;
        }, function (_visualGJs) {
            visualG = _visualGJs.visualG;
        }, function (_visualHJs) {
            visualH = _visualHJs.visualH;
        }, function (_visualH1Js) {
            visualH1 = _visualH1Js.visualH1;
        }, function (_visualIJs) {
            visualI = _visualIJs.visualI;
        }, function (_visualJJs) {
            visualJ = _visualJJs.visualJ;
        }],
        execute: function () {

            RODIN.start();
            RODIN.Text3D.loadFont("./fonts/Product_sans_regular.json");
            RODIN.Text3D.loadFont("./fonts/Product_sans_bold.json");
            const platform = new RODIN.Sculpt();

            RODIN.Scene.add(platform);
            RODIN.Scene.platform = platform;
            RODIN.Scene.active.background = new THREE.Color(0xc9dfe8);

            const liposomeScene = new LiposomeScene();
            liposomeScene.setSpeed(0.08);
            liposomeScene.on(RODIN.CONST.UPDATE, () => {
                liposomeScene.rotate();
            });

            liposomeScene.rotate(1416);

            RODIN.messenger.once(RODIN.CONST.ALL_SCULPTS_READY, () => {
                let url = new URL(window.location.href);
                let c = url.searchParams.get("securityKey");
                //window.history.pushState('Vyxeos', 'Vyxeos', '/Vyxeos');
                //if(parseInt(c)%2138748 != 0)return;
                document.getElementsByTagName("canvas")[0].style.display = "none";
                document.getElementById('touch').style.display = "";
                document.getElementById('img').style.display = "none";
                document.getElementById('pulsating-circle').style.display = "none";
                let _rodinMediaTrigger = function (e) {
                    // RODIN.GamePad.cardboard.gazePoint.Sculpt.visible = false;
                    RODIN.GamePad.cardboard.gazePoint.Sculpt.scale.set(0.64, .64, .64);
                    RODIN.GamePad.cardboard.gazePoint.Sculpt.geometry = new THREE.CircleGeometry(0.01, 32);
                    // RODIN.GamePad.cardboard.gazePoint.Sculpt.material.color = new THREE.Color(0x72267a);
                    RODIN.GamePad.cardboard.gazePoint.Sculpt.material.color = new THREE.Color(0xff0000);

                    document.getElementById("sound1").play();
                    document.getElementById("sound1").pause();
                    document.getElementById("sound2").play();
                    document.getElementById("sound2").pause();
                    document.getElementById("sound3").play();
                    document.getElementById("sound3").pause();
                    document.getElementById("sound4").play();
                    document.getElementById("sound4").pause();
                    document.getElementById("sound5").play();
                    document.getElementById("sound5").pause();
                    window.removeEventListener("touchend", _rodinMediaTrigger);
                    window.removeEventListener("click", _rodinMediaTrigger);

                    document.getElementById('touch').style.display = "none";
                    document.getElementsByTagName("canvas")[0].style.display = "";
                    prepareGazePoint();

                    platform.add(liposomeScene);
                    visualA.start();
                    document.getElementById("sound1").play();
                    visualA.end = function () {
                        visualA.parent = null;
                        document.getElementById("sound1").pause();
                        document.getElementById("sound1").currentTime = 0;
                        document.getElementById("sound2").play();
                        visualB.start();
                        visualB.init();
                    };
                    visualB.end = function () {
                        visualB.parent = null;
                        visualC.start();
                        // visualG.end();
                    };
                    visualC.end = function () {
                        visualC.parent = null;
                        visualD.start();
                    };
                    visualD.end = function () {
                        visualD.parent = null;
                        visualE.start();
                    };
                    visualE.end = function () {
                        visualE.parent = null;
                        document.getElementById("sound2").pause();
                        document.getElementById("sound2").currentTime = 0;
                        document.getElementById("sound3").play();
                        visualF.start(visualE.rotation.y);
                        liposomeScene.parent = null;
                    };
                    visualF.end = function (angle) {
                        visualF.parent = null;
                        document.getElementById("sound3").pause();
                        document.getElementById("sound3").currentTime = 0;
                        document.getElementById("sound4").play();
                        visualG.start(RODIN.Scene.platform.angle);
                        liposomeScene.parent = null;
                    };
                    visualG.end = function (angle) {
                        document.getElementById("sound4").pause();
                        document.getElementById("sound4").currentTime = 0;
                        document.getElementById("sound5").play();
                        visualG.parent = null;
                        align();
                        visualH.start(visualA.rotation.y);
                        liposomeScene.parent = platform;
                        visualH.countDown(30000);
                        // visualH.countDown(20000);
                    };
                    visualH.end = function (angle) {
                        visualH.parent = null;
                        visualH1.start(visualH.rotation.y);
                        visualH1.countDown(25000);
                        // visualH1.countDown(15000);
                    };
                    visualH1.end = function (angle) {
                        visualH1.parent = null;
                        visualI.start(visualH1.rotation.y);
                        visualI.countDown(25000);
                        // visualI.countDown(4000);
                    };
                    visualI.end = function (angle) {
                        visualI.parent = null;
                        visualJ.start(visualI.rotation.y);
                        visualJ.countDown(15000);
                        // visualJ.countDown(8000);
                    };
                    visualJ.end = function () {
                        visualJ.parent = null;
                        document.getElementById("sound5").pause();
                        document.getElementById("sound5").currentTime = 0;
                        document.getElementById("sound1").play();
                        platform.rotation.y = visualG.rotation.y = 0;
                        align(0);
                        visualA.start();
                    };
                };

                window.addEventListener("touchend", _rodinMediaTrigger);
                window.addEventListener("click", _rodinMediaTrigger);
            });

            const prepareGazePoint = function () {/*
                                                  console.log(RODIN.GamePad.cardboard.gazePoint);
                                                  const gazeG = new THREE.RingGeometry(.035, 0.05, 32);
                                                  const gazeM = new THREE.MeshBasicMaterial({
                                                  color: 0xDB2DE6
                                                  });
                                                  const gp = RODIN.GamePad.cardboard.gazePoint;
                                                  gp.timerSculpt = new RODIN.Sculpt(new THREE.Mesh(gazeG, gazeM));
                                                  gp.timerSculpt.thetalength = 0.01;
                                                  const timerAnim = new RODIN.AnimationClip("timerAnim", {
                                                  thetalength: {from: 0.01, to: 2 * Math.PI}
                                                  });
                                                  gp.timerSculpt.animation.add(timerAnim);
                                                  gp.timerSculpt.on(RODIN.CONST.UPDATE, () => {
                                                  if (gp.timerSculpt.animation.isPlaying("timerAnim")) {
                                                  gp.timerSculpt.position.z = gp.Sculpt.position.z+0.1;
                                                  const g = new THREE.RingGeometry(.035, 0.05, 32, 0, 0, gp.timerSculpt.thetalength);
                                                  gp.timerSculpt.geometry.dispose();
                                                  gp.timerSculpt.geometry = g;
                                                  }
                                                  });
                                                  gp.timerSculpt.on(RODIN.CONST.ANIMATION_COMPLETE, (e) => {
                                                  if (e.animation === 'timerAnim') {
                                                  gp.timerSculpt.clickFunction();
                                                  const g = new THREE.RingGeometry(.035, 0.05, 32, 0, 0, 0.01);
                                                  gp.timerSculpt.geometry.dispose();
                                                  gp.timerSculpt.geometry = g;
                                                  gp.timerSculpt.parent = null;
                                                  }
                                                  });
                                                  gp.timerSculpt.startTimerClick = (time, clickFunction) => {
                                                  gp.Sculpt.parent.add(gp.timerSculpt);
                                                  gp.timerSculpt.clickFunction = clickFunction;
                                                  gp.timerSculpt.animation.getClip("timerAnim").duration(time);
                                                  console.log(gp.timerSculpt.position.valueOf());
                                                  gp.timerSculpt.animation.start("timerAnim");
                                                  };
                                                  gp.timerSculpt.stopTimerClick = () => {
                                                  gp.timerSculpt.animation.stop("timerAnim", false);
                                                  console.log("stop");
                                                  const g = new THREE.RingGeometry(.035, 0.05, 32, 0, 0, 0.01);
                                                  gp.timerSculpt.geometry.dispose();
                                                  gp.timerSculpt.geometry = g;
                                                  gp.timerSculpt.parent = null;
                                                  };*/
            };
            /*RODIN.Scene.preRender(()=> {
                const dir = RODIN.Avatar.HMDCamera.worldDirection;
                let angle = Math.atan(dir.x / dir.z);
                if (dir.z > 0) {
                    if (dir.x > 0) {
                        angle = -Math.PI + angle
                    } else {
                        angle = Math.PI + angle
                    }
                }
            });*/

            /*const text1 = new RODIN.Text3D({
                text: "This text is positioned\nat the distance of\n2m",
                color: 0xffffff,
                font: "./fonts/Product_sans_bold.json",
                fontSize: 0.08,
                lineHeight: 0.13,
                align: "center"
            });*/

            RODIN.Scene.preRender(() => {
                let angle = getViewerAngle();
                RODIN.Scene.platform.angle = angle;
                const diff = visualA.rotation.y - angle;
                const delta = 0.55;
                if (diff > delta) {
                    angle += delta;
                    align(angle);
                }
                if (diff < -delta) {
                    angle -= delta;
                    align(angle);
                }
            });

            const align = function (angle = getViewerAngle()) {
                visualA.rotation.y = angle;
                visualB.rotation.y = angle;
                visualC.rotation.y = angle;
                visualD.rotation.y = angle;
                visualE.rotation.y = angle;
                visualH.rotation.y = angle;
                visualH1.rotation.y = angle;
                visualI.rotation.y = angle;
                visualJ.rotation.y = angle;
            };

            const getViewerAngle = function () {
                const dir = RODIN.Avatar.HMDCamera.worldDirection;
                let angle = Math.atan(dir.x / dir.z);
                if (dir.z > 0) {
                    if (dir.x > 0) {
                        angle = -Math.PI + angle;
                    } else {
                        angle = Math.PI + angle;
                    }
                }
                return angle;
            };
        }
    };
});