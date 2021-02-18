import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function PedidoScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pedido"
        component={Pedido}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Pedido({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Produtos");
          }}
        >
          <Ionicons name="document-text" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>Tela Pedido</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={false}
          onPress={() => {
            alert("Adicionado ao carrinho");
            navigation.navigate("Pedido");
          }}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>
            <Ionicons name="add-circle-sharp" size={20} color="#AB1900" />{" "}
            Fechar Pedido
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBD721",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "flex-start",
    paddingLeft: 20,
    backgroundColor: "#AB1900",
    flexDirection: "row",
  },
  main: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  footer: {
    width: "100%",
    height: "5%",
    paddingVertical: 10,
    justifyContent: "flex-end",
    paddingRight: 20,
    backgroundColor: "#AB1900",
    flexDirection: "row",
  },
  btn: {
    backgroundColor: "#FBD721",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnTxt: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
});
