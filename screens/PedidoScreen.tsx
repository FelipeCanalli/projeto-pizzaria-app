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
          <Ionicons name="document-text" size={24} color="white" />
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
          <Ionicons
            name="arrow-down-circle-sharp"
            size={24}
            color="#000"
          />{" "}
          Produtos no Pedido
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
            length,
          }) => (
            <View key={id}>
              <View style={styles.boxBranca}>
                <Text style={styles.btnTxt3}>{tipoP}</Text>
                <Text style={styles.btnTxt4}>{nomeProdutoP1}</Text>
                <Text style={styles.btnTxt5}>{descricaoP1}</Text>
                <Text style={styles.btnTxt4}>{nomeProdutoP2}</Text>
                <Text style={styles.btnTxt5}>{descricaoP2}</Text>

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
          )
        )}
      </ScrollView>

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
  separator: {
    margin: 10,
    height: 2.3,
    width: "90%",
    backgroundColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginLeft: 20,
    justifyContent: "center",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
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
  btnTxt3: {
    color: "#ffff",
    backgroundColor: "#AB1900",
    fontWeight: "bold",
    fontSize: 12,
    borderRadius: 20,
  },
  btnTxt4: {
    color: "#006B31",
    fontWeight: "bold",
    fontSize: 20,
  },
  btnTxt5: {
    color: "#CBCBCB",
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 6,
  },

  boxBranca: {
    width: "90%",
    borderRadius: 10,
    padding: 20,

    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  box2: {
    borderRadius: 10,
    backgroundColor: "#AB1900",
  },
});
