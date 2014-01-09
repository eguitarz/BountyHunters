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
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	ctx.restore();
}
DrawableObject.prototype.loop = function(vx, vy){
	var ctx = this.ctx;
	ctx.save();
	var draw;
	(draw = function() {
		if (this.disabled) return;
		this.x = this.x + vx;
		this.y = this.y + vy;
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		if(this.x < -this.width) {
			this.x = this.width;
			this.y = 0;
		}
		drawHandler = setTimeout( draw, 33);
	}.bind(this) )();
	ctx.restore();
};