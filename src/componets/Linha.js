import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function sortear(
  click,
  setPosition,
  array,
  position,
  index,
  bet,
  setArray,
  setStart
) {
  const [lb, setLb] = useState(bet);

  async function gerar() {
    try {
    } catch (error) {
      console.log("deu erro!");
    }
  }

  async function toque(block, i) {
    setStart(true);
    const idfronte = await AsyncStorage.getItem("@HopeApi:id");
    const responseGet = await api.patch(`/games/${idfronte}`);
    const apiArray = responseGet.data;
    console.log(apiArray[index][i]);

    setArray(apiArray); //debug
    gerar();
    if (apiArray[index][i] == 1) {
      console.log("position 9");
      setPosition(position + 8);
    } else {
      console.log("position 1");
      setPosition(position + 1);
    }
    setLb(i);
  }

  function labelbutton(position, index, block, i, lb, bet) {
    // return block;
    if (position > index + 1) {
      if (block == 0) {
        if (i == lb) {
          return "⭐";
        } else {
          return bet;
        }
      } else if (block == 2) {
        return bet;
      } else if (i == lb) {
        return "💣";
      } else {
        return bet;
      }
    } else {
      return bet;
    }
  }

  return array.map((block, i) => {
    return (
      <View key={i} style={click ? styles.cgame : styles.game}>
        <TouchableOpacity
          style={click ? styles.cbox : styles.box}
          onPress={() => toque(block, i)}
          disabled={!click}
        >
          <Text style={click ? styles.clabel : styles.label}>
            {labelbutton(position, index, block, i, lb, bet)}
            {/* {position > index + 1
              ? block == 0
                ? i == lb
                  ? "⭐"
                  : bet
                : i == lb
                ? "💣"
                : bet
              : bet} */}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
}
export default function Linha({
  click,
  setPosition,
  array,
  position,
  index,
  bet,
  setArray,
  setStart,
}) {
  return (
    <>
      <View style={click ? styles.clinha : styles.linha}>
        {sortear(
          click,
          setPosition,
          array,
          position,
          index,
          bet,
          setArray,
          setStart
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  linha: {
    // flex: 1,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#0f0d21",
  },
  clinha: {
    flexDirection: "row",
    borderWidth: 2,
    borderLeftColor: "#8a62ec",
    borderRightColor: "#8a62ec",
    borderTopColor: "#0f0d21",
    borderBottomColor: "#0f0d21",
  },
  box: {
    backgroundColor: "#0f0d21",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    borderRadius: 3,
    marginTop: -10,
    marginBottom: -10,
    borderColor: "white",
  },
  cbox: {
    backgroundColor: "#8a62ec",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    borderRadius: 3,
    marginTop: -10,
    marginBottom: -10,
    borderColor: "white",
  },
  label: {
    color: "#767092",
    fontSize: 14,
    textAlign: "center",
  },
  clabel: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  game: {
    backgroundColor: "#0f0d21",
    flex: 1,
    padding: 10,
  },
  cgame: {
    backgroundColor: "#1b192c",
    flex: 1,
    padding: 10,
  },
});
