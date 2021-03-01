import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import PedidoEntrega from "./PedidoEntregaScreen";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");
const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function PedidoScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pedido"
        component={Pedido}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PedidoEntrega"
        component={PedidoEntrega}
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
    wait(1000).then(() => setRefreshing(false));
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
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        horizontal={false}
        style={{ flex: 1, width: "100%" }}
      >
        <Text style={styles.title}>
          {" "}
          <Ionicons name="document-text" size={24} color="#000" /> Produtos no
          Pedido
        </Text>
        <View style={styles.separator} />

        {dados.map(
          ({
            id,
            tipoP,
            quantidadeP,
            PrecoP,
            idpizzaP1,
            nomeProdutoP1,
            descricaoP1,
            precoP1,
            observacaoP1,
            idpizza2,
            nomeProdutoP2,
            descricaoP2,
            precoP2,
            observacaoP2,
          }) => (
            <View key={id}>
              <View>
                <View style={styles.boxBranca}>
                  <Text style={styles.btnTxt3}>{tipoP}</Text>
                  <Text style={styles.btnTxt4}>{nomeProdutoP1}</Text>
                  <Text style={styles.btnTxt5}>{descricaoP1}</Text>
                  <Text style={styles.btnTxt4}>{nomeProdutoP2}</Text>
                  <Text style={styles.btnTxt5}>{descricaoP2}</Text>

                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={() => {
                      db.transaction((tx) => {
                        tx.executeSql("delete from carrinho where id = ?", [
                          id,
                        ]);
                      });
                    }}
                  >
                    <Text style={styles.btnTxt6}>
                      <Ionicons
                        name="close-circle-sharp"
                        size={20}
                        color="#AB1900"
                      />{" "}
                      Remover do Pedido
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.viewFooter}>
          <TouchableOpacity>
            <Text style={styles.txtPrice}>Total: R$ {valor}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewFooter}>
          <TouchableOpacity
            disabled={false}
            onPress={() => {
              navigation.navigate("PedidoEntrega");
            }}
            style={styles.btnFooter}
          >
            <Text style={styles.btnTxtFooter}>
              <Ionicons name="arrow-forward" size={20} color="#AB1900" />{" "}
              Recebimento
            </Text>
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
  separator: {
    margin: 10,
    height: 2.3,
    width: "90%",
    backgroundColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#FBD721",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btn2: {
    backgroundColor: "#FBD721",
    borderRadius: 10,
    marginTop: 5,
  },
  btnTxt: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  btnTxt6: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
    padding: 1,
    textAlign: "center",
  },
  btnTxt2: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: "10%",
  },
  btnTxt3: {
    color: "#ffff",
    backgroundColor: "#AB1900",
    fontWeight: "bold",
    fontSize: 12,
    width: 100,
    borderRadius: 20,
    padding: 2,
    marginBottom: 5,
    textAlign: "center",
  },
  btnTxt4: {
    color: "#006B31",
    fontWeight: "bold",
    fontSize: 18,
    padding: 0,
  },
  btnTxt5: {
    color: "#CBCBCB",
    fontWeight: "bold",
    fontSize: 15,
    padding: 0,
  },

  boxBranca: {
    borderRadius: 10,
    padding: 20,
    width: "90%",
    height: "auto",
    margin: 10,

    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  box2: {
    borderRadius: 10,
    backgroundColor: "#AB1900",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    height: 45,
    backgroundColor: "#AB1900",
  },
  viewFooter: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  btnFooter: {
    width: "90%",
    backgroundColor: "#FBD721",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 4,
  },
  btnTxtFooter: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
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
});
