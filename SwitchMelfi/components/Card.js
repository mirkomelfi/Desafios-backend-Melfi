import { useState } from "react";
import { Button, TextInput } from "react-native";

const Card=({children})=> {

    return (
        <View style={styles.input}>
            {children}
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    input:{
        width:350,
        alignItems:"center",
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        elevation:5,
        borderRadius:10,
    },

  });
  
  export default Card