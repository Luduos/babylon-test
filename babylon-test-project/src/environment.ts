import { Scene, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import SceneObject from "./sceneobject";


export class Environment extends SceneObject {

    _assetFolder : string = "./assets/";

    async load(): Promise<void> {
        var light1: HemisphericLight = new HemisphericLight(
            "mainLight",
            new Vector3(1, 1, 0),
            this._scene);

            // Create Julie
        const result = await SceneLoader.ImportMeshAsync(null, this._assetFolder, "Julie.glb", this._scene);
        var julie = result.meshes[0];
        julie.position = new Vector3(0,-1,0);


    }
}