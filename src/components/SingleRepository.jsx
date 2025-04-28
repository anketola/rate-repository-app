import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_ONEREPOSITORY, GET_REVIEWS } from "../graphql/queries";
import Text from "./Text";
import theme from '../theme';
import { format } from "date-fns";

const styles = StyleSheet.create({ 
  separator: {
    backgroundColor: theme.colors.mainBackground,
      height: 10
  },
  ratingCircle: {
    borderWidth: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  ratingText: {
    color: '#2196F3',
    fontWeight: theme.fontWeights.bold
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem singleView={true} data={repository} />
      <ItemSeparator />
    </>
  );
};

const ReviewItem = ({ review }) => {
  return(
    <View style={{ flex: 1, flexDirection: 'row'}}>
      <View style={ styles.ratingCircle }>
        <Text style= { styles.ratingText }>{review.rating}</Text>
      </View>  
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <Text style={{ fontWeight: theme.fontWeights.bold, paddingTop: 10 }}>{review.user.username}</Text>    
        <Text style={{ fontWeight: theme.fontWeights.light, paddingBottom: 2}}>{format(review.createdAt, "dd.MM.yyyy")}</Text>
        <Text style={{ fontWeight: theme.fontWeights.normal, paddingBottom: 10, paddingRight: 5}}>{review.text}</Text>
        </View>            
    </View>    
  )
};

const SingleRepository = () => {
  let { id } = useParams();
  const { data, loading, error } = useQuery(GET_ONEREPOSITORY, {
    variables: {
      id
    },   
      fetchPolicy: 'cache-and-network'            
    });
  const { data: review_data, loading: review_loading, error: review_error } = useQuery(GET_REVIEWS, {
    variables: {
      id
    },   
      fetchPolicy: 'cache-and-network'            
    });

  if (loading || review_loading ) return <Text>Loading data.</Text>;
  if (error || review_error ) return <Text>{error?.message || review_error?.message}</Text>;  
  //console.log(id)
  //console.log(review_data)
  
  const reviewNodes = review_data
    ? review_data.repository.reviews.edges.map(edge => edge.node)
    : [];
  
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );

};

export default SingleRepository;