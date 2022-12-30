export function usePasswordRandomizer(length, isUppercase, isLowercase, isNumbers, isSpecial) {
	// prettier-ignore
	var specialChars = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "`", "[", "]", "{", "}", "\\", ":", ";", "<", ">", ",", ".", "/", "?"];
	// prettier-ignore
	var numberChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	// prettier-ignore
	var lowercaseChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
	// prettier-ignore
	var uppercaseChars = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

	let tempCharArray = [];
	let randomPassword = [];

	if (isUppercase) {
		tempCharArray = tempCharArray.concat(uppercaseChars);
	}

	if (isLowercase) {
		tempCharArray = tempCharArray.concat(lowercaseChars);
	}

	if (isNumbers) {
		tempCharArray = tempCharArray.concat(numberChars);
	}

	if (isSpecial) {
		tempCharArray = tempCharArray.concat(specialChars);
	}

	for (let i = 0; i < length; i++) {
		let randCharacter = tempCharArray[Math.floor(Math.random() * tempCharArray.length)];
		randomPassword.push(randCharacter);
	}

	let pass = randomPassword.join('');

	return pass;
}
