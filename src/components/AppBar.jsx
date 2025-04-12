import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
  },
  text: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    padding: 10
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>  
}

export default AppBar;