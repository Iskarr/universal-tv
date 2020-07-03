import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { tvapi } from "../api/tvapi";
import Colors from "../constants/Colors";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

const menuScreen = (props) => {
  const [newsList, setNewsList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [favoriteChannels, setFavoriteChannels] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    //News List
    tvapi.qgRaw("/now/News", (json) => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setNewsList(json);
    });
  }, [tvapi]);

  return (
    <View style={styles.BG}>
      <Text style={styles.TvTitles}>Current News</Text>
      <ScrollView horizontal style={styles.BG}>
        {newsList.map((item) => {
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
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
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
    backgroundColor: Colors.primaryColor,
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
  buttonContainer: {
    flexDirection: "row",
  },
  buttons: {
    flex: 1,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    width: 50,
  },
  imageBox: {
    width: 200,
    height: 300,
  },
  InfoBox: {
    color: Colors.borderColor,
    textAlign: "center",
    paddingTop: 15,
    fontSize: 25,
  },
});

export default menuScreen;
