import Text from './Text';
import theme from '../theme';
import { View, StyleSheet } from 'react-native';
import formatNumber from '../utils/formatData';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center'
  },
  labeltext : {
    color: theme.colors.muted,
  },
  valuetext : {
    fontWeight: 'bold'
  }    
});


const RepositoryData = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 5, justifyContent: 'space-evenly' }}>
      <View style={{ display: 'flex', flexDirection: 'column'}}>
        <Text testID="stargazersCount" style={styles.valuetext}>
          {formatNumber(stargazersCount)}
        </Text>
        <Text style={styles.labeltext}>
          Stars
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <Text testID="forksCount" style={styles.valuetext}>
          {formatNumber(forksCount)}
        </Text>
        <Text style={styles.labeltext}>
          Forks
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column'}}>
        <Text testID="reviewCount" style={styles.valuetext}>
          {formatNumber(reviewCount)}
        </Text>
        <Text style={styles.labeltext}>
          Reviews
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column'}}>
        <Text testID="ratingAverage" style={styles.valuetext}>
          {ratingAverage}
        </Text>
        <Text style={styles.labeltext}>
          Rating
        </Text>
      </View>            
    </View>
  )
};


export default RepositoryData;