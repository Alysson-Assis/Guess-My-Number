import { StyleSheet, View, TextInput, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

function StartGameScreen() {
  const [enteredNumber, setenteredNumber] = useState('');

  function numberinputHandler(enteredText){
    setenteredNumber(enteredText)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberinputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={{ flex: 1}}>
          <PrimaryButton>Reset</PrimaryButton>
        </View>
        <View style={{ flex: 1}}>
          <PrimaryButton>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#3b021f",
    borderRadius: 8,
    elevation: 4,
  },
  buttonsContainer: { flexDirection: 'row'},
  numberInput: {
    height: 50,
    width: 50,
    paddingTop: 2,
    fontSize: 32,
    borderColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
