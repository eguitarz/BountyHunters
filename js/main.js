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