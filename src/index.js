import {
  Engine,
  Scene,
  ArcRotateCamera,
  MeshBuilder,
  HemisphericLight,
  PointLight,
  Vector3,
  Quaternion,
  Color3,
  GroundMesh,
  Nullable,
  GizmoManager,
  SceneLoader,
  StandardMaterial,
  Texture,
  FreeCamera,
  Camera,
  UniversalCamera,
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Rectangle,
  TextBlock,
  Button,
} from "@babylonjs/gui";
import { GLTFLoaderState } from "@babylonjs/loaders";
import { Inspector } from "@babylonjs/inspector";
import "./styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  let xPos = 0;
  let yPos = 1.25;
  let zPos = 0;
  let xRot = 0;
  let yRot = 0;
  let zRot = 0;
  let _angle = 0.1;
  let canvas = document.getElementById("game-window"); // Get the canvas element
  let engine = new Engine(canvas, true); // Generate the BABYLON 3D engine
  let boxOptions = {
    width: 2.5,
    height: 2.5,
    depth: 2.5,
  };

  function createScene() {
    // create scene
    let scene = new Scene(engine);
    let UI = new AdvancedDynamicTexture.CreateFullscreenUI(
      "Main UI",
      true,
      scene
    );
    let clicker = new Rectangle("Clicker");
    clicker.isPointerBlocker = true;
    let showInspector = false;
    const debugOptions = {
      overLay: true,
      showExplorer: true,
    };

    function addObject() {
      let house = SceneLoader.Append(
        "./assets/models/buildings/",
        "house_1.gltf",
        scene,
        (scene) => {
          // scene.createDefaultCameraOrLight(true, true, true);
        }
      );
      house.name = "HOUSE";
    }

    clicker.onPointerClickObservable.add(() => {
      addObject();
    });
    let gizmoManager = new GizmoManager(scene);
    gizmoManager.positionGizmoEnabled = true;
    // gizmoManager.rotationGizmoEnabled = true;
    // gizmoManager.scaleGizmoEnabled = true;
    gizmoManager.boundingBoxGizmoEnabled = true;

    clicker.width = 0.1;
    clicker.height = 0.05;
    clicker.cornerRadius = 5;
    clicker.color = "white";
    clicker.background = "#474747";
    clicker.thickness = 2;
    clicker.horizontalAlignment = 0;
    clicker.verticalAlignment = 0;
    clicker.left = "25px";
    clicker.top = "25px";
    UI.addControl(clicker);
    let clickerText = new TextBlock();
    clickerText.text = "CLICK ME!";
    clicker.addControl(clickerText);

    // Add a camera to the scene and attach it to the canvas
    // let camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 5), scene);
    let cameraPos = new Vector3(10, 5, 0);
    let camera = new UniversalCamera("Free Camera", cameraPos, scene);
    camera.attachControl(canvas, true);

    // Add lights to the scene
    let light1 = new HemisphericLight("light1", new Vector3(1, 50, 0), scene);
    let light2 = new PointLight("light2", new Vector3(0, 25, -1), scene);

    // Add and manipulate meshes in the scene

    /*################### GROUND #################*/
    let ground = MeshBuilder.CreateGround(
      "Ground",
      { width: 250, height: 250, subdivisions: 1 },
      scene
    );
    ground.isPickable = false;
    let groundMat = new StandardMaterial("Ground Material", scene);
    groundMat.diffuseTexture = new Texture(
      "../assets/images/test_grid.png",
      scene
    );
    groundMat.diffuseTexture.uScale = 25;
    groundMat.diffuseTexture.vScale = 25;
    groundMat.roughness = 10;
    ground.material = groundMat;

    // let groundOptions = {
    //     width: 600,
    //     height: 600,
    //     subdivisions: 600,
    //     minHeight: 0,
    //     maxHeight: 20,
    //     alphaFilter: 1,
    //     updatable: true
    // };
    // let ground = MeshBuilder.CreateGroundFromHeightMap("Ground Plane", "src/images/Height.png" , groundOptions, scene);

    scene.registerBeforeRender(() => {});

    return scene;
  } /* #####################   CREATE SCENE   #####################################*/

  let scene = createScene(); //Call the createScene function

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
