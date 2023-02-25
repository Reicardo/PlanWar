//创建敌机类
class Enemy {
	constructor(cxt,index) {
	    this.cxt = cxt;
	    this.imgX = ENEMYS[index].imgX;
	    this.imgY = ENEMYS[index].imgY;
	    this.width = ENEMYS[index].width;
	    this.height = ENEMYS[index].height;
	    this.bg = ENEMYS[index].background;
	    this.x = parseInt(Math.random() * (WIDTH - this.width));
	    this.y = -this.height;
	    this.speed = ENEMYS[index].speed;
	    this.interval = ENEMYS[index].interval;
	    this.hp = ENEMYS[index].hp;   // 敌机的初始生命值
	    this.score = ENEMYS[index].score;  // 敌机死亡后的分数
	    this.live = true; 
	}
	
	// 画出敌机
	draw() {
		if(this.live) this.cxt.drawImage(this.bg, this.imgX, this.imgY, this.width, this.height, this.x, this.y, this.width, this.height)
	}
	
	// 移动
	move() {
		if(this.live) this.y += this.speed
	}
	
	//碰撞之后
	collided() {
		this.hp--;
		//如果没有生命了就死掉
		if(this.hp == 0) {
			this.live = false;
		}
	}
	
	update() {
		this.draw();
		this.move();
	}
	
	// 判断敌机是否出界
	outOfBounds() {
		if(this.y >= HEIGHT) {
			return true
		}
		return false
	}
}