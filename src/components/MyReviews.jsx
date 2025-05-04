import { View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import theme from '../theme';

const styles = StyleSheet.create({ 
  separator: {
    backgroundColor: theme.colors.mainBackground,
      height: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { loading, data, refetch } = useQuery(GET_USER, {
          fetchPolicy: 'cache-and-network',
          variables: {
            includeReviews: true
          }        
      });
 
  if (loading) return <Text>Loading reviews..</Text>
  console.log(data)

  const reviews = data?.me?.reviews

  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviewNodes) 

  return(
    <View style={{ flex: 1 }}>
      {reviewNodes.length === 0 ? (
        <Text>No reviews to show.</Text>
      ) : (
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem refetch={refetch} buttons={true} review={item} />}
        keyExtractor={({ id }) => id}      
        ItemSeparatorComponent={ItemSeparator}
      />
    )}
    </View>
  ) 
}

export default MyReviews;