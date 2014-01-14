function DrawableObject(src, ctx, w, h) {
	var self = this
	this.image = new Image(w, h);
	this.image.src = src;
	this.ctx = ctx;
	this.disabled = null;
	this.image.onload = function() {
		self.width = this.width;
		self.height = this.height;
	}
	this.x = this.y = 0;
};
DrawableObject.prototype.paint = function(){
	var ctx = this.ctx;
	ctx.save();
	// ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	ctx.restore();
}
DrawableObject.prototype.loop = function(vx, vy){
	var ctx = this.ctx;
	ctx.save();
	var move;
	(move = function() {
		if (this.disabled) return;
		this.x = this.x + vx;
		this.y = this.y + vy;
		if(this.x < -this.width) {
			this.x = this.width;
			this.y = 0;
		}
		setTimeout( move, 33);
	}.bind(this) )();
	ctx.restore();
};
DrawableObject.prototype.onCollision = function() {
	console.log(this+' on collision');
}
DrawableObject.prototype.isCollided = function(drawableObject) {
	var o1 = {x:drawableObject.x, y:drawableObject.y},
			o2 = {x:drawableObject.x + drawableObject.width, y:drawableObject.y},
			o3 = {x:drawableObject.x, y:drawableObject.y + drawableObject.height},
			o4 = {x:drawableObject.x + drawableObject.width, y:drawableObject.y + drawableObject.height},
			p1 = {x:this.x, y:this.y},
			p2 = {x:this.x + this.width, y:this.y},
			p3 = {x:this.x, y:this.y + this.height},
			p4 = {x:this.x + this.width, y:this.y + this.height};

	var isCollided = false;
	isCollided = [p1, p2, p3, p4].some(function(p) {
		if (p.x >= o1.x && p.x <= o4.x && p.y >= o1.y && p.y <= o4.y) {return true;}
	}) || [o1, o2, o3, o4].some(function(o) {
		if (o.x >= p1.x && o.x <= p4.x && o.y >= p1.y && o.y <= p4.y) {return true;}
	});

	return isCollided;
};