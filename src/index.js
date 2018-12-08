const THREE = require('three');
const TrackballControls = require('three-trackballcontrols');

import { POINTS, EDGES } from './data.js';

const getUrlQuery = () => {
  let query_params = {};
  const url = window.location.search.slice(1).split('&');
  for (let kv of url) {
    let [k, v] = kv.split('=');
    query_params[k] = v;
  }
  return query_params;
};

const index = parseInt(getUrlQuery()['index'] || '0');
document.querySelector(`[data-index="${index}"]`).classList.add('active');

const points = POINTS[index];
const edges = EDGES[index];

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 100, 30);
scene.add(light);
const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(20, 10, 30);
camera.lookAt(scene.position);

// controls
const controls = new TrackballControls(camera);
controls.rotateSpeed = 5.0;

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('stage').appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

edges.forEach(function (edge) {
  const geom = new THREE.Geometry();
  geom.vertices.push(new THREE.Vector3(points[edge[0]][0],
                                       points[edge[0]][1],
                                       points[edge[0]][2]));
  geom.vertices.push(new THREE.Vector3(points[edge[1]][0],
                                       points[edge[1]][1],
                                       points[edge[1]][2]));
  const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 'green' }));
  scene.add(line);
});

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(9, 30, 30),
  new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.7,
    color: 0xffffff
  })
);
scene.add(sphere);

render();
