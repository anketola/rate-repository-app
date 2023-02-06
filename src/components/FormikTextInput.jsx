import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';


const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.errorColor
  },
  inputStyle: {
    borderWidth: 2,
    padding: 5,
    paddingLeft: 20,
    borderRadius: 5}
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    //console.log(props.error);
    return (
        <>
        <TextInput
            style={styles.inputStyle}
            onChangeText={value => helpers.setValue(value)}
            onBlur={() => helpers.setTouched(true)}
            value={field.value}
            error={showError}
            {...props}
        />
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;