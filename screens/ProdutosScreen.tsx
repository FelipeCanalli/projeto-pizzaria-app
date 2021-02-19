import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
  RefreshControl,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { host } from "../config/host";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import DetalhesProduto from "./DetalhesProdutoScreen";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

export default function ProdutosScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Produtos"
        component={Produtos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalhesProduto"
        component={DetalhesProduto}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function Produtos({ navigation, route }: any) {
  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);
  const [valor, setValor] = React.useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetch(`${host}/service/produto/listar.php`, {
      method: "GET",
      headers: {
        accept: "aplication/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((produto) => {
        setDados(produto.saida);
      })
      .catch((error) =>
        // console.log(
        //  `Erro ao carregar a API : ${error}`,
        Alert.alert(
          "🥺 Algo deu errado",
          "Verifique sua conexão e tente novamente.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Home"),
            },
          ],
          { cancelable: false }
        )
      )
      //)
      .finally(() => setCarregando(false));
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
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../assets/fundo.jpg")}
        style={styles.background}
      >
        <View style={styles.main}>
          {carregando ? (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              size="large"
              color="#fff"
            />
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              horizontal={false}
              data={dados}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DetalhesProduto", {
                      idproduto: `${item.idproduto}`,
                    });
                  }}
                >
                  <View style={styles.box}>
                    <View style={styles.box2}>
                      <View style={styles.box3}>
                        <Text style={styles.title}>ID: {item.idproduto}</Text>
                        <Text style={styles.title}>{item.tipo}</Text>
                        <Text style={styles.title}>{item.nomeproduto}</Text>
                      </View>
                      <View>
                        <Text style={[styles.title, { fontSize: 15 }]}>
                          R$ {item.preco}
                        </Text>
                      </View>
                    </View>

                    <Text>{item.descricao}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={({ idproduto }, index) => idproduto}
            />
          )}
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.btnTxt}>Total: R$ {valor}</Text>
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
  background: {
    height: "100%",
    width: "100%",
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
  main: {
    flex: 1,
  },
  title: {
    color: "#006B31",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  box: {
    padding: 10,
    margin: 7,
    width: "97%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  box2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  box3: {
    flex: 1,
    justifyContent: "flex-start",
  },
  footer: {
    width: "100%",
    height: "5%",
    paddingVertical: 10,
    justifyContent: "flex-start",
    paddingLeft: 20,
    backgroundColor: "#AB1900",
    flexDirection: "row",
  },
  btnTxt: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
