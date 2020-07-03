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

const API = props => {
  const [tvData, setTvData] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [favoriteChannels, setFavoriteChannels] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    tvapi.qgRaw("/chanlist/21,41,51,131,141,301,71,111", json => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setFavoriteChannels(json);
    });
    //Movie List
    tvapi.qgRaw("/now/movies", json => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setMovieList(json);
    });
    //Sports List
    tvapi.qgRaw("/now/News", json => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setNewsList(json);
    });
  }, []);

  // <Text>{item.program.title}</Text>
  return (
    <ScrollView horizontal>
      {newsList.map(item => {
        let imageUrl = tvapi.getBaseURL() + item.images.wide;
        return (
          <ScrollView>
            <View style={styles.screen}>
              <TouchableOpacity
                style={styles.gridContainer}
                onPress={() => {
                  props.navigation.navigate({ routeName: "tvDetailScreen" });
                }}
              >
                <Image
                  style={styles.imageBox}
                  source={{ uri: imageUrl }}
                ></Image>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <Button
                    title="Details"
                    onPress={() => {
                      props.navigation.navigate("tvDetailScreen");
                    }}
                  />
                </View>
                <View style={styles.buttons}>
                  <Button
                    title="Watch Now"
                    onPress={() => {
                      props.navigation.navigate("streamScreen");
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tvContainer: {
    backgroundColor: Colors.primaryColor
  },
  TvTitles: {
    color: Colors.textColor,
    fontSize: 20
  },
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 175,
    height: 300,
    margin: 10
  },
  gridContainer: {
    flex: 1,
    height: 275,
    width: 175
  },
  buttonContainer: {
    flexDirection: "row"
  },
  buttons: {
    flex: 1,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    width: 50
  },
  imageBox: {
    width: 175,
    height: 225
  }
});

export default API;
