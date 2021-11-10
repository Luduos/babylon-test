import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector"
import "@babylonjs/loaders/glTF"

import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, EventState, KeyboardInfo}
from "@babylonjs/core"
import { Environment } from "./environment";
import Player from "./player";
import SceneObject from "./sceneobject";

class App{
    constructor(){
        var canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;   
        // prevent user from scrolling the screen, when hovering over the canvas
        canvas.addEventListener('wheel', evt => evt.preventDefault());

        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        
        var sceneObjects : Array<SceneObject> = new Array();

        var environment : Environment = new Environment(engine, scene);
        sceneObjects.push(environment);

        var player : Player = new Player(engine, scene);
        sceneObjects.push(player);

        sceneObjects.forEach(async sceneObject => {
            await sceneObject.load();
        });

        // hide/show the Inspector
        window.addEventListener(
            "keydown",
            (ev) =>{
                // Shift+Ctrl+Alt+I
                if(ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73){
                    this.toggleInspector(scene);
                }
            }
        );

        window.addEventListener("resize", function() {
            engine.resize();
        });

        engine.runRenderLoop(()=>{
            scene.render();
        });
    }

    toggleInspector(scene: Scene){
        if(scene.debugLayer.isVisible()){
            scene.debugLayer.hide();
        }else{
            scene.debugLayer.show();
        }
    }
}

new App();