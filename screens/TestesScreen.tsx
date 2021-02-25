import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("pizzariaromero.banco");

export default function Testes() {
  const [valor, setValor] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
        Tela Teste
      </Text>
      <TouchableOpacity
        onPress={() => {
          db.transaction((tx) => {
            tx.executeSql("select * from carrinho", [], (_, { rows }) => {
              console.log(JSON.stringify(rows));
            });
          });
        }}
        style={styles.btn1}
      >
        <Text style={styles.bt1Txt}>SELECT TABLE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          db.transaction((tx) => {
            tx.executeSql("delete from carrinho");
          });
          console.log("## Dados da tabela apagados ##");
        }}
        style={styles.btn1}
      >
        <Text style={styles.bt1Txt}>Limpar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          db.transaction((tx) => {
            tx.executeSql(
              "select * from carrinho",
              [],
              (_, { rows: { _array } }) => {
                console.log(_array);
              }
            );

            // Fazendo a soma dos valores dos produtos que estão no carrinho
            tx.executeSql(
              "select sum(precoP) as total from carrinho",
              [],
              (_, { rows: { _array } }) => {
                setValor(_array[0].total.toFixed(2).replace(".", ","));
                console.log(_array[0]);
              }
            );
            alert(valor);
          });
        }}
        style={styles.btn1}
      >
        <Text style={styles.bt1Txt}>SOMA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bt1Txt: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  btn1: {
    padding: 22,
    margin: 20,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#AB1900",
    borderColor: "white",
    borderWidth: 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
