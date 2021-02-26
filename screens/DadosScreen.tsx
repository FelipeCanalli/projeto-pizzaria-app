import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function DadosScreen({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dados"
        component={Dados}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Dados() {
  const [observacao, setObservacao] = React.useState("");

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
        <View style={{ width: "100%", backgroundColor: "white" }}>
          <Text style={styles.title}>
            {" "}
            <Ionicons
              name="arrow-down-circle-sharp"
              size={24}
              color="#000"
            />{" "}
            Endereço
          </Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.boxBranca}>
          {/* OBSERVAÇÕES */}
          {/*  Endereco, Nº, Complemento, Bairro, Cidade, Estado, Cep, Referencia */}
          <View style={styles.flexStretch}>
            <Text style={styles.title4}>Endereço</Text>
            <TextInput
              numberOfLines={1}
              style={styles.TextInput}
              editable
              maxLength={80}
              value={observacao}
              onChangeText={(text) => setObservacao(text)}
            />
          </View>
          {/* OBSERVAÇÕES */}
          {/* OBSERVAÇÕES */}
          <View style={styles.flexStretch}>
            <Text style={styles.title4}>N°</Text>
            <TextInput
              numberOfLines={1}
              style={styles.TextInput}
              editable
              maxLength={80}
              value={observacao}
              onChangeText={(text) => setObservacao(text)}
            />
          </View>
          {/* OBSERVAÇÕES */}
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <View
          style={{
            // backgroundColor: "purple",
            width: "50%",
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Pedido");
            }}
          >
            <Text style={styles.btnTxt2}>
              {" "}
              <Ionicons name="arrow-forward" size={24} color="#AB1900" />{" "}
              Continuar
            </Text>
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
    justifyContent: "flex-start",
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
  title: {
    textAlign: "left",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },

  title4: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
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
    height: "90%",
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
    margin: 10,
  },

  TextInput: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "70%",
    height: "auto",
    borderColor: "black",
    borderWidth: 1,
    color: "gray",
    fontWeight: "bold",
    padding: 6,
    borderRadius: 5,
    marginBottom: 10,
  },
  title2: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
  },
  btnTxt2: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    textAlign: "center",
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
    width: 150,
    borderRadius: 10,
  },
  btnTxt: {
    color: "#AB1900",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
});
