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
    paddingBottom: 10, 
    paddingLeft: 20,
    color: theme.colors.appBarTitle,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
    }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
        <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;