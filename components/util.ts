export interface FormSettings {
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  hasUppercase: boolean;
  passwordLength: number;
}

const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const SYMBOLS = '~!@#$%^&*()_+=-{}|';
const NUMBERS = '1234567890';
export const generatePassword = ({
  hasLowercase,
  hasNumbers,
  hasSymbols,
  hasUppercase,
  passwordLength,
}: FormSettings) => {
  let passwordString = '';

  if (hasLowercase) {
    passwordString += LOWERCASE_LETTERS;
  }
  if (hasUppercase) {
    passwordString += UPPERCASE_LETTERS;
  }
  if (hasSymbols) {
    passwordString += SYMBOLS;
  }
  if (hasNumbers) {
    passwordString += NUMBERS;
  }

  const lettersArray = passwordString.split('');
  let generatedPassword = '';
  let loopStart = 0;
  while (loopStart < passwordLength) {
    generatedPassword +=
      lettersArray[Math.floor(Math.random() * lettersArray.length)];
    loopStart++;
  }
  return generatedPassword;
};
