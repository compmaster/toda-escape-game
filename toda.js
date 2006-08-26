// ========================================================
// TODA GAME ENGINE 1.0 - ACTIONS, INTERFACE, NAVIGATION...
// ========================================================

//Use strict mode
"use strict";

//Default room
var ROOM = 0;

//Is it IE?
var IE = (document.all) ? true : false;

//Selected item in pocket
var thing = '';

//Main and text area
var mainBox = $('main');
var txtBox  = $('txt');

//All rooms
var roomlist = [];

//Preloaded images
var imgbank = {};

//Found items
var found = {};

//Started at
var startTime = 0;

//Force loading even if something is wrong
var loadGuard = setTimeout(start, 15000);

//Load language file
if(location.search.length === 3)
{
	var LANG = location.search.substr(1,2);
}
else
{
	var LANG = navigator.language || navigator.userLanguage;
	LANG = LANG ? LANG.substr(0,2).toLowerCase() : LANG;
}
switch(LANG)
{
	case 'pl': LANG = 'pl'; break;
	default: LANG = 'en';
}

//Get ID
function $(x) { return document.getElementById(x) };

//Add SRC attribute to existing SCRIPT element
$('langjs').src = LANG + '.js';
document.documentElement.lang = LANG;

//Pocket - DOM, add, delete
var pocket =
{
	o: document.getElementsByTagName('ul')[0],
	all: {},
	add: function(id, img)
	{
		if(!this.all[id])
		{
			var x = document.createElement('li');
			var self = this;
			x.style.backgroundImage = 'url(' + (img || things[id].icon) + ')';
			x.onmousedown = function() { self.mark(id) };
			this.o.appendChild(x);
			this.all[id] = x;
			//this.mark(id);
		}
	},
	del: function(id)
	{
		if(!id) id = thing;
		if(this.all[id])
		{
			this.o.removeChild(this.all[id]);
			delete this.all[id];
			if(thing === id) thing = ''
		}
	},
	mark: function(id)
	{
		if(this.all[id])
		{
			if(this.all[id].room)
			{
				go(this.all[id].room)
			}
			if(this.all[id].className)
			{
				this.all[id].className = thing = '';
				say('away')
			}
			else
			{
				if(this.all[thing])
				{
					this.all[thing].className = '';
				}
				if(things[id] && things[id].useText)
				{
					say(things[id].useText)
				}
				else
				{
					say('use')
				}
				this.all[id].className = 'use';
				thing = id
			}
		}
	}
};

//Pick item
function pick(id)
{
	pocket.add(id);
	//var node = document.getElementById(id);
	//node.parentNode.removeChild(node);
	hide(id)
}

//Insert item - avoid prototyping Element - old IE versions do NOT support it
function put(id, x, y, box)
{
	if(typeof id === 'string')
	{
		var o = $(id)
	}
	else
	{
		var o = id
	}
	if(!box)
	{
		box = roomlist[ROOM]
	}
	if(!o && things[id])
	{
		o = document.createElement('img');
		o.src = (things[id].img || things[id].icon);
		o.id = id
	}
	if(o)
	{
		if(x) o.style.left = x + 'px';
		if(y) o.style.top  = y + 'px';
		box.appendChild(o);
		o.style.display = 'block'
	}
	pocket.del(id);
};

//Rot13 - Jonas Raoni Soares Silva - jsfromhell.com/string/rot13
String.prototype.rot13 = function(x)
{
	return this.replace(/[a-zA-Z]/g, function(x) {
		return String.fromCharCode((x <= "Z" ? 90 : 122) >= (x = x.charCodeAt(0) + 13) ? x : x - 26);
	});
};

//Find item
function find(id)
{
	if(found[id])
	{
		say('nothing')
	}
	else
	{
		pocket.add(id);
		found[id] = true;
		if(things[id] && things[id].text)
		{
			say(things[id].text)
		}
		else
		{
			say(id)
		}
	}
}

//Zmień pokój
function go(x)
{
	if(ROOM === x) return;
	if(rooms[x].open)
	{
		roomlist[ROOM].style.display = 'none';
		mainBox.style.backgroundImage = (rooms[x]['img'] ? 'url(' + rooms[x]['img'] + ')' : '');
		roomlist[x].style.display = 'block';
		txtBox.innerHTML = roomText[x];
		ROOM = x
	}
	else if(thing)
	{
		if(rooms[x].key === thing)
		{
			rooms[x].open = 1;
			pocket.del();
			say('open')
		}
		else
		{
			say('bad')
		}
	}
	else
	{
		say('closed')
	}
}

//Print text
function say(x)
{
	if(lang[x])
	{
		if(lang[x] instanceof Array)
		{
			if(!say.index[x] || say.index[x] >= lang[x].length)
			{
				say.index[x] = 0
			}
			txtBox.innerHTML = lang[x][say.index[x]++]
		}
		else
		{
			txtBox.innerHTML = lang[x]
		}
	}
	else
	{
		txtBox.innerHTML = x
	}
}
say.index = {};

//Show or hide element
function showhide(o)
{
	if(typeof o === 'string')
	{
		o = document.getElementById(o)
	}
	if(o.style.display === 'none')
	{
		show(o)
	}
	else
	{
		hide(o)
	}
}

//Show element
function show(o)
{
	if(typeof o === 'string')
	{
		o = document.getElementById(o)
	}
	o.style.display = 'block'
}

//Hide element
function hide(o)
{
	if(typeof o === 'string')
	{
		o = document.getElementById(o)
	}
	o.style.display = 'none'
}

//Random number - phpjs.org
function rand(min, max)
{
	if(min instanceof Array)
	{
		return min[Math.floor(Math.random() * min.length)]
	}
	else
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

//Shuffle array
function shuffle(a)
{
	for(var i=0,tmp,n,max=a.length-1; i<max; i++)
	{
		n = rand(i+1, max);
		tmp = a[i];
		a[i] = a[n];
		a[n] = tmp;
	}
}

//Preload images
function preload(list)
{
	var i,img;
	if(list)
	{
		for(i=0; i<list.length; i++)
		{
			img = new Image();
			img.src = list[i];
			imgbank[list[i]] = img
		}
	}
	else
	{
		for(i=0; i<rooms.length; i++)
		{
			if(rooms[i].img)
			{
				img = new Image(570,380);
				img.src = rooms[i].img;
				imgbank[rooms[i].img] = img
			}
		}
		for(i in things)
		{
			if(things[i].icon && !imgbank[things[i].icon])
			{
				img = new Image();
				img.src = things[i].icon;
				imgbank[things[i].icon] = img
			}
		}
	}
}

//Start game
function start()
{
	clearTimeout(loadGuard);
	roomlist = document.getElementsByClassName('room');
	mainBox  = $('main');
	txtBox   = $('txt');
	document.title = lang.title;
	if(rooms[0].img) mainBox.style.backgroundImage = 'url('+rooms[0].img+')';
	txtBox.innerHTML = roomText[0];
	roomlist[0].style.display = 'block';

	//IE hacks
	if(IE) txtBox.style.filter = 'glow(color=#3f5294,strength=2)';
}

//Add event - IE and W3
function addEvent(type, f, o)
{
	if(window.addEventListener)
	{
		(o||window).addEventListener(type, f, false)
	}
	else if(window.attachEvent)
	{
		(o||window).attachEvent('on'+type, f)
	}
	else if(!o['on'+type])
	{
		(o||window)[type] = f
	}
}

//Keyboard shortcuts
document.onkeydown = function(e)
{
	e = e||event;
	switch(e.keyCode)
	{
		case 38: if(rooms[ROOM].top != undefined) go(rooms[ROOM].top); break; //w górę
		case 37: if(rooms[ROOM].left != undefined) go(rooms[ROOM].left); break; //w lewo
		case 39: if(rooms[ROOM].right != undefined) go(rooms[ROOM].right); break; //w prawo
		case 40: if(rooms[ROOM].back != undefined) go(rooms[ROOM].back); break; //w dół
		case 178: say('stopkey'); break; //stop
		case 179: say('playkey'); break; //play
		case 175: say('morekey'); break; //voice
		case 176: say('nextkey'); break; //next
		case 65: if(e.ctrlKey) return false; //antyzaznaczenie
		default: if(rooms[ROOM].keys) rooms[ROOM].keys(e.keyCode); //say(e.keyCode);
	}
	if(e.keyCode < 32 && (!e.ctrlKey || e.altKey))
	{
		if(e.preventDefault) e.preventDefault();
		return false
	}
};

//Keyboard characters
document.onkeypress = function(e)
{
	e = e||event;
	if(rooms[ROOM].char) rooms[ROOM].char(e.key||e.char||String.fromCharCode(e.keyCode));
	if(!e.ctrlKey || e.altKey)
	{
		if(e.preventDefault) e.preventDefault();
		return false
	}
};

//After you click main area
mainBox.onmousedown = function(e)
{
	if(e)
	{
		var o = e.target
	}
	else
	{
		var o = event.srcElement
	}
	if(o.id)
	{
		if(things[o.id])
		{
			if(things[o.id].text)
			{
				say(things[o.id].text)
			}
			else if(lang[o.id])
			{
				say(o.id)
			}
			if(things[o.id].pick)
			{
				pick(o.id);
				return false
			}
			if(things[o.id].find)
			{
				find(things[o.id].find)
			}
			if(things[o.id].click)
			{
				things[o.id].click()
			}
		}
		else if(lang[o.id])
		{
			say(o.id)
		}
	}
	else if(o.className && o.className === 'room')
	{
		say('nothing')
	}
};

//Warn before closing game
window.onbeforeunload = function(e)
{
	if(!rooms[ROOM].end)
	{
		var e = e || event;
		if(e) e.returnValue = lang.F5;
		return lang.F5
	}
};

//Selection prevention
window.onmousedown = window.onselect = document.onselectstart = function() { window.focus(); return false };

//After the game has been loaded completely - window.onload might not work on ads hosting
addEvent('load', start);

//If your browser does not support getElementsByClassName - only rooms
if(!document.getElementsByClassName)
{
	document.getElementsByClassName = function()
	{
		var div = mainBox.childNodes, a = [];
		for(var i=0; i<div.length; i++)
		{
			if(div[i].className === 'room') a.push(div[i]);
		}
		return a;
	}
}
//For testing only
//mainBox.onmousemove = function(e) { say(e.layerX + ' x ' + e.layerY); }