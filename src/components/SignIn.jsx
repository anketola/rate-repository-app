import Text from './Text';
import { View, Pressable, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

const initialValues = {
    username: '',
    password: '',
};

const onSubmit = (values) => {
    console.log(values);
};

const styles = StyleSheet.create({
    signFormStyle: {
        display: 'flex',
        flexDirection: "column"
    },
    signField: {
        padding:10
    }
});

const SignInForm = ({ onSubmit }) => {
    return (
      <View style={styles.signFormStyle}>
        <View style={styles.signField}>
            <FormikTextInput name="username" placeholder="Username" />
        </View>
        <View style={styles.signField}>
            <FormikTextInput secureTextEntry name="password" placeholder="Password" />
        </View>
        <View style={styles.signField}>
            <Pressable onPress={onSubmit} s>
                <Button title="Sign in"
                        onPress={onSubmit} />
            </Pressable>
        </View>
    </View>
    );
  };

const SignIn = () => {
    return (
        <Formik style={styles} initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export default SignIn;