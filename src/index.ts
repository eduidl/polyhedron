import { POINTS, EDGES } from "./data";
import Visualizer from "./visualizer";

const visualizer = new Visualizer();

const getIndexFromUrlQuery = (): string | undefined => {
  const url = window.location.search.slice(1).split("&");
  for (const kv of url) {
    const [k, v] = kv.split("=");
    if (k === "index") {
      return v;
    }
  }
  return undefined;
};

const render = (): void => {
  requestAnimationFrame(render);
  visualizer.render();
};

const index = parseInt(getIndexFromUrlQuery() || "0");
const tab = document.querySelector(`[data-index="${index}"]`);
if (tab === null) {
  throw TypeError;
}
tab.classList.add("active");

visualizer.initialize(EDGES[index], POINTS[index]);
render();

let timer: number;
window.addEventListener(
  "resize",
  () => {
    if (timer > 0) clearTimeout(timer);
    timer = window.setTimeout(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      visualizer.resize(width, height);
    }, 200);
  },
  false
);
