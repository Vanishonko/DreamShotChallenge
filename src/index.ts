import * as PIXI from 'pixi.js'
import { Background } from './Background'

const app = new PIXI.Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	width: 1200,
	height: 600
});

const scaleDown = app.screen.width / 5995; //hardcoding the scaledown currently as it doesn't matter too much.

const bg: Background = new Background(scaleDown, app.screen.width, app.screen.height);
app.stage.addChild(bg);


const interactiveContainer = new PIXI.Container();

const vaultDoor: PIXI.Sprite = PIXI.Sprite.from('door.png');
vaultDoor.scale.set(scaleDown);
// the circular part of the vault has a diameter of 1832 pixels starting from the left.
// we want the anchor to be centered to that, so we need ( 1832 / 2 ) / the full width (2013)
vaultDoor.anchor.set((1832 / 2) / 2013, 0.5); // set it to the center
vaultDoor.x = 0;
vaultDoor.y = 0;
interactiveContainer.addChild(vaultDoor);

const doorHandle: PIXI.Sprite = PIXI.Sprite.from('handle.png');
doorHandle.scale.set(scaleDown);
doorHandle.anchor.set(0.5);
doorHandle.x = 0;
doorHandle.y = 0;
interactiveContainer.addChild(doorHandle);

app.stage.addChild(interactiveContainer);

interactiveContainer.x = app.screen.width / 2;
interactiveContainer.y = app.screen.height / 2;