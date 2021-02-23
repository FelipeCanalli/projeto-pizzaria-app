import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";

import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("pizzariaromero.banco");

let tipoP = "";
let precoP = 0;
let quantidadeP = 0;
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

export default function MetadePizzaScreen({ route }: any) {
  const { tipo } = route.params;
  const { preco } = route.params;
  const { quantidade } = route.params;
  const { idpizza1 } = route.params;
  const { nomeProduto1 } = route.params;
  const { descricao1 } = route.params;
  const { preco1 } = route.params;
  const { observacao1 } = route.params;
  // METADE 2
  const { idpizza2 } = route.params;
  const { nomeProduto2 } = route.params;
  const { descricao2 } = route.params;
  const { preco2 } = route.params;

  tipoP = tipo;
  precoP = preco;
  quantidadeP = quantidade;
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
        name="MetadePizza"
        component={MetadePizza}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function MetadePizza({ navigation }: any) {
  const [obsP2, setObservacaoP2] = React.useState("");

  function adicionarAoCarrinho(
    tipoP: any,
    quantidadeP: any,
    precoP: any,
    idpizzaP1: any,
    nomeProdutoP1: any,
    descricaoP1: any,
    precoP1: any,
    observacaoP1: any,
    idpizzaP2: any,
    nomeProdutoP2: any,
    descricaoP2: any,
    precoP2: any,
    obsP2: any
  ) {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists carrinho(id integer primary key, tipoP text, quantidadeP text, precoP text, idpizzaP1 text, nomeProdutoP1 text, descricaoP1 text,precoP1 text,observacaoP1 text,idpizzaP2  text, nomeProdutoP2 text, descricaoP2 text, precoP2 text,observacaoP2 text );"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "insert into carrinho(tipoP,quantidadeP,precoP, idpizzaP1,nomeProdutoP1,descricaoP1, precoP1, observacaoP1, idpizzaP2,nomeProdutoP2, descricaoP2, precoP2,observacaoP2 )values(?,?,?,?,?,?,?,?,?,?,?,?,?)",

        [
          tipoP,
          quantidadeP,
          precoP,
          idpizzaP1,
          nomeProdutoP1,
          descricaoP1,
          precoP1,
          observacaoP1,
          idpizzaP2,
          nomeProdutoP2,
          descricaoP2,
          precoP2,
          obsP2,
        ]
      );

      // tx.executeSql("drop table carrinho");

      tx.executeSql("select * from carrinho", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
      });
    });
  }

  function testeVariaveis() {
    alert(`
    PRECO FINAL : R$ ${
      precoP
      //.toFixed(2).replace(".", ","      )
    }
    Tipo: ${tipoP} 
    Quantidade: ${quantidadeP}

    ID Pizza1: ${idpizzaP1}
    Nome: ${nomeProdutoP1}
    Descrição: ${descricaoP1}
    Preço : ${precoP1}
    Observação: ${observacaoP1}

    ID Pizza2: ${idpizzaP2}
    Nome: ${nomeProdutoP2}
    Descrição: ${descricaoP2}
    Preço: ${precoP2}
    Observação: ${obsP2}
    `);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Produtos");
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.box3}>
          <Text style={styles.text4}>Outra Parte :</Text>
          <Text style={styles.text3}>{nomeProdutoP1}</Text>
          <Text style={styles.text4}>Obs: {observacaoP1}</Text>

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              navigation.navigate("DetalhesProduto");
            }}
          >
            <Text style={styles.btnTxt}>
              <Ionicons name="add-circle-sharp" size={20} color="#AB1900" />{" "}
              Cancelar meio a meio
            </Text>
          </TouchableOpacity>
        </View>

        {/* ITEM 2 */}
        <Text style={styles.title}>{nomeProdutoP2}</Text>

        <View style={styles.boxBranca}>
          <Text style={styles.text}>{descricaoP2}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.boxBranca}>
          <View style={styles.flexRow}></View>
          {/* OBSERVAÇÕES */}
          <View style={styles.flexStretch}>
            <Text style={styles.title4}>OBSERVAÇÕES</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={styles.TextInput}
              editable
              maxLength={80}
              value={obsP2}
              onChangeText={(text) => setObservacaoP2(text)}
            />
          </View>
          {/* OBSERVAÇÕES */}
          <View style={styles.flexStretch}>
            <View style={styles.box2}>
              <Text style={styles.title2}>Valor :</Text>
              <Text style={styles.preco}>R$ {precoP2}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer2}>
        <Ionicons name="warning-sharp" size={24} color="#bf3434" />

        <Text style={styles.text2}>
          O preço final a ser considerado a soma e divisão das metades
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            testeVariaveis();
          }}
        >
          <Text style={styles.btnTxt}>Variaveis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            adicionarAoCarrinho(
              tipoP,
              quantidadeP,
              precoP.toFixed(2).replace(".", ","),
              idpizzaP1,
              nomeProdutoP1,
              descricaoP1,
              precoP1,
              observacaoP1,
              idpizzaP2,
              nomeProdutoP2,
              descricaoP2,
              precoP2,
              obsP2
            );
            Alert.alert("Atenção", "Pizza adicionada ao carrinho");
            navigation.navigate("Produtos");
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
  text2: {
    fontWeight: "bold",
    color: "#bf3434",
  },
  text3: {
    fontWeight: "bold",
    color: "#bf3434",
    fontSize: 20,
  },
  text4: {
    fontWeight: "bold",
    color: "#bf3434",
    fontSize: 16,
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
  title4: {
    color: "#006B31",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  boxQuantidade: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  box2: {
    margin: 10,
  },
  box3: {
    flex: 1,
    margin: 10,
    padding: 10,
    width: "70%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f6b93b",
    borderWidth: 2,
    borderColor: "#e58e26",
    borderRadius: 5,

    alignItems: "center",
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
  footer2: {
    width: "100%",
    height: 25,
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "center",
    paddingRight: 20,
    flexDirection: "row",
    backgroundColor: "#fab1a0",
  },
  btn: {
    backgroundColor: "#FBD721",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  btn2: {
    marginTop: 10,
    height: 40,
    backgroundColor: "#FBD721",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  btnTxt: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
});
