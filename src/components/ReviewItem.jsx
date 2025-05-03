import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";

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
    }
  });

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

export default ReviewItem;