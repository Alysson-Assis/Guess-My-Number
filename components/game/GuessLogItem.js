import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function GuessLogItem({ roundNumber, guess }) {
  return (
    // representa uma linha do histórico de palpites
    <View style={styles.listItem}>
      {/* exibe o número da rodada */}
      <Text>#{roundNumber}</Text>

      {/* exibe o palpite realizado pela aplicação */}
      <Text>Opponent's Guess: {guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
});
