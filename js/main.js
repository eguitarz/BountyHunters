var bgCanvas = document.getElementById('background'),
		bgCtx = bgCanvas && bgCanvas.getContext('2d'),
		playerCanvas = document.getElementById('player'),
		playerCtx = playerCanvas.getContext('2d'),
		player = new Player('img/hunter.png', playerCtx, 48, 64);
		monster = new DrawableObject('img/skeleton.gif', playerCtx, 48, 50);
		weaponCanvas = document.getElementById('weapon'),
		weaponCtx = weaponCanvas.getContext('2d'),
		bg1 = new DrawableObject('img/bg.png', bgCtx, window.innerWidth, window.innerHeight);
		bg2 = new DrawableObject('img/bg.png', bgCtx, window.innerWidth, window.innerHeight);
		bg2.x = window.innerWidth;

var config = {
	start: {
		sprites: [bg1, bg2, player, monster],
		init: function() {
			bgCtx.canvas.width  = window.innerWidth;
			bgCtx.canvas.height = window.innerHeight;
			bg1.loop(-4, 0);
			bg2.loop(-4, 0);
			playerCtx.canvas.width  = window.innerWidth;
			playerCtx.canvas.height = window.innerHeight;
			weaponCtx.canvas.width  = window.innerWidth;
			weaponCtx.canvas.height = window.innerHeight;
			player.x = 200;
			player.y = window.innerHeight - 180;
			monster.x = 600;
			monster.y = window.innerHeight - 180;
			monster.isClipped = true;
			monster.sheight = 50;
		}
	},
	ingame: {

	},
	end: {

	},
	ctxes: [playerCtx, weaponCtx]
};

function Game() {
	this.states = ['start', 'ingame', 'end'];
	this.state = 'start';
	this.renderQueue = new RenderQueue;
	this.collisionQueue = [];
};

var t = null;
Game.prototype.init = function(config) {
	var sprites = config[this.state].sprites;
	var ctxes = config.ctxes;
	sprites && sprites.forEach( function(sprite) {
		this.renderQueue.push(sprite);
	}.bind(this) );
	ctxes && ctxes.forEach( function(ctx) {
		this.renderQueue.pushCtx(ctx);
	}.bind(this) );
	this.renderQueue.run();
	config[this.state].init();
	this.collisionQueue.push(player);

	t = new Player('img/hunter.png', playerCtx, 48, 64);
	this.renderQueue.animate(t, {x: 300, y: 300}, {x: 500, y:300}, 1000);
};

Game.prototype.run = function() {

};

var game = new Game;
game.init(config);

// functions
function move(obj, vx, vy) {
	obj.x = obj.x + vx,
	obj.y = obj.y + vy;
}
function trigger(queue, owner, weapon, vx, vy) {
	weapon.x = owner.x;
	weapon.y = owner.y;
	queue.push(weapon);
	var moveWeapon;
	(moveWeapon = function() {
		weapon.x = weapon.x + vx;
		weapon.y = weapon.y + vy;
		game.collisionQueue.forEach( function(o) {
			if ( o.isCollided(weapon) ) {
				o.onCollision();
				weapon.onCollision();
			}
		});
		if (weapon.x > window.innerWidth || weapon.x < weapon.width || weapon.y > window.innerHeight ||  weapon.y < weapon.height) {
			queue.remove(weapon);
			return;
		}
		setTimeout( moveWeapon, 33);
	})();
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

var pressedKeys = [];
function onKeydown(e) {
	pressedKeys[e.keyCode] = true;
	if (pressedKeys[37]) {
		move(player, -10, 0);
	} else if (pressedKeys[38]) {
		move(player, 0, -10);
	} else if (pressedKeys[39]) {
		move(player, 10, 0);
	} else if (pressedKeys[40]) {
		move(player, 0, 10);
	}
	// fire weapon whilst pressed space
	if (pressedKeys[32]) {
		dagger = new DrawableObject('img/dagger.gif', weaponCtx, 30, 12);
		trigger(game.renderQueue, player, dagger, 20, 0);
	}
};

function onKeyup(e) {
	pressedKeys[e.keyCode] = false;
};

// event bindings
window.addEventListener('keydown', onKeydown, true);
window.addEventListener('keyup', onKeyup, true);