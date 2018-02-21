import * as R from 'rodin/main';

export const area = new R.Sculpt();

let raycaster = new THREE.Raycaster();
const socket = io();

let fireReport = function(data){
    // console.log(JSON.stringify(data));
    const tWidth = terrain._threeObject.geometry.boundingBox.max.x - terrain._threeObject.geometry.boundingBox.min.x;
    const tHeight = terrain._threeObject.geometry.boundingBox.max.z - terrain._threeObject.geometry.boundingBox.min.z;

    let x = (data.position.x / 2220 - 0.5) * tWidth;
    let z = (data.position.y / 2048 - 0.5) * tHeight;

    const marker = new R.Plane(0.3, 0.6, 2, 2, new THREE.MeshBasicMaterial({
        color:0xffffff,
        map: R.Loader.loadTexture('./img/fireIcon.png'),
        side: THREE.DoubleSide,
        transparent:true
    }));
    marker.parent = terrain;
    marker.position.set(x, 0, z);

    marker.on(R.CONST.UPDATE, (e) => {
        // e.target.rotation.x += 0.03;
        e.target.rotation.y += 0.045;
        // e.target.rotation.z += 0.06;
    });
    marker.on(R.CONST.GAMEPAD_HOVER, (e) => {
        e.target.scale.set(2, 2, 2);
    });
    marker.on(R.CONST.GAMEPAD_HOVER_OUT, (e) => {
        e.target.scale.set(1, 1, 1);
    });

    raycaster.set(new THREE.Vector3(marker.globalPosition.x, 20, marker.globalPosition.z), new THREE.Vector3(0,-1,0).normalize());
    const intersects = raycaster.intersectObject ( terrain._threeObject, false);
    // console.log(intersects);

    marker.parent = R.Scene.active;
    marker.position.set(intersects[0].point.x, intersects[0].point.y+0.55, intersects[0].point.z);
    marker.parent = terrain;

    marker.scale.set(1, 1, 1);

    marker.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
        if (!(evt.gamepad instanceof R.MouseGamePad) && evt.button.keyCode != 18) return;
        showData(data, data)
    });
};

socket.on('broadcast', fireReport);
const w = 1.3;
const h = 2;
let panel = new R.Plane(w, h, new THREE.MeshBasicMaterial({color: 0x223341}));

let showData = function(data, pos){
    if(R.Scene.screen){
        if(R.Scene.screen.player) R.Scene.screen.player.pause();
        R.Scene.screen.parent = null;
    }
    // console.log(panel);
    for(let i = 0; i < panel._children.length; i++){
        let ch = panel._children[i];
        panel.remove(ch);
        ch.parent = null;
        ch = null;
        i--;
    }

    // console.log(panel._children.length)
    if(data.image != null && data.image != ""){
        let image = new Image();
        image.src = data.image;

        let texture = new THREE.Texture();
        texture.image = image;
        image.onload = function() {
            texture.needsUpdate = true;
            const maxH = 2;
            const ratio = image.width / image.height;
            let imagePlane = new R.Plane(maxH*ratio, maxH, new THREE.MeshBasicMaterial({color: 0xffffff}));
            imagePlane.material.map = texture;
            imagePlane.on(R.CONST.READY, (e) =>{
                panel.add(e.target);
                e.target.position.x = (maxH*ratio)/2 + w/2;
            });
            imagePlane.on(R.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
                R.Scene.remove(panel)
            });
        };


    }

    let label = new R.Text3D({
        text: 'Alert',
        color: 0x66b1ee,
        font: 'fonts/Roboto-Regular.ttf',
        fontSize: h/22
    });

    label.on(R.CONST.READY, (e) => {
        e.target.center();
        e.target.position.set(0, h/2.2, .05);
        panel.add(label);
    });

    if(data.info[0] != null && data.info[0] != ""){
        // console.log(data.info[0]);
        let info1 = new R.Text3D({
            text: data.info[0],
            color: 0xffffff,
            font: 'fonts/Roboto-Regular.ttf',
            fontSize: h/30,
            align: "left"
        });

        info1.on(R.CONST.READY, (e) => {
            e.target.position.set(-w/2.4, h/2.2 - h/6, .05);
            panel.add(info1);
        });
    }

    if(data.info[1] != null && data.info[1] != "") {
        // console.log(data.info[1]);
        let info2 = new R.Text3D({
            text: data.info[1],
            color: 0xffffff,
            font: 'fonts/Roboto-Regular.ttf',
            fontSize: h / 30,
            align: "left"
        });

        info2.on(R.CONST.READY, (e) => {
            e.target.position.set(-w / 2.4, h / 2.2 - 2 * h / 6, .05);
            panel.add(info2);
        });
    }

    if(data.info[2] != null && data.info[2] != "") {
        // console.log(data.info[2]);
        let info3 = new R.Text3D({
            text: data.info[2],
            color: 0xffffff,
            font: 'fonts/Roboto-Regular.ttf',
            fontSize: h / 30,
            align: "left"
        });

        info3.on(R.CONST.READY, (e) => {
            e.target.position.set(-w / 2.4, h / 2.2 - 3 * h / 6, .05);
            panel.add(info3);
        });
    }


    if(data.info[3] != null && data.info[3] != "") {
        // console.log(data.info[3]);
        let info4 = new R.Text3D({
            text: data.info[3],
            color: 0xffffff,
            font: 'fonts/Roboto-Regular.ttf',
            fontSize: h / 30,
            align: "left"
        });

        info4.on(R.CONST.READY, (e) => {
            e.target.position.set(-w / 2.4, h / 2.2 - 4 * h / 6, .05);
            panel.add(info4);
        });
    }


    R.Scene.panel = panel;
    R.Scene.add(panel);
    panel.position.set(0, 1.6, -4);
}


panel.on(R.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
    R.Scene.remove(panel)
});

area.scale.set(0.3, 0.3, 0.3);
area.rotation.y = -1.8;
area.position.y = -5;
area.position.z = -10;
const plane = new R.Plane(120, 120, new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0, depthWrite: false}));
R.Scene.add(plane);
plane.position.copy(area.position);
plane.rotation.x = -Math.PI / 2;

let terrain = new R.Sculpt('./models/terrain.obj');
terrain.on(R.CONST.READY, (evt) => {





    const geo = new THREE.Geometry().fromBufferGeometry(evt.target._threeObject.children["0"].geometry);
    terrain = new R.Sculpt(new THREE.Mesh(geo, evt.target._threeObject.children["0"].material));
    terrain.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
        if (evt.gamepad instanceof R.MouseGamePad) {
            if (evt.keyCode === R.CONST.MOUSE_RIGHT) {
                terrain.doRotate = true;
            }
        } else {
            if(evt.button.keyCode == 19){
                terrain.doRotate = true;
                // console.log(evt.gamepad)
                // console.log(R.GamePad.oculusTouchRight)

            }
        }
    });
    area.add(terrain);
    terrain.position.y = 4.1;
    terrain.scale.set(1.8, 1.8, 1.8);
    terrain._threeObject.geometry.computeBoundingBox();
    // console.log(terrain);
    // console.log(terrain._threeObject.geometry.boundingBox);
    // setTimeout(function () {
    //     fireReport({"info":["ahdhshd","bdbsbx","werty","hdjsjsj fjsjsjfuf fisjsufj"],"position":{"x":1416,"y":1061}, "image":"data:image/jpeg;base64,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"})
    // }, 2000);
});


plane.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    if (!(evt.gamepad instanceof R.MouseGamePad) && evt.button.keyCode != 19) return;
    if (terrain.doRotate) {
        evt.stopPropagation();
        navigator.mouseGamePad.stopPropagationOnMouseMove = true;
        plane.initialPos = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);
        plane._threeObject.worldToLocal(plane.initialPos);
        area.initialRot = area.rotation.clone();
    }
});
R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
    if (!(evt.gamepad instanceof R.MouseGamePad) && evt.button.keyCode != 19) return;

    evt.stopPropagation();
    navigator.mouseGamePad.stopPropagationOnMouseMove = false;
    terrain.doRotate = false;
});

terrain.on(R.CONST.GAMEPAD_HOVER, (evt) => {
    area.hoverred = true;
});
plane.on(R.CONST.GAMEPAD_HOVER_OUT, (evt) => {
    terrain.doRotate = false;
    area.hoverred = false;
});
plane.on(R.CONST.GAMEPAD_MOVE, (evt) => {
    if ((terrain.doRotate) && plane.initialPos) {
        const initialAngle = area.getAngle(plane.initialPos, "y", "x");
        const currPoint = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);
        plane._threeObject.worldToLocal(currPoint);
        const currAngle = area.getAngle(currPoint, "y", "x");
        area.rotation.y = area.initialRot.y - (currAngle - initialAngle);
    }
});
area.getAngle = function (dir, axis1, axis2) {
    let angle = Math.atan(dir[axis1] / dir[axis2]);
    if (dir[axis2] > 0) {
        if (dir[axis1] > 0) {
            angle = -Math.PI + angle
        } else {
            angle = Math.PI + angle
        }
    }
    return angle;
};


// const forest = new R.Sculpt('./models/tree.obj');
// forest.on(R.CONST.READY, (evt) => {
//     const geo = new THREE.Geometry().fromBufferGeometry(evt.target._threeObject.children["0"].geometry);
//     const finalGeo = new THREE.Geometry();
//     const positions = new R.Sculpt('./models/trees_pos.obj');
//     positions.on(R.CONST.READY, (e) => {
//         const pos = e.target._threeObject.children["0"].geometry.attributes.position.array;
//         for (let i = 0; i < pos.length; i += 12) {
//             const treeGeo = geo.clone();
//             treeGeo.translate(pos[i], pos[i + 1], pos[i + 2]);
//             finalGeo.merge(treeGeo);
//         }
//         const tree = new R.Sculpt(new THREE.Mesh(finalGeo, new THREE.MeshPhongMaterial({color: 0x1c551c})));
//         area.add(tree);
//     });
// });



function mergeModel(obj, materialIndex = 0) {
    let finalGeo = new THREE.Geometry();
    for (let i = 0; i < obj.children.length; i++) {
        finalGeo.merge(new THREE.Geometry().fromBufferGeometry(obj.children["" + i].geometry));
    }
    return new THREE.Mesh(finalGeo, obj.children["" + materialIndex].material);
}


