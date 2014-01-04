var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var bg = new Image();
bg.src = 'img/bg.png';
bg.addEventListener('load', function() {
	ctx.drawImage(bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}, false);

var hunter = new Image();
hunter.src = 'img/hunter.png';
hunter.addEventListener('load', function() {
	ctx.drawImage(hunter, 0, 0, 48, 64);
}, false);
