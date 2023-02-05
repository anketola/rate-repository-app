import Text from './Text';
import theme from '../theme';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 10,
        flexGrow: 0
    },
    langtext : {
        color: theme.colors.inverted,
    }
  });

const LanguageItem = ({ givenLanguage }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.langtext}>{givenLanguage}</Text>
        </View>
    )
};


export default LanguageItem;