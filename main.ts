import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// 添加环境光
// 环境光：整体提亮（强度别太大，0.3~1 常用）
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
// 半球光：类似天空+地面反射，角色会更自然
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(hemi);

// 动画混合器
let mixer: THREE.AnimationMixer | null = null;
// 计时器
const clock = new THREE.Clock();
const loader = new GLTFLoader();
loader.load("./Soldier.glb", (gltf) => {
  console.log(gltf);
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[1]);
  action.play();
  scene.add(gltf.scene);
});

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 5);
scene.add(camera);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  mixer?.update(delta);

  controls.update();
  renderer.render(scene, camera);
};
animate();
