function _(id) {return document.getElementById(id)}
dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}
Array.prototype.addValues = function () {
	return this.reduce((partialSum, a) => partialSum + a, 0);
}
function frac(n) { return +((n - Math.floor(n)).toFixed(n.countDecimals())) }

let dataFields = [];
let outputFields = [];

const inputs = [
	["First Name", "text", true],
	["Last Name", "text", true],
	["Birth Month", "number", true],
	["Birth Day", "number", true],
	["Birth Year", "number", true],
	["Name Of First Pet", "text", true],
	["City You Were Born In", "text", true]
];

const passCodes = [
	{
		"name": "Bank",
		"username": "banky-time",
		"length": 20,
		"hashCODE": 234.687394871934571094386745876148957129565400565456098450968
	},
	{
		"name": "Gmail",
		"username": "gm_all@gmail.com",
		"length": 20,
		"hashCODE": 343.458173451347519435831451938457313983934851934356840596804
	},
	{
		"name": "GitHub",
		"username": "git_it_got_it",
		"length": 20,
		"hashCODE": 456.245867294567498298789346570349867134651348672346897234085
	}
];

const charlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]=<>/,.';
const charleng = charlist.length;
const letterlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const letterleng = letterlist.length;

function populateInfoInputs() {
	var output = "";
	for (var i = 0; i < inputs.length; i++) {
		output += '<label for="dataInput' + i + '">' + inputs[i][0] + ': </label><br><input class="dataField" type="' + inputs[i][1] + '" name="dataInput' + i + '" id="dataInput' + i + '" oninput="updatePasswords()">';
		output += '\n<br>\n';
	}
	_('infoInput').innerHTML = output;

	dataFields = Array(inputs.length);
	for (var i = 0; i < inputs.length; i++) {
		dataFields[i] = _('dataInput' + i);
	}
	document.querySelectorAll('input')[0].focus();
	//console.log(dataFields);
}
function populatePasswordOutputs() {
	var output = "";
	for (var i = 0; i < passCodes.length; i++) {
		output += '<a class="passTitle">' + passCodes[i]["name"] + ':</a><br><div class="login"><label for="usern' + i + '">Username: </label><input class="outputField" type="text" value="' + passCodes[i]["username"] + '" name="usern' + i + '" id="usern' + i + '" readonly><br>'
		output += '<label for="passw' + i + '">Password: </label><input class="outputField" type="text" name="passw' + i + '" id="passw' + i + '" readonly></div>'
		//output += '<label for="passOutput' + i + '">' + passCodes[i]["name"] + ' Password: </label><input class="outputField" readonly type="text" name="passOutput' + i + '" id="passOutput' + i + '">';
		//output += '\n<br>\n';
	}
	_('passOutput').innerHTML = output;

	outputFields = Array(passCodes.length);
	for (var i = 0; i < passCodes.length; i++) {
		outputFields[i] = _('passw' + i);
	}
	//console.log(outputFields);
}

function stringToNum(str) {
	var output = 0;
	for (var i = 0; i < str.length; i++) {
		output += str.charCodeAt(i);
	}
	// into something with decimal
	return output;
}
function strArrayToNumArray(arr) {
	var output = Array(arr.length);
	for (var i = 0; i < arr.length; i++) {
		output[i] = stringToNum(arr[i]);
	}
	return output;
}

function pseudoRandom(val, hash) { // outputs between 0 and 1
	var noise = frac(Math.sin(dot([val, hash], [25.9796, 156.466])) * 43758.5453);
	return Math.abs(noise);
}
function getInfoInputValues() {
	var vals = Array(inputs.length);
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i][2]) {
			vals[i] = dataFields[i].value.toLowerCase();
		} else {
			vals[i] = dataFields[i].value;
		}
	}
	return vals;
}
function getPassword(index, inputVal) {
	var decodedPassword = "";
	for (var j = 0; j < passCodes[index]["length"]; j++) {
		if (j==0) {
			var thisVal = pseudoRandom(inputVal+j, passCodes[index]["hashCODE"]);
			decodedPassword += letterlist[Math.floor(thisVal * letterleng)];
		} else {
			var thisVal = pseudoRandom(inputVal+j, passCodes[index]["hashCODE"]);
			decodedPassword += charlist[Math.floor(thisVal * charleng)];
		}
	}
	return decodedPassword;
}
function updatePasswords() {
	let values = getInfoInputValues();
	let ints = strArrayToNumArray(values);
	let combinedInts = ints.addValues();

	for (var i = 0; i < passCodes.length; i++) {
		var decodedPassword = getPassword(i, combinedInts);
		console.log(decodedPassword);
		outputFields[i].value = decodedPassword;
	}
}




/*
function pseudoRandom(seed) {
	//var seed = 0;
	//var a = 1664525;
	//var c = 1013904223;

	var modulus = 2 ** 32;
	var returnVal = seed / modulus;
	seed = (a * seed + c) % modulus;
	return returnVal;
	seed += 214748364;
	var out = seed % 2147483647;
	if (out <= 0) out += 2147483646;
	return out;
}
function getHighestRand(iterations) {
	var highest = 0;
	var lowest = 999999999999999999999999999999999999999;
	for (var i = 0; i < iterations; i++) {
		var val = pseudoRandom(i);
		if (val > highest) highest = val;
		if (val < lowest) lowest = val;
	}
	return [lowest, highest];
}
*/