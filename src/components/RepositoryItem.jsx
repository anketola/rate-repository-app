import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import LanguageItem from './LanguageItem';
import theme from '../theme';
import RepositoryData from './RepositoryData';

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
});

const RepositoryItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Image
          style={styles.repoImage}
          source={{
            uri: data.ownerAvatarUrl,
          }}
        />
      <View style={{ display: 'flex', flexDirection: 'column', paddingTop: 3, paddingLeft: 15, paddingRight: 10, justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', padding: 2}}>{data.fullName}</Text>
          <Text style={{ color: theme.colors.muted, padding: 2}}>{data.description}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', padding: 2 }}>
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
    </View>
  );
};

export default RepositoryItem;