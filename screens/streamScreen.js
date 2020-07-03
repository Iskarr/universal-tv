import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { tvapi } from "../api/tvapi";
import { useNavigationParam } from "react-navigation-hooks";
import Colors from "../constants/Colors";
import { Video } from "expo-av";
import {
  Orientation,
  addOrientationChangeListener,
} from "expo/build/ScreenOrientation/ScreenOrientation";

const streamScreen = (props) => {
  const item = useNavigationParam("item");
  const imageUrl = useNavigationParam("imageURL");
  const [showMoreText, setShowMoreText] = useState(false);
  const [allList, setAllList] = useState([]);

  const [isToggled, setIsToggled] = useState(false);
  const toggleTrueFalse = () => setIsToggled(!isToggled);

  useEffect(() => {
    tvapi.qgRaw("/", (json) => {
      json.sort((a, b) => {
        return a.station.channel - b.station.channel;
      });
      setAllList(json);
    });
  }, [tvapi]);

  let ShowFeed = `https://tv.9st.one${item.station.channelUrl}`;
  console.log(item.station.channelUrl);
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Video
          source={{
            uri: ShowFeed,
          }}
          rate={1}
          volume={1}
          isMuted={false}
          shouldPlay
          useNativeControls
          Audio={true}
          resizeMode="cover"
          style={{ width: "100%", height: 400 }}
        />
      </View>
    </ScrollView>
  );
};

streamScreen.navigationOptions = {
  headerTitle: "Streaming...",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    paddingTop: 25,
    backgroundColor: Colors.primaryColor,
  },
  headerImg: {
    width: "95%",
    height: 300,
    margin: 10,
  },
  desc: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  longDesc: {
    padding: 12,
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  descButton: {
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
    width: 50,
  },
});

export default streamScreen;
