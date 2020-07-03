import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView
} from "react-native";
import { tvapi } from "../api/tvapi";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import Colors from "../constants/Colors";

const tvDetailScreen = props => {
  const item = useNavigationParam("item");
  const imageUrl = useNavigationParam("imageURL");
  const { navigate } = useNavigation();
  const [showMoreText, setShowMoreText] = useState(false);
  const [allList, setAllList] = useState([]);

  const [isToggled, setIsToggled] = useState(false);
  const toggleTrueFalse = () => setIsToggled(!isToggled);

  useEffect(() => {
    tvapi.qgRaw("/", json => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setAllList(json);
    });
  }, [tvapi]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image style={styles.headerImg} source={{ uri: imageUrl }}></Image>

        <View>
          <Text style={styles.desc}>
            {item.program.shortDescription
              ? item.program.shortDescription
              : "There is no description for this show."}
          </Text>
        </View>
        {item.program.longDescription != item.program.shortDescription ? (
          <View>
            {showMoreText && (
              <Text style={styles.longDesc}>
                {item.program.longDescription
                  ? item.program.longDescription
                  : "There is no additional info for this show."}
              </Text>
            )}
            <Button
              style={styles.descButton}
              title={isToggled ? "Show Less" : "Show More"}
              onPress={() => {
                setShowMoreText(!showMoreText), toggleTrueFalse();
              }}
            />
          </View>
        ) : null}

        <Button
          title="Play"
          onPress={() => {
            navigate("streamScreen", {
              item: item,
              imageURL: tvapi.getBaseURL() + item.images.wideText
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

tvDetailScreen.navigationOptions = {
  headerTitle: "Details Screen"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    paddingTop: 25,
    backgroundColor: Colors.primaryColor
  },
  headerImg: {
    width: "95%",
    height: 300,
    margin: 10
  },
  desc: {
    color: "#000",
    fontSize: 20,
    textAlign: "center"
  },
  longDesc: {
    padding: 12,
    color: "#000",
    fontSize: 20,
    textAlign: "center"
  },
  descButton: {
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
    width: 50
  }
});

export default tvDetailScreen;
