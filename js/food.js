class Food {
	constructor() {
	    this.cxt=cxt
	    //创建一个0-2的随机数，这个随机数可以从食物数组中获取一个食物对象
	    this.index = parseInt(Math.random()*3);
	    this.bg = FOODS[this.index].background;
	    this.width = FOODS[this.index].width;
	    this.height = FOODS[this.index].height;
	    this.type = FOODS[this.index].type;
	    
	    //创建食物对象的坐标
	    this.x = parseInt(Math.random()*(WIDTH-this.width));
	    this.y = -this.height;
	    this.live = true;
		
		this.speedX = 2+parseInt(Math.random()*5);
		this.speedY = 2+parseInt(Math.random()*4);
	}
	
	draw() {
		if(this.live)this.cxt.drawImage(this.bg,this.x,this.y,this.width,this.height)
	}
	
	move() {
		if(this.x<0 || this.x>WIDTH-this.width) {
			this.speedX = -this.speedX;
		}
		this.x += this.speedX;
		this.y += this.speedY;
	}
	
	collided() {
		this.live = false;
	}
	
	update() {
		this.draw();
		this.move();
	}
	
	outOfBounds() {
		if(this.y >= HEIGHT) {
			return true
		}
		return false
	}
}