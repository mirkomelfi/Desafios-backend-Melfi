import { TextInput } from "react-native"

const Input=({style,...restProps})=> {
    return (
      <TextInput 
      style={{...styles.input,...style}}// estilos que le defino en el style sheet mas las recibidas por props (p/ sobreescribir)
      blurOnSubmit
      autoCorrect={false}
      autoCapitalization="none"
      keyboardType="numeric"
      maxLength={2}
      {...restProps} 
      /> 
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      height:50,
      borderBottomColor:"black",
      borderBottomWidth:2,
      marginVertical:15,
    },
  });
  
  export default Input