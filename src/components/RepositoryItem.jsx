import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import LanguageItem from './LanguageItem';
import theme from '../theme';
import RepositoryData from './RepositoryData';
import { Linking } from 'react-native';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
    flexDirection: 'column'
  },
  repoImage: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginTop: 20,
    width: '100%'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },

});

const RepositoryItem = ({ data, singleView }) => {  
  let navigate = useNavigate()
  
  return (
    <Pressable onPress={() => navigate(`/repository/${data.id}`)}>
      <View testID="repositoryItem" style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            style={styles.repoImage}
            source={{
              uri: data.ownerAvatarUrl,
            }}
          />
        <View style={{ display: 'flex', flexDirection: 'column', paddingTop: 3, paddingLeft: 15, paddingRight: 10, justifyContent: 'space-between', flex: 1 }}>
            <Text testID="fullName" style={{ fontWeight: 'bold', padding: 2}}>{data.fullName}</Text>
            <Text testID="description" style={{ color: theme.colors.muted, padding: 2, flexWrap: 'wrap', flexShrink: 1}}>{data.description}</Text>
            <View testID="language" style={{ display: 'flex', flexDirection: 'row', paddingTop:2, paddingBottom: 2 }}>
                <LanguageItem givenLanguage={data.language} />
            </View>                
        </View>
      </View>
      <RepositoryData
        stargazersCount={data.stargazersCount}
        forksCount={data.forksCount}
        reviewCount={data.reviewCount}
        ratingAverage={data.ratingAverage}
        />
      {singleView && 
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(data.url)}
          >
          <Text style={styles.buttonText}>Open in GitHub</Text>  
        </Pressable>}
      </View>
    </Pressable>    
  );
};

export default RepositoryItem;