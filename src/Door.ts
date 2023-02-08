import { Container, Sprite } from "pixi.js";

export class Door extends Container {

	private vaultDoor: Sprite;
	doorHandleShadow: Sprite; // not private so we can move them together
	doorHandle: Sprite; //not private so we can set the click func in index.ts


constructor(scaleDown: number){

	super();

	this.vaultDoor = Sprite.from('door.png');
	this.vaultDoor.scale.set(scaleDown);
	// the circular part of the vault has a diameter of 1832 pixels starting from the left.
	// we want the anchor to be centered to that, so we need ( 1832 / 2 ) / the full width (2013)
	this.vaultDoor.anchor.set((1832 / 2) / 2013, 0.5); // set it to the center
	this.vaultDoor.x = 0;
	this.vaultDoor.y = 0;
	this.addChild(this.vaultDoor);

	this.doorHandleShadow = Sprite.from('handleShadow.png');
	this.doorHandleShadow.scale.set(scaleDown);
	this.doorHandleShadow.anchor.set(0.5);
	this.doorHandleShadow.x = 5;
	this.doorHandleShadow.y = 5;
	this.addChild(this.doorHandleShadow);

	this.doorHandle = Sprite.from('handle.png');
	this.doorHandle.scale.set(scaleDown);
	this.doorHandle.anchor.set(0.5);
	this.doorHandle.x = 0;
	this.doorHandle.y = 0;
	this.addChild(this.doorHandle);

	this.doorHandle.interactive = true;	
}


}