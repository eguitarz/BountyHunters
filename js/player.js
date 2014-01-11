function Player(src, ctx, w, h) {
	DrawableObject.call(this, src, ctx, w, h);
};
Player.prototype = Object.create(DrawableObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.attack = function() {
	console.log('player attack');
};