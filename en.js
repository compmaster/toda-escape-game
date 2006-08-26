//While entering the room
roomText = [
	'I\'m inside The Office District building. All doors are locked!',
	'Computer lab.',
	'What a wonderful keyboard! Unfortunately there is no mouse.',
	'Welcome to the conference hall!',
	'Library. There are some books and mobile computer.',
	'Laboratory. Be careful!',
	'Calculator of some sort...',
	'Portable media player supporting Ogg format? It must be a dream!',
	'Look, I\'m out!'
];

//All texts
lang = {

	//Global
	F5: 'Are you sure to close the game? You will have to start from the beginning.',
	away: 'Okay, I will use it later.',
	title: 'The Office District Adventure',
	cannot: 'I can do nothing with this object.',

	//Keys
	key: 'Look, I have found a key!',
	fit: 'This object does not fit here.',
	bad: 'I cannot unlock the door with this key or object!',
	unsafe: 'This place is not safe for keys!',

	//Select ANY item
	use:[
		'Where can I use this item?',
		'What to do now?',
		'This thing may be really useful...'
	],

	//After selecting a key
	useKey:[
		'What can I unlock with this key?',
		'This might be a key to knowledge.',
		'I hope I will open a door with this key...'
	],

	//After unlocking a door
	open:[
		'Success! I have opened the door.',
		'Owing to your creativity the door are now open!',
		'The key is correct! I\'m curious, what\'s behind the door...'
	],

	//If door are locked
	closed:[
		'Strongly locked',
		'I have no key for this door.',
		'I\'m knocking to the door but no one is answering...',
		'Locked! Where\'s the key?',
		'I assume even the janitor has no key for this door.'
	],

	//If door unlocked without a key
	unlock: 'Perfect! I must have unlocked something...',

	//If user clicks background
	nothing:[
		'I can find nothing here.',
		'I can do nothing here, really.',
		'I can find nothing that could be useful.',
		'My efforts are futile.',
		'I can\'t even find a swallow on the sky.',
		'I can see nothing worthy my attention at this point.',
		'I\'m still looking for something useful... but what???'
	],

	//Select a fuse
	useFuse:[
		'I think I have to put the fuse into proper socket.',
		'If I plug it into incorrect place, it may get burnt!',
		'It\'s really atypical... Where to place it?',
		'I had better read the manual instead of trying all possible cases.'
	],

	//Select items
	useCD: 'I wish it wasn\'t corrupted. Which device can read this CD?',
	useSD: 'I had better be careful. I may hurt myself.',
	useCard: 'The card is in undesirable hands now.',
	useDisk: 'It\'s important to put the disk at right place.',

	//Connection manager
	man: 'A device with 3 LED diodes. Perhaps plugged off.',
	off: 'The device does NOT work. It seems that there is no power here.',
	LED: 'These LED show the state of connections.',
	manOn: 'It\'s working now!',

	//Card scanner
	card:  'I have found a card that reminds me a big memory card.',
	scan:  'This small window seems to be credit card scanner.',
	noscan:'I\'m putting the card according to instruction but there is no response.',
	optic: 'I\'m really going mad... It can\'t be optical device!',
	accept:'The scanner has accepted the card. A LED is giving light above.',
	thief: 'You will NOT prove with ordinary key you aren\'t a thief. Even with a card...',

	//C-Lock
	noBall: 'I have pressed a button but nothing is happening.',
	reset:  'Oops... There must be additional limitations.',

	//Computer
	comp: 'Does NOT work. I can\'t believe Office District is out of power.',
	tray: 'I cannot slide out the tray. First I must enable the PC.',
	code: 'RESCUE CODE',
	user: 'WHO ARE YOU?',
	pass: 'TYPE PASSWORD',
	hole: 'I cannot see cartridges. They must be hidden inside...',
	nok:  'I have pressed % but nothing is happening.',
	com:  'ENTER COMMAND',
	LCD:  'Big 21 INCH LCD screen - perfect for office.',
	FDD:  'Floppy disk drive.',
	CD:   'I have found a CD inside the drawer! It must contain valuable files.',
	BC:   'Oh no! Let\'s try again...',
	leaf: 'Shall I solve roots of the polynomial?',
	NUND: 'HUH!?',
	BDVD: '\n\nNOT A DVD',
	BCD:  '\n\nBOOTING CD',
	noany: 'I have pressed any key but nothing has happened.',
	access: '\nACCESS\n\nDENIED',
	attempt: '\nI DO NOT\n\nKNOW YOU',
	console: 'What, no icons, desktop, start screen? Help!!!',

	//Printer
	linux:   'Linux - free operaing system - here: Mandriva Linux',
	printed: 'The program has started printing... I wish I would find next code.',

	//Power
	OFF: 'The power is now disabled.',
	AC:  'The power supply is now providing alternating current.',
	DC:  'The power supply is now providing direct current but I\'m trapped.',

	//Fuses
	f1: 'A thin fuse. Perhaps it\'s only a toy.',
	f2: 'I have already seen similar fuse. They must really use them!',
	f3: 'It must be a fuse of direct current.',
	f4: 'I have found next fuse but I don\'t know where to place it.',
	fuse: 'I have inserted the fuse.',
	pins: 'This strange device contains 16 sockets.',
	shelf: 'Nothing interesting... Only power cables.',

	//Metal cover
	detach: 'I have detached the metal cover. Fun is dangerous here!',
	plate: [
		'A metal cover. It probably hides electric devices.',
		'I need a tool in order to detach it.',
		'They must have access to accurate as well as direct current.'
	],

	//Objects in 2nd room
	sd:    'I hope I won\'t have to unbolt the blue device...',
	win:   'Horizon view? It must be an illusion!',
	rot13: 'ROT13 cipher - easy to break.',
	nosit: 'There is no chair here. I can see some cables behind the desk.',

	//Clock
	clock: ['The clock does not work. Flat batteries are useless.','Time has stopped.'],

	//Calculator
	disp: 'Device screen - maybe it will show me a password...',
	button: 'I have pressed the key.',
	diskIn: 'I have inserted the disk.',
	diskOut: 'I have taken out the disk.',
	goodNum: 'I have entered correct number but has it unlocked something?',

	//Library
	books: 'Trigonometry, PHP 7, plant catalog, safari over the World...',
	
	//Laboratory
	roman: 'I know 7 main roman digits: I, V, X, L, C, D, M.',
	scale: 'Laboratory scales. They weigh here substances and small things.',
	key3:  'I have found only this small key inside the box.',
	cab1:  'Let\'s see what\'s inside the drawer.',
	lamp:  'No light. There is also no switch here.',

	//Disks to calculator
	disk1: 'I feel as if I was in sci-fi movie. Missing disk!',
	disk2: 'The voltage of mains in Europe is: U = 230 V',
	disk3: 'It\'s a sunny day. Thermometers show 303.15 K = 30Â°C.',
	slots: 'Don\'t you remind these units from physics?',

	//OGG player
	OGG: 'Experimental Ogg player. There are sockets and buttons on the edge.',
	noout: 'ERROR DETECTED\nSound output device not found.',
	nonet: 'CONNECTING...\nOpen Source Music Directory\n\nNetwork: TODA-WIFI',
	
	//Ogg menu
	m1: 'Play again',
	m2: 'Download music',
	m3: 'Media library',
	m4: 'Games',
	m5: '10 letters',
	m6: 'Directory is empty.',
	
	//Utwory
	s1: 'DJ Tux - Stay Free',
	s2: 'PC Band - Infected',
	s3: 'CPU - Heat me baby',
	s4: 'Power 2000 - Stack overflow',

	//Słowa
	word: ['RECORDABLE','SUCCESSFUL','COLLECTION','AMPLIFIERS','HEADPHONES','INSTRUMENT','SUBWOOFERS','EVERYTHING','UNIVERSITY','MICROPHONE','CONNECTION'],
	best: 'HIGH SCORE\nPoints: 3478\nPlayer: ',
	
	//Keyboard
	kbd3: 'Press ANY key to continue',
	kbd4: 'PRINTING...',
	kbd5: 'FINISHED',

	//White screen
	touch: 'I cannot localize the source of the light with the text.',
	ordered: 'I have solved this exercise. Doors are unlocked!',

	//Easter
	stopkey: 'I cannot take a rest now. I am at work...',
	playkey: 'A minute of silence.',
	morekey: 'I am screaming for help but no one is listening to me!',
	nextkey: 'I hope this song will help me finish the job.',

	//The End
	finish: 'Congratulations! You managed to get out!'
}