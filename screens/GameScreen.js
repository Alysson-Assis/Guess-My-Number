import { StyleSheet, View, TextInput, Alert, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

// gera um número aleatório entre os limites informados,
// ignorando o número passado em exclude
function generateRandomBetween(min, max, exclude) {
  // gera um número inteiro aleatório entre min e max
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  // impede que o mesmo número seja sorteado novamente
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    // retorna o número gerado
    return rndNum;
  }
}

// limites usados para gerar os próximos palpites
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  // gera o primeiro palpite da máquina
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  // armazena o palpite atual da máquina
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // armazena o histórico de palpites realizados
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    // finaliza o jogo quando a máquina acerta o número
    if (currentGuess === userNumber) {
      // envia a quantidade de rodadas para o componente pai
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    // redefine os limites ao iniciar uma nova partida
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function newGuessHandler(direction) {
    // impede o usuário de informar dicas incorretas
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);

      return;
    }

    // diminui o limite máximo caso o número seja menor
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      // aumenta o limite mínimo caso o número seja maior
      minBoundary = currentGuess + 1;
    }

    // gera um novo palpite dentro dos limites atuais
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    // atualiza o número exibido na tela
    setCurrentGuess(newRndNumber);

    // adiciona o novo palpite no início do histórico
    setGuessRounds((prevGuessRounds) => [
      newRndNumber,
      ...prevGuessRounds,
    ]);
  }

  // quantidade total de palpites realizados
  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      {/* título da tela */}
      <Title>Oponnent's Guess</Title>

      {/* exibe o palpite atual da máquina */}
      <NumberContainer>{currentGuess}</NumberContainer>

      {/* cartão com as ações do usuário */}
      <Card>
        {/* instrução exibida acima dos botões */}
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>

        {/* agrupa os botões de maior e menor */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            {/* informa que o número é menor */}
            <PrimaryButton
              onPress={newGuessHandler.bind(this, "lower")}
            >
              <Ionicons
                name="remove"
                size={24}
                color={"white"}
              />
            </PrimaryButton>
          </View>

          <View style={styles.buttonContainer}>
            {/* informa que o número é maior */}
            <PrimaryButton
              onPress={newGuessHandler.bind(this, "greater")}
            >
              <Ionicons
                name="add"
                size={24}
                color={"white"}
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>

      {/* container da lista de palpites */}
      <View style={styles.listContainer}>
        {/*
          implementação anterior usando map()
          {guessRounds.map(guessRounds =>
            <Text key={guessRounds}>
              {guessRounds}
            </Text>
          )}
        */}

        {/* renderiza o histórico de palpites */}
        <FlatList
          // recebe o array de palpites
          data={guessRounds}

          // transforma cada palpite em um componente visual
          renderItem={(itemData) => (
            <GuessLogItem
              // calcula o número da rodada em ordem decrescente
              roundNumber={
                guessRoundsListLength - itemData.index
              }

              // envia o palpite atual para o componente
              guess={itemData.item}
            />
          )}

          // utiliza o próprio palpite como chave única
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  instructionText:{
    marginBottom: 12,
  },
  buttonsContainer: { 
    flexDirection: "row" 
  },
  buttonContainer:{
    flex: 1 
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
