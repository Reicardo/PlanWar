//创建一个子弹类
class Bullet {
	constructor(hero) {
		  //this.hero = hero;
	    this.cxt = hero.cxt;
	    this.bg = BULLET.background;
	    this.imgX = BULLET.imgX;
	    this.imgY = BULLET.imgY;
	    this.width = BULLET.width;
	    this.height = BULLET.height;
	    // 子弹的速度
	    this.speed = BULLET.speed[hero.bulletSpeed];
	    // 子弹的坐标
	    this.x = hero.x + hero.width / 2 - this.width / 2;
	    this.y = hero.y - this.height;
	    // 子弹的存活状态
	    this.live = true;
	  }
	  
	  
	  //画出子弹
	  draw() {
		  if(this.live) this.cxt.drawImage(this.bg, this.imgX, this.imgY, this.width, this.height, this.x, this.y, this.width, this.height)
	  }
	  
	  //移动
	  move() {
		  if(this.live) this.y -= this.speed
	  }
	  
		//发生碰撞之后
		collided() {
		  this.live = false ;
		}
		
	  update() {
		  this.draw();
		  this.move();
	  }
	  
	  //判断子弹是否出界
	  outOfBounds() {
	      if(this.y <= -this.height) {
	        return true
	      }
	      return false
	    }
}