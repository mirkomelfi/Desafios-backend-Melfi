import Card from "../components/Card";
import { Button,Text } from "react-native";

const GameScreen=()=> {

    const generateRandom=(min,max)=>{
        return Math.random()*(max-min)+min;
    };

    const [currentGuess,setCurrentGuess]=useState(generateRandom(1,10));

    return (
        <View >
            <Text>Suposicion op </Text>
            <Text>{currentGuess} </Text>

            <Card newStyles={styles.buttonContainer}>
                <Button title="menor"/>
                <Button title="mayor"/>
            </Card>

        </View>
    );
  }
  
  const styles = StyleSheet.create({
    buttonContainer:{
        width:400,
        flexDirection:"row",
        justifyContent:"center",
        marginTop:15,
    }
  });
  
  export default GameScreen
