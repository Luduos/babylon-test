import { Engine, Scene } from "@babylonjs/core";

export default abstract class SceneObject{
    protected _scene : Scene;

    constructor(scene : Scene){
        this._scene = scene;
    }

    abstract load(): Promise<void>;
}

