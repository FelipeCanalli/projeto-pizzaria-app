import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import Produtos from "../screens/ProdutosScreen";
import Testes from "../screens/TestesScreen";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Produtos"
        component={Produtos}
        options={{
          headerShown: false,
          headerTitle: "Pizzaria Romero",
        }}
      />
      <Stack.Screen
        name="Testes"
        component={Testes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Home({ navigation }: any) {
  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql("drop table carrinho");
  //   });
  //   Alert.alert("Atenção", "Informações atualizadas com sucesso !");
  //   console.log("## Tabela apagada ##");
  // });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fundo.jpg")}
        style={styles.background}
      >
        <ScrollView horizontal={false}>
          <View
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image source={require("../assets/icon.png")} style={styles.img1} />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Produtos");
            }}
            style={styles.btn1}
          >
            <Text style={styles.bt1Txt}>Ver menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
            style={styles.btn1}
          >
            <Text style={styles.bt1Txt}>Meus Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
            style={styles.btn1}
          >
            <Text style={styles.bt1Txt}>Informações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Testes");
            }}
            style={styles.btn1}
          >
            <Text style={styles.bt1Txt}>Testes</Text>
          </TouchableOpacity>
          <View style={styles.box}>
            <Text style={styles.title}>Horários de Funcionamento :</Text>
            <Text style={styles.boxTxt}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              iure possimus voluptas? Ullam doloremque inventore error qui dolor
              explicabo odit eaque tempora. In neque culpa vero exercitationem,
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              iure possimus voluptas? Ullam doloremque inventore error qui dolor
              explicabo odit eaque tempora. In neque culpa vero exercitationem,
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <StatusBar style="dark" animated={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006B31",
    alignItems: "center",
    // justifyContent: "center",
  },
  img1: {
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
    resizeMode: "cover",
    width: 450,
    height: 300,
    marginBottom: "10%",
    marginTop: "10%",
  },
  btn1: {
    padding: 22,
    margin: 20,
    width: "70%",
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
  bt1Txt: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  background: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  box: {
    borderRadius: 5,
    margin: 30,
    padding: 20,
    backgroundColor: "rgba(0,107,49,0.7)",
  },
  boxTxt: {
    margin: 20,
    color: "white",
    fontSize: 20,
    textAlign: "justify",
  },
  title: {
    fontFamily: "Roboto",
    textAlign: "center",
    margin: 20,
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
