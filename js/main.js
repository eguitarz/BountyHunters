var bg_canvas = document.getElementById('background'),
		bg_ctx = bg_canvas && bg_canvas.getContext('2d'),
		player_canvas = document.getElementById('player'),
		player_ctx = player_canvas.getContext('2d'),
		h = new DrawableObject('img/hunter.png', 48, 64),
		weapon_canvas = document.getElementById('weapon'),
		weapon_ctx = weapon_canvas.getContext('2d'),
		bg1 = new DrawableObject('img/bg.png', window.innerWidth, window.innerHeight);
		bg2 = new DrawableObject('img/bg.png', window.innerWidth, window.innerHeight);
		bg2.x = window.innerWidth;

if (bg_ctx) {
	bg_ctx.canvas.width  = window.innerWidth;
	bg_ctx.canvas.height = window.innerHeight;
	bg1.loop(bg_ctx, -4, 0);
	bg2.loop(bg_ctx, -4, 0);
}
if (player_ctx) {
	player_ctx.canvas.width  = window.innerWidth;
	player_ctx.canvas.height = window.innerHeight;
}
if (weapon_ctx) {
	weapon_ctx.canvas.width  = window.innerWidth;
	weapon_ctx.canvas.height = window.innerHeight;
}
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
function fire(owner, weapon, vx, vy) {
	weapon.x = owner.x;
	weapon.y = owner.y;
	var moveWeapon;
	(moveWeapon = function() {
		weapon.x = weapon.x + vx;
		weapon.y = weapon.y + vy;
		weapon.paint(weapon_ctx);
		if (weapon.x > window.innerWidth || weapon.x < weapon.width || weapon.y > window.innerHeight ||  weapon.y < weapon.height) return;
		setTimeout( moveWeapon, 33);
	})();
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
	// fire weapon whilst pressed space
	if (e.keyCode === 32) {
		dagger = new DrawableObject('img/dagger.gif', 30, 12);
		fire(h, dagger, 20, 0);
	}
}

// event bindings
window.addEventListener('keydown', onKeydown, true);