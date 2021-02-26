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
import { host } from "../config/host";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import MetadePizza from "./MetadePizzaScreen";

const Stack = createStackNavigator();

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
              <View style={styles.boxFlex}>
                <View style={styles.icone}>
                  <Ionicons name="pizza" size={20} color="#000" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>
                    Escolha a outra parte da pizza :
                  </Text>
                </View>
              </View>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
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
                          <Text style={styles.title}>{item.nomeproduto}</Text>
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
    flexDirection: "row",
    width: "97%",
    margin: 0,
    backgroundColor: "white",
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
  footer: {
    width: "100%",
    height: 45,
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
  icone: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FBD721",
    padding: 20,
    margin: 20,
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
