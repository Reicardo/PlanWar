function createImage(url) {
	let img = new Image();
	img.src = url;
	return img;
}

//判断任意两个组件是否发生碰撞
function collideCompent(com1,com2) {
	if(com1.x<com2.x+com2.width && com1.x+com1.width>com2.x && com1.y<com2.y+com2.height && com1.y+com1.height>com2.y) {
		return true
	}
	return false
}