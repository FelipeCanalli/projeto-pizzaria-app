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
import Dados from "./DadosScreen";

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

function PedidoEntrega({ navigation }: any) {
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
            navigation.navigate("Pedido");
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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Dados");
            }}
          >
            <View style={styles.boxFlex}>
              <View style={styles.icone}>
                <MaterialIcons name="delivery-dining" size={24} color="#000" />
              </View>
              <View style={styles.info}>
                <Text style={styles.title2}>Receber em Casa</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Dados");
            }}
          >
            <View style={styles.boxFlex}>
              <View style={styles.icone}>
                <AntDesign name="solution1" size={20} color="#000" />
              </View>
              <View style={styles.info}>
                <Text style={styles.title2}>Retirada na Pizzaria</Text>
                <Text>
                  Informe um telefone válido para a confirmação do cadastro
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <View style={styles.viewFooter}>
          <TouchableOpacity>
            <Text style={styles.txtPrice}>Total: R$ {valor}</Text>
          </TouchableOpacity>
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
    width: "97%",
    height: 90,
    padding: 10,
    margin: 0,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    marginVertical: 20,
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

  boxFlex: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 90,
    padding: 7,
    margin: 10,

    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
  },

  footer: {
    width: "100%",
    height: 45,
    paddingVertical: 10,
    justifyContent: "flex-start",
    paddingLeft: 20,
    backgroundColor: "#AB1900",
    flexDirection: "row",
  },
  viewFooter: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 40,
    width: "100%",
  },
  txtPrice: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 2,
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
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FBD721",
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    margin: 20,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
