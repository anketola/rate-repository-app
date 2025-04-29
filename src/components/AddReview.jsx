import Text from './Text';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { useEffect } from 'react';
import { ADD_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    
  },
  button: {
    height: 60
  },
  container: {
    display: 'flex',
    direction: 'column',
    padding: 20,
    gap: 20
  },
  button: {
    height: 60,
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
  errorText: {
    color: '#d73a4a'
  },
  errorBorder: {
    borderColor: '#d73a4a'
  }
  
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()    
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()    
    .integer()
    .min(0, "Rating is a required number between 0 and 100" )
    .max(100, "Rating is a required number between 0 and 100")
    .required('Rating is required'),
  review: yup
    .string()
});

export const AddReviewContainer = ({ onSubmit }) => {
  const { data } = useQuery(GET_USER);
  const isSignedIn = data && data.me !== null;
  let navigate = useNavigate();
  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, navigate]); 
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });  
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName && styles.errorBorder
        ]}
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.errorBorder
        ]}        
        placeholder='Repository name'        
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.errorBorder
        ]}
        placeholder='Rating'        
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        keyboardType='numeric'
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.review && formik.errors.review && styles.errorBorder,
          { textAlignVertical: 'top' }
        ]}        
        placeholder='Review'
        multiline
        numberOfLines={5}
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.errorText}>{formik.errors.review}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Create a review</Text>  
      </Pressable>        
    
    </View>
  )
}

const AddReview = () => {
 
  let navigate = useNavigate();
  const [addReview] = useMutation(ADD_REVIEW);
  
  const onSubmit = async (values) => {
    
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data } = await addReview({
        variables: {
          review: {
            ownerName: ownerName,
            repositoryName: repositoryName,
            rating: Number(rating),
            text: review,
          }
        }
      });      
      console.log(data);
      navigate(`/repository/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <AddReviewContainer onSubmit={onSubmit}/>
  )
};

export default AddReview;