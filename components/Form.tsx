import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FormSettings, generatePassword} from './util';
import Clipboard from '@react-native-clipboard/clipboard';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHaslowercase] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    setErrorMessage('');
    const settingsData: FormSettings = {
      hasLowercase,
      hasNumbers,
      hasSymbols,
      hasUppercase,
      passwordLength,
    };

    if (passwordLength < 6) {
      console.log('Password must be 6-digits or longer');
      setPassword('');
      setPasswordLength(0);
      setErrorMessage('Password must be 6-digits or longer');
      return;
    }
    if (passwordLength > 30) {
      console.log('Password must be 30-digits or shorter');
      setPassword('');
      setPasswordLength(0);
      setErrorMessage('Password must be 30-digits or shorter');
      return;
    }

    if (!hasLowercase && !hasUppercase && !hasSymbols && !hasNumbers) {
      console.log('Please select at least one setting');
      setPassword('');
      setPasswordLength(0);
      setErrorMessage('Please select at least one setting');
      return;
    }

    const generatedPassword = generatePassword(settingsData);
    if (generatedPassword) {
      setPassword(generatedPassword);
    } else {
      console.log('Something went wrong!!!');
    }

    console.log('Submitted Data: ', {
      hasNumbers,
      hasUppercase,
      hasLowercase,
      hasSymbols,
      passwordLength,
    });
  };

  const handleReset = () => {
    setErrorMessage('');
    setPassword('');
    setHasNumbers(false);
    setHasSymbols(false);
    setHasUppercase(false);
    setHaslowercase(true);
  };

  const copyToClipboard = () => {
    if (!password) {
      console.log('Nothing to copy');
      return;
    }
    Clipboard.setString(password);
  };
  return (
    <View>
      <Text style={styles.mainTitle}>Generate Password</Text>
      <View style={styles.mainContainer}>
        <View style={styles.optionContainer}>
          <Text style={styles.lengthLabel}>Password Length</Text>
          <TextInput
            keyboardType="number-pad"
            autoFocus
            style={styles.lengthInput}
            onChangeText={text => setPasswordLength(+text)}
            // @ts-ignore
            value={passwordLength}
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <Text style={styles.lengthLabel}>Include Lowercase?</Text>
          <BouncyCheckbox
            isChecked={hasLowercase}
            onPress={() => setHaslowercase(!hasLowercase)}
            fillColor="#1dc35c"
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <Text style={styles.lengthLabel}>Include Numbers?</Text>
          <BouncyCheckbox
            isChecked={hasNumbers}
            onPress={() => setHasNumbers(!hasNumbers)}
            fillColor="#1dc35c"
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <Text style={styles.lengthLabel}>include Uppercase?</Text>
          <BouncyCheckbox
            isChecked={hasUppercase}
            onPress={() => setHasUppercase(!hasUppercase)}
            fillColor="#1dc35c"
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <Text style={styles.lengthLabel}>Include Symbols?</Text>
          <BouncyCheckbox
            isChecked={hasSymbols}
            onPress={() => setHasSymbols(!hasSymbols)}
            fillColor="#1dc35c"
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}>
          <TouchableOpacity
            onPress={handleReset}
            style={{...styles.resetButton}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
                padding: 10,
              }}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.generateButton}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                padding: 10,
              }}>
              Generate Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {(password || errorMessage) && (
        <TouchableOpacity onPress={copyToClipboard}>
          <View
            style={{
              ...styles.resultsContainer,
              backgroundColor: `${errorMessage ? '#EB5E55' : '#1dc35c'}`,
            }}>
            {password && <Text style={styles.textBox}>{password}</Text>}
            {errorMessage && <Text style={styles.textBox}>{errorMessage}</Text>}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PasswordForm;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 38,
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '10%',
    color: 'white',
  },
  mainContainer: {
    display: 'flex',
    gap: 20,
    marginTop: 0,
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    fontSize: 24,
    alignItems: 'center',
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  lengthLabel: {
    fontSize: 20,
    fontWeight: '600',
    flexGrow: 1,
    color: 'white',
  },
  lengthInput: {
    width: '15%',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    fontSize: 20,
    color: 'white',
  },
  generateButton: {
    backgroundColor: '#1dc35c',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  resultsContainer: {
    width: '90%',
    height: 200,
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  textBox: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
