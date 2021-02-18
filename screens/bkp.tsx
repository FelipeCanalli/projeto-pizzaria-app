import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { host } from "../config/host";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import Pedido from "./PedidoScreen";

const Stack = createStackNavigator();

let tipoP = "";
let idpizzaP1 = 0;
let observacaoP1 = "";
let nomeProdutoP1 = "";
let descricaoP1 = "";
let precoP1 = 0;
//  METADE 2
let idpizzaP2 = 0;
let nomeProdutoP2 = "";
let descricaoP2 = "";
let precoP2 = 0;

export default function DetalhesProdutosScreen({ route }: any) {
  const { idpizza1 } = route.params;
  const { tipo } = route.params;
  const { nomeProduto1 } = route.params;
  const { descricao1 } = route.params;
  const { preco1 } = route.params;
  const { observacao1 } = route.params;

  const { idpizza2 } = route.params;
  const { nomeProduto2 } = route.params;
  const { descricao2 } = route.params;
  const { preco2 } = route.params;

  tipoP = tipo;
  nomeProdutoP1 = nomeProduto1;
  descricaoP1 = descricao1;
  precoP1 = preco1;
  idpizzaP1 = idpizza1;
  observacaoP1 = observacao1;
  // METADE 2
  idpizzaP2 = idpizza2;
  nomeProdutoP2 = nomeProduto2;
  descricaoP2 = descricao2;
  precoP2 = preco2;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DetalhesProdutos"
        component={DetalhesProdutos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pedido"
        component={Pedido}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function DetalhesProdutos({ navigation }: any) {
  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);
  const [quantidade, setQuantidade] = React.useState(1);
  const [partes, setPartes] = React.useState(false);
  const [observacaoP1, setObservacaoP1] = React.useState(observacao);
  const [observacaoP2, setObservacaoP2] = React.useState("");
  if (quantidade < 1) {
    setQuantidade(1);
  }

  React.useEffect(() => {
    fetch(
      `${host}/service/produto/detalharDuplo.php?primeirametade=${idpizzaP1}&segundametade=${segundametade}`,
      {
        method: "GET",
        headers: {
          accept: "aplication/json",
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((produto) => {
        setDados(produto.saida);
        console.log(dados);
      })
      .catch((error) => console.error(`Erro ao carregar a API ${error}`))
      .finally(() => setCarregando(false));
  }, []);

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
      {carregando ? (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
          color="#AB1900"
        />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.title}>{item.nomeproduto}</Text>

              <View style={styles.boxBranca}>
                <Text style={styles.text}>{item.descricao}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.boxBranca}>
                <View style={styles.flexRow}>
                  <View style={styles.flexStretch}>
                    <View style={styles.box2}>
                      <Text style={styles.title2}>Valor :</Text>
                      <Text style={styles.preco}>R$ {item.preco}</Text>
                    </View>
                  </View>
                </View>
                {/* OBSERVAÇÕES */}
                <View style={styles.flexStretch}>
                  <Text style={styles.title}>OBSERVAÇÕES</Text>
                  <TextInput
                    multiline
                    numberOfLines={2}
                    style={styles.TextInput}
                    editable
                    maxLength={80}
                    value={observacao}
                    onChangeText={(text) => setObservacaoP1(text)}
                  />
                </View>
                {/* OBSERVAÇÕES */}
              </View>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            alert("Adicionado ao carrinho");
            navigation.navigate("Pedido");
          }}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>
            <Ionicons name="add-circle-sharp" size={20} color="#AB1900" />{" "}
            Adicionar ao Pedido
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
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
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
    width: "90%",
    padding: 10,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 2,
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
    height: "auto",
    borderColor: "black",
    borderWidth: 2,
    color: "gray",
    fontWeight: "bold",
    padding: 10,
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
});
