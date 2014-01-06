var bg_canvas = document.getElementById('background'),
		bg_ctx = bg_canvas.getContext('2d'),
		player_canvas = document.getElementById('player'),
		player_ctx = player_canvas.getContext('2d'),
		h = new DrawableObject('img/hunter.png'),
		bg = new DrawableObject('img/bg.png');

bg_ctx.canvas.width  = window.innerWidth;
bg_ctx.canvas.height = window.innerHeight;
bg.loop(bg_ctx, 0, 0, bg_ctx.canvas.width, bg_ctx.canvas.height, -1, 0);
bg.loop(bg_ctx, bg_ctx.canvas.width, 0, bg_ctx.canvas.width, bg_ctx.canvas.height, -1, 0);
player_ctx.canvas.width  = window.innerWidth;
player_ctx.canvas.height = window.innerHeight;
h.paint(player_ctx, 200, window.innerHeight - 180, 48, 64);

// functions
function move(ctx, obj, vx, vy) {
	var x = obj.x,
			y = obj.y,
			w = obj.width,
			h = obj.height;
	obj.paint(ctx, x + vx, y + vy, w, h);
}
function onKeydown(e) {
	if (e.keyCode === 37) {
		move(player_ctx, h, -10, 0);
	} else if (e.keyCode === 38) {
		move(player_ctx, h, 0, -10);
	} else if (e.keyCode === 39) {
		move(player_ctx, h, 10, 0);
	} else if (e.keyCode === 40) {
		move(player_ctx, h, 0, 10);
	}
}

// event bindings
window.addEventListener('keydown', onKeydown, true);