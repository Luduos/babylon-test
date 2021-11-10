import { Engine, Scene } from "@babylonjs/core";

export default abstract class SceneObject{
    protected _scene : Scene;
    protected _engine : Engine;

    constructor(engine : Engine, scene : Scene){
        this._engine = engine;
        this._scene = scene;
    }

    abstract load(): Promise<void>;
}

