import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import Pedido from "./PedidoScreen";
import Metade from "./MetadeScreen";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

let idproduto = 0;
let tipo = "";
let nomeproduto = "";
let descricao = "";
let preco = 0;

export default function DetalhesProdutoScreen({ route }: any) {
  const { idproduto1 } = route.params;
  const { tipo1 } = route.params;
  const { nomeproduto1 } = route.params;
  const { descricao1 } = route.params;
  const { preco1 } = route.params;

  idproduto = idproduto1;
  tipo = tipo1;
  nomeproduto = nomeproduto1;
  descricao = descricao1;
  preco = preco1;

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
  const [partes, setPartes] = React.useState(false);
  const [quantidade, setQuantidade] = React.useState(1);
  const [observacao, setObservacao] = React.useState("");

  if (quantidade < 1) {
    setQuantidade(1);
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

  const wait = (timeout: any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Produtos");
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.title}>{tipo}</Text>
          <Text style={styles.title}>{nomeproduto}</Text>

          <View style={styles.boxBranca}>
            <Text style={styles.text}>{descricao}</Text>
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
                      <Ionicons name="add-circle" size={30} color="#AB1900" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.box2}>
                  <Text style={styles.title2}>Valor :</Text>
                  <Text style={styles.preco}>R$ {preco}</Text>
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
                        setPartes(true);
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
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {partes ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Metade", {
                idproduto1: `${idproduto}`,
                tipo1: `${tipo}`,
                nomeProduto1: `${nomeproduto}`,
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
          <TouchableOpacity
            onPress={() => {
              adicionarAoCarrinho(
                tipo,
                quantidade,
                preco,
                idproduto,
                nomeproduto,
                descricao,
                preco,
                observacao
              );
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
    borderRadius: 10,
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
