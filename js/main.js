var bg_canvas = document.getElementById('background'),
		bg_ctx = bg_canvas.getContext('2d'),
		player_canvas = document.getElementById('player'),
		player_ctx = player_canvas.getContext('2d'),
		h = new DrawableObject('img/hunter.png', 48, 64),
		bg1 = new DrawableObject('img/bg.png', window.innerWidth, window.innerHeight);
		bg2 = new DrawableObject('img/bg.png', window.innerWidth, window.innerHeight);
		bg2.x = window.innerWidth;

bg_ctx.canvas.width  = window.innerWidth;
bg_ctx.canvas.height = window.innerHeight;
bg1.loop(bg_ctx, -4, 0);
bg2.loop(bg_ctx, -4, 0);
player_ctx.canvas.width  = window.innerWidth;
player_ctx.canvas.height = window.innerHeight;
h.x = 200;
h.y = window.innerHeight - 180;

var drawPlayer;
(drawPlayer = function() {
	h.paint(player_ctx);
	setTimeout( function() {
		drawPlayer.call();
	}, 33);
})();
// h.paint(player_ctx, 200, window.innerHeight - 180, 48, 64);

// functions
function move(obj, vx, vy) {
	obj.x = obj.x + vx,
	obj.y = obj.y + vy;
}
function onKeydown(e) {
	if (e.keyCode === 37) {
		move(h, -10, 0);
	} else if (e.keyCode === 38) {
		move(h, 0, -10);
	} else if (e.keyCode === 39) {
		move(h, 10, 0);
	} else if (e.keyCode === 40) {
		move(h, 0, 10);
	}
}

// event bindings
window.addEventListener('keydown', onKeydown, true);