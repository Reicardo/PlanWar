const WIDTH = 512
const HEIGHT = 768

// 定义游戏的状态
const STATE_START = 1;  /// 开始状态
const STATE_RUNNING = 2;  // 运行状态
const STATE_PAUSED = 3;   // 暂停状态
const STATE_END = 4;    // 结束状态

// 定义英雄的初始血量（生命值）
const HERO_HP = 3

// 定义一个子弹的默认间隔
const INTERVAL = 15;  //子弹间隔次数， 值越小，越密集




// 英雄数组，可以切换英雄图片
var HEROS = [{
	width: 116,
	height: 92,
	imgX: 393,
	imgY: 102,
	background: createImage("img/img_plane_main.png")
}, {
	width: 118,
	height: 100,
	imgX: 393,
	imgY: 0,
	background: createImage("img/img_plane_main.png")
}, {
	width: 116,
	height: 94,
	imgX: 127,
	imgY: 107,
	background: createImage("img/img_plane_main.png")
}, {
	width: 130,
	height: 106,
	imgX: 137,
	imgY: 0,
	background: createImage("img/img_plane_main.png")
}];

// 定义子弹对象
var BULLET = {
	width: 14,
	height: 32,
	speed: [4, 10],
	imgX: 335,
	imgY: 171,
	background: createImage("img/img_bullet.png")
}


// 定义敌机数组
var ENEMYS = [{
	width: 98,
	height: 76,
	speed: 3,
	score: 100,
	imgX: 267,
	imgY: 474,
	background: createImage("img/img_plane_enemy.png"),
	hp: 1,
  interval: 200
}, {
	width: 104,
	height: 76,
	speed: 3,
	score: 100,
	imgX: 162,
	imgY: 474,
	background: createImage("img/img_plane_enemy.png"),
	hp: 1,
  interval: 300
}, {
	width: 114,
	height: 82,
	speed: 8,
	score: 1000,
	imgX: 367,
	imgY: 440,
	background: createImage("img/img_plane_enemy.png"),
	hp: 2,
  interval: 450
}, {
	width: 104,
	height: 76,
	speed: 3,
	score: 200,
	imgX: 162,
	imgY: 474,
	background: createImage("img/img_plane_enemy.png"),
	hp: 2,
  interval: 1100
}, {
	width: 175,
	height: 133,
	speed: 2,
	score: 500,
	imgX: 190,
	imgY: 340,
	background: createImage("img/img_plane_enemy.png"),
	hp: 5,
  interval: 2300
}, {
	width: 260,
	height: 196,
	speed: 2,
	score: 2000,
	imgX: 0,
	imgY: 2,
	background: createImage("img/img_plane_enemy.png"),
	hp: 20,
  interval: 4700
}];

// 爆炸图片
var BOMBIMGS = [
	createImage("img/wsparticle_01.png"), 
	createImage("img/wsparticle_02.png"), 
	createImage("img/wsparticle_03.png"), 
	createImage("img/wsparticle_04.png"), 
	createImage("img/wsparticle_05.png"), 
	createImage("img/wsparticle_06.png"), 
	createImage("img/wsparticle_07.png"), 
	createImage("img/wsparticle_08.png"), 
	createImage("img/wsparticle_09.png"), 
	createImage("img/wsparticle_10.png")
];

const FOODS_HP = 1
const FOODS_SPEED = 2
const FOODS_BULLET = 3

// 食物
var FOODS = [
	{
		background: createImage("img/add_hp.png"),
		type: FOODS_HP,
		width: 60,
		height: 35
	}, {
		background: createImage("img/drop_0.png"),
		type: FOODS_SPEED,
		width: 60,
		height: 35
	}
	, {
		background: createImage("img/drop_1.png"),
		type: FOODS_BULLET,
		width: 60,
		height: 35
	}
]

var scoreImgs = [
	createImage("img/number_0.png"),
	createImage("img/number_1.png"),
	createImage("img/number_2.png"),
	createImage("img/number_3.png"),
	createImage("img/number_4.png"),
	createImage("img/number_5.png"),
	createImage("img/number_6.png"),
	createImage("img/number_7.png"),
	createImage("img/number_8.png"),
	createImage("img/number_9.png"),
]