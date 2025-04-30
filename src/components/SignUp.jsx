import Text from './Text';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { ADD_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    padding: 20
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
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username has to be at least 5 characters" )
    .max(30, "Username can't be longer than 30 characters")
    .required('Username is required'),
  password: yup
    .string()
    .min(5, "Password has to be at least 5 characters" )
    .max(30, "Password can't be longer than 30 characters")
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords do not match")
    .required('Password confirmation is required')
});

export const SignUpContainer = ({ onSubmit }) => {

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
          formik.touched.username && formik.errors.username && styles.errorBorder
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorBorder
        ]}
        secureTextEntry
        placeholder='Password'        
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.errorBorder
        ]}
        secureTextEntry
        placeholder='Password confirmation'        
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign up</Text>  
      </Pressable>        
    
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useMutation(ADD_USER)
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ 
        variables: {
          user: {
            username: username,
            password: password
          }
        }
       });
      
      await signIn({ username, password });

      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <SignUpContainer onSubmit={onSubmit}/>
  )
};

export default SignUp;