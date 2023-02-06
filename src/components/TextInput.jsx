import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const TextInput = ({ style, error, ...props }) => {
    //console.log(error);
    const textInputStyle = {...style, borderColor: error ? theme.colors.errorColor : theme.colors.light};

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;