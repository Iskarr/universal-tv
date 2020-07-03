import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { tvapi } from "../api/tvapi";
import Colors from "../constants/Colors";
import { useNavigation } from "react-navigation-hooks";
import NewsSection from "./NewsSection";
import MovieSection from "./MovieSection";
import HeaderScreen from "./HeaderScreen";

const menuScreen = (props) => {
  const [favoriteChannels, setFavoriteChannels] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    tvapi.qgRaw("/chanlist/21,42,51,131,141,301,71,111", (json) => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setFavoriteChannels(json);
    });
  }, [tvapi]);

  return (
    <ScrollView>
      <View style={styles.BG}>
        <HeaderScreen />
        <Text style={styles.TvTitles}>Streaming Now</Text>
        <ScrollView horizontal style={styles.BG}>
          {favoriteChannels.map((item) => {
            let imageUrl = tvapi.getBaseURL() + item.images.tallText;
            return (
              <View style={styles.screen} key={item.program.id}>
                <TouchableOpacity
                  style={styles.gridContainer}
                  onPress={() => {
                    navigate("tvDetailScreen", {
                      item: item,
                      imageURL: tvapi.getBaseURL() + item.images.wideText,
                    });
                  }}
                >
                  <Image
                    style={styles.imageBox}
                    source={{ uri: imageUrl }}
                  ></Image>
                </TouchableOpacity>
                <View style={styles.buttonContainer}></View>
              </View>
            );
          })}
        </ScrollView>
        <NewsSection />
        <MovieSection />
      </View>
    </ScrollView>
  );
};

menuScreen.navigationOptions = {
  headerTitle: "Playing Now",
};

const styles = StyleSheet.create({
  BG: {
    backgroundColor: Colors.primaryColor,
  },
  tvContainer: {
    backgroundColor: Colors.primaryColor,
  },
  TvTitles: {
    color: Colors.textColor,
    fontSize: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 300,
    margin: 10,
    shadowColor: "#111",
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.2,
  },
  gridContainer: {
    flex: 1,
    height: 300,
    width: 200,
  },
  imageBox: {
    width: 200,
    height: 300,
  },
});

export default menuScreen;
