import { StyleSheet, Text, View, Image } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';


export default function SplashScreen() {
  return (
    <LinearGradient
      colors={['#FFFAFA', '#0C597D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/LogoSimra2.png')} style={{ width: 200, height: 200 }} />
        <Image source={require('../../assets/simraText.png')} style={styles.title} />
      </View>
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </LinearGradient>
  );
}

