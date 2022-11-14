import { useState } from "react";
import { Button, Pressable, TextInput, TouchableWithoutFeedback } from "react-native";
import Input from "../components/Input";

const StartGameScreen=(onStartGame)=> {

    const [value,setValue]=useState("");
    const [confirmed,setConfirmed]=useState(false);
    const [selectedNumber,setSelectedNumber]=useState("");

    const handlerConfirmation=()=>{
        const chosenNumber=parseInt(value);
        if (chosenNumber===NaN||chosenNumber<=0||chosenNumber>10)return;
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setValue("");
    };

    const handlerResetInput=()=>{
        setValue("");
        setConfirmed(false);
    }

    const handlerInput=(text)=>{
        setValue(text.replace(/[^0-9]/g),"") //rejects
    };

    return (
    <TouchableWithoutFeedback onPress={()=>keyboard.dismiss()}>
        <View style={styles.screen}>
            <Card>

                <Text>Elegir un número del 1 al 10</Text>
                <Input value={value} onChangeText={handlerInput} />

                <View style={styles.botones}>
                    <Pressable onPress={()=> {handlerResetInput}}>
                        <Text>Eliminar</Text>
                    </Pressable>
                    <Pressable onPress={()=> {handlerConfirmation}}>
                        <Text>Confirmar</Text>
                    </Pressable>
                </View>

            </Card>
 
            {confirmed&&(
                    <Card newStyles={{marginTop:50,width:150}}>
                         <Text>Tu numero</Text>
                         <Text>{selectedNumber}</Text>
                         <Button title="empezar" onPress={()=>onStartGame(selectedNumber)}/>
                    </Card>

            )}


        </View>
      </TouchableWithoutFeedback>
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