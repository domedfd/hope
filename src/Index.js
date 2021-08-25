import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import Barra from "./componets/Barra";

const image = require("../assets/images/bg.jpg");

export default function Index() {

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Barra />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#292c4c",
    // paddingTop: 80,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
