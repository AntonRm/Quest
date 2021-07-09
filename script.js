let imgFront = document.querySelector('.img-front').getAttribute('src');
let imgBack = document.querySelector('.img-back').getAttribute('src');
let imgWrap = document.querySelector('.img-wrap');
let imgWrapAttr = document.querySelector('.img-wrap').getAttribute('style');
let message = document.querySelector('.game__message');
let monsterMessage = document.querySelector('.game__monster-message');
let rigth = document.querySelector('.game__rigth-btn');
let left = document.querySelector('.game__left-btn');
let title = document.querySelector('.game__title');
let travelBagAtk = document.querySelector('.game__bag-weapon');
let travelBagDef = document.querySelector('.game__bag-armor');
let showHp = document.querySelector('.game__hero-hp');
let showAtk = document.querySelector('.game__hero-atk');
let showDef = document.querySelector('.game__hero-def');
let showGold = document.querySelector('.game__hero-gold');
let buttonNo = document.querySelector('.game__no-btn');
let buttonYes = document.querySelector('.game__yes-btn');
let choosItem = document.querySelector('.game__items');



let step = -1;
let num = 0;
let flip = 0;
let flipCount = 0;
let chosenThing;

let hero = {
	'hp': 3,
	'atk': 0,
	'def': 0,
	'gold': 0,
}


let hitPoint = {
	'рыба': 1,
	'сыр': 2,
	'одуванчик': 0,
	'огурец': 1,
	'мясо': 2,
	'хлеб': 1,
	'пиво': 1,
	'ящерица': 2,
	'яблоко': 1,
	'зелье': 3,
}
let attack = {
	'нож': 1,
	'копье': 2,
	'дубинка': 1,
	'бревно': 2,
	'меч': 3,
	'топоро': 4,
}
let defend = {
	'балахон': 1,
	'кольчуга': 2,
	'кожанка': 3,
	'латы': 4,
	'трусы': 0,
}
let goldCoin = {
	'монета': 1,
	'кольцо': 2,
	'ожерелье': 3,
}




let mainArr = [
	node0 = [
		forest = {
			'img': '00',
			'title': 'лес',
			'text': 'прохлада..',
		},
		road = {
			'img': '01',
			'title': 'дорога',
			'text': 'вроде никого.',
		},
		goblin = {
			'img': '02',
			'title': 'гоблин',
			'text': 'на вас напал гоблин, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'ахихи-ахаха',
			'atk': 1,
			'def': 1,
		},
	],
	node1 = [
		bridge = {
			'img': '03',
			'title': 'мост',
			'text': 'залезть под мост?',
			'action': 'событие',
			'choice': [
				'рыба',
				'нож',
				'монета',
			],
			'adventure': [
				'вы грохнулись в воду, и вас покусала рыба.',
				'вы нырнули с моста, но когда вы выбрались на берег, то увидели на песке золотую монетку.. а нет, это просто стеклышко',
				'когда вы приготовились нырять, мимо проехала карета, зацепила фонарем вас за штаны и стащила с моста',
			],
		},
		merchant = {
			'img': '06',
			'title': 'купец',
			'text': 'о, торговец! хотите поторговать?',
			'action': 'торговля',
			'trade': [
				'сыр',
				'балахон',
			],
			'adventure': [
				'вы сегодня не очень хорошо выглядите, торговец прошел мимо',
				'увидев вас, торговец подбежал к вам и попытался отобрать у вас что-нибудь, вы едва отбились от него',
				'когда вы с радостными криками поспешили к торговцу, тот взял и сиганул с обрыва',
			],
		},
		wolfs = {
			'img': '10',
			'title': 'волки',
			'text': 'на вас напали волки, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'рррррр',
			'atk': 2,
			'def': 2,
		},
	],
	node2 = [
		meadow = {
			'img': '07',
			'title': 'луг',
			'text': 'хотите пройтись по лугу, собрать травы?',
			'action': 'событие',
			'choice': [
				'одуванчик',
				'огурец',
			],
			'adventure': [
				'пока вы собирали травы, вас боднула корова, вы все рассыпали',
				'какой тихий и красивый луг',
				'пахнут травы, летают бабочки, эх..'
			],
		},
		army = {
			'img': '08',
			'title': 'армия',
			'text': 'осмотреть дорогу после того как осядет пыль?',
			'action': 'событие',
			'choice': [
				'копье',
				'дубинка',
			],
			'adventure': [
				'вас едва не завербовали на службу, повезло, что вояки торопились',
				'ряды бойцов прошли мимо, не обращая на вас внимания',
				'с дороги, бродяга!!',
			],
		},
		deserters = {
			'img': '11',
			'title': 'дезертиры',
			'text': 'на вас напали дезертиры, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'опа, ребята, а кто это тут а нас..',
			'atk': 2,
			'def': 2,
		},
	],
	node3 = [
		abandoned = {
			'img': '13',
			'title': 'заброшеный замок',
			'text': 'осмотреть руины?',
			'action': 'событие',
			'choice': [
				'мясо',
				'кольчуга',
				'кольцо',
			],
			'adventure': [
				'лишь ветер среди руин, никого',
				'может ну эти руины, и темнеет уже..',
				'эх, вот так домик, как вернусь, себе заберу',
			],
		},
		stump = {
			'img': '14',
			'title': 'пень',
			'text': 'шо ты смотришь, я пень как пень, ой..',
		},
		branch = {
			'img': '15',
			'title': 'ветка',
			'text': 'осмотреть заросли?',
			'action': 'событие',
			'choice': [
				'бревно',
				'монета',
			],
			'adventure': [
				'ну и мусорник..',
				'и кто тут все поламал..',
				'нечего тут смотреть, просто ветки.',
			],
		},
	],
	node4 = [
		castle = {
			'img': '04',
			'title': 'замок',
			'text': 'эй, открывайте.. не слышат что-ли..',
		},
		tavern = {
			'img': '05',
			'title': 'таверна',
			'text': 'пора подкрепиться!',
			'action': 'торговля',
			'trade': [
				'хлеб',
				'пиво',
				'рыба',
			],
			'adventure': [
				'чёт-то дорого всё..',
				'ща спою..',
				'внутри таверны началась заворушка, вы решили не входить',
			],
		},
		thief = {
			'img': '12',
			'title': 'вор',
			'text': 'на вас напал вор, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'тише, тише, не дергаться..',
			'atk': 3,
			'def': 3,
		},
	],
	node5 = [
		swamp = {
			'img': '16',
			'title': 'болото',
			'text': 'ну и вонь тут.',
		},
		lake = {
			'img': '17',
			'title': 'озеро',
			'text': 'о, можно и помыться, а то даже мухи бояться.',
		},
		edge = {
			'img': '18',
			'title': 'опушка',
			'text': 'лес закончился, опять по жаре идти..',
		},
	],
	node6 = [
		dryad = {
			'img': '19',
			'title': 'дриада',
			'text': 'шо ты смотришь, я не из этих.',
		},
		ghost = {
			'img': '20',
			'title': 'призрак',
			'text': 'на вас напал призрак, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'эй, милок, постой, ща скажу тебе что-то..',
			'atk': 2,
			'def': 2,
		},
		ravine = {
			'img': '21',
			'title': 'овраг',
			'text': 'эх, разбежавшись грохнусь со скалы..',
		},
	],
	node7 = [
		bandit = {
			'img': '22',
			'title': 'бандит',
			'text': 'на вас напал бандит, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'вот ты и попался..',
			'atk': 3,
			'def': 3,
		},
		potionsman = {
			'img': '23',
			'title': 'зельевар',
			'text': 'о, мужик с бутылками! хотите посмотреть что у него есть?',
			'action': 'торговля',
			'trade': [
				'яблоко',
				'трусы',
				'зелье',
			],
			'adventure': [
				'эй, алхреник!!,- позвали вы, на что алхимик похоже обиделся и ушел.',
				'увидев вас, торговец выпел зелье и исчез',
				'старик дал вам несколько зелий, на всех бутылках было написано -от поноса-',
			],
		},
		cave = {
			'img': '24',
			'title': 'пещера',
			'text': 'возможно вам стоит осмотреть пещеру?',
			'action': 'событие',
			'choice': [
				'меч',
				'ящерица',
				'кожанка',
			],
			'adventure': [
				'та ну не, там темно.',
				'эхо такое.. эгей-ей-ей-ей.. и похоже пусто',
				'сыро..грязно..брр, я вылезаю обратно.',
			],
		},
	],
	node8 = [
		dugout = {
			'img': '25',
			'title': 'землянка',
			'text': 'хотите проверить сундуки?',
			'action': 'событие',
			'choice': [
				'топоро',
				'ожерелье',
				'латы',
			],
			'adventure': [
				'вы решили пройти мимо.',
				'квадратненько..',
				'на пороге вы стукнулись о косяк и потеряли сознание, а когда очнулись, землянка исчезла',
			],
		},
		trail = {
			'img': '26',
			'title': 'тропа',
			'text': 'вижу тропу, иду.',
		},
		copse = {
			'img': '27',
			'title': 'роща',
			'text': 'ачхи.. ох уж эта аллергия..',
		},
	],

	orc = [
		orc = {
			'img': '09',
			'title': 'орк',
			'text': 'на вас напал орк, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'билетики, господа.. гы-гы..',
			'atk': 5,
			'def': 5,
		},
		orc = {
			'img': '09',
			'title': 'орк',
			'text': 'на вас напал орк, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'билетики, господа.. гы-гы..',
			'atk': 5,
			'def': 5,
		},
		orc = {
			'img': '09',
			'title': 'орк',
			'text': 'на вас напал орк, будете атаковать?',
			'action': 'бой',
			'actionMessage': 'билетики, господа.. гы-гы..',
			'atk': 5,
			'def': 5,
		},
	],
]


showHp.textContent = `${hero.hp}`;
showAtk.textContent = `${hero.atk}`;
showDef.textContent = `${hero.def}`;
showGold.textContent = `${hero.gold}`;

title.textContent = 'ворота';
message.textContent = 'начало';
left.disabled = true;

rigth.addEventListener('click', go);
left.addEventListener('click', back);

// GO ============================================================================
function go() {
	left.disabled = false;
	step++;

	buttonYes.removeEventListener('click', battle);
	buttonYes.removeEventListener('click', adventure);
	buttonYes.removeEventListener('click', tradeIn);

	buttonNo.removeEventListener('click', battleNo);
	buttonNo.removeEventListener('click', adventureNo);
	buttonNo.removeEventListener('click', tradeInNo);


	showHp.classList.remove('game__hero-marker');
	showAtk.classList.remove('game__hero-marker');
	showDef.classList.remove('game__hero-marker');
	showGold.classList.remove('game__hero-marker');

	showHp.classList.remove('game__hero-marker-red');
	showGold.classList.remove('game__hero-marker-red');


	travelBagAtk.classList.remove('game__bag-marker');
	travelBagDef.classList.remove('game__bag-marker');

	if (document.querySelector('.game__items-wrap')) {
		choosItem.removeChild(document.querySelector('.game__items-wrap'));
	};

	//===================================================
	flip = flip - 180;
	imgWrapAttr = `transform: rotateY(${flip}deg)`;
	document.querySelector('.img-wrap').setAttribute('style', imgWrapAttr);

	if (step === 10) {
		imgBack = imgBack.replace(imgBack[4] + imgBack[5], 'vv');
		document.querySelector('.img-back').setAttribute('src', imgBack);
		title.textContent = 'победа';
		message.textContent = 'VICTORY!!!';
		left.disabled = true;
		rigth.disabled = true;
		return;
	}

	num = rundom(3);
	title.textContent = mainArr[step][num].title;
	message.textContent = mainArr[step][num].text;
	monsterMessage.textContent = mainArr[step][num].actionMessage;
	turn();
	//===================================================

	console.log(mainArr[step][num].action)
	if (mainArr[step][num].action === 'бой') {
		rigth.disabled = true;
		left.disabled = true;
		buttonYes.addEventListener('click', battle);
		buttonNo.addEventListener('click', battleNo);
		return;
	};

	if (mainArr[step][num].action === 'событие') {
		rigth.disabled = true;
		left.disabled = true;
		buttonYes.addEventListener('click', adventure);
		buttonNo.addEventListener('click', adventureNo);
		return;
	}

	if (mainArr[step][num].action === 'торговля') {
		rigth.disabled = true;
		left.disabled = true;
		buttonYes.addEventListener('click', tradeIn);
		buttonNo.addEventListener('click', tradeInNo);
		return;
	}

};

// BACK ============================================================================
function back() {
	rigth.disabled = false;
	step--;

	buttonYes.removeEventListener('click', battle);
	buttonYes.removeEventListener('click', adventure);
	buttonYes.removeEventListener('click', tradeIn);

	buttonNo.removeEventListener('click', battleNo);
	buttonNo.removeEventListener('click', adventureNo);
	buttonNo.removeEventListener('click', tradeInNo);


	showHp.classList.remove('game__hero-marker');
	showAtk.classList.remove('game__hero-marker');
	showDef.classList.remove('game__hero-marker');
	showGold.classList.remove('game__hero-marker');

	showHp.classList.remove('game__hero-marker-red');
	showGold.classList.remove('game__hero-marker-red');


	travelBagAtk.classList.remove('game__bag-marker');
	travelBagDef.classList.remove('game__bag-marker');

	if (document.querySelector('.game__items-wrap')) {
		choosItem.removeChild(document.querySelector('.game__items-wrap'));
	};

	//======================================================
	if (step === -1) {
		flipCount = 0;
		imgFront = imgFront.replace(imgFront[4] + imgFront[5], 'ss');
		document.querySelector('.img-front').setAttribute('src', imgFront);
		flip = 0;
		imgWrapAttr = `transform: rotateY(${flip}deg)`;
		document.querySelector('.img-wrap').setAttribute('style', imgWrapAttr);
		title.textContent = 'ворота';
		message.textContent = 'начало';
		left.disabled = true;
		return;
	}

	flip = flip + 180;
	imgWrapAttr = `transform: rotateY(${flip}deg)`;
	document.querySelector('.img-wrap').setAttribute('style', imgWrapAttr);

	num = rundom(3);
	title.textContent = mainArr[step][num].title;
	message.textContent = mainArr[step][num].text;
	monsterMessage.textContent = mainArr[step][num].actionMessage;
	turn();
	//=========================================================

	console.log(mainArr[step][num].action)
	if (mainArr[step][num].action === 'бой') {
		rigth.disabled = true;
		left.disabled = true;
		buttonYes.addEventListener('click', battle);
		buttonNo.addEventListener('click', battleNo);
		return;
	};

	if (mainArr[step][num].action === 'событие') {
		rigth.disabled = true;
		left.disabled = true;
		buttonYes.addEventListener('click', adventure);
		buttonNo.addEventListener('click', adventureNo);
		return;
	}

	if (mainArr[step][num].action === 'торговля') {
		rigth.disabled = true;
		left.disabled = true;
		buttonYes.addEventListener('click', tradeIn);
		buttonNo.addEventListener('click', tradeInNo);
		return;
	}

};

// BATTLE ==============================================================================
function battle() {
	buttonYes.removeEventListener('click', battle);
	message.textContent = '';
	monsterMessage.textContent = '';
	let heroCub = rundom(6, 1);
	let monsterCub = rundom(6, 1);
	console.log(heroCub + 'г');
	console.log(monsterCub + 'м');
	if ((heroCub + hero.atk - mainArr[step][num].def) > (monsterCub + mainArr[step][num].atk - hero.def)) {
		setTimeout(() => {
			message.textContent = 'победа';
			rigth.disabled = false;
			left.disabled = false;
		}, 700);
	} else {
		setTimeout(() => {
			hero.hp = hero.hp - 1;
			showHp.textContent = `${hero.hp}`;
			showHp.classList.add('game__hero-marker-red');
			if (hero.hp === 0) {
				message.textContent = 'геймовер, сталкер.';
				showHp.textContent = `${hero.hp}`;
				showHp.classList.add('game__hero-marker-red');
				rigth.disabled = true;
				left.disabled = true;
				buttonNo.removeEventListener('click', battleNo);
				return;
			}
			message.textContent = 'поражение';
			rigth.disabled = true;
			left.disabled = false;
		}, 700);
	};

};
//ADVENTURE ================================================================================
function adventure() {
	buttonYes.removeEventListener('click', adventure);
	message.textContent = '';
	let adventureChoice = rundom(2);
	if (adventureChoice) {
		setTimeout(() => {
			let messageSum = '';
			let itemWrap = document.createElement('div');
			itemWrap.classList.add('game__items-wrap');
			choosItem.append(itemWrap);
			for (let i = 0; i < mainArr[step][num].choice.length; i++) {
				messageSum = messageSum + mainArr[step][num].choice[i] + ', ';

				let item = document.createElement('div');
				item.classList.add('game__item');
				itemWrap.append(item);
				item.textContent = mainArr[step][num].choice[i];
				item.addEventListener('click', () => {
					chosenThing = mainArr[step][num].choice[i];
					putInBag();
				});
			}
			if (!messageSum) {
				message.textContent = 'иди, иди, нечего тебе тут делать.';
				rigth.disabled = false;
				left.disabled = false;
			}
			message.textContent = `вы раздобыли одну из вещей: ${messageSum}что вы возьмёте с собой?`;
			rigth.disabled = true;
			left.disabled = true;
			return;
		}, 500);
	} else {
		let adventureCub = rundom(3);
		setTimeout(() => {
			message.textContent = mainArr[step][num].adventure[adventureCub];
		}, 500);
		rigth.disabled = false;
		left.disabled = false;
		return;
	}

}
//TRADEIN ===================================================================================
function tradeIn() {
	buttonYes.removeEventListener('click', tradeIn);
	message.textContent = '';
	let adventureChoice = rundom(2);
	if (adventureChoice) {
		setTimeout(() => {
			let messageSum = '';
			let itemWrap = document.createElement('div');
			itemWrap.classList.add('game__items-wrap');
			choosItem.append(itemWrap);
			for (let i = 0; i < mainArr[step][num].trade.length; i++) {
				messageSum = messageSum + mainArr[step][num].trade[i] + ', ';

				let item = document.createElement('div');
				item.classList.add('game__item');
				itemWrap.append(item);
				item.textContent = mainArr[step][num].trade[i];
				item.addEventListener('click', () => {
					chosenThing = mainArr[step][num].trade[i];
					buying();
				});
			}
			message.textContent = `торговец предлагает вам одну из вещей: ${messageSum}все по 2 монеты, что вы хотите купить?`;
			rigth.disabled = true;
			left.disabled = true;
			return;
		}, 500);
	} else {
		let adventureCub = rundom(3);
		setTimeout(() => {
			message.textContent = mainArr[step][num].adventure[adventureCub];
		}, 500);
		rigth.disabled = false;
		left.disabled = false;
		return;
	}

}
//putInBag ====================================================================================
function putInBag() {
	choosItem.removeChild(document.querySelector('.game__items-wrap'));
	rigth.disabled = false;
	left.disabled = false;
	for (let i = 0; i < mainArr[step][num].choice.length; i++) {
		if (chosenThing === mainArr[step][num].choice[i]) {
			if (search(hitPoint, mainArr[step][num].choice[i])) {
				hero.hp = hero.hp + search(hitPoint, mainArr[step][num].choice[i]);
				showHp.textContent = `${hero.hp}`;
				showHp.classList.add('game__hero-marker');
			}
			if (search(attack, mainArr[step][num].choice[i])) {
				hero.atk = search(attack, mainArr[step][num].choice[i]);
				travelBagAtk.textContent = mainArr[step][num].choice[i];
				travelBagAtk.classList.add('game__bag-marker');
				showAtk.textContent = `${hero.atk}`;
				showAtk.classList.add('game__hero-marker');
			}
			if (search(defend, mainArr[step][num].choice[i])) {
				hero.def = search(defend, mainArr[step][num].choice[i]);
				travelBagDef.textContent = mainArr[step][num].choice[i];
				travelBagDef.classList.add('game__bag-marker');
				showDef.textContent = `${hero.def}`;
				showDef.classList.add('game__hero-marker');
			}
			if (search(goldCoin, mainArr[step][num].choice[i])) {
				hero.gold = hero.gold + search(goldCoin, mainArr[step][num].choice[i]);
				showGold.textContent = `${hero.gold}`;
				showGold.classList.add('game__hero-marker');
			}
			message.textContent = `вы взяли ${mainArr[step][num].choice[i]}`;
			return;
		}
	}
}
//buying =================================================================================
function buying() {
	choosItem.removeChild(document.querySelector('.game__items-wrap'));
	rigth.disabled = false;
	left.disabled = false;
	if (hero.gold < 2) {
		message.textContent = 'а ну пошёл отсюда!!';
		return;
	}
	for (let i = 0; i < mainArr[step][num].trade.length; i++) {
		if (chosenThing === mainArr[step][num].trade[i]) {
			if (search(hitPoint, mainArr[step][num].trade[i])) {
				hero.hp = hero.hp + search(hitPoint, mainArr[step][num].trade[i]);
				showHp.textContent = `${hero.hp}`;
				hero.gold = hero.gold - 2;
				showGold.textContent = `${hero.gold}`;
				showGold.classList.add('game__hero-marker-red');
				showHp.classList.add('game__hero-marker');
			}
			if (search(attack, mainArr[step][num].trade[i])) {
				hero.atk = search(attack, mainArr[step][num].trade[i]);
				travelBagAtk.textContent = mainArr[step][num].trade[i];
				travelBagAtk.classList.add('game__bag-marker');
				showAtk.textContent = `${hero.atk}`;
				hero.gold = hero.gold - 2;
				showGold.textContent = `${hero.gold}`;
				showGold.classList.add('game__hero-marker-red');
				showAtk.classList.add('game__hero-marker');
			}
			if (search(defend, mainArr[step][num].trade[i])) {
				hero.def = search(defend, mainArr[step][num].trade[i]);
				travelBagDef.textContent = mainArr[step][num].trade[i];
				travelBagDef.classList.add('game__bag-marker');
				showDef.textContent = `${hero.def}`;
				hero.gold = hero.gold - 2;
				showGold.textContent = `${hero.gold}`;
				showGold.classList.add('game__hero-marker-red');
				showDef.classList.add('game__hero-marker');
			}
			message.textContent = `вы взяли ${mainArr[step][num].trade[i]}`;
			return;
		}
	}
}
//search =================================================================================
function search(obj, item) {
	for (key in obj) {
		if (key === item) {
			return obj[key];
		}
	}
}
//turn ===================================================================================
function turn() {
	if (flipCount === 0) {
		imgBack = imgBack.replace(imgBack[4] + imgBack[5], mainArr[step][num].img);
		document.querySelector('.img-back').setAttribute('src', imgBack);
		flipCount = 1;
	} else {
		imgFront = imgFront.replace(imgFront[4] + imgFront[5], mainArr[step][num].img);
		document.querySelector('.img-front').setAttribute('src', imgFront);
		flipCount = 0;
	}
}
//rundom ===================================================================================
function rundom(n, m = 0) {
	let result = Math.floor(Math.random() * n + m);
	return result;
}
//battleNo =================================================================================
function battleNo() {
	monsterMessage.textContent = '';
	rigth.disabled = true;
	left.disabled = false;
}
//adventureNo ==============================================================================
function adventureNo() {
	monsterMessage.textContent = '';
	rigth.disabled = false;
	left.disabled = false;
}
//tradeInNo =================================================================================
function tradeInNo() {
	monsterMessage.textContent = '';
	rigth.disabled = false;
	left.disabled = false;
}


