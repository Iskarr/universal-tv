import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Card = props => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContainer}>
        <Text>This is the Card?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    borderWidth: 3,
    width: 225,
    borderRadius: 60,
    borderColor: "black"
  }
});

export default Card;
