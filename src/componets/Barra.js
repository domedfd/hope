import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Linha from "./Linha";
import Resuldados from "./Resultados";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// let position = 4;
const darray = [
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
];

export default function Barra() {
  const [position, setPosition] = useState(9);
  const [click, setClick] = useState(true);
  const [array, setArray] = useState(darray);
  const [start, setStart] = useState(false);
  const [bet, setBet] = useState(0.01);
  const [reset, setReset] = useState();

  const refScrollView = useRef();

  async function gerar() {
    setStart(true);
    try {
      const idfronte = await AsyncStorage.getItem("@HopeApi:id");
      const responseGet = await api.patch(`/games/${idfronte}`);
      const apiArray = responseGet.data;

      setArray(apiArray); //debug
    } catch (error) {
      console.log("deu erro!");
    }
  }

  function rendergame(array) {
    let bets = bet;

    return (
      <View style={styles.borde}>
        {/* {error.errorMessage && <Text>Error!!</Text>} */}
        <ScrollView
          ref={refScrollView}
          onContentSizeChange={() =>
            refScrollView.current.scrollToEnd({ animated: true })
          }
          style={styles.container}
        >
          {array
            .map((linhaArray, i) => {
              bets = bets + bets * 0.455;
              const index = i;
              return (
                <Linha
                  key={i}
                  click={position - 1 == i ? true : false}
                  setPosition={setPosition}
                  array={linhaArray}
                  position={position}
                  index={i}
                  bet={bets.toFixed(2)}
                  setArray={setArray}
                  setStart={setStart}
                />
              );
            })
            .reverse()}
        </ScrollView>
        <Resuldados
          setPosition={setPosition}
          setArray={setArray}
          setReset={setReset}
        />
        <View style={styles.containerBet}>
          <View style={styles.containerLabel}>
            <Text style={styles.betLabel}>Bet Amount</Text>
            <Svg
              style={{ marginBottom: 5 }}
              height="12"
              width="30"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="info-circle"
              class="svg-inline--fa fa-info-circle fa-w-16 info_piv2M"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="80 0 512 512"
              data-for="textField"
              data-tip="Max Profit: $50,000"
              currentItem="false"
            >
              <Path
                fill="#3E3E65"
                d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
              ></Path>
            </Svg>
          </View>
          <View style={styles.containerValueBet}>
            <View style={styles.valueBet}>
              <Text style={styles.abiText1}>$ </Text>
              <TextInput
                placeholder="0"
                placeholderTextColor="lightgrey"
                keyboardType="number-pad"
                maxLength={10}
                style={styles.inputText}
                onChangeText={(text) => setBet(Number(text))}
                value={bet}
              ></TextInput>
            </View>
            <TouchableOpacity style={styles.containerValueBetend}>
              <Text style={styles.abiText2}>½</Text>
            </TouchableOpacity>
            <View style={styles.divisor} />
            <TouchableOpacity style={styles.containerValueBetend}>
              <Text style={styles.abiText2}>2x</Text>
            </TouchableOpacity>
            <View style={styles.divisor} />
            <TouchableOpacity style={styles.containerValueBetend}>
              <Text style={styles.abiText2}>Max</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {}, [position]);

  return rendergame(array, click, setClick);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#0f0d21",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    maxHeight: "90%",
    padding: -100,
  },
  borde: {
    // justifyContent: "flex-start",
    backgroundColor: "#17182f",
    borderRadius: 5,
    margin: 30,
    maxHeight: "95%",
    minHeight: "30%",
  },
  valueBet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#3E3E65",
    // margin: 10,
    height: 55,
    width: "50%",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    paddingLeft: 20,
  },
  abiText1: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  abiText2: {
    color: "#D4D5E0",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputText: {
    // backgroundColor: "red",
    flex: 1,
    height: "100%",
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
  },
  betLabel: {
    color: "#3E3E65",
    marginBottom: 5,
    fontWeight: "600",
  },
  containerBet: {
    margin: 10,
  },
  containerLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  containerValueBet: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303152",
    borderRadius: 7,
  },
  containerValueBetend: {
    flex: 1,
    height: 55,
    backgroundColor: "#303152",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },
  divisor: {
    width: 2,
    height: 30,
    backgroundColor: "#393A59",
    borderRadius: 400,
  },
});
