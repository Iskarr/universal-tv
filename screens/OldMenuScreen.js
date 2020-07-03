// import React, { useState, useEffect } from "react";
// import useCollapse from "react-collapsed";
// import { View, Text, StyleSheet, Image, Button } from "react-native";
// import { tvapi } from "../api/tvapi";

// const tvDetailScreen = props => {
//   const [showText, setShowText] = useState(false);
//   const [buttonText, setButtonText] = useState("Show More");
//   const [allList, setAllList] = useState([]);

//   useEffect(() => {
//     tvapi.qgRaw("/", json => {
//       json.sort((a, b) => {
//         return a.station.channel - b.station.channel;
//       });
//       setAllList(json);
//     });
//   }, []);
//   return (
//     <View style={styles.screen}>
//       <Image
//         style={styles.headerImg}
//         source={require("../assets/Arrow-wallpaper.jpg")}
//       ></Image>
//       <View>
//         <Text style={styles.desc}>
//           {allList.map(item => {
//             <View>
//               <Text>{item.program.description}</Text>
//             </View>;
//           })}
//         </Text>
//       </View>
//       <View>
//         {showText && (
//           <Text style={styles.longDesc}>
//             This text will show! This text will show! This text will show! This
//             text will show! This text will show! This text will show! This text
//             will show! This text will show! This text will show! This text will
//             show! This text will show! This text will show!
//           </Text>
//         )}
//         <Button
//           style={styles.descButton}
//           title={buttonText}
//           onPress={() => {
//             setShowText(!showText), setButtonText("Show Less");
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// tvDetailScreen.navigationOptions = {
//   headerTitle: "Details Screen"
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     width: "100%",
//     paddingTop: 75,
//     backgroundColor: "#111"
//   },
//   headerImg: {
//     width: "100%"
//   },
//   desc: {
//     color: "white",
//     fontSize: 20,
//     textAlign: "center"
//   },
//   longDesc: {
//     padding: 12,
//     color: "white",
//     fontSize: 20,
//     textAlign: "center"
//   },
//   descButton: {
//     flex: 1,
//     borderColor: "green",
//     borderWidth: 1,
//     width: 50
//   }
// });

// export default tvDetailScreen;
