import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </View>
  </Pressable>
  </View>;
};

export default AppBar;