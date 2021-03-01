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
  ScrollView,
} from "react-native";
import { host } from "../config/host";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import MetadePizza from "./MetadePizzaScreen";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

let tipo = "";
let quantidade = 1;
let idpizza1 = 0;
let nomeProdutoP1 = "";
let descricaoP1 = "";
let precoP1 = 0;
let observacaoP1 = "";

export default function MetadeScreen({ route }: any) {
  const { idproduto1 } = route.params;
  const { tipo1 } = route.params;
  const { nomeProduto1 } = route.params;
  const { descricao1 } = route.params;
  const { preco1 } = route.params;
  const { quantidade1 } = route.params;
  const { observacao1 } = route.params;

  idpizza1 = idproduto1;
  tipo = tipo1;
  quantidade = quantidade1;
  nomeProdutoP1 = nomeProduto1;
  descricaoP1 = descricao1;
  precoP1 = preco1;
  observacaoP1 = observacao1;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Metade"
        component={Metade}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MetadePizza"
        component={MetadePizza}
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

function Metade({ navigation }: any) {
  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);
  const [valor, setValor] = React.useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
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

  React.useEffect(() => {
    fetch(`${host}/service/produto/listarTipo.php?tipo=${tipo}`, {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DetalhesProduto");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
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
            <View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View style={styles.boxFlex}>
                  {/* Icon */}
                  <View style={styles.icone}>
                    <Ionicons name="pizza" size={20} color="#000" />
                  </View>
                  {/* Icon */}

                  <View style={styles.info}>
                    <Text style={styles.title}>
                      Escolha a outra parte da pizza :
                    </Text>
                  </View>
                </View>
                {/* FlatList */}
                <View>
                  <FlatList
                    horizontal={false}
                    data={dados}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("MetadePizza", {
                            tipo: `${tipo}`,
                            preco: +precoP1 / 2 + +item.preco / 2,
                            quantidade: `${quantidade}`,
                            idpizza1: `${idpizza1}`,
                            nomeProduto1: `${nomeProdutoP1}`,
                            descricao1: `${descricaoP1}`,
                            preco1: `${precoP1}`,
                            observacao1: `${observacaoP1}`,
                            // Metade 2
                            idpizza2: `${item.idproduto}`,
                            nomeProduto2: `${item.nomeproduto}`,
                            descricao2: `${item.descricao}`,
                            preco2: `${item.preco}`,
                          });
                        }}
                      >
                        <View style={styles.box}>
                          <View style={styles.box2}>
                            <View style={styles.box3}>
                              <Text style={styles.title}>{item.tipo}</Text>
                              <Text style={styles.title}>
                                {item.nomeproduto}
                              </Text>
                            </View>
                            <View>
                              <Text style={[styles.title, { fontSize: 15 }]}>
                                R$ {item.preco.replace(".", ",")}
                              </Text>
                            </View>
                          </View>
                          <Text>{item.descricao}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={({ idproduto }, index) => idproduto}
                  />
                </View>
                {/* FlatList */}
              </ScrollView>
            </View>
          )}
        </View>
      </ImageBackground>
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  separator: {
    marginVertical: 15,
    height: 2.3,
    width: "96%",
    backgroundColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },
  background: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  boxFlex: {
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "97%",
    margin: 0,
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
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
  boxBranca: {
    width: "97%",
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
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
});
