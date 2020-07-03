import React, { useState } from "react";
import { Text, StyleSheet, Button } from "react-native";
import ViewMoreText from "react-native-view-more-text";

const Panel = props => {
  return (
    <View>
      <Text>Hello</Text>
      <Button
        onPress={() => {
          setIsExpanded(true);
        }}
      />
    </View>
  );
};
