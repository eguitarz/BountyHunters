var bgCanvas = document.getElementById('background'),
		bgCtx = bgCanvas && bgCanvas.getContext('2d'),
		playerCanvas = document.getElementById('player'),
		playerCtx = playerCanvas.getContext('2d'),
		hunter = new DrawableObject('img/hunter.png', playerCtx, 48, 64),
		weaponCanvas = document.getElementById('weapon'),
		weaponCtx = weaponCanvas.getContext('2d'),
		bg1 = new DrawableObject('img/bg.png', bgCtx, window.innerWidth, window.innerHeight);
		bg2 = new DrawableObject('img/bg.png', bgCtx, window.innerWidth, window.innerHeight);
		bg2.x = window.innerWidth;

if (bgCtx) {
	bgCtx.canvas.width  = window.innerWidth;
	bgCtx.canvas.height = window.innerHeight;
	bg1.loop(-4, 0);
	bg2.loop(-4, 0);
}
if (playerCtx) {
	playerCtx.canvas.width  = window.innerWidth;
	playerCtx.canvas.height = window.innerHeight;
}
if (weaponCtx) {
	weaponCtx.canvas.width  = window.innerWidth;
	weaponCtx.canvas.height = window.innerHeight;
}
hunter.x = 200;
hunter.y = window.innerHeight - 180;
 
queue = new RenderQueue;
queue.pushCtx(playerCtx);
queue.pushCtx(weaponCtx);
queue.push(hunter);
queue.push(bg1);
queue.push(bg2);
queue.run();

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
		move(hunter, -10, 0);
	} else if (pressedKeys[38]) {
		move(hunter, 0, -10);
	} else if (pressedKeys[39]) {
		move(hunter, 10, 0);
	} else if (pressedKeys[40]) {
		move(hunter, 0, 10);
	}
	// fire weapon whilst pressed space
	if (pressedKeys[32]) {
		dagger = new DrawableObject('img/dagger.gif', weaponCtx, 30, 12);
		trigger(queue, hunter, dagger, 20, 0);
	}
};

function onKeyup(e) {
	pressedKeys[e.keyCode] = false;
};

// event bindings
window.addEventListener('keydown', onKeydown, true);
window.addEventListener('keyup', onKeyup, true);