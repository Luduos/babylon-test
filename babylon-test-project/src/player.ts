import { ArcRotateCamera, Camera, Engine, EventState, KeyboardInfo, Scene, Vector3 } from "@babylonjs/core";
import SceneObject from "./sceneobject";

export default class Player extends SceneObject{
    private _camera : ArcRotateCamera;

    constructor(engine : Engine, scene: Scene){
        super(engine, scene);
    }

    async load(): Promise<void> {
        this._camera = new ArcRotateCamera(
            "Camera", 
            Math.PI/2,
            Math.PI/3,
            2,
            new Vector3(0,0.65,0),
            this._scene
        );
        
        this._camera.attachControl(this._engine.getRenderingCanvas(), true);
        this._camera.wheelPrecision = 50;
        this._camera.minZ = 0.01;
        this._camera.panningAxis

        this._scene.onKeyboardObservable.add(this.handleInput);
    
    }

    handleInput(eventData: KeyboardInfo, eventState: EventState) : void{

    }

}