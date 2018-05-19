var camera, scene, renderer;
var meshes
var geometries = [];

// const waves = []
// const nWaves = 8; // triangles
// const cols = Math.ceil(Math.root(nWaves/2))
// for (let i = 0; i < cols; i++) {
//   waves
//   for (let j = 0; j < cols; j++) {
//     waves.push([])
//   }
// }

var waves = [ // vertices
  [
    [0, 0, 0],
    [.1, 0, 0],
    [0, -0.1, 0]
  ], [
    [.1, 0, 0],
    [0, -0.1, 0],
    [.1, -0.1, 0]
  ], [
    [.1, 0, 0],
    [.2, 0, 0],
    [.1, -0.1, 0]
  ], [
    [.2, 0, 0],
    [.2, -0.1, 0],
    [.1, -0.1, 0]
  ],
]

const getColor = (i) => {
  console.log(i)
  const colors = [0xffaa00, 0xcecece]
  const color = i % 2 === 0 ? colors[0] : colors[1]
  console.log(color)
  return color
}

function init() {
  console.log('init')
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.z = 1;

  scene = new THREE.Scene();
  var group = new THREE.Group();


  meshes = waves.map((wave, i) => {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(...wave[0]),
      new THREE.Vector3(...wave[1]),
      new THREE.Vector3(...wave[2])
    )

    var normal = new THREE.Vector3(0, 1, 0); //optional
    var color = new THREE.Color(getColor(i)); //optional
    var materialIndex = 0; //optional
    var face = new THREE.Face3(0, 1, 2, normal, color, materialIndex);

    geometry.faces.push(face);

    const material = new THREE.MeshBasicMaterial({
      color: getColor(i)
    });
    // material.color = getColor(i);
    material.side = THREE.DoubleSide;
    material.doubleSided = true;

    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = (i * 5)
    group.add(mesh)
    geometries.push(geometry)
    geometry.verticesNeedUpdate = true;

    return mesh
  })

  group.rotation.x = -20
  // meshes.forEach(geo => scene.add(geo))
  scene.add(group)

  // geometry.vertices.push(
  //   new THREE.Vector3(-.10, .10, 0),
  //   new THREE.Vector3(-.10, -.10, 0),
  //   new THREE.Vector3(.10, 0, 0)
  // )
  // var normal = new THREE.Vector3(0, 1, 0); //optional
  // var color = new THREE.Color(0xffaa00); //optional
  // var materialIndex = 0; //optional
  // var face = new THREE.Face3(0, 1, 2, normal, color, materialIndex);

  // geometry.faces.push(face);

  // var r = geometry.computeBoundingSphere();
  // console.log('r', r)


  // material = new THREE.MeshNormalMaterial();

  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);

  for (let i = 0; i < geometries.length; i++) {
    const geo = geometries[i];
    console.log(geo.vertices)
    geo.vertices[2].z = geo.vertices[2].z + 0.002
    geo.verticesNeedUpdate = true;
    // geo.vertices[2] = geo.vertices[2] + .02
    // mesh.rotation.y += 0.02;
    // mesh.rotation.z += 0.02;
  }


  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;
  // console.log(mesh.rotation)
  renderer.render(scene, camera);

}

console.log('ddddddddd')

init();
animate();
