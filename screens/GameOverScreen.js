import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundNumber, userNumber, onStartNewGame }) {
  return (
    // container principal da tela
    <View style={styles.rootContainer}>
      {/* título exibido ao final da partida */}
      <Title>GAME OVER!!</Title>

      {/* container circular da imagem */}
      <View style={styles.imageContainer}>
        <Image
          // imagem de sucesso exibida ao terminar o jogo
          style={styles.image}
          source={require("./../assets/images/success.png")}
        />
      </View>

      {/* resumo da partida */}
      <Text style={styles.summaryText}>
        Your phone needed {/* destaca a quantidade de rodadas */}
        <Text style={styles.hightlight}>{roundNumber}</Text> rounds to guess the
        number {/* destaca o número escolhido pelo usuário */}
        <Text style={styles.hightlight}>{userNumber}</Text>
      </Text>

      {/* inicia uma nova partida */}
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

// obtém a largura atual da tela do dispositivo
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    // diminui a imagem em dispositivos menores
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,

    // mantém o formato circular da imagem
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderColor: Colors.primary500,
    overflow: "hidden",
    borderWidth: 4,
    margin: 36,
  },

  image: {
    // faz a imagem ocupar toda a largura do container
    width: "100%",
  },

  summaryText: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.primary600,
    marginBottom: 24,
  },

  hightlight: {
    fontWeight: "bold",
  },
});
