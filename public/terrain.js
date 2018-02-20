import * as R from 'rodin/main';

export const area = new R.Sculpt();

let raycaster = new THREE.Raycaster();
const socket = io();

let fireReport = function(data){
    console.log(JSON.stringify(data));
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
    marker.position.set(intersects[0].point.x, intersects[0].point.y+0.25, intersects[0].point.z);
    marker.parent = terrain;

    marker.scale.set(1, 1, 1);

    marker.on(R.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
        showData(data, data)
    });
};

socket.on('broadcast', fireReport);
const w = 1.3;
const h = 2;
let panel = new R.Plane(w, h, new THREE.MeshBasicMaterial({color: 0x223341}));

let showData = function(data, pos){
    for(let c of panel._children){
        c.parent = null;
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


    let info2 = new R.Text3D({
        text: data.info[1],
        color: 0xffffff,
        font: 'fonts/Roboto-Regular.ttf',
        fontSize: h/30,
        align: "left"
    });

    info2.on(R.CONST.READY, (e) => {
        e.target.position.set(-w/2.4, h/2.2 - 2*h/6, .05);
        panel.add(info2);
    });


    let info3 = new R.Text3D({
        text: data.info[2],
        color: 0xffffff,
        font: 'fonts/Roboto-Regular.ttf',
        fontSize: h/30,
        align: "left"
    });

    info3.on(R.CONST.READY, (e) => {
        e.target.position.set(-w/2.4, h/2.2 - 3*h/6, .05);
        panel.add(info3);
    });


    let info4 = new R.Text3D({
        text: data.info[3],
        color: 0xffffff,
        font: 'fonts/Roboto-Regular.ttf',
        fontSize: h/30,
        align: "left"
    });

    info4.on(R.CONST.READY, (e) => {
        e.target.position.set(-w/2.4, h/2.2 - 4*h/6, .05);
        panel.add(info4);
    });


    panel.on(R.CONST.GAMEPAD_BUTTON_DOWN, (e) => {
        R.Scene.remove(panel)
    });

    R.Scene.add(panel);
    panel.position.set(0, 1.6, -4);
}


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
            terrain.doRotate = true;
        }
    });
    area.add(terrain);
    terrain.position.y = 4.1;
    terrain.scale.set(1.8, 1.8, 1.8);
    terrain._threeObject.geometry.computeBoundingBox();
    //console.log(terrain);
  //  console.log(terrain._threeObject.geometry.boundingBox);
  
});


plane.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
    if (terrain.doRotate) {
        evt.stopPropagation();
        navigator.mouseGamePad.stopPropagationOnMouseMove = true;
        plane.initialPos = new THREE.Vector3(evt.point.x, evt.point.y, evt.point.z);
        plane._threeObject.worldToLocal(plane.initialPos);
        area.initialRot = area.rotation.clone();
    }
});
R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
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


