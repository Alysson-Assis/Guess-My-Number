import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return (
    // renderiza qualquer conteúdo enviado entre as tags do componente
    <View style={styles.card}>{children}</View>
  );
}

export default Card;

// obtém a largura atual da tela do dispositivo
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",

    // diminui a margem superior em telas menores
    marginTop: deviceWidth < 380 ? 18 : 36,

    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,

    // adiciona sombra no Android
    elevation: 4,
  },
});
