const Header=(title)=> {
    return (
      <View style={styles.header}>
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