
var rewardsArr = []; //此处修改奖品
var timer, flag = false;
var mannum = 0,
	reward = '',
	rewindex = 0;
var enable1 = false,
	enable2 = false;
var manArrLength, rewArrLength;
//var rewArrLength = rewardsArr.length - 1;
//var manArrLength = 100; //此处修改人数

var rewardsname = document.getElementById('rewardsname'),
	rewardsnum = document.getElementById('rewardsnum'),
	addrew = document.getElementById('addrew'),
	totalman = document.getElementById('totalman'),
	incman = document.getElementById('incman'),
	manualAddbtn = document.getElementById('manualadd');

//初始化事件以及ID链接
var choMan = document.getElementById('choman'),
	choRew = document.getElementById('chorew'),
    stopLoop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    title = document.getElementById('title'),
    p = document.getElementById('p'),
    rewardsInfo = document.getElementById('rewardsinfo'),
    winList = document.getElementById('winlist');

addrew.value = '添加奖品';
incman.value = '设定人数';
choMan.value = '挑选观众';
choRew.value = '抽取奖品';
stopLoop.value = '停！';
clear.value = 'Console.clear()';

addrew.onclick = function () {
	var inputName = rewardsname.value,
		inputNumb = +(rewardsnum.value);
	if (!isNaN(inputNumb) && inputNumb && inputName != 0) {
		addReward(inputName, inputNumb);
		enable1 = true;
		rewardsname.value = '';
		rewardsnum.value = '';
		rewardsname.focus();
		showInfo();
	}
	
};
incman.onclick = function () {
	var inputManNum = +(totalman.value);
	if (!isNaN(inputManNum) && inputManNum) {
		manArrLength = inputManNum;
		enable2 = true;
	}
};


choMan.onclick = function () {
	if (enable1 && enable2)
		startMan();
};
choRew.onclick = function () {
	if (enable1 && enable2)
		startRew();
};
stopLoop.onclick = function () {
	if (timer)
		stop(timer);
};
clear.onclick = function () {
	init();
};
rewardsInfo.onclick = function (e) {
	if (e.target && e.target.nodeName.toLowerCase() === 'td') {
		var childs = e.target.parentNode.childNodes,
			name, number;
		for (i in childs) {
			if (childs[i].mark == 'reward')
				name = childs[i].textContent;
			if (childs[i].mark == 'number')
				number = +(childs[i].textContent);
		}
		console.log(name);
		viaRewards(name);
	}
};
manualAddbtn.onclick = manual;

function viaRewards(name) {
	for (var i = 0; i < rewardsArr.length; i++) {
		if (name == rewardsArr[i].name) {
			rewindex = i + 1;
			reward = rewardsArr[i];
		}
	}
	init();
	var text = name;
	var info = document.createTextNode(text);
	p.appendChild(info);
	flag = true;
}

function choM(){
	var man = document.getElementById('man');
	mannum = randomMan(0, manArrLength);
	man.innerHTML = mannum + '号';
}
function choR(){
	flag = true;
	var rewards = document.getElementById('rewards');
	rewindex = randomNum(0, rewArrLength);
	reward = rewardsArr[rewindex - 1];
	rewards.innerHTML = reward.name;
}
function randomNum(min, max){
	var num = Math.round(Math.random() * (max - min) + 1);
	return num;
}
function randomMan(min, max) {
	var num = parseInt(Math.random() * (max - min) + 1);
	return num;
}
function startMan(){
	clearInterval(timer);
	timer = setInterval(choM, 50);
}
function startRew(){
	clearInterval(timer);
	if (rewArrLength >= 0)
		timer = setInterval(choR, 50)
}
function stop(timer){
	clearInterval(timer);
	if (flag) {
		p.innerHTML = '';
		var text = '恭喜你' 
				 + (mannum == 0 ? ('赢得了 ') : (mannum + '号，你赢得了 '))
				 + reward.name;
		var info = document.createTextNode(text);
		p.appendChild(info);
		reduceReward(1, rewindex - 1);
		showInfo();
		var alist = document.createElement('a'),
			winText = '获奖者:' 
					+ (mannum == 0 ? ('奖品 ') : (mannum + '号，奖品 ')) 
					+ reward.name,
			textnode = document.createTextNode(winText);
		alist.setAttribute('href', '#');
		alist.setAttribute('class', 'list-group-item');
		alist.appendChild(textnode);
		winList.appendChild(alist);
	}
	flag = false;
}
function addReward(rewName, number) {
	var rewInfo = {
		name: rewName,
		number: number
	};
	rewardsArr.push(rewInfo);
	rewArrLength = rewardsArr.length - 1;
}
function delReward(index) {
	rewardsArr.splice(index, 1);
	rewArrLength--;
}
function reduceReward(number, index) {
	var target = rewardsArr[index];
	target.number -= number;
	if (target.number <= 0)
		delReward(index);
}
function showInfo() {
	rewardsInfo.innerHTML = '';
	var thead = document.createElement('thead'),
		tr = document.createElement('tr'),
		th1 = document.createElement('th'),
		th2 = document.createElement('th'),
		headtext1 = document.createTextNode('奖品'),
		headtext2 = document.createTextNode('数量'),
		img = document.createElement('span');
	th1.appendChild(headtext1);
	th2.appendChild(headtext2);
	tr.appendChild(th1);
	tr.appendChild(th2);
	thead.appendChild(tr);
	rewardsInfo.appendChild(thead);

	var tbody = document.createElement('tbody');
	for (i in rewardsArr) {
		var tr = document.createElement('tr'),
			td1 = document.createElement('td'),
			td2 = document.createElement('td'),
			text1 = rewardsArr[i].name,
			text2 = rewardsArr[i].number,
			iteminfo1 = document.createTextNode(text1),
			iteminfo2 = document.createTextNode(text2);
		td1.mark = 'reward';
		td2.mark = 'number';
		td1.appendChild(iteminfo1);
		td2.appendChild(iteminfo2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tbody.appendChild(tr);
	}
	rewardsInfo.appendChild(tbody);
}
function init() {
	var man = document.getElementById('man');
		man.innerHTML = '';
	var rewards = document.getElementById('rewards');
		rewards.innerHTML = '';
	p.innerHTML = '';
}
function manual() {
	var manualAdd = document.getElementById('manual');
	var memberNum = +(manualAdd.value);
	if (memberNum <= manArrLength && enable2) {
		mannum = memberNum;
		flag = true;
	}
}