//创建一个游戏类
class Game {
	constructor(canvas,cxt) {
		//画布
	  this.canvas=canvas;
		//画笔
		this.cxt=cxt;
		//背景属性，背景对象
		this.bg=new Background(cxt);
		//开始游戏的图片
		this.startBgImg=createImage("img/start.png");
		//重新开始游戏的图片
		this.restartBgImg=createImage("img/restart.png");
		//hp图片
		this.hpImg=createImage("img/hp_0.png");
		this.hpWidth=100;
		 this.hpHeight=10;
		//创建英雄对象
		this.hero=new Hero(cxt);
		//敌机数组
		this.enemyList=[];
		//调用创建敌机方法的计数器
		this.enemyIndex=0;
		//爆炸对象数组
		this.bombList=[];
		//创建一个食物的数组
		this.foodList=[];
		//16秒创建一个食物
		this.foodInterval=800;
		//计数器
		this.foodIndex=0;
		//游戏状态的属性
		this.state=STATE_START;
		//游戏的总分
		this.totalScore=0;
	}
	
	//开始游戏
	start() {
		this.canvas.onclick= () => {
			this.state=STATE_RUNNING;
		}
		//给画布添加一个鼠标移动事件
		this.canvas.onmousemove = e => {
			this.hero.move(e);
		}
		//添加监听键盘事件
		window.onkeyup = (e) => {
			if(e.keyCode == 32) { //按下的是空格键
				//修改游戏的状态为暂停状态
				this.state = STATE_PAUSED;
			}
		}
		
		window.setInterval(() => {
			// 根据不同的游戏状态，画的界面也不相同
			// 如果游戏的状态是开始状态，则背景只画出，不移动
			if(this.state == STATE_START) { // 游戏开始状态
			        // 画出背景
			        this.bg.draw();
			        // 画一个开始游戏的图片
			        this.cxt.drawImage(this.startBgImg, (WIDTH - this.startBgImg.width)/ 2, HEIGHT - 200);
							//画出生命条
							this.drawHp();
							this.drawScore();
			      } else if(this.state == STATE_RUNNING) { // 游戏运行状态
			        // 画出背景
			        this.bg.update();
							//画出生命条
							this.drawHp();
							this.drawScore();
			        // 画出英雄
			        this.hero.update();
							// 调用创建敌机的方法
							this.createEnemy();
							//批量画出所有组件的方法
							this.batDrawCompents();
							//各种组件碰撞检测
							this.collideCompents();
							//创建食物
							this.createFood();
							//英雄死掉之后 游戏结束
							if(!this.hero.live) {
								this.state = STATE_END;
							}
			      } else if(this.state == STATE_PAUSED) { // 游戏暂停状态
			        // 暂停状态什么都不要做，保持原来的界面状态就可以
			      }else if(this.state == STATE_END) {  // 游戏结束状态
			        this.drawEnd();
			      }
		}, 20)
	}
	
	//创建敌机
	createEnemy() {
		this.enemyIndex++;
		ENEMYS.forEach((enemyObj,index) => {
			if(this.enemyIndex % enemyObj.interval == 0) {
				let enemy = new Enemy(this.cxt,index);
				this.enemyList.push(enemy);
			}
		})
	}
	
	//批量画出所有的组件：敌机，食物道具，爆炸效果
	batDrawCompents() {
		//批量画出敌机
		this.enemyList.forEach((enemy,index) => {
			//死掉的敌机和出界的敌机需要执行不同的操作，出界的敌机直接移除，死掉的敌机先产生爆炸效果，产生得分后才能移除
			if(enemy.outOfBounds()) {
				this.enemyList.splice(index,1);
			}
			if(!enemy.live) {
				//死了之后 要产生爆炸效果，得分
				//先爆炸得分，然后再移除死的敌机
				let bomb=new Bomb(enemy);
				this.bombList.push(bomb);
				this.totalScore += enemy.score;
				this.enemyList.splice(index,1);
			}
			enemy.update();
		})
		
		//批量画出食物
		this.foodList.forEach((food,index) => {
		  if(food.outOfBounds() || !food.live) {
		    this.foodList.splice(index,1);
		  }
		  food.update();
		})
		
		//批量画出爆炸效果
		this.bombList.forEach((bomb,index) => {
			if(!bomb.live) {
			  this.bombList.splice(index,1);
			}
			bomb.draw();
		})
	}
	
	//各种组件的碰撞检测方法 子弹和敌机 英雄和敌机 英雄和道具
	collideCompents() {
		//子弹和敌机的碰撞检测，画布上有子弹列表和敌机列表，也就是说有很多子弹和敌机
		this.enemyList.forEach((enemy,enemyIndex) => {
			this.hero.bulletList.forEach((bullet,bulletIndex) => {
				if(collideCompent(enemy,bullet) && bullet.live && enemy.live) { //说明这个敌机和子弹发生了碰撞
					bullet.collided();
					enemy.collided();
				}
			})
			//英雄和敌机的碰撞
			if(collideCompent(enemy,this.hero) && enemy.live && this.hero.live) {
				//敌机碰撞之后要做的事情
				enemy.collided();
				//英雄发生碰撞之后
				this.hero.collided();
			}
		})
		
		//英雄和食物数组中的食物碰撞检测，还有食物类中的collided方法，还有英雄中的eat方法
		this.foodList.forEach((food,index) => {
			if(collideCompent(food,this.hero) && this.hero.live && food.live) {
				//英雄吃掉食物（食物得活着）
				this.hero.eat(food);
				//食物碰撞后的方法（死掉）
				food.collided();
			}
		})
	}
	
	//结束
	drawEnd() {
		//画出背景
		this.bg.draw();
		this.cxt.fillStyle = "rgba(0,0,0,0.5)";
		this.cxt.fillRect(0,0,WIDTH,HEIGHT);
		//画出重新开始游戏的背景
		this.cxt.drawImage(this.restartBgImg, (WIDTH - this.restartBgImg.width)/ 2,  200);
	}
	
	//创建食物
	createFood() {
		this.foodIndex++;
		if(this.foodIndex % this.foodInterval == 0) {
			let food = new Food(this.cxt);
			this.foodList.push(food);
		}
	}
	
	//画出生命条
	drawHp() {
		this.cxt.drawImage(this.hpImg, 10, 10, 30, 20);
		this.cxt.strokeStyle = "red";
		this.cxt.fillStyle = "red";
		//填充矩形和描边矩形
		this.cxt.strokeRect(50, 15, this.hpWidth, this.hpHeight);
		this.cxt.fillRect(50, 15, this.hpWidth * this.hero.hp / HERO_HP, this.hpHeight);
	}
	
	//画出游戏得分
	drawScore() {
		let scoreStr = String(this.totalScore);
		for(let i = 0; i < scoreStr.length; i++) {
			let c = scoreStr.charAt(i);
			let img = scoreImgs[c];
			this.cxt.drawImage(img, 400 + 15 * i, 15, 15, 25);
		}
	}
}

