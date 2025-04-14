import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  text: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    padding: 10
  },
  pressable: {
    flexDirection: 'row'
  }
  
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
      <ScrollView horizontal>      
        <Link to="/">
          <Text style={styles.text}>
            Repositories
          </Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>
            Sign in
          </Text>
        </Link>        
      </ScrollView>
    </Pressable>
  </View>  
}

export default AppBar;