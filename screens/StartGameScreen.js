function StartGameScreen({ onPickNumber }) {
  // armazena o número digitado pelo usuário
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    // atualiza o state conforme o usuário digita
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    // limpa o campo de entrada
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    // converte o texto digitado para número
    const chosenNumber = parseInt(enteredNumber);

    // impede números inválidos
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Número Inválido!", "O número tem que ser entre 1 e 99.", [
        {
          text: "Ok",
          style: "destructive",

          // limpa o input ao fechar o alerta
          onPress: resetInputHandler,
        },
      ]);
      return;
    }

    // envia o número escolhido para o componente pai
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>

      {/* cartão que agrupa o input e os botões */}
      <Card>
        <InstructionText>Enter a Number</InstructionText>

        <TextInput
          style={styles.numberInput}
          maxLength={2} // limita a dois dígitos
          keyboardType="number-pad" // exibe o teclado numérico
          autoCapitalize="none" // desabilita capitalização automática
          autoCorrect={false} // desabilita correção automática
          value={enteredNumber} // transforma o input em componente controlado
          onChangeText={numberInputHandler} // atualiza o state ao digitar
        />

        {/* ações para limpar ou confirmar o número */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>
              Resetar
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>
              Confirmar
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    paddingTop: 2,
    fontSize: 32,
    borderColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: { 
    flexDirection: "row" 
  },
  buttonContainer:{
    flex: 1 
  }
});
