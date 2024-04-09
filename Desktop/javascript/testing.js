function capitalize(string){
  const firstLetterCapitalized = string[0].toUpperCase();
  string = firstLetterCapitalized + string.slice(1);
  return string;
}

function reverseString(string){
  return string.split('').reverse().join('');
}

const calculator = {
  multiply: function(a, b){
    return a * b;
  },
  add: function(a, b){
    return a + b;
  },
  divide: function(a, b){
    return a / b;
  },
  subtract: function(a, b){
    return a - b;
  }
};

function caesarCipher(string, shiftFactor){
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  function shift(char, shiftFactor){
    const charCase = (char === char.toUpperCase()) ? 'upper' : 'lower';
    const initialIndex = alphabet.indexOf(char.toLowerCase());
    let finalIndex = initialIndex + shiftFactor;
    while(finalIndex > 25){
      finalIndex -= 26;
    }
    if(finalIndex < 0) {
      finalIndex += 26;
    }
    if(charCase === 'upper'){
      return alphabet[finalIndex].toUpperCase();
    } else {
      return alphabet[finalIndex];
    }
  }
  for(const character of string){
    if(!alphabet.includes(character.toLowerCase())){
      result += character
    }else result += shift(character, shiftFactor);
  }
  return result;
}

function analyzeArray(arr){
  const object = {
    min: Math.min(...arr),
    max: Math.max(...arr),
    average: arr.reduce((a, b) => a + b, 0) / arr.length,
    length: arr.length
  };
  return object;
}

module.exports = {
  capitalize: capitalize,
  reverseString: reverseString,
  calculator: calculator,
  caesarCipher: caesarCipher,
  analyzeArray: analyzeArray
};