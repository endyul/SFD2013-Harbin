
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
	mannum = document.getElementById('mannum'),
	incman = document.getElementById('incman');

//初始化事件以及ID链接
var choMan = document.getElementById('choman'),
	choRew = document.getElementById('chorew'),
    stopLoop = document.getElementById('stop'),
    title = document.getElementById('title'),
    p = document.getElementById('p'),
    rewardsInfo = document.getElementById('rewardsinfo');

addrew.value = '添加奖品';
incman.value = '设定人数';
choMan.value = '挑选观众';
choRew.value = '抽取奖品';
stopLoop.value = '停！';

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
	var inputManNum = +(mannum.value);
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
		p.innerHTML = '恭喜你' 
					+ mannum 
					+ '号，你获得了 ' 
					+ reward.name;
		reduceReward(1, rewindex - 1);
		showInfo();
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
	var info = '剩余奖品：<br>';
	for (i in rewardsArr) {
		info += rewardsArr[i].name + ' 还剩 ' + rewardsArr[i].number + '<br>';
	}
	rewardsinfo.innerHTML = info;
}