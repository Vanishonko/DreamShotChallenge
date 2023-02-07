import { Container, Sprite } from "pixi.js";

export class Background extends Container {

	private backgroundImage: Sprite;
	constructor(scaleDown: number, screenWidth: number, screenHeight: number){
		super();

		this.backgroundImage = Sprite.from('bg.png');
		this.backgroundImage.scale.set(scaleDown);
		this.backgroundImage.anchor.set(0.5);
		this.backgroundImage.x = screenWidth / 2;
		this.backgroundImage.y = screenHeight / 2;
		this.addChild(this.backgroundImage);
	}

}
