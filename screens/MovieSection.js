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
    tvapi.qgRaw("/now/movies", (json) => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setMovieList(json);
    });
  }, [tvapi]);

  return (
    <View style={styles.BG}>
      <Text style={styles.TvTitles}>Current Movies</Text>
      <ScrollView horizontal style={styles.BG}>
        {movieList.map((item) => {
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
                <Image style={styles.imageBox} source={{ uri: imageUrl }}>
                  {/* {console.log(Date.parse("2020-06-23T23:48:51.165Z"))} */}
                </Image>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 300,
    margin: 11,
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
