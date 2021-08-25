import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function sortear(click, setPosition, array, position, index, bet) {
  const [lb, setLb] = useState(bet);

  function toque(block, i) {
    if (block == 1) {
      setPosition(position + 8);
    } else {
      setPosition(position + 1);
    }
    setLb(i);
    if (block == 1) {
    }

    // console.log(block);
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
            {position > index + 1
              ? block == 0
                ? i == lb
                  ? "⭐"
                  : bet
                : i == lb
                ? "💣"
                : bet
              : bet}
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
}) {
  return (
    <>
      <View style={click ? styles.clinha : styles.linha}>
        {sortear(click, setPosition, array, position, index, bet)}
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
