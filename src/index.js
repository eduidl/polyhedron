import ThreeJS from './three_js.js'
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

function render() {
  requestAnimationFrame(render);
  three_js.render();
}

const index = parseInt(getUrlQuery()['index'] || '0');
document.querySelector(`[data-index="${index}"]`).classList.add('active');

const three_js = new ThreeJS();
three_js.initialize(EDGES[index], POINTS[index]);
render();

let timer = 0;
window.addEventListener('resize', () => {
  if (timer > 0) clearTimeout(timer);
  timer = setTimeout(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    three_js.resize(width, height);
  }, 200);
}, false);
