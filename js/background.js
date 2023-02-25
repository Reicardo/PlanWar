class Background {
	constructor(cxt) {
	    this.cxt = cxt;
		this.bgImg = createImage("img/img_bg_level_1.jpg");
		this.y1 = 0;
		this.y2 = -HEIGHT;
	}
	
	//画出背景
	draw() {
		this.cxt.clearRect(0,0,WIDTH,HEIGHT);
		this.cxt.drawImage(this.bgImg,0,this.y1);
		this.cxt.drawImage(this.bgImg,0,this.y2);
	}
	
	//移动背景
	move() {
		this.y1++;
		this.y2++;
		if(this.y2 == 0) {
			this.y1 = 0;
			this.y2 = -HEIGHT;
		}
	}
	
	update() {
		this.draw();
		this.move();
	}
}