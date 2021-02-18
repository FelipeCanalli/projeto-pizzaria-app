import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("pizzariaromero.banco");

export default function Testes() {
  return (
    <View style={styles.container}>
      <Text>Tela Teste</Text>
      <TouchableOpacity
        onPress={() => {
          db.transaction((tx) => {
            tx.executeSql("select * from carrinho", [], (_, { rows }) => {
              console.log(JSON.stringify(rows));
            });

            tx.executeSql("drop table carrinho");
          });
        }}
        style={styles.btn1}
      >
        <Text style={styles.bt1Txt}>DROP TABLE</Text>
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
