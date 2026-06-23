// mantém a splash nativa visível até os recursos serem carregados
SplashScreen.preventAutoHideAsync();

export default function App() {
  // armazena o número escolhido pelo usuário
  const [userNumber, setUserNumber] = useState();

  // controla se o jogo terminou ou não
  const [gameIsOver, setGameIsOver] = useState(true);

  // armazena a quantidade de tentativas do app
  const [guessRound, setGuessRound] = useState(0);

  // carrega as fontes personalizadas antes de renderizar a interface
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      // esconde a splash quando as fontes estiverem prontas
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  // evita renderizar a interface antes das fontes carregarem
  if (!fontsLoaded) {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    // inicia o jogo com o número escolhido pelo usuário
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    // finaliza a partida e salva o total de rodadas
    setGameIsOver(true);
    setGuessRound(numberOfRounds);
  }

  function startNewGameHandler() {
    // reinicia o estado para começar uma nova partida
    setUserNumber(null);
    setGuessRound(0);
  }

  // tela exibida ao iniciar o app
  let screen = (
    <StartGameScreen onPickNumber={pickedNumberHandler} />
  );

  // após escolher um número, inicia o jogo
  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
      />
    );
  }

  // quando o jogo termina, exibe a tela de resultado
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundNumber={guessRound}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      {/* configura a barra de status */}
      <StatusBar style="light" />

      {/* aplica o gradiente de fundo */}
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500]}
        style={styles.rootScreen}
      >
        {/* adiciona uma imagem sobre o gradiente */}
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMethod="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroudImage}
        >
          {/* respeita áreas seguras do dispositivo (notch, barra de status, etc.) */}
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroudImage: {
    opacity: 0.15,
  },
});
