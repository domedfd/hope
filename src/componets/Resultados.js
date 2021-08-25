import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
export default function Resultados({ setPosition }) {
  const [money, setMoney] = useState(true);

  function newgame() {
    setMoney(!money);
    if (money) {
      setPosition(1);
    } else {
      setPosition(9);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={money ? styles.sbutton : styles.ebutton}
        onPress={newgame}
      >
        <Text style={styles.labelButton}>
          {money ? "Play Demo" : "Cashout"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,

    // backgroundColor: "red",
  },
  sbutton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffeb3b",
    width: "100%",
    height: 45,
    borderRadius: 5,
  },
  ebutton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4caf50",
    width: "100%",
    height: 45,
    borderRadius: 5,
  },
  labelButton: {
    color: "#16182f",
    fontSize: 20,
    fontWeight: "bold",
  },
});
