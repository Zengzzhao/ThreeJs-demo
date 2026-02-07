import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 创建场景
const scene = new THREE.Scene();

// 光源分为点光源、平行光、聚光灯、环境光等
// 添加环境光 照亮所有的物体
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
// 添加平行光
// const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
// directionalLight.position.set(100, 100, 100);
// scene.add(directionalLight);

// 创建几何体
const geometry = new THREE.BoxGeometry(200, 100, 50);
// 创建材质
// MeshBasicMaterial：基础网格材质，不受光照影响，显示纯色或纹理贴图
// MeshLambertMaterial：朗伯网格材质，受光照影响，适合表现漫反射效果
// MeshPhongMaterial：冯氏网格材质，受光照影响，适合表现高光和反射效果
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格模型（由几何体+材质组成，可以有多个）
const mesh = new THREE.Mesh(geometry, material);

// 将网格模型添加到场景中
scene.add(mesh);

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 500);
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
  controls.update();
  renderer.render(scene, camera);
};
animate();
