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
}

var h = new DrawableObject('img/hunter.png');
var bg = new DrawableObject('img/bg.png');

bg.draw(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height);
canvas = document.getElementById('player');
ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
h.paint(ctx, 200, window.innerHeight - 180, 48, 64);