//Po wejściu do pokojów
var roomText = [
	'Jestem w budynku Biurowej Dzielnicy. Drzwi wyjściowe są zamknięte!',
	'Pracownia komputerowa.',
	'Awangardowa klawiatura. Niestety nie ma myszy.',
	'Witamy w sali konferencyjnej!',
	'Biblioteka. Jest trochę książek i przenośny komputer.',
	'Laboratorium. Należy zachować szczególną ostrożność.',
	'Kalkulator?',
	'Przenośny odtwarzacz multimediów w wolnym formacie Ogg.',
	'Jestem na wolności!'
];

//Pozostałe teksty
var lang = {

	//Globalne
	F5: 'Czy na pewno chcesz wyłączyć grę? Będziesz musiał przejść ją od nowa!',
	away: 'Odkładam przedmiot. Może przyda się później.',
	title: 'Przygoda w Biurowej Dzielnicy',
	cannot: 'Nic nie mogę zrobić za pomocą tego przedmiotu.',

	//Klucze
	key: 'Hura! Mam klucz!',
	fit: 'Ten przedmiot nie pasuje tutaj.',
	bad: 'Ten klucz lub przedmiot nie pasuje do tych drzwi!',
	unsafe: 'Nie trzymaj kluczy w miejscu ogólnodostępnym!',

	//Po zaznaczeniu dowolnego przedmiotu
	use: [
		'Gdzie wykorzystać ten przedmiot?',
		'Co teraz uczynić?',
		'Ten przedmiot naprawdę może mi pomóc...'
	],

	//Po zaznaczeniu klucza
	useKey: [
		'Co mogę otworzyć tym kluczem?',
		'To klucz do sukcesu.',
		'Mam nadzieję, że uda mi się otworzyć któreś drzwi...'
	],

	//Po otwarciu drzwi
	open: [
		'Udało się!',
		'Co za szczęście... Drzwi są teraz otwarte!',
		'Klucz pasuje! Ciekawe, co znajduje się za drzwiami...'
	],

	//Gdy drzwi są zamknięte
	closed: [
		'Silnie zamknięte.',
		'Nie mam przy sobie kluczy do tych drzwi.',
		'Pukam do drzwi, ale nikt nie otwiera...',
		'Zamknięte! Gdzie klucz?',
		'Przypuszczam, że nawet woźny nie ma klucza do tych drzwi.'
	],

	//Gdy drzwi zostaną odblokowane bez użycia klucza
	unlock: 'Świetnie! Teraz możemy odkryć kolejne pokoje...',

	//Gdy user kliknie tło
	nothing: [
		'Nic nie mogę tu znaleźć.',
		'Nic z tym nie mogę zrobić.',
		'Tutaj nie ma niczego, co mi się przyda.',
		'Nie ma nawet jaskółki na niebie.',
		'Nie widzę nic godnego zainteresowania w tym miejscu.',
		'Szukam... ale nic ciekawego nie mogę znaleźć.'
	],

	//Po zaznaczeniu bezpiecznika
	useFuse: [
		'Chyba muszę włożyć bezpiecznik do odpowiedniego gniazda.',
		'Jeżeli wepnę bezpiecznik w nieodpowiednie miejsce, mogę go spalić!',
		'Bezpiecznik jest naprawdę nietypowy... Gdzie go wpiąć?',
		'Lepiej poczytać dokumentację niż sprawdzać wszystkie kombinacje.'
	],

	//Po zaznaczeniu przedmiotów
	useCD: 'Do którego napędu ją włożyć?',
	useSD: 'Lepiej zachować ostrożność - to tez niebezpieczne narzędzie.',
	useCard: 'Karta jest teraz w niepowołanych rękach.',
	useDisk: 'Kluczowe, aby umieścić dysk w odpowiednim miejscu.',
	
	//Menedżer połączeń
	off: 'Urządzenie nie działa. Zdaje się, że nie ma prądu w budynku.',
	man: 'Urządzenie z 3 diodami. Prawdopodobnie odłączone od prądu.',
	LED: 'Diody LED sygnalizują stan połączeń w Biurowej Dzielnicy.',
	manOn: 'Urządzenie działa!',

	//Skaner kart
	card:   'Wygląda jak duża karta pamięci.',
	scan:   'Okienko przypomina skaner kart kredytowych.',
	noscan: 'Przykładam kartę zgodnie ze wskazówkami, ale nie ma reakcji.',
	accept: 'Czytnik zaakceptował kartę. Na urządzeniu powyżej miga dioda.',
	optic:  'Jestem hardkorem! To na bank nie jest napęd optyczny...',
	thief:  'Nie udowodnisz zwykłym kluczem, że nie jesteś złodziejem. Nawet kartą...',

	//C-Lock
	noBall: 'Naciskam przycisk, ale nic się nie dzieje.',
	reset:  'Ups... chyba są dodatkowe zabezpieczenia.',

	//Komputer
	comp: 'Nie działa. Nie wierzę, że Biurowa Dzielnica jest pozbawiona prądu.',
	tray: 'Nie mogę wysunąć tacy. Najpierw muszę włączyć komputer.',
	code: 'KOD RATUNKOWY',
	user: 'KIM JESTEŚ?',
	pass: 'PODAJ HASŁO',
	hole: 'Nie widzę pojemników z tuszem. Muszą być ukryte.',
	leaf: 'Klasówka z wyznaczania miejsc zerowych na konsultacjach w biurze?',
	nok:  'Naciskam klawisz %, ale nic się nie dzieje.',
	com:  'WPISZ POLECENIE',
	LCD:  'Duży 21-calowy monitor LCD - idealny do biura.',
	FDD:  'Stacja dyskietek.',
	CD:   'Ta płyta musi zawierać cenne dane.',
	BC:   'Zła komenda :(',
	NUND: 'NIE ROZUMIEM',
	BDVD: '\nTO NIE JEST\n\nPŁYTA DVD',
	BCD:  '\n\nSTART PŁYTY',
	noany: 'Naciskam dowolny klawisz, ale nic się nie dzieje...',
	access: '\nDOSTĘP\n\nZABRONIONY',
	attempt: '\n\nNIE ZNAM CIĘ',
	console: 'Co? Nie ma ikon, pulpitu, ekranu startowego? To system dla hakerów!',

	//Drukarka
	linux:   'Linux - wolny system operacyjny - tu: Mandriva Linux',
	printed: 'Program rozpoczął drukowanie. Może znajdę kolejny kod...',

	//Prąd
	OFF: 'Wyłączam prąd.',
	AC:  'Hurra! Prąd zmienny działa!',
	DC:  'Udało się! Niestety, zadziałały dodatkowe zabezpieczenia.',

	//Bezpieczniki
	f1: 'Cienki bezpiecznik. Szkoda, że zabawkowy.',
	f2: 'Tutaj naprawdę muszą używać takich bezpieczników!',
	f3: 'To chyba bezpiecznik do prądu stałego.',
	f4: 'Kolejny leżał na szalce wagi laboratoryjnej.',
	fuse: 'Wkładam bezpiecznik do gniazda.',
	pins: 'To skomplikowane urządzenie zawiera 16 gniazd.',
	shelf: 'Oprócz kabli nic więcej nie ma.',

	//Pokrywa
	detach: 'Nie rób tego w szkole. Zabawa w tym miejscu jest niebezpieczna.',
	plate: [
		'Metalowa płyta. Tutaj musi znajdować się urządzenie elektryczne.',
		'Potrzebuję jakiegoś narzędzia, aby ją zdjąć.',
		'Muszą mieć dostęp zarówno do prądu zmiennego i stałego.'
	],

	//Obiekty w 2 pokoju
	sd:    'Mam nadzieję, że nie będzie trzeba rozkręcać urządzenia...',
	win:   'Widok na horyzont? To tylko złudzenie.',
	rot13: 'Schemat przedstawia szyfr ROT13. Bardzo łatwy do złamania.',
	nosit: 'Nie ma na czym usiąść. Za biurkiem plączą się kable.',

	//Zegar
	clock: ['Czas zatrzymał się.','Nie potrzebuję wyczerpanych baterii.'],

	//Kalkulator
	disp: 'Wyświetlacz urządzenia - czy wyświetli jakieś hasło?',
	button: 'Naciskam klawisz.',
	diskIn: 'Wkładam dysk do gniazda.',
	diskOut: 'Wyciągam dysk.',
	goodNum: 'System zaakceptował kod. Czy to już koniec?',

	//Biblioteka
	books: 'Trygonometria, PHP7 od postaw, katalog roślin, podróż dookoła świata...',
	
	//Laboratorium
	roman: 'Znam 7 głównych cyfr rzymskich: I, V, X, L, C, D, M.',
	scale: 'Waga laboratoryjna. Tutaj ważą substancje i drobne przedmioty.',
	key3:  'W pudełku znajdował się tylko mały kluczyk.',
	cab1:  'Zobaczmy, co jest w szufladzie.',
	lamp:  'Nie świeci. Nie widzę kontaktu do włączania światła.',

	//Dyski do kalkulatora
	disk1: 'To niemożliwe! Tu dzieją się cuda - brakujący dysk!',
	disk2: 'Napięcie w sieci elektrycznej w Europie wynosi: U = 230 V',
	disk3: 'Jest słoneczna pogoda. Na termometrze 303.15 kelwinów, czyli 30°C.',
	slots: 'Nie przypominasz sobie tych jednostek z fizyki?',

	//Odtwarzacz Ogg
	OGG: 'Eksperymentalny odtwarzacz OGG. Na krawędzi bocznej gniazda i przyciski.',
	noout: 'WYSTĄPIŁ BŁĄD\nNie znaleziono urządzenia wyjścia dźwięku.',
	nonet: 'TRWA ŁĄCZENIE...\nOpen Source Music Directory\n\nSieć: TODA-WIFI',

	//Ogg menu
	m1: 'Odtwórz ponownie',
	m2: 'Pobierz muzykę',
	m3: 'Biblioteka',
	m4: 'Gry',
	m5: 'Układanka 1.0',
	m6: 'Katalog jest pusty.',
	
	//Utwory
	s1: 'TODA Oi! - Historia K-202',
	s2: 'DJ Tux - Linux',
	s3: 'NET - Kajdany mordoksięgi',
	s4: 'OpenX - Bother in ARMs',
	
	//Słowa
	word: ['IMPEDANCJA','ZWYCIĘSTWO','ODTWARZACZ','WZMACNIACZ','PRZESTERUJ','INSTRUMENT','BIBLIOTEKA'],
	best: 'NAJLEPSZY WYNIK\nWynik: 3478\nGracz: ',

	//Klawiatura
	kbd3: 'Naciśnij ANY, aby kontynuować',
	kbd4: 'DRUKOWANIE...',
	kbd5: 'ZAKOŃCZONO',

	//Biały ekran
	touch: 'Skądś pada tekst na ekran, ale nie mogę zlokalizować źródła światła.',
	ordered: 'Jest!!! Zadanie rozwiązane!',

	//Easter
	stopkey: 'Nie mogę teraz odpocząć. Chcę stąd wydostać się!',
	playkey: 'Przerwa na toaletę.',
	morekey: 'Wołam o pomoc, ale nikt mnie nie słucha!',
	nextkey: 'Ten utwór pomoże mi znaleźć wyjście.',

	//Koniec
	finish: 'Gratulacje! Zabezpieczenia zostały pokonane!'
};