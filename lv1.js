// =================================================================
// THE OFFICE DISTRICT ADVENTURE VERSION 1.0 - ONLY ONE LEVEL
// TO ADD MORE LEVELS, USE SERVER-SIDE LANGUAGE OR MODIFY THE ENGINE
// =================================================================

"use strict";

//Rooms, background-image, references to other rooms
//Rooms may be nativated with keyboard arrows
var rooms = [
	{
		img: '1/1.png', //Main 0
		open: 1,
		top: 4,
		left: 3,
		back: 4,
		right: 1,
		keys: function(x) { if(x>48 && x<53) CLOCK.ball(x-48) }
	},
	{
		img: '1/2.png', //Office 1
		key: 'key',
		open: 0,
		left: 0,
		keys: function(x) { COMP.ASCII(x) }
	},
	{
		open: 1, //Shelf 2
		back: 1,
		keys: function(x) { COMP.ASCII(x) }
	},
	{
		img: '1/3.png', //Math room 3
		open: 0,
		right: 0,
		key: 'key2'
	},
	{
		img: '1/4.png', //Library 4
		open: 0,
		top: 0,
		left: 5,
		back: 0
	},
	{
		img: '1/5.png', //Laboratory 5
		top: 6,
		open: 1,
		right: 4
	},
	{
		open: 1, //Calculator 6
		back: 5,
		char: function(x) { CALC.key(x) }
	},
	{
		open: 1, //Player 7
		back: 4,
		char: function(x) { OGG.char(x) },
		keys: function(x) { if(x===13) $('mlcd').click() }
	},
	{
		key: 'key', //End 8
		open: 0,
		end: 1
	}
];

/* Thing definitions
pick  = may be picked
icon  = image visible in the pocket
text  = text displayed after you click it
click = action after you click it
useText = text after selecting item */
var things = {
	f1: {pick: 1, icon: '1/fuse.png', useText: 'useFuse'},
	f2: {pick: 1, icon: '1/fuse.png', useText: 'useFuse'},
	f3: {pick: 1, icon: '1/fuse2.png', useText: 'useFuse'},
	f4: {pick: 1, icon: '1/fuse2.png', useText: 'useFuse'},

	key: {pick: 1, icon: '1/key.png', useText: 'useKey', text: 'unsafe'},
	key1: {pick: 1, icon: '1/key.png', useText: 'useKey', text: 'key'},
	key2: {pick: 1, icon: '1/key.png', useText: 'useKey', text: 'key'},
	key3: {pick: 1, icon: '1/key.png', useText: 'useKey', text: 'key'},
	card: {pick: 1, icon: '1/kart.gif', useText: 'useCard'},

	CD: {pick: 1, icon: '1/cd.png', useText: 'useCD'},
	sd: {pick: 1, icon: '1/sd.png', useText: 'useSD'},
	kbd: {icon: '1/kbd.png'},
	drawer: {click: function() { showhide('dropen') } },

	disk1: {pick: 1, icon: '1/disk1.png', useText: 'useDisk'},
	disk2: {pick: 1, icon: '1/disk2.png', useText: 'useDisk'},
	disk3: {pick: 1, icon: '1/disk3.png', useText: 'useDisk'}
};

//Power is disabled
var AC = 0;
var DC = 0;

//Connection manager
var MAN = {

	//Click the LED
	LED: function()
	{
		if(AC)
		{
			say('LED')
		}
		else
		{
			say('man')
		}
	},

	//Enable LED
	turn: function(x)
	{
		//Do not blink it anymore
		if(this.which[x]) this.which[x] = 0;
		$('led'+x).className = 'LED'+x;
		this.leds[x] = 1
	},

	//Blink LED
	blink: function(x)
	{
		if(!this.inter)
		{
			this.inter = setInterval(function()
			{
				for(var i=1; i<4; i++)
				{
					if(MAN.which[i])
					{
						$('led'+i).className = (MAN.state) ? 'LED'+i : 'OFF';
						MAN.state ^= 1;
					}
				}
			}, 1000);
		}
		this.which[x] = 1
	},

	//Stop blinking
	stop: function(x)
	{
		this.which[x] = 0;
		if(this.inter && !which[1] && !which[2] && !which[3]) clearInterval(this.inter);
	},

	//First LED blinks until user solves CLOCK - interval object
	inter: null,
	state: 1,
	which: [0,0,0,0],

	//Status of LED
	leds: [0,0,0,0]
};

//Computer
//on: 1 POST, 2 boot, 3 wait, 4 user, 5 pass, 6 ANY, 7 printing, 8 done
var COMP = {

	//Turn it on
	turn: function()
	{
		if(AC)
		{
			if(this.on < 7)
			{
				this.POST(1);
				$('compbtn').className = 'on';
			}
		}
		else
		{
			say('comp')
		}
	},

	//Show startup info
	POST: function(x)
	{
		if(x) this.on = x;
		switch(this.on)
		{
			case 1: switch(this.drive) //Test CD-ROM
			{
				case 1: this.write(lang.BDVD); return;
				case 2: this.write(lang.BCD); x = 2; break;
				default: this.write('\n\nBAD OS 2000'); x = 3;
			}
				setTimeout('COMP.POST('+x+')', 3000);
				break;
			case 2:
				this.write('\n'+lang.code+'\n\n'+ CLOCK.code)
				break;
			case 3:
				this.write('\n\n'+lang.user);
				break;
			case 4:
				this.write('\n\n'+lang.pass);
				break;
			case 5:
				this.write('\n'+lang.com+'\n\n>>>>>>>>>>>>'); say('console');
				break;
			case 6:
				if(this.disk > 0) { this.write('\nDISK HAS\n\nBEEN PRINTED'); this.on = 5 }
				else this.write('\nPRESS ANY KEY\n\nTO CONTINUE');
				break;
			case 7:
				this.write('\nPRINTING\n\n0%');
				go(1);
				setTimeout(function(){COMP.write('\nPRINTING\n\n50%')},1500);
				setTimeout(function(){COMP.write('\nCOMPLETE\n\n100%'); COMP.disk = 1; COMP.on = 5},3000);
				break;
			case 8:
				this.write(lang.attempt);
				setTimeout('COMP.POST(3)',2000);
				break;
			case 9:
				this.write(lang.access);
				setTimeout('COMP.POST(4)',2000);
				break;
		}
	},

	//Show text on keyboard
	info: function(x)
	{
		this.kbdin.innerHTML = x;
	},

	//Show text on LCD
	write: function(x)
	{
		this.screen.innerHTML = (IE ? x.replace(/\n/g, '<br>') : x)
	},
	
	//CD or DVD
	CD: function(x)
	{
		if(this.drive === x)
		{
			this.drive = 0;
			pocket.add('CD')
		}
		else if(this.on && !this.drive && thing === 'CD')
		{
			this.drive = x;
			pocket.del('CD')
		}
		else if(thing)
		{
			say(this.on ? 'fit' : 'tray')
		}
		else
		{
			say(x===1 ? 'DVD-ROM' : 'CD-ROM')
		}
	},

	//Printer
	printer: function()
	{
		if(this.disk === 1)
		{
			this.disk = 2;
			find('disk1')
		}
		else if(found['f2'])
		{
			say('hole')
		}
		else
		{
			find('f2')
		}
	},

	//Print a key basing on ASCII code
	ASCII: function(x)
	{
		switch(x)
		{
			case 192: COMP.key('NOTE'); break;
			case 13: COMP.key('ENTER'); break;
			case 32: COMP.key('SPACE'); break;
			case 18: COMP.key('ANY'); break;
			case 8: COMP.key('BACKSPACE'); break;
			default: if(x > 31 && x < 94) COMP.key(String.fromCharCode(x));
		}
	},

	//Press a key
	key: function(x)
	{
		if(this.on === 6)
		{
			if(x==='ANY') this.POST(7); else say('noany');
			return
		}
		say(x);
		if(this.on < 3 || this.on > 6) return;
		switch(x)
		{
			case 'ENTER': if(this.input) switch(this.on)
			{
				case 3: if(this.input===OGG.name) this.POST(4); else this.POST(8); break;
				case 4: if(this.input===OGG.name.rot13()) this.POST(5); else this.POST(9); break;
				case 5: case 6: var x = this.input.split(' ');
				switch(x[0])
				{
					case 'HELP':
					case 'POMOC': this.write('ABOUT\tPRINT\nEXIT\tPWD\nHALT\tRESET\nHACK\tSETUP\nKILL\tTYPE'); break;
					case 'ABOUT': this.write('BAD OS 2000\n\nTHE HARDEST\nCONSOLE\n1.0'); break;
					case 'DIR':
					case 'LS': this.write('.\n..\ndocs\nprinter\nsettings'); break;
					case 'HALT': this.on = 0; this.write(''); say('halt'); $('compbtn').className=''; break;
					case 'PRINT': this.POST(6); break;
					case 'EXIT': this.POST(3); break;
					case 'KILL': this.write(x[1]?'\nPROCESS '+x[1]+'\n\nNOT FOUND':'\n\nNOTHING TO KILL'); break;
					case 'CD': this.write('\n\nACCESS DENIED'); break;
					case 'TYPE': x.shift(); this.write(x.join(' ')); break;
					case 'SETUP': this.write('\nINSERT SETUP\n\nFLOPPY DISK'); break;
					case 'PWD': this.write('\n\n/home/sandbox'); break;
					case 'RESET': this.turn(); break;
					case 'HACK': this.write('\nPOLICE IS\n\nON THE WAY'); break;
					default: this.write('\n\n'+lang.NUND); say(lang.BC); break;
				}
			}
			this.input = '';
			go(1);
			break;
			case 'ANY':
			case 'SHIFT': break;
			case 'NOTE': this.input += '#'; break;
			case 'Mandriva Linux': say('linux'); break;
			case 'BACKSPACE': this.input = this.input.slice(0,-1); this.write('\n\n'+this.input); break;
			case 'SPACE': this.input += ' '; break;
			default: this.input += x; this.write('\n\n'+this.input);
		}
		return;
	},

	//Diskiette
	FD: function()
	{
		if(thing) say('fit'); else say('FDD')
	},

	//Keys on the keyboard
	keys:
	[
		['NOTE', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '=', 'BACKSPACE', 'BACKSPACE'],
		['Q','W','E','R','T','Y','U','I','O','P','[',']','ENTER','ENTER'],
		['A','S','D','F','G','H','J','K','L','','','','ENTER','ENTER'],
		['Z','X','C','V','B','N','M','.',',','?','SHIFT','SHIFT','SHIFT'],
		['SPACE', 'ANY', 'Mandriva Linux']
	],
	
	//0 disabled
	//1 booting
	//2 CD-ROM
	//3 username
	//4 password
	//5 console
	on: 0,
	disk: 0,
	drive: 0,
	input: '',
	kbdin: $('kbdin'),
	screen: $('LCD')
};

//After you click the keyboard
$('kbd').onmousedown = $('kbd').onpointerdown = function(e)
{
	e = e || event;
	var x = e.layerX || e.offsetX, y = e.layerY || e.offsetY, row=4, col=0, key;
	var cx = e.clientX, cy = e.clientY, sX = this.offsetLeft, sY = this.offsetTop;
	this.style.zIndex = '999';

	//Move kbd
	document.onmousemove = function(e)
	{
		var e = e||event, dx = cx - e.clientX, dy = cy - e.clientY, kbd = $('kbd');
		kbd.style.left = sX - dx + 'px';
		kbd.style.top = sY - dy + 'px';
	};
	
	document.ontouchmove = function(e) {
		var tl = (e||event).targetTouches[0];
		var dx = cx - tl.clientX, dy = cy - tl.clientY, kbd = $('kbd');
		kbd.style.left = sX - dx + 'px';
		kbd.style.top = sY - dy + 'px';
		e.preventDefault();
	};
	
	//Ctrl-Space-ANY
	if(y > 200)
	{
		row = 4;
		if(x > 135 && x < 330) col = 0;
		else if(x > 330 && x < 368) col = 1;
		else if(x > 368 && x < 400) col = 2;
	}

	//Z-M
	else if(y > 170 && x > 90 && x < 475)
	{
		row = 3;
		col = Math.floor((x-90) / 30) //30 = key width
	}

	//A-L
	else if(y > 140 && x > 77 && x < 475)
	{
		row = 2;
		col = Math.floor((x-77) / 30)
	}

	//Q-P
	else if(y > 110 && x > 70 && x < 475)
	{
		row = 1;
		col = Math.floor((x-70) / 30)
	}

	//Note + numbers
	else if(y > 80 && y < 110 && x > 25 && x < 475)
	{
		row = 0;
		col = Math.floor((x-25) / 30)
	}

	//Out of range
	else return;

	//Find a key
	if(COMP.keys[row][col])
	{
		if(e.stopPropagation) e.stopPropagation();
		COMP.key(COMP.keys[row][col]);
		return false
	}
};

//On up
$('kbd').onmouseup = $('kbd').onpointerup = $('kbd').ontouchend = function()
{
	document.onmousemove = document.ontouchmove = null
};

//C-LOCK
var CLOCK = {

	ball: function(x)
	{
		if(this.on)
		{
			switch(x)
			{
				case 1: this.input += 5; break;
				case 2: this.input -= 10; break;
				case 3: this.input *= 2; break;
				case 4: if(this.input === this.code)
				{
					this.input = 'OK';
					this.on = 0;
					MAN.turn(1);
					rooms[4].open = 1;
					say('unlock')
				}
				else this.input = 0;
			}
			if(x === this.last)
			{
				this.same++
			}
			else
			{
				this.same = 0;
				this.last = x
			}
			if(this.same > 3 || this.input > 2000)
			{
				this.input = this.o.innerHTML = 0;
				say('reset')
			}
			else
			{
				this.o.innerHTML = this.input
			}
		}
		else
		{
			say('noBall')
		}
	},

	//Start machine after it has been authorized
	start: function()
	{
		this.o.innerHTML = this.input;
		this.on = 1;
		MAN.blink(1);
		pocket.del('card')
	},

	//Display C-Lock title
	power: function()
	{
		this.o.innerHTML = 'C-LOCK&trade;'
	},
	
	//C-LOCK state
	on: 0,

	//Last ball
	last: 0,

	//How many times was the same ball pressed?
	same: 0,

	//Current input
	input: 0,

	//Random code - min: 80 (5*16), max: 1500 (5*300)
	code: 5 * rand(16,300),

	//Input object
	o: $('cld')
};

//Calculator
var CALC = {

	//Enter digit
	digit: function(x) 
	{
		if(this.on && DC && this.disp.value != 'OK')
		{
			if(this.disp.value.length > 3 || this.disp.value === 'ENTER CODE')
			{
				this.disp.value = x
			}
			else
			{
				this.disp.value += x
			}
			say('button')
		}
		if(this.disp.value == arabic[number])
		{
			this.disp.value = 'OK';
			$('end').innerHTML = lang.finish;
			put('key', 232, 264, roomlist[0]);
			say('goodNum')
		}
	},

	//Last button 9/0
	d9: function(o)
	{
		var d0 = setTimeout(function(){ CALC.disp.value = CALC.disp.value.slice(0,-1); CALC.digit(0) }, 999);
		o.onmouseup = function() { clearTimeout(d0); CALC.disp.className = '' };
		this.disp.className = 'shift';
		this.digit(9);
	},

	//Enable calc
	power: function()
	{
		if(DC && this.disks[1] === 1 && this.disks[2] === 2 && this.disks[3] === 3)
		{
			this.disp.value = 'ENTER CODE';
			this.on = 1
		}
		else if(DC)
		{
			show('slot1');
			show('slot2');
			show('slot3');
		}
		else
		{
			hide('slot1');
			hide('slot2');
			hide('slot3');
			this.disp.value = '';
			this.on = 0
		}
	},

	//Insert disk
	slot: function(x, o)
	{
		if(this.on) return;
		if(this.disks[x])
		{
			pocket.add('disk' + this.disks[x]);
			o.style.backgroundImage = '';
			o.className = '';
			say('diskOut');
			this.disks[x] = 0
		}
		else if(thing)
		{
			switch(thing)
			{
				case 'disk1': this.disks[x] = 1; break;
				case 'disk2': this.disks[x] = 2; break;
				case 'disk3': this.disks[x] = 3; break;
				default: say('fit'); return
			}
			say('diskIn');
			o.style.backgroundImage = 'url('+things[thing].icon+')';
			o.className = 'ins';
			pocket.del()
		}
		else
		{
			say('slots')
		}
		this.power()
	},

	key: function(x)
	{
		if(x>=0 && x<=9) this.digit(x)
	},

	//Disk numbers
	disks: [0,0,0,0],

	//Calc enables when disks are placed properly
	on: 0,
	disp: $('disp')
};

//Reset input value on startup
CALC.disp.value = '';

//Roman number
var romans = ['MCMLXXVIII','MCMLXXXIX','MCMXVIII','MDCCXCI','MDCLXXXIII','MCDX','MCMXLIV','MMXII','MCMXX'];
var arabic = ['1978','1989','1918','1791','1683','1410','1944','2012','1920'];
var number = rand(0,8);
$('roman').innerHTML = romans[number];

//Ogg Player
var OGG = {

	boot: function()
	{
		this.on = 1;
		$('mlcd').className = 'on';
		show('mboot');
		setTimeout(function() { $('mboot').style.opacity = 1; }, 800);
		setTimeout(function() { $('mboot').style.opacity = 0; }, 3000);
		setTimeout(function() { OGG.select(); hide('mboot'); show('mlist'); OGG.on = 2; },4000);
	},

	//Show menu - currently based on switch, arrays/objects recommended
	menu: function(m1,m2,m3,m4)
	{
		var i = $('mlist').children;
		i[0].innerHTML = lang[m1] || m1; i[0].k = m1;
		i[1].innerHTML = lang[m2] || m2; i[1].k = m2;
		i[2].innerHTML = lang[m3] || m3; i[2].k = m3;
		i[3].innerHTML = lang[m4] || m4; i[3].k = m4;
	},

	//Start game
	game: function()
	{
		this.word = rand(lang.word);
		this.input = '';
		var shuff = this.word.split(''),i,div;
		$('mlets').innerHTML = '';
		$('mword').innerHTML = '';
		shuffle(shuff);
		for(i=0; i<10; i++)
		{
			div = document.createElement('div');
			div.innerHTML = shuff[i];
			$('mlets').appendChild(div);
		}
		hide('mlist');
		show('mgame');
		this.on = 4;
	},

	//Check answer
	letter: function(div)
	{
		if(div.parentNode.id !== 'mlets')
		{
			if(div.id === 'ogg')
			{
				hide('mgame');
				show('mlist');
				this.on = 2
			}
			return;
		}
		this.input += div.innerHTML;
		div.style.visibility = 'hidden';
		if(this.input.length === 10)
		{
			if(this.input === this.word)
			{
				setTimeout(function(){OGG.info(lang.best+OGG.name)},999)
			}
			else
			{
				var div = $('mlets').getElementsByTagName('div'),i;
				for(i=0; i<10; i++)
				{
					div[i].style.visibility = '';
					div[i].innerHTML = this.input.charAt(i)
				}
				this.input = ''
			}
		}
		$('mword').innerHTML = this.input
	},
	
	//Handle letter
	char: function(x)
	{
		if(x>'0' && x<'5' && this.on === 2)
		{
			$('mlist').children[x-1].click()
		}
		else if(this.on === 4)
		{
			x = x.toUpperCase();
			var i,div = $('mlets').children;
			for(i=0; i<div.length; i++)
			{
				if(div[i].innerHTML === x && !div[i].style.visibility)
				{
					this.letter(div[i]); break
				}
			}
		}
	},
	
	//Show info
	info: function(text)
	{
		$('minfo').innerHTML = lang[text] || text;
		hide('mlist');
		hide('mgame');
		show('minfo');
		this.on = 3;
	},

	//Select item
	select: function(item)
	{
		switch(item)
		{
			case 's1': case 's2': case 's3': case 's4':
			case 'm1': this.info('noout'); break;
			case 'm2': this.info('nonet'); break;
			case 'm3': this.menu('s1','s2','s3','s4'); break;
			case 'm4': this.menu('m5','','',''); break;
			case 'm5': this.game(); break;
			default: this.menu('m1','m2','m3','m4'); break;
		}
	},

	//0 off 1 boot 2 menu 3 info 4 game
	on: 0,
	
	//Text input
	input: '',

	//Game words
	word: '',

	//Random sender = computer's login
	name: rand(['BENIAMIN','ADAM','BILL','EMIL','JAMES','AARON','LEO','STEFAN','WILLIAM','MICHAEL','KAMIL'])
};

//OGG onmousedown
$('ogg').onclick = function(e)
{
	e = e||event;
	var target = e.target||e.srcElement;
	switch(OGG.on)
	{
		case 1: break;
		case 2: OGG.select(target.k); break;
		case 3: hide('minfo'); show('mlist'); OGG.on = 2; break;
		case 4: OGG.letter(target); break;
		case 0: OGG.boot();
	}
};

//Place a fuse
$('pin').onmousedown = function(e)
{
	switch(thing)
	{
		case 'f1': var fuse = 0; break;
		case 'f2': var fuse = 1; break;
		case 'f3': var fuse = 2; break;
		case 'f4': var fuse = 3; break;
		case '': say('pins'); return;
		default: say('fit'); return;
	}
	e = e || event;
	var x = e.layerX || e.offsetX, y = e.layerY || e.offsetY, fX, fY = 6, o;
	if(y > 20) fY = 22;
	if(x > 113) fX = 106;
	else if(x > 97) fX = 90;
	else if(x > 81) fX = 75;
	else if(x > 65) fX = 58;
	else if(x > 49) fX = 43;
	else if(x > 33) fX = 27;
	else fX = 10;

	pinX[fuse] = fX;
	pinY[fuse] = fY;

	//AC power - 2nd + 3rd and 5th + 6th
	if(!AC && pinY[0]===22 && pinY[1]===22 && ((pinX[0]===27 && pinX[1]===75) || (pinX[0]===75 && pinX[1]===27)))
	{
		things['f1'].pick = 0;
		things['f2'].pick = 0;
		AC = 1;
		MAN.turn(2);
		CLOCK.power();
		show('touch');
		setTimeout(function(){$('touch').style.opacity='1'},100);
		say('AC')
	}

	//DC power - 3rd + 4th and 7th + 8th
	else if(!DC && pinY[2]==6 && pinY[3]==6 && ((pinX[2]==106 && pinX[3]==43) || (pinX[2]==43 && pinX[3]==106)))
	{
		things['f3'].pick = 0;
		things['f4'].pick = 0;
		DC = 1;
		MAN.turn(3);
		CALC.power();
		say('DC');

		//Shuffle riddle
		var rows = $('orderbox').rows,i,blank=15,tab=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		shuffle(tab);

		//Find blank
		for(i=0; i<15; i++)
		{
			if(tab[i] === 15)
			{
				blank = i;
				break
			}
		}

		//F is blank
		tab[blank] = '';

		//Blank color
		var white = parseInt(blank*1.25) % 2;

		//Check if game is solvable
		if(!white)
		{
			var tmp = tab[0];
			tab[0] = tab[1];
			tab[1] = tmp;
		}

		//Rearrange board
		for(i=0; i<16; i++)
		{
			rows[parseInt(i/4)].cells[i%4].innerHTML = tab[i].toString(16).toUpperCase();
		}

		//Insert number riddle and lock room
		roomlist[3].appendChild($('orderbox'));
		rooms[0].open = 0
	}

	//Still incorrect
	else
	{
		say('fuse')
	}

	//Place the fuse
	put(thing, fX, fY, this)
};
var pinX = [0,0,0,0];
var pinY = [0,0,0,0];

//Order digits
$('orderbox').onmousedown = function(e)
{
	e = e || event;
	var td = e.srcElement || e.target;
	var tr = td.parentNode;
	var row = tr.rowIndex, cell = td.cellIndex, r = this.rows;

	//Do sth
	if(row > 0 && !r[row-1].cells[cell].innerHTML)
	{
		r[row-1].cells[cell].innerHTML = td.innerHTML;
		td.innerHTML = '';
	}
	else if(row < 3 && !r[row+1].cells[cell].innerHTML)
	{
		r[row+1].cells[cell].innerHTML = td.innerHTML;
		td.innerHTML = '';
	}
	else if(cell > 0 && !tr.cells[cell-1].innerHTML)
	{
		tr.cells[cell-1].innerHTML = td.innerHTML;
		td.innerHTML = '';
	}
	else if(cell < 3 && !tr.cells[cell+1].innerHTML)
	{
		tr.cells[cell+1].innerHTML = td.innerHTML;
		td.innerHTML = '';
	}
	for(var i=0; i<15; i++)
	{
		if(parseInt(r[parseInt(i/4)].cells[i%4].innerHTML,16) !== i) return;
	}
	rooms[0].open = 1;
	r[3].cells[3].innerHTML = 'F';
	say('ordered')
};

//Scan the card
function SCAN()
{
	switch(thing)
	{
		case 'card': if(AC) { CLOCK.start(); say('accept') } else say('noscan'); break;
		case 'key': case 'key2': case 'key3': say('thief'); break;
		case 'CD': say('optic'); break;
		case '': say('scan'); break;
		default: say('fit');
	}
}

//Take out the metal plate
$('plat').onmousedown = function()
{
	if(thing)
	{
		if(thing === 'sd')
		{
			hide(this);
			say('detach');
			pocket.del('sd');
		}
		else
		{
			say('cannot')
		}
	}
	else
	{
		say('plate')
	}
};

//Credits
function finish()
{
	go(8);
	setTimeout(function()
	{
		if(ROOM===8)
		{
			$('endimg').style.transform = 'scale(8)';
			setTimeout("$('end').innerHTML = lang.title; $('end').style.fontSize = '30px'",30000)
		}
	},100);
}

//Klozet
function closet(x)
{
	if(closet.open || thing === 'key3')
	{
		showhide('cl1');
		showhide('cl2');
		find('disk2');
		pocket.del('key3');
		closet.open = 1
	}
	else
	{
		say('closed')
	}
}
closet.open = 0;
closet.safe = 1;

//Preload images now
preload();