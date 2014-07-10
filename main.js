// tempo
var t1 = 0.5;
var t2 = 0.25;
var t3 = 0.4;

var guitarNotes = {
	'e0'	: 329,
	'e1'	: 349,
	'e2'	: 370,
	'e3'	: 392,
	'e4'	: 415,
	'e5'	: 440,
	'e6'	: 466,
	'e7'	: 494,
	'e8'	: 523,
	'e9'	: 554,
	'e10'	: 587,

	'B0'	: 247,
	'B1'	: 262,
	'B2'	: 277,
	'B3'	: 294,
	'B4'	: 311,
	'B5'	: 329,
	'B6'	: 349,
	'B7'	: 370,
	'B8'	: 392,
	'B9'	: 415,
	'B10'	: 440,

	'G0'	: 196,
	'G1'	: 208,
	'G2'	: 220,
	'G3'	: 233,
	'G4'	: 247,
	'G5'	: 262,
	'G6'	: 277,
	'G7'	: 294,
	'G8'	: 311,
	'G9'	: 329,
	'G10'	: 349
};

var changeSpeed = function(v) {
	t1 = t1/v;
	t2 = t2/v;
	t3 = t3/v;
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

/*
 * Oscilator
 */
var Oscilator = function(freq, duration) {
	this.ctx = new AudioContext();
	this.freq = freq || 1;
	this.duration = duration || 0;
};

Oscilator.prototype = {
	play: function() {
		this.o = this.ctx.createOscillator();
		this.delay = this.ctx.createDelay();
		this.o.type = 'sine';
		this.o.frequency.value = this.freq;
		this.o.start();
		// this.o.connect(this.delay);
		this.o.connect(this.ctx.destination);
		this.o.connect(this.ctx.createConvolver());
	},

	stop: function() {
		this.o.stop(this.duration);
	},

	setFreq: function(v) {
		this.o.frequency.value = v;
	}
};

/*
 * Player
 */

var Player = function() {
	this.notes = [];
	this.timerId = null;
};

Player.prototype = {
	add: function() {
		var that = this;
		Array.prototype.forEach.call(arguments, function(v){
			that.notes.push([guitarNotes[v[0]], v[1], v[0]]);
		});
		return this;
	},

	playAt: function(i) {
		var that = this;
		console.log(this.notes[i][2], this.notes[i][1]);
		this.osc.setFreq(this.notes[i][0]);
		this.timerId = setTimeout(function() {
			if (that.notes[i+1]) {
				that.playAt(i+1);
			} else {
				that.stop();
			}
		}, this.notes[i][1]*1000);
		return this;
	},

	play: function() {
		this.stop();
		this.osc = new Oscilator();
		this.osc.play();
		this.playAt(0);
		return this;
	},

	stop: function() {
		if (this.osc) {
			clearTimeout(this.timerId);
			this.osc.stop();
		}
	}
};

changeSpeed(0.9);
// player instance
var player = new Player();

player.add(
	['G4', t1],
	['B5', t2],
	['B4', t2],
	['B5', t2],
	['B7', t2],
	['e4', t2],
	['B7', t2],
	['e4', t2],
	['e5', t2],
	['e6', t2],
	['e7', t2],
	['B5', t3],
	['G4', t3],
	['B5', t3],
	['B4', t3],
	['B5', t2],
	['B7', t2],
	['e4', t2],
	['B7', t2],
	['e5', t2],
	['e4', t2],
	['B6', t3],
	['B7', t3],
	['G6', t3],
	['B7', t3],
	['B6', t2],
	['B7', t2],
	['B9', t2],
	['B10', t2],
	['B9', t2],
	['B10', t2],
	['e7', t3],
	['e8', t3],
	['e9', t2],
	['B7', t2],
	['G6', t2],
	['B7', t2],
	['B6', t2],
	['B9', t2],
	['B7', t2],
	['B10', t2],
	['B9', t2],
	['e7', t2],
	['B10', t2],
	['B8', t3],
	['B9', t3],
	['B9', t3],
	['B9', t2],
	['B10', t2],
	['B9', t3],
	['B9', t2],
	['B10', t2],
	['B9', t2],
	['B9', t2],
	['e9', t3],
	['e7', t3],
	['B10', t2],
	['B10', t2],
	['B9', t2],
	['B9', t2],
	['B7', t2],
	['B7', t3],
	['G9', t3],
	['G9', t3],
	['G8', t3],
	['G8', t3],
	['G6', t3]
);

document.getElementById('play').addEventListener('click', function(){
	player.play();
});

document.getElementById('stop').addEventListener('click', function(){
	player.stop();
});
