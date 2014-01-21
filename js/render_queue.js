function RenderQueue() {
	this.stop = false;
	this.queue = [];
	this.ctxQueue = [];
};
RenderQueue.prototype.push = function(drawableObject) {
	this.queue.push(drawableObject);
};
RenderQueue.prototype.pushCtx = function(ctx) {
	this.ctxQueue.push(ctx);
};
RenderQueue.prototype.remove = function(drawableObject) {
	q = this.queue;
	var idx = q.indexOf(drawableObject);
	if (idx >= 0) {
		q.splice(idx, 1);
	}
};
RenderQueue.prototype.run = function() {
	this.render();
};
RenderQueue.prototype.render = function() {
	var self = this;
	this.ctxQueue.forEach( function(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	});
	// removing round
	this.queue.forEach( function(o) {
		if (!o.isDrawable) self.remove(o);
	});
	// drawing round
	this.queue.forEach( function(o) {
		o.paint();
	});
};
RenderQueue.prototype.animate = function(drawableObject, from, to, time, timemodel) {
	var draw, vx, vy, stop = false;
	time = time / 33;
	vx = (to.x - from.x) / time;
	vy = (to.y - from.y) / time;
	drawableObject.x = from.x;
	drawableObject.y = from.y;
	this.push(drawableObject);

	(draw = function(){
		drawableObject.x = drawableObject.x + vx;
		drawableObject.y = drawableObject.y + vy;

		if (Math.abs(drawableObject.x - to.x) <= 10) vx = 0;
		if (Math.abs(drawableObject.y - to.y) <= 10) vy = 0;

		if (stop) {
			this.remove(drawableObject);
			return;
		}
		setTimeout( draw, 33 );
	})();
};