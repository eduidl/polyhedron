(function () {
  'use strict';

  const getUrlQuery = () => {
    let query_params = {};
    const url = window.location.search.slice(1).split('&');
    for (let kv of url) {
      let [k, v] = kv.split('=');
      query_params[k] = v;
    }
    return query_params;
  };

  var index = parseInt(getUrlQuery()['index'] || '0');
  document.querySelector(`[data-index="${index}"]`).classList.add('active');

  var points = points_set[index];
  var edges = edges_set[index];

  var scene;
  var light;
  var ambient;
  var camera;
  var renderer;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var controls;

  scene = new THREE.Scene();

  // light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  // camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(20, 10, 30);
  camera.lookAt(scene.position);

  // controls
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 5.0;

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0xefefef);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  edges.forEach(function (edge) {
    var geom = new THREE.Geometry();
    geom.vertices.push(new THREE.Vector3(points[edge[0]][0], points[edge[0]][1], points[edge[0]][2]));
    geom.vertices.push(new THREE.Vector3(points[edge[1]][0], points[edge[1]][1], points[edge[1]][2]));
    var line = new THREE.Line(geom, new THREE.LineBasicMaterial({color: 'green'}));
    scene.add(line);
  });

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(9, 30, 30),
    new THREE.MeshDepthMaterial({
      transparent: true,
      opacity: 0.7
    })
  );
  scene.add(sphere);

  render();
})();
