import * as BABYLON from '@babylonjs/core';
const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  scene.createDefaultCameraOrLight(true, false, true);

  // const box = new BABYLON.MeshBuilder.CreateBox('myBox', {
  //   size: 0.1,
  //   width: 2,
  //   height:0.05,
  //   depth:0.5,
  //   faceColors: [
  //     new BABYLON.Color4(1, 0, 0, 1),
  //     BABYLON.Color3.Green(),
  //   ]
  // }, scene);


  // const ground = new BABYLON.MeshBuilder.CreateGround('', {
  // height: 5,
  // width: 5,
  // subdivisions: 50,
  //   // subdivisionsX: 10,
  //   // subdivisionsY: 10,
  //   // subdivisionsZ: 10
  // }, scene);

  // var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  // let groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
  // let groundTexture = new BABYLON.Texture(Assets.textures.checkerboard_basecolor_png.rootUrl, scene);
  // groundMaterial.diffuseTexture = groundTexture;
  // ground.material = groundMaterial;


  // ground.material = new BABYLON.StandardMaterial();
  // ground.material.wireframe = true;

  // const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {
  //     segments:50,
  //     diameter:0.3,
  //     diameterY:0.4
  //   });

  //   const sphereMaterial = new BABYLON.StandardMaterial();
  //   sphere.material = sphereMaterial;

  // sphereMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
  // sphereMaterial.specularColor = new BABYLON.Color3(0, 1, 0);

  // sphereMaterial.ambientColor = new BABYLON.Color3(0, 1, 1);
  // scene.ambientColor = new BABYLON.Color3(0, 1, 1);

  // sphere.material = new BABYLON.StandardMaterial();
  // sphere.material.wireframe = true;
  // sphereMaterial.diffuseTexture = new BABYLON.Texture('R.jpeg');




  var square = BABYLON.MeshBuilder.CreatePlane('square', {
    size: 0.5,   
    subdivisions: 50,
  }, scene);

  // square.material = new BABYLON.StandardMaterial();
  // square.material.wireframe = true;

  // const squareMaterial = new BABYLON.StandardMaterial();
  // square.material = squareMaterial;
  // squareMaterial.diffuseTexture = new BABYLON.Texture('R.jpeg');



  // scene.registerBeforeRender(function () {
  //   var pixels = square.getVerticesData(BABYLON.VertexBuffer.ColorKind);
  //   for (var i = 0; i < pixels.length; i += 4) {
  //     pixels[i] = Math.random();          
  //     pixels[i + 1] = Math.random();      
  //     pixels[i + 2] = Math.random();      
  //     pixels[i + 3] = 1.0;                
  //   }
  //   square.updateVerticesData(BABYLON.VertexBuffer.ColorKind, pixels);
  // });




  var materials = [];
  materials.push(new BABYLON.StandardMaterial("material1", scene));
  materials.push(new BABYLON.StandardMaterial("material2", scene));

  square.material = new BABYLON.MultiMaterial("multiMaterial", scene);
  square.subMeshes = [];

  for (var i = 0; i < materials.length; i++) {
    square.subMeshes.push(new BABYLON.SubMesh(i, 0, 6, 0, 6, square));
    square.material.subMaterials.push(materials[i]);
  }

  scene.registerBeforeRender(function () {
    for (var i = 0; i < materials.length; i++) {
      var randomColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      materials[i].diffuseColor = randomColor;
    }
  });


  return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function () {
  engine.resize();
});