export class Combination {
	public combinationArray: string[] = [];
	constructor(){
		let number_: number;
		//this direction atrocity is so we alternate them,
		//     not much point in 3 cw 4 cw 2 cw
		let direction: string = Math.random() > 0.5 ? "counterclockwise" : "clockwise";
		for(let i = 0 ; i < 3 ; ++i){
			number_ = Math.round(Math.random() * 8 + 1);
			this.combinationArray.push(number_.toString() + " " + direction);
			direction = direction == "clockwise" ? "counterclockwise" : "clockwise";
		}
	}
}