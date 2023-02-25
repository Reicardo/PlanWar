class Bomb {
	constructor(enemy) {
	    this.cxt = enemy.cxt;
		this.enemy = enemy;
		
		//获取爆炸图片对象数组
		this.imgs = BOMBIMGS;
		this.index = 0;
		this.live = true;
	}
	
	//画出爆炸效果，需要以20ms为间隔画出十张图片才算一次爆炸效果
	//画完爆炸的十张照片之后，让爆炸效果结束
	draw() {
		if(this.live && this.index < this.imgs.length) {
		    //画出第index张爆炸图片
		    this.x = this.enemy.x+(this.enemy.width-this.imgs[this.index].width)/2;
		    this.y = this.enemy.y+(this.enemy.height-this.imgs[this.index].height)/2;
		    this.cxt.drawImage(this.imgs[this.index],this.x,this.y);
		    this.index++;
		}else {
		    this.live = false;
		}
	}
}