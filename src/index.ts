import * as PIXI from 'pixi.js'
import { Background } from './Background'
import { Door } from './Door';
import { Combination } from './Combination';

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

interactiveContainer.doorHandle.on('click', mouseClick, interactiveContainer);

mainContainer.addChild(interactiveContainer);

interactiveContainer.x = app.screen.width / 2 - 4 ; // -4 to compensate for the 
interactiveContainer.y = app.screen.height / 2 - 4; // scaling and any small discrepancies

app.stage.addChild(mainContainer);

let key: Combination["combinationArray"] = new Combination().combinationArray;
console.log(key);

function mouseClick(e: PIXI.FederatedMouseEvent): void {
	if (e.globalX < interactiveContainer.x) console.log("counter")
	console.log("clockwise")
}
