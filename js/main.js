var canvas = document.getElementById('background');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function DrawableObject(src) {
	this.image = new Image;
	this.image.src = src;
};
DrawableObject.prototype = new Image;
DrawableObject.prototype.draw = function(ctx, x, y, w, h){
	this.image.onload = function() {
		ctx.save();
		ctx.drawImage(this.image, x, y, w, h);
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

var h = new DrawableObject('img/hunter.png');
var bg = new DrawableObject('img/bg.png');

bg.loop(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, -1, 0);
bg.loop(ctx, ctx.canvas.width, 0, ctx.canvas.width, ctx.canvas.height, -1, 0);
canvas = document.getElementById('player');
ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
h.paint(ctx, 200, window.innerHeight - 180, 48, 64);