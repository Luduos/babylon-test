import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector"
import "@babylonjs/loaders/glTF"

import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, EventState, KeyboardInfo }
    from "@babylonjs/core"
import { Environment } from "./environment";
import SceneObject from "./sceneobject";

class App {

    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;

    constructor() {

        this.start();
        // hide/show the Inspector
        window.addEventListener(
            "keydown",
            (ev) => {
                // Shift+Ctrl+Alt+I
                if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                    this.toggleInspector(this._scene);
                }
            }
        ); 
    }

    private toggleInspector(scene: Scene) {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }

    private async start(): Promise<void> {
        this._canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        // prevent user from scrolling the screen, when hovering over the canvas
        this._canvas.addEventListener('wheel', evt => evt.preventDefault());

        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);

        var environment: Environment = new Environment("Environment", this._scene);
        await environment.load();

        await this.main();
    }

    private async main() : Promise<void>{
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener(
            "resize",
            () => {
                this._engine.resize();
            }
        );
    }

    
}

new App();