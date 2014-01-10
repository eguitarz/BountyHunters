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
	var routine;
	(routine = function() {
		this.render();
		if (this.stop) return;
		setTimeout(routine, 33);
	}.bind(this))();
};
RenderQueue.prototype.render = function() {
	this.ctxQueue.forEach( function(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	});
	this.queue.forEach( function(o) {
		o.paint();
	});
};