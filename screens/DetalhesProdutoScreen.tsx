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
import Metade from "./MetadeScreen";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

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
      <Stack.Screen
        name="Metade"
        component={Metade}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function DetalhesProduto({ navigation }: any) {
  const [carregando, setCarregando] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  const [partes, setPartes] = React.useState(false);

  const [tipo, setTipo] = React.useState("teste");
  const [nomeProduto, setNomeProduto] = React.useState("teste");
  const [descricao, setDescricao] = React.useState("");
  const [preco, setPreco] = React.useState(0.0);
  const [quantidade, setQuantidade] = React.useState(1);
  const [observacao, setObservacao] = React.useState("");

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

  function testeVariaveis() {
    alert(`
    tipo : ${tipo}
    id : ${id}
    nome : ${nomeProduto}
    descrição : ${descricao}
    preco : ${preco}
    observação : ${observacao}
    quantidade : ${quantidade}
    `);
  }

  function adicionarAoCarrinho(
    tipoP: any,
    quantidadeP: any,
    precoP: any,
    idpizzaP1: any,
    nomeProdutoP1: any,
    descricaoP1: any,
    precoP1: any,
    observacaoP1: any
  ) {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists carrinho(id integer primary key, tipoP text, quantidadeP text, precoP text, idpizzaP1 text, nomeProdutoP1 text, descricaoP1 text,precoP1 text,observacaoP1 text,idpizzaP2  text, nomeProdutoP2 text, descricaoP2 text, precoP2 text,observacaoP2 text );"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "insert into carrinho(tipoP,quantidadeP,precoP, idpizzaP1,nomeProdutoP1,descricaoP1, precoP1, observacaoP1)values(?,?,?,?,?,?,?,?)",

        [
          tipoP,
          quantidadeP,
          precoP,
          idpizzaP1,
          nomeProdutoP1,
          descricaoP1,
          precoP1,
          observacaoP1,
        ]
      );

      // tx.executeSql("drop table carrinho");

      tx.executeSql("select * from carrinho", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
      });
    });
  }

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
              <Text style={styles.title}>{item.tipo}</Text>
              <Text style={styles.title}>{item.nomeproduto}</Text>

              <View style={styles.boxBranca}>
                <Text style={styles.text}>{item.descricao}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.boxBranca}>
                <View style={styles.flexRow}>
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
                          <Ionicons
                            name="add-circle"
                            size={30}
                            color="#AB1900"
                          />
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
                          onPress={() => {
                            setPartes(true),
                              setTipo(item.tipo),
                              setNomeProduto(item.nomeproduto),
                              setDescricao(item.descricao),
                              setPreco(item.preco);
                          }}
                        />
                        <Text style={styles.title3}>Meio a meio</Text>
                      </View>
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
                    onChangeText={(text) => setObservacao(text)}
                  />
                </View>
                {/* OBSERVAÇÕES */}
              </View>

              {/* TESTE */}

              <View style={styles.footer}>
                {partes ? (
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.navigate("Metade", {
                        idproduto1: `${id}`,
                        tipo1: `${tipo}`,
                        nomeProduto1: `${nomeProduto}`,
                        descricao1: `${descricao}`,
                        preco1: `${preco}`,
                        observacao1: `${observacao}`,
                        quantidade1: `${quantidade}`,
                      });
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
                  <View style={[styles.flexRow]}>
                    <TouchableOpacity
                      onPress={() => {
                        setTipo(item.tipo);
                        setNomeProduto(item.nomeproduto),
                          setDescricao(item.descricao),
                          setPreco(item.preco);
                        setTimeout(() => {
                          testeVariaveis();
                        }, 1000);
                      }}
                      style={styles.btn}
                    >
                      <Text style={styles.btnTxt}>variaveis </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setTipo(item.tipo),
                          setNomeProduto(item.nomeproduto),
                          setDescricao(item.descricao),
                          setPreco(item.preco);

                        navigation.navigate("Pedido");

                        adicionarAoCarrinho(
                          tipo,
                          quantidade,
                          preco,
                          id,
                          nomeProduto,
                          descricao,
                          preco,
                          observacao
                        );
                      }}
                      style={styles.btn}
                    >
                      <Text style={styles.btnTxt}>
                        <Ionicons
                          name="add-circle-sharp"
                          size={20}
                          color="#AB1900"
                        />{" "}
                        Adicionar ao Pedido
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* fim teste */}
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
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
    marginTop: "65%",
    width: "100%",
    height: 45,
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
