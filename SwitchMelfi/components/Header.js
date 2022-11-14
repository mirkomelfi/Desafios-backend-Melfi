import {Text} from "react-native"

const Header=(title,newStyles)=> {
    return (
      <View style={{...styles.header,...newStyles}}>
        <Text>{title} </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: 'blue',
      paddingTop:40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default Header