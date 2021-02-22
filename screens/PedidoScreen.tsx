import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

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
  const [dados, setDados] = React.useState([]);
  const [valor, setValor] = React.useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from carrinho", [], (_, { rows: { _array } }) => {
        setDados(_array);
        console.log(dados);
      });
    });
  }, []);

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
          <Ionicons name="document-text" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <ScrollView>
          <Text style={styles.title}>Veja o que tem em seu pedido</Text>

          {dados.map(({ id, idpizzaP1, precoP1, nomeProdutoP1 }) => (
            <View key={id} style={{ margin: 20 }}>
              <View style={styles.boxBranca}>
                <Text style={styles.btnTxt}>ID: {idpizzaP1}</Text>
                <Text style={styles.btnTxt}>Produto: {nomeProdutoP1}</Text>
                <Text style={styles.btnTxt}>Preço: R$ {precoP1}</Text>
                <TouchableOpacity>
                  <Text
                    style={styles.btnTxt}
                    onPress={() => {
                      db.transaction((tx) => {
                        tx.executeSql("delete from carrinho where id = ?", [
                          id,
                        ]);
                      });
                    }}
                  >
                    <Ionicons
                      name="close-circle-sharp"
                      size={20}
                      color="#AB1900"
                    />
                    <Text> Remover do Carrinho</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.btnTxt2}>Total: R$ {valor}</Text>
        </TouchableOpacity>
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
  main: {
    flex: 1,
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
  btnTxt2: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: "30%",
  },
  boxBranca: {
    width: "90%",
    padding: 10,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 2,
  },
});
