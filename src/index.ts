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

const openDoor: PIXI.Sprite = PIXI.Sprite.from("doorOpen.png");
const winningTimeline = gsap.timeline()
const winningAnimationDuration: number = 1.5;
winningTimeline.pause();
winningTimeline.to(interactiveContainer, {
	pixi: {alpha: 0},
	duration: winningAnimationDuration
}, 1);
winningTimeline.to(openDoor, {
	pixi: {alpha: 1},
	duration: (winningAnimationDuration / 4) * 3
}, 1);

openDoor.alpha = 0;
openDoor.scale.set(scaleDown);
openDoor.anchor.set(0.5); //
openDoor.position.set((app.screen.width / 2) + 290, app.screen.height / 2); //incredibly ugly hardcoding because i'm drained and i can't figure out the math for the pos
console.log(openDoor.position)
mainContainer.addChild(openDoor);
interactiveContainer.doorHandleContainer.on('click', mouseClick, interactiveContainer);

mainContainer.addChild(interactiveContainer);

interactiveContainer.x = app.screen.width / 2 - 4 ; // -4 to compensate for the 
interactiveContainer.y = app.screen.height / 2 - 4; // scaling and any small discrepancies

app.stage.addChild(mainContainer);

let key: Combination["combinationArray"] = new Combination().combinationArray;
let keyCopy: any = deepCopy(key);
console.log(keyCopy.join(' '));

function rotate(obj: PIXI.Container, rotAmount: number, animTime: number){
	gsap.to(obj, {
		pixi: {rotation: "+=" + rotAmount},
		duration: animTime
	})
}

async function winningCondition(){
	interactiveContainer.doorHandleContainer.interactive = false;
	await winningTimeline.resume();
	interactiveContainer.destroy();
}

function mouseClick(e: PIXI.FederatedMouseEvent): void {
	let rotation_: any = '0';
	
	if (keyCopy[0][1].match("rcl") && e.globalX < interactiveContainer.x) {
	// 	//we're looking for 'rcl' because it's found in counterclockwise and it's less letters lol
		rotation_ = "-60"; 
	}else if (!keyCopy[0][1].match("rcl") && e.globalX > interactiveContainer.x) {
		rotation_ = "+60"; 
	} else {
			keyCopy = deepCopy(key);
			rotation_ = Math.random() > 0.5 ? -1 : 1;
			rotation_ *= 1000;

			rotate(interactiveContainer.doorHandleContainer, rotation_, 2);
			// console.log(keyCopy)
			rotation_ = '0';		
	}
	if(rotation_ != '0') keyCopy[0][0] -= 1;
	if(keyCopy[0][0] == 0) keyCopy.splice(0, 1)
	if(keyCopy.length == 0) winningCondition() //lol
	rotate(interactiveContainer.doorHandleContainer, rotation_, animationTime)
	
	
	console.log(keyCopy.join(' '));

}
