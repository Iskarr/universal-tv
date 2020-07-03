// import { View, Button, StyleSheet, Text } from "react-native";
// import React, { useState, useEffect } from "react";

// const Planets = () => {
//   const [hasError, setErrors] = useState(false);
//   const [planets, setPlanets] = useState({});

//   async function fetchData() {
//     const res = await fetch("https://swapi.co/api/planets/4/");
//     res
//       .json()
//       .then(res => setPlanets(res))
//       .catch(err => setErrors(err));
//   }

//   useEffect(() => {
//     fetchData();
//   });

//   return (
//     <View>
//       <Text>{JSON.stringify(planets)}</Text>
//       <Text>Has error: {JSON.stringify(hasError)}</Text>
//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   stuff: {
// //     textAlign: "center",
// //     justifyContent: "center",
// //     alignContent: "center"
// //   }
// // });

// export default Planets;
