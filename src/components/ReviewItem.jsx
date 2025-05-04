import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({ 
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
    },
    button: {
      height: 60,
      width: 180,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2196F3',
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold
    },
  });

const ReviewItem = ({ review, refetch, buttons = false}) => {
  
  let navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async () => {
    try {
      const { data } = await deleteReview({ variables: { deleteReviewId: review.id }})
      console.log(data);
      await refetch();
    } catch (e) {
      console.log(e);
    }
  }

  const alertModal = () => {
    Alert.alert('Delete review', 'Do you wish to delete this review?', [
      {
        text: 'Cancel'
      },
      { 
        text: 'Delete',
        onPress: handleDelete
      }
    ],
    {
      cancelable: true
    }    
  )
  };
  

  return(
    <View style={{ flex: 1, flexDirection: 'column'}}>
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
    {buttons && (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 15}}>
        <Pressable
          style={styles.button}
          onPress={() => navigate(`/repository/${review.repositoryId}`)}
          >
          <Text style={styles.buttonText}>View repository</Text>  
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#D6394C' }]}
          onPress={alertModal}
        >
          <Text style={styles.buttonText}>Delete repository</Text>  
        </Pressable>
      </View> 
    )}
    </View>    
  )
};

export default ReviewItem;