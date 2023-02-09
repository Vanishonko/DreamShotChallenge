import { Sprite } from "pixi.js";

export class Shining extends Sprite {
	private particle: Sprite;
	constructor(x: number, y: number, scaledown: number){
		super();
		this.particle = Sprite.from('blink.png');
		this.particle.anchor.set(0.5);
		this.particle.scale.set(scaledown / 2);
		this.position.set(x, y);
		this.alpha = 0;
		this.addChild(this.particle);
	}
	animation(gsap: any): void{ //will have to rework lowkey hella ugly
		gsap.fromTo(this, 3, {
			pixi: {
				scale: '-=7%',
				rotation: '-=5%',
				alpha: 0}
			},
			{
			pixi: {
					scale: '+=7%',
					rotation: '+=5%',
					alpha: 1
				},
				yoyo: true,
				repeat: 2})
	}
}