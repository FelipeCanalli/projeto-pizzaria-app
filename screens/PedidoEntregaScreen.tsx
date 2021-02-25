import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

export default function PedidoEntregaScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PedidoEntrega"
        component={PedidoEntrega}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dados"
        component={Dados}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function PedidoEntrega() {
  const [valor, setValor] = React.useState(0);

  React.useEffect(() => {
    db.transaction((tx) => {
      // Fazendo a soma dos valores dos produtos que estão no carrinho
      tx.executeSql(
        "select sum(precoP) as total from carrinho",
        [],
        (_, { rows: { _array } }) => {
          setValor(_array[0].total.toFixed(2).replace(".", ","));
          // console.log(_array[0]);
        }
      );
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Produtos");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={require("../assets/fundo.jpg")}
          style={styles.background}
        >
          <View style={[styles.boxBranca, styles.centralizar]}>
            <Text style={styles.title}>
              Como você deseja receber o pedido ?
            </Text>
          </View>

          <TouchableOpacity>
            <View style={styles.boxBranca}>
              <View style={styles.icone}>
                <MaterialIcons name="delivery-dining" size={44} color="#000" />
              </View>
              <View style={styles.info}>
                <Text style={styles.title2}>Receber em Casa</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.boxBranca}>
              <View style={styles.icone}>
                <AntDesign name="solution1" size={44} color="#000" />
              </View>
              <View style={styles.info}>
                <Text style={styles.title2}>Retirada na Pizzaria</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.btnTxt}>Total: R$ {valor}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBD721",
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
  title: {
    textAlign: "center",
    color: "#006B31",
    fontSize: 23,
    fontWeight: "bold",
    margin: 10,
  },
  centralizar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  title4: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  separator: {
    marginVertical: 15,
    height: 2.3,
    width: "96%",
    backgroundColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  boxBranca: {
    flexDirection: "row",
    width: "90%",
    height: 90,
    padding: 10,
    margin: 0,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    marginTop: 20,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },

  flexStretch: {
    flex: 1,
    alignItems: "stretch",
  },

  TextInput: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "70%",
    height: "auto",
    borderColor: "black",
    borderWidth: 1,
    color: "gray",
    fontWeight: "bold",
    padding: 6,
    borderRadius: 5,
    marginBottom: 20,
  },
  title2: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
  },
  title3: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  boxQuantidade: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  box2: {
    margin: 10,
  },
  preco: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
    fontSize: 27,
  },
  btnRadio: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    height: 45,
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
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  background: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
  },
  icone: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FBD721",
    padding: 20,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    padding: 20,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
