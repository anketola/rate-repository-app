import Text from './Text';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';

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
  }
  
});

const initialValues = {
  username: '',
  password: ''
};

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  
  const formik = useFormik({
    initialValues,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder='Password'        
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign in</Text>  
      </Pressable>        
    
    </View>
  )
};

export default SignIn;