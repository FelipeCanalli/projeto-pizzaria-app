import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { host } from "../config/host";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import Pedido from "./PedidoScreen";

const Stack = createStackNavigator();

let id = 0;

export default function DetalhesProdutoScreen({ route }: any) {
  const { idproduto } = route.params;
  id = idproduto;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DetalhesProduto"
        component={DetalhesProduto}
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

export function DetalhesProduto({ navigation }: any) {
  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);
  const [quantidade, setQuantidade] = React.useState(1);
  const [partes, setPartes] = React.useState(false);
  if (quantidade < 1) {
    setQuantidade(1);
  }

  React.useEffect(() => {
    fetch(`${host}/service/produto/detalhar.php?idproduto=${id}`, {
      method: "GET",
      headers: {
        accept: "aplication/json",
        "content-type": "application/json",
      },
    })
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

              <View style={[styles.boxBranca, styles.flexRow]}>
                <View style={styles.flexStretch}>
                  <View style={styles.box2}>
                    <Text style={styles.title2}>Quantidade :</Text>
                    <View style={[styles.boxQuantidade]}>
                      <TouchableOpacity
                        onPress={() => {
                          setQuantidade(quantidade - 1);
                        }}
                      >
                        <Ionicons
                          name="remove-circle"
                          size={30}
                          color="#AB1900"
                        />
                      </TouchableOpacity>

                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 20,
                          padding: 7,
                        }}
                      >
                        {quantidade}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setQuantidade(quantidade + 1);
                        }}
                      >
                        <Ionicons name="add-circle" size={30} color="#AB1900" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.box2}>
                    <Text style={styles.title2}>Valor :</Text>
                    <Text style={styles.preco}>R$ {item.preco}</Text>
                  </View>
                </View>
                <View style={styles.flexStretch}>
                  <View style={styles.box2}>
                    <Text style={styles.title2}>Pizza :</Text>

                    <View style={[styles.flexRow, styles.btnRadio]}>
                      <RadioButton
                        color="#AB1900"
                        value="false"
                        status={partes === false ? "checked" : "unchecked"}
                        onPress={() => setPartes(false)}
                      />
                      <Text style={styles.title3}>Inteira</Text>
                    </View>
                    <View style={[styles.flexRow, styles.btnRadio]}>
                      <RadioButton
                        color="#AB1900"
                        value="true"
                        status={partes === true ? "checked" : "unchecked"}
                        onPress={() => setPartes(true)}
                      />
                      <Text style={styles.title3}>Meio a meio</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}

      <View style={styles.footer}>
        {partes ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Produtos");
            }}
          >
            <Text style={styles.btnTxt}>
              {" "}
              <Ionicons
                name="add-circle-sharp"
                size={20}
                color="#AB1900"
              />{" "}
              Escolher a outra Parte
            </Text>
          </TouchableOpacity>
        ) : (
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
        )}
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
