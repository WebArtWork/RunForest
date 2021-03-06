import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Weed} from '/game/js/Weed.ts';
import {User} from '/game/js/User.ts';
import {Boy} from '/game/js/Boy.ts';

@Component({
	templateUrl: `/game/html/Garden.html`,
	bindings: [Weed,Boy],
	directives:[Weed,Boy],
	host: {
		'(mousemove)': 'mouseMove($event)',
		'(mousedown)': 'lawnmowerTurn()',
	}
})
export class Garden {
	counter: number = 0;
	weedPosleft: number = 300;
	weedPostop: number = 300;
	boyPosleft: number = 350;
	boyPostop: number = 350;
	moveLeft: boolean = false;
	lastX: number = 0;
	weed: boolean = true;
	Cutting: boolean = false;

	constructor(private _router: Router, private _weed: Weed, private _boy: Boy,private _user: User){
		console.log('New Level is: '+this._user.level);
	}
	mouseMove(e){
		this.boyPosleft=e.x-50;
		this.boyPostop=e.y-100;
		if(e.x>this.lastX) this.moveLeft=false;
		else this.moveLeft=true;
		this.lastX=e.x;
		var diffHeight = this.weedPostop-this.boyPostop-150;
		var diffWidth = this.weedPosleft-this.boyPosleft-50;
		if(diffHeight<50&&diffHeight>-50&&diffWidth<120&&diffWidth>-100) this.weedOnCatch();
	}
	weedOnCatch(){
		if(this._user.level>=300&&!this.Cutting) return;
		if(++this.counter==10){
			this._router.navigate(['Animals']);
		}else{
			this._user.updateLevel(parseInt(20-(this._weed.level*4)));
			this._weed.initWeed();
			var pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
			var pageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			this.weedPosleft=Math.floor( (Math.random() * (pageWidth-275)) + 100);
			this.weedPostop=Math.floor( (Math.random() * (pageHeight-275)) + 100);
			this.weed=false;
			setTimeout(() => {
				this.weed=true;
			},200);

		}
	}
	lawnmowerTurn(){
		this.Cutting=true;
		clearTimeout(this.timeout1);
		this.timeout1=setTimeout(() => {
			this.Cutting=false;
		},3000);
	}
}