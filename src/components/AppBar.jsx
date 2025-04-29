import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient  } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();  

  const { data } = useQuery(GET_USER);
  const isSignedIn = data && data.me !== null;
  console.log(isSignedIn)

  const handleSignOut = async () => {
    console.log("called sign out")
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return <View style={styles.container}>
    <Pressable>
      <ScrollView horizontal>      
        <Link to="/">
          <Text style={styles.text}>
            Repositories
          </Text>
        </Link>
        {isSignedIn ? (
          <>
            <Link to="/addreview">
              <Text style={styles.text}>
                  Create a review
              </Text>
              </Link>   
            <Link>
              <Text 
                style={styles.text}
                onPress={handleSignOut}
                >
                  Sign out
              </Text>
            </Link>
          </>            
        ) : (
        <Link to="/signin">
          <Text style={styles.text}>
            Sign in
          </Text>
        </Link>   
        )}    
      </ScrollView>
    </Pressable>
  </View>  
}

export default AppBar;