//创建一个英雄类
class Hero {
	constructor(cxt) {
	    this.cxt = cxt;
		//定义英雄类别的属性: 属性的值有四个：0:1排子弹 1:2排子弹  2:3排子弹 3:4排子弹
		this.index = 0;
		this.init();
		//英雄坐标
		this.x = (WIDTH - this.width) / 2;
		this.y = HEIGHT - this.height - 50;
		//英雄的存活状态
		this.live = true;
		//生命值
		this.hp = HERO_HP;
		//弹夹，一个子弹的数组，放子弹对象
		this.bulletList = [];
		//创建子弹的间隔，也就是每调用多少次shoot方法，创建一个子弹
		this.interval = INTERVAL;
		//需要一个递增的变量，没执行一次shoot方法，这个值就加1，相当于一个计数器，记录调用了多少次shoot方法
		this.intervalCount = 0;
		//增加子弹速度
		this.bulletSpeed = 0;

	}
	
	init() {
		//英雄图片
		this.bg = HEROS[this.index].background;
		this.imgX = HEROS[this.index].imgX;
		this.imgY = HEROS[this.index].imgY;
		this.width = HEROS[this.index].width;
		this.height = HEROS[this.index].height;
	}
	
	//画出英雄
	draw() {
		if(this.live) this.cxt.drawImage(this.bg, this.imgX, this.imgY, this.width, this.height, this.x, this.y, this.width, this.height)
	}
	
	//移动
	move(e) {
		if(this.live) {
			this.x = e.offsetX - this.width / 2;
			this.y = e.offsetY - this.height / 2;
		}
	}
	
	eat(food) {
		//判断吃掉的是什么类型的食物，因为吃掉不同类型的食物，英雄要做的操作不一样
		if(food.type == FOODS_BULLET) { //加子弹行数
			//增加子弹的行数
			if(this.index < 3) {
				this.index++;
				this.init();
			}
		}else if(food.type == FOODS_HP) { //加生命
			if(this.hp < HERO_HP) {
				this.hp++;
			}
		}else if(food.type == FOODS_SPEED) { //加速度
			this.bulletSpeed = 1;
		}
	}
	
	//发生碰撞之后
	collided() {
	    this.hp--;
	    if(this.hp == 0) {
			this.live = false;
		}
	}
	
	//射击方法
	shoot() {
		if(this.live) {
			//下面创建子弹的代码，没执行10次shoot方法执行一次
			this.intervalCount++;
			if(this.intervalCount % this.interval == 0){
				//通过this.index判断要发射几排子弹
				if(this.index == 0) { //1排子弹
					//创建一个子弹对象
					let bullet = new Bullet(this);
					//将子弹扔到弹夹中
					this.bulletList.push(bullet);
				}else if(this.index == 1) { //2排子弹
					let b1 = new Bullet(this);
					b1.x -= 16;
					let b2 = new Bullet(this);
					b2.x += 16;
					this.bulletList.push(b1);
					this.bulletList.push(b2);
				}else if(this.index == 2) { //3排子弹
					let b1 = new Bullet(this);
					let b2 = new Bullet(this);
					b2.x -= 32;
					let b3 = new Bullet(this);
					b3.x += 32;
					this.bulletList.push(b1);
					this.bulletList.push(b2);
					this.bulletList.push(b3);
				}else if(this.index == 3) { //4排子弹
					let b1 = new Bullet(this);
					b1.x -= 16;
					let b2 = new Bullet(this);
					b2.x += 16;
					let b3 = new Bullet(this);
					b3.x -= 48;
					let b4 = new Bullet(this);
					b4.x += 48;
					this.bulletList.push(b1);
					this.bulletList.push(b2);
					this.bulletList.push(b3);
					this.bulletList.push(b4);
				}
			}
			//console.log(this.bulletList.length);
		}
	}
	
	//画出弹夹中所有子弹的方法
	drawBulletList() {
		if(this.live) {
			//通过循环拿到弹夹中的所有子弹对象， 挨个调用draw和move方法
			this.bulletList.forEach((bullet,index) => {
				if(bullet.outOfBounds() || !bullet.live) { //出界和死掉的子弹都要移出掉
					//移出弹夹中的子弹
					this.bulletList.splice(index,1);
				}
				bullet.update();
			})
		}
	}
	
	//更新方法
	update() {
		this.draw();
		this.shoot();
		this.drawBulletList();
	}
}