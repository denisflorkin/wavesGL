var camera, scene, renderer;
var meshes
var geometries = [];

const makeWaves = (nWavesParam, xStartParam, yStartParam, intervalParam) => {
  // args:
  const nWaves = nWavesParam || 80 ; // triangles pair
  // const xStart = xStartParam || -1
  // const yStart = yStartParam || -1
  const interval = intervalParam || .1

  const cols = Math.ceil(Math.sqrt(nWaves / 2))
  const waves = []
  // const xEnd = xStart + cols
  // const yEnd = yStart + cols

  console.log(cols)

  for (let i = 0; i < cols; i++) {
    const row = i // y
    for (let j = 0; j < cols; j++) {
      const col = j // x

      // supp:
      waves.push([
        [col * interval, -(row * interval), 0],
        [(col + 1) * interval, -(row * interval), 0],
        [col * interval, -((row + 1) * interval), 0],
      ])

      waves.push([
        [(col + 1) * interval, -(row * interval), 0],
        [(col + 1) * interval, -((row + 1) * interval), 0],
        [col * interval, -((row + 1) * interval), 0],
      ])

      // inf
      // waves.push([
      //   [col * interval, row * interval, 0],
      //   [(col + 1) * interval, row * interval, 0],
      //   [row * interval, (row + 1) * interval, 0],
      // ])
    }
    // inf:
    // for (let j = 0; j < cols; j++) {
    //   waves.push([
    //     [i * interval, i * interval, 0],
    //     [(i + 1) * interval, i * interval, 0],
    //     [i * interval, (i + 1) * interval, 0],
    //   ])
    // }
  }

  return waves
}

var theWaves = makeWaves()
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

console.log('TEMPALTE:', waves)
console.log(theWaves)


let colorIdx
const getColor = () => {
  const colors = [/* 0xffaa00, 0xcecece, */ 0xff000077, 0x0000ff77, 0x00ff0077 ]
  const color = colors[colorIdx] ? colors[colorIdx++] : colors[colorIdx = 0]
  return color
}

function init() {
  console.log('init')
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.z = 1;

  scene = new THREE.Scene();
  var group = new THREE.Group();


  // meshes = waves.map((wave, i) => {
  meshes = theWaves.map((wave, i) => {
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
  // group.position.x = -(window.innerWidth / 2);
  // group.position.y = -(window.innerHeight / 2);
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
    // const geo = geometries[i];
    // console.log(geo.vertices)
    // geo.vertices[2].z = geo.vertices[2].z + 0.002
    // geo.verticesNeedUpdate = true;
    // geo.vertices[2] = geo.vertices[2] + .02
    // mesh.rotation.y += 0.02;
    // mesh.rotation.z += 0.02;
  }


  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;
  // console.log(mesh.rotation)
  renderer.render(scene, camera);

}

init();
animate();
