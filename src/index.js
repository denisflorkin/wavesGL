var camera, scene, renderer;
var meshes = window.meshes = [];
var geometries = window.geometries = [];
var geometry = window.geometry = [];
var GroupedVertice
const existingIdenticalyLocatedVerticesModel = new Map();
let faces = []
// const makeWaves = (nWavesParam, xStartParam, yStartParam, intervalParam) => {
const makeVerticesCoords = (nWavesParam, xStartParam, yStartParam, intervalParam) => {
  // args:
  const nWaves = nWavesParam || 280 ; // triangles pair
  const cols = Math.ceil(Math.sqrt(nWaves / 2))
  const xStart = xStartParam || -(Math.ceil(cols / 2));
  const yStart = yStartParam || -(Math.ceil(cols / 2));
  const interval = intervalParam || .15

  const verticesCoords = []
  const waves = []
  const xEnd = xStart + cols
  const yEnd = yStart + cols
  const facesVertexRefs = []

  console.log(cols)

  // define vertices coords (v3)  [ x, y, z ]
  for (let i = yStart; i <= yEnd; i++) {
    const row = i // y
    for (let j = xStart; j <= xEnd; j++) {
      const col = j // x
      verticesCoords.push([col, row, 0])
      // faces
      // if (i < cols && j < cols) {
      //   if (row === 0) {
      //     faces.push([cols, cols + 1 , row + (cols+1) + 1])
      //   } else if (row === 1) {
      //     faces.push([(cols + row), (cols+row) + 1, (cols+row) + (cols + 1) + 1])
      //   }
      // }
    }
  }

  // faces = verticesCoords.map((vertex, i) => {
  //   return [i, i + 1, i + 1 + (cols+1)]
  // })

  // define faces coords group   [  v3, v3, v3 ]
  for (let i = 0; i < cols; i++) {
    const row = i // y
    for (let j = 0; j < cols; j++) {
      const col = j + (i * cols) // x

      // if (i < cols && j < cols) {
        if (i === 0) {
          faces.push([col, col + 1, col + 1 + (cols + 1)])
          faces.push([(col+1), (col+2) + cols + 1, (col+1) + cols + 1])
        } else if (i > 0) {
          faces.push([(col + (row * cols)), (col + (row * cols)) + 1, (col + (row * cols)) + 1 + cols])
          faces.push([
            (col + (row * cols) + 1),
            (col + (row * cols) + 2) + cols,
            (col + (row * cols) + 1) + cols
          ])
        }
      // }
    }
  }

  return verticesCoords
  return waves
}

// var theWaves = makeWaves(8, null, null, .1)
var verticesRawCoordsData = makeVerticesCoords(8, null, null, .1)
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
console.log('verticesRawCoordsData', verticesRawCoordsData)
console.log('faces', faces)


let colorIdx = 0
const getColor = (i) => {
  const colors = [
    "green",
    "red",
    "blue",
    "yellow",
    "orange",
    "rebeccapurple",
  ]
  const color = colors[colorIdx]

  let res = colors[0]

  return colors[0]

  if (color) {
    colorIdx = colorIdx + 1
    console.log(color)
    res = color
  } else {
    colorIdx = 0
    console.log(color[0])
    res = color[0]
  }

  res = colors[
    colors[Math.floor(Math.random() * colors.length)]
  ]

  return res;
  // return new THREE.Color(res);

}

const verticesStore = {}
const verticesDirectionStore = {}

function init() {
  console.log('init')
  camera = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 0.01, 100);

  camera.position.z = 1;

  scene = new THREE.Scene();
  var group = new THREE.Group();
  geometry = new THREE.Geometry();


  // meshes = waves.map((wave, i) => {
  verticesRawCoordsData.forEach((v3, i) => {
    // const keyStrA = JSON.stringify(wave[0])
    // const keyStrB = JSON.stringify(wave[1])
    // const keyStrC = JSON.stringify(wave[2])

    let vertex = new THREE.Vector3(...v3)
    console.log(v3)
    console.log(vertex)
    // let vertexB = new THREE.Vector3(...wave[1])
    // let vertexC = new THREE.Vector3(...wave[2])

    // if (verticesStore[keyStrA]) {
    //   vertexA = verticesStore[keyStrA]
    // } else {
    //   verticesStore[keyStrA] = vertexA
    //   verticesDirectionStore[keyStrA] = Math.random() < .5
    // }
    // if (verticesStore[keyStrB]) {
    //   vertexB = verticesStore[keyStrB]
    // } else {
    //   verticesStore[keyStrB] = vertexB
    //   verticesDirectionStore[keyStrA] = Math.random() < .5
    // }
    // if (verticesStore[keyStrC]) {
    //   vertexC = verticesStore[keyStrC]
    // } else {
    //   verticesStore[keyStrC] = vertexC
    //   verticesDirectionStore[keyStrA] = Math.random() < .5
    // }


    geometry.vertices.push(
      vertex,
    )

    for (let i = 0; i < geometry.vertices.length; i++) {
      geometry.vertices[i].___asc = (Math.random() > .5)
    }

    // var normal = new THREE.Vector3(0, 1, 0); //optional
    // var color = new THREE.Color(getColor(i)); //optional
    // var materialIndex = 0; //optional
    // var face = new THREE.Face3(0, 1, 2, normal, color, materialIndex);

    // geometry.faces.push(face);

    const material = new THREE.MeshBasicMaterial({
      // color: getColor(i)
    });
    // material.color = getColor(i);
    material.side = THREE.DoubleSide;
    material.doubleSided = true;
    material.vertexColor = THREE.FaceColors;

    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = (i * 5)
    group.add(mesh)
    // geometries.push(geometry)
    geometry.verticesNeedUpdate = true;
    geometry.colorsNeedUpdate = true;

      // return mesh
  })

  faces.forEach((face, i) => {
      var normal = new THREE.Vector3(0, 1, 0); //optional
      var color = new THREE.Color(getColor(i)); //optional
      var materialIndex = 0; //optional
      var face = new THREE.Face3(...face, normal, color, materialIndex);
    geometry.faces.push(
      face
    )
  })

  geometry.vertices.forEach((v3, i) => {
    const vertex = geometry.vertices[i]

  })



  // group.rotation.x = -20
  // group.rotation.y = -.1
  // group.rotation.z = .3
  // group.position.x = -(window.innerWidth / 2);
  // group.position.y = .2;
  group.position.z = -10;
  // meshes.forEach(geo => scene.add(geo))
  scene.add(group)

  console.log('geometry', geometry)
  console.log('verticesStore', verticesStore)
  console.log('verticesDirectionStore', verticesDirectionStore)

  /**
   * Group vertex by identical x and y position
   */
 /*  GroupedVertice = []
  geometries.forEach(({ vertices }, i) => {
    if (GroupedVertice.length === 0) {
      GroupedVertice[0] = {
        x: vertices[0].x,
        y: vertices[0].y,
        refs: [vertices[0]]
      }
    }

    // GroupedVertice

    let alreadyHasGroup = null

    // vertices.forEach((vertex) => {
    for (let j = 0; j < vertices.length; j++) {
      // if (i === 0) return;
      const vertex = vertices[j]
      GroupedVertice.forEach((group, i) => {
        if (vertex.x === group.x && vertex.y === group.y) {
          alreadyHasGroup = true
          return GroupedVertice[i].refs.push(vertex)
        }
        // return group
      })

      if (!alreadyHasGroup) {
        GroupedVertice.push({
          x: vertex.x,
          y: vertex.y,
          refs: [vertex],
          asc: Math.random() > .5,
        })
      }


    }
    // })

    return GroupedVertice





    return GroupedVertice
  }, [])
 */


  for (let i = 0; i < geometries.length; i++) {
    const geo = geometries[i];

    for (let j = 0; j < geo.vertices.length; j++) {
      const vertex = geo.vertices[j];
      const key = {
        x: vertex.x,
        y: vertex.y,
      }

      if (existingIdenticalyLocatedVerticesModel.has(JSON.stringify(key))) {
        existingIdenticalyLocatedVerticesModel.set(JSON.stringify(key), {
            geometries: [...existingIdenticalyLocatedVerticesModel.get(JSON.stringify(key)).geometries, geo],
            asc: existingIdenticalyLocatedVerticesModel.get(JSON.stringify(key)).asc,
            z: existingIdenticalyLocatedVerticesModel.get(JSON.stringify(key)).z || 0,
          }
        )
      } else {
        existingIdenticalyLocatedVerticesModel.set(JSON.stringify(key), {
          geometries: [geo],
          asc: Math.random() < .5,
          z: Math.floor(Math.random()) / 100,
        })
      }
    }
  }

  // console.log(existingIdenticalyLocatedVerticesModel)

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

  // requestAnimationFrame(animate);


  let pointercount = 0
  const alreadyMet = []
  for (let i = 0; i < geometries.length; i++) {
    const geo = geometries[i];
    for (let j = 0; j < geo.vertices.length; j++) {
      const vertex = geo.vertices[j];
      const keyStr = JSON.stringify([vertex.x, vertex.y, vertex.z])
      const pointer = verticesStore[keyStr]
      const asc = verticesDirectionStore[keyStr];
      if (pointer === vertex) {

        /* uPDATE:  */
        // vertex.z = (asc
        //   ? vertex.z + ((Math.random()) / 15000)
        //   : vertex.z - ((Math.random()) / 15000)
        // )

        const min = -.2
        const max = .2
        if (vertex.z <= min || vertex.z >= max) {
          verticesDirectionStore[keyStr] = !(verticesDirectionStore[keyStr])
        }

        verticesStore[JSON.stringify([vertex.x, vertex.y, vertex.z])] = vertex

        alreadyMet.push(pointer)
      }

    }
    verticesStore
    geo.verticesNeedUpdate = true;
  }

  renderer.render(scene, camera);

}

const getValue = ({ asc, value }) => {
  const max = .5
  const min = .5
  const move = .00002
  return {
    value: asc ? value += move : value -= move,
    asc: value >= max
      ? (asc ? false : asc)
      : (value <= min ? (asc ? false : asc) : asc)
  }
}


init();
animate();
console.log('GroupedVertice', GroupedVertice)
