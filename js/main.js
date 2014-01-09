var bg_canvas = document.getElementById('background'),
		bg_ctx = bg_canvas && bg_canvas.getContext('2d'),
		player_canvas = document.getElementById('player'),
		player_ctx = player_canvas.getContext('2d'),
		hunter = new DrawableObject('img/hunter.png', player_ctx, 48, 64),
		weapon_canvas = document.getElementById('weapon'),
		weapon_ctx = weapon_canvas.getContext('2d'),
		bg1 = new DrawableObject('img/bg.png', bg_ctx, window.innerWidth, window.innerHeight);
		bg2 = new DrawableObject('img/bg.png', bg_ctx, window.innerWidth, window.innerHeight);
		bg2.x = window.innerWidth;

if (bg_ctx) {
	bg_ctx.canvas.width  = window.innerWidth;
	bg_ctx.canvas.height = window.innerHeight;
	bg1.loop(-4, 0);
	bg2.loop(-4, 0);
}
if (player_ctx) {
	player_ctx.canvas.width  = window.innerWidth;
	player_ctx.canvas.height = window.innerHeight;
}
if (weapon_ctx) {
	weapon_ctx.canvas.width  = window.innerWidth;
	weapon_ctx.canvas.height = window.innerHeight;
}
hunter.x = 200;
hunter.y = window.innerHeight - 180;

var drawPlayer;
// (drawPlayer = function() {
// 	hunter.paint(player_ctx);
// 	setTimeout( function() {
// 		drawPlayer.call();
// 	}, 33);
// })();
// h.paint(player_ctx, 200, window.innerHeight - 180, 48, 64);
 
function RenderQueue() {
	this.stop = false;
	this.queue = [];
};
RenderQueue.prototype.push = function(drawableObject) {
	this.queue.push(drawableObject);
};
RenderQueue.prototype.remove = function(drawableObject) {
	this.queue.remove(drawableObject);
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
	this.queue.forEach( function(o) {
		o.paint();
	});
};
queue = new RenderQueue;
queue.push(hunter);
queue.run();

// functions
function move(obj, vx, vy) {
	obj.x = obj.x + vx,
	obj.y = obj.y + vy;
}
function fire(owner, weapon, vx, vy) {
	weapon.x = owner.x;
	weapon.y = owner.y;
	var moveWeapon;
	(moveWeapon = function() {
		weapon.x = weapon.x + vx;
		weapon.y = weapon.y + vy;
		weapon.paint();
		if (weapon.x > window.innerWidth || weapon.x < weapon.width || weapon.y > window.innerHeight ||  weapon.y < weapon.height) return;
		setTimeout( moveWeapon, 33);
	})();
}
function onKeydown(e) {
	if (e.keyCode === 37) {
		move(hunter, -10, 0);
	} else if (e.keyCode === 38) {
		move(hunter, 0, -10);
	} else if (e.keyCode === 39) {
		move(hunter, 10, 0);
	} else if (e.keyCode === 40) {
		move(hunter, 0, 10);
	}
	// fire weapon whilst pressed space
	if (e.keyCode === 32) {
		dagger = new DrawableObject('img/dagger.gif', weapon_ctx, 30, 12);
		fire(hunter, dagger, 20, 0);
	}
}

// event bindings
window.addEventListener('keydown', onKeydown, true);