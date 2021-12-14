import { Node, Scene, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader, AbstractMesh, ArcRotateCamera, ShadowGenerator, DirectionalLight, IShadowLight } from "@babylonjs/core";
import { ShadowOnlyMaterial } from "@babylonjs/materials";
import ModelViewCamera from "./camera/modelviewcamera";
import SceneObject from "./sceneobject";


export class Environment extends Node {

    private _assetFolder: string = "./assets/";

    private _camera: ArcRotateCamera;
    private _ground: Mesh;
    private _shadowGenerator: ShadowGenerator;

    public async load(): Promise<void> {
        var lightDirection: Vector3 = new Vector3(0.5, -1, -0.5);

        var light1: DirectionalLight = new DirectionalLight(
            "mainLight",
            lightDirection,
            this.getScene());
        var light2: HemisphericLight = new HemisphericLight("hemispheric", lightDirection, this.getScene());
        light2.intensity = 0.1;

        // Create Julie
        const result = await SceneLoader.ImportMeshAsync(null, this._assetFolder, "2020.11.20_SK_HellJulie_Base.glb", this.getScene());
        var julie: AbstractMesh = result.meshes[0];
        julie.position = new Vector3(0, -1, 0);
        julie.scaling = new Vector3(0.01, 0.01, 0.01);
        julie.rotation = new Vector3(0, 0, 0);
        julie.receiveShadows = true;

        this.createGround(-1);
        this.createShadows(result.meshes);


        console.log("Number of mesh: " + result.meshes.length);
        console.log("Printing meshes: ")
        result.meshes.forEach(mesh => {
            console.log("Mesh: " + mesh.name);
        });

        // create Camera
        this.createCamera();
        this._camera.framingBehavior.zoomOnMeshHierarchy(julie);
        this._camera.panningSensibility = 0;
    }

    private createCamera() {
        // create camera
        this._camera = new ArcRotateCamera(
            "ModelViewCamera",
            Math.PI / 2,
            Math.PI / 2,
            2,
            new Vector3(0, 0.65, 0),
            this.getScene()
        );

        this._camera.attachControl(this.getEngine().getRenderingCanvas(), true);
        this._camera.wheelPrecision = 50;
        this._camera.useFramingBehavior = true;
        var framingBehavior = this._camera.framingBehavior;
        framingBehavior.autoCorrectCameraLimitsAndSensibility = true;
        framingBehavior.elevationReturnTime = -1;
    }


    private createGround(yPosition) {
        this._ground = MeshBuilder.CreatePlane('ground', { size: 1000 }, this.getScene())
        this._ground.rotation.x = Math.PI / 2
        this._ground.material = new ShadowOnlyMaterial('mat', this.getScene())
        this._ground.receiveShadows = true;
        this._ground.position.y = yPosition;
        // this._ground.material.alpha = 0.5;
    }

    createShadows(meshes) {
        // Create the shadows
        this._shadowGenerator = new ShadowGenerator(512, this.getScene().lights[0] as IShadowLight);
        this._shadowGenerator.useBlurExponentialShadowMap = true;
        this._shadowGenerator.useKernelBlur = true;
        this._shadowGenerator.blurKernel = 32;
        this._shadowGenerator.blurScale = 2;

        for (var index = 0; index < meshes.length; index++) {
            this._shadowGenerator.getShadowMap().renderList.push(meshes[index]);
        }
    }
}