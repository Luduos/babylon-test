import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";


export default class ModelViewCamera extends ArcRotateCamera {
    constructor(name: string, target: Vector3, scene: Scene){
        super(name, Math.PI/2, Math.PI/3, 2, target, scene);

        this.attachControl(this.getEngine().getRenderingCanvas(), true);
        this.wheelPrecision = 50;
        // this.minZ = 0.01;
        this.panningSensibility = 0;

        this.useFramingBehavior = true;
        
    }
}