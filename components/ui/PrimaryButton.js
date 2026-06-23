import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress }) {
  return (
    // container externo para controlar margens e bordas
    <View style={styles.buttonOuterContainer}>
      <Pressable
        // aplica um estilo extra enquanto o botão está pressionado
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        // executa a função recebida do componente pai
        onPress={onPress}
        // efeito de ripple nativo no Android
        android_ripple={{ color: "#888888" }}
      >
        {/* exibe o conteúdo enviado entre as tags do componente */}
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,

    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
