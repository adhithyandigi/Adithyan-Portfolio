const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("three-container")
.appendChild(renderer.domElement);

const geometry =
new THREE.SphereGeometry(1,32,32);

const material =
new THREE.MeshBasicMaterial({
wireframe:true
});

const sphere =
new THREE.Mesh(
geometry,
material
);

scene.add(sphere);

camera.position.z=5;

function animate(){

requestAnimationFrame(animate);

sphere.rotation.y += 0.005;

renderer.render(scene,camera);

}

animate();