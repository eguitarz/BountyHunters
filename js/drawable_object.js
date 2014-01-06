function DrawableObject(src) {
	this.image = new Image;
	this.image.src = src;
	this.x = this.y = 0;
};
DrawableObject.prototype.draw = function(ctx, x, y, w, h){
	this.image.onload = function() {
		ctx.save();
		ctx.drawImage(this.image, x, y, w, h);
		this.x = x;
		this.y = y;
		ctx.restore();
	}.bind(this);
}
DrawableObject.prototype.paint = function(ctx, x, y, w, h){
	this.image.onload = function() {
		ctx.save();
		ctx.drawImage(this.image, x, y, w, h);
		var d = ctx.getImageData(x, y, w, h);
		for(var i=0; i<d.data.length; i+=4) {
			if (d.data[i] === 255 && d.data[i+1] === 255 && d.data[i+2] === 255) {
				d.data[i+3] = 0;
			}
		}
		ctx.putImageData(d, x, y, 0, 0, w, h);
		ctx.restore();
	}.bind(this);
};
DrawableObject.prototype.loop = function(ctx, x, y, w, h, vx, vy){
	ctx.save();
	var i=0;
	var a = setInterval( function() {
		ctx.drawImage(this.image, x + vx*i, y + vy*i, w, h);
		if(Math.abs(vx*i) > w || Math.abs(vy*i) > h) {
			i = 0;
		} else {
			i += 2;
		}
	}.bind(this), 33);
	ctx.restore();
};