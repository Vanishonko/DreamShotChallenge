import * as PIXI from 'pixi.js'
import { Background } from './Background'
import { Door } from './Door';
import { Combination } from './Combination';

//enter, gsap

import { gsap } from "gsap";
import { PixiPlugin } from 'gsap/PixiPlugin';
import { deepCopy } from 'deep-copy-ts';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);
const animationTime:number = 0.2;

const app = new PIXI.Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	width: 1200,
	height: 600
});
const mainContainer = new PIXI.Container();

const scaleDown = app.screen.width / 5995; //hardcoding the scaledown currently as it doesn't matter too much.

const bg: Background = new Background(scaleDown, app.screen.width, app.screen.height);

mainContainer.addChild(bg);

const interactiveContainer = new Door(scaleDown);

interactiveContainer.doorHandleContainer.on('click', mouseClick, interactiveContainer);

mainContainer.addChild(interactiveContainer);

interactiveContainer.x = app.screen.width / 2 - 4 ; // -4 to compensate for the 
interactiveContainer.y = app.screen.height / 2 - 4; // scaling and any small discrepancies

app.stage.addChild(mainContainer);

let key: Combination["combinationArray"] = new Combination().combinationArray;
let keyCopy: any = deepCopy(key);
console.log(keyCopy.join(' '));

function mouseClick(e: PIXI.FederatedMouseEvent): void {

	let rotation_: any = '-=0';
	
	if (keyCopy[0][1].match("rcl") && e.globalX < interactiveContainer.x) {
	// 	//we're looking for 'rcl' because it's found in counterclockwise and it's less letters lol
		rotation_ = "-=60"; 
	}else if (!keyCopy[0][1].match("rcl") && e.globalX > interactiveContainer.x) {
		rotation_ = "+=60"; 
	} else {
			console.log(keyCopy, "before copying")
			keyCopy = deepCopy(key);
			console.log(keyCopy, "after copying")
			rotation_ = Math.round(Math.random()*100000) - 50000

			gsap.from(interactiveContainer.doorHandleContainer, {
				pixi: {rotation: "+=" + rotation_},
				duration: 2
			})
			// console.log(keyCopy)
			rotation_ = '-=0';		
	}
	if(rotation_ != '-=0') keyCopy[0][0] -= 1;
	if(keyCopy[0][0] == 0) { keyCopy.splice(0, 1); console.log(key, keyCopy);}
	if(keyCopy.length == 0) alert("u won") //lol
	gsap.to(interactiveContainer.doorHandleContainer, {
		pixi: {rotation: rotation_},
		duration: animationTime
	})
	
	console.log(keyCopy.join(' '));

}
