import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBarBackground: '#24292e',
      appBarText: '#ffffff',
      inverted: '#FAF9F6',
      muted: '#5B5B5B',
      mainBackground: '#e1e4e8',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      light: '200',
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;