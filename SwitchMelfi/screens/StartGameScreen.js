import { Button, Pressable, TextInput } from "react-native";

const StartGameScreen=()=> {
    return (
      <View style={styles.screen}>
        <Card>
            <Text>Elegir un número del 1 al 10</Text>
            <TextInput/>

            <View style={styles.botones}>
                <Pressable>
                    <Text>Eliminar</Text>
                </Pressable>
                <Pressable>
                    <Text>Confirmar</Text>
                </Pressable>
            </View>
        </Card>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      marginTop:40,
      padding:15,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        width:350,
        alignItems:"center",
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        elevation:5,
        borderRadius:10,
    },
    botones:{
        flexDirection: "row",
        justifyContent:"center"
    }
  });
  
  export default StartGameScreen