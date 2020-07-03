import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { tvapi } from "../api/tvapi";
import Colors from "../constants/Colors";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

const menuScreen = props => {
  const [newsList, setNewsList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [favoriteChannels, setFavoriteChannels] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    //Header Channel
    tvapi.qgRaw("/chanlist/71", json => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setFavoriteChannels(json);
    });
  }, [tvapi]);

  return (
    <View style={styles.BG}>
      <ScrollView style={styles.BG}>
        {favoriteChannels.map(item => {
          let imageUrl = tvapi.getBaseURL() + item.images.wideText;
          return (
            <View style={styles.screen} key={item.program.id}>
              <TouchableOpacity
                style={styles.gridContainer}
                onPress={() => {
                  navigate("tvDetailScreen", {
                    item: item,
                    imageURL: tvapi.getBaseURL() + item.images.wideText
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
    backgroundColor: Colors.primaryColor
  },
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    width: 400,
    height: 300,
    margin: 10,
    shadowColor: "#111",
    shadowOffset: { width: 6, height: 4 },
    shadowOpacity: 0.2
  },
  gridContainer: {
    flex: 1,
    height: 275,
    width: 175
  },
  imageBox: {
    width: 400,
    height: 300
  }
});

export default menuScreen;
