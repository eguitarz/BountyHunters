function DrawableObject(src, w, h) {
	var self = this
	this.image = new Image(w, h);
	this.image.src = src;
	this.image.onload = function() {
		self.width = this.width;
		self.height = this.height;
	}
	this.x = this.y = 0;
};
DrawableObject.prototype.paint = function(ctx){
	ctx.save();
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	ctx.restore();
}
DrawableObject.prototype._paint = function(ctx, x, y, w, h){
	// this.image.onload = function() {
	setTimeout( function() {
		ctx.save();
		ctx.drawImage(this.image, x, y, w, h);
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		var d = ctx.getImageData(x, y, w, h);
		for(var i=0; i<d.data.length; i+=4) {
			if (d.data[i] === 255 && d.data[i+1] === 255 && d.data[i+2] === 255) {
				d.data[i+3] = 0;
			}
		}
		ctx.putImageData(d, x, y, 0, 0, w, h);
		ctx.restore();
	}.bind(this), 300);
	// }.bind(this);
};
DrawableObject.prototype.loop = function(ctx, vx, vy){
	ctx.save();
	var a = setInterval( function() {
		this.x = this.x + vx;
		this.y = this.y + vy;
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		if(this.x < -this.width) {
			this.x = this.width;
			this.y = 0;
		}
	}.bind(this), 33);
	ctx.restore();
};