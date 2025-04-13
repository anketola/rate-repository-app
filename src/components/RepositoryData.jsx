import Text from './Text';
import theme from '../theme';
import { View, StyleSheet } from 'react-native';

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

const formatNumber = ( toFormat ) => {
  if (toFormat < 1000) {
    return toFormat;
  } else {
    let desimaali = toFormat % 1000;
    let eka = desimaali.toString().substring(0, 1);
    let tuhannet = Math.floor(toFormat / 1000);
    return tuhannet + '.' + eka + 'k';
  };
}

const RepositoryData = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 5, justifyContent: 'space-evenly' }}>
      <View style={{ display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.valuetext}>
          {formatNumber(stargazersCount)}
        </Text>
        <Text style={styles.labeltext}>
          Stars
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.valuetext}>
          {formatNumber(forksCount)}
        </Text>
        <Text style={styles.labeltext}>
          Forks
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.valuetext}>
          {formatNumber(reviewCount)}
        </Text>
        <Text style={styles.labeltext}>
          Reviews
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column'}}>
        <Text style={styles.valuetext}>
          {formatNumber(ratingAverage)}
        </Text>
        <Text style={styles.labeltext}>
          Rating
        </Text>
      </View>            
    </View>
  )
};


export default RepositoryData;