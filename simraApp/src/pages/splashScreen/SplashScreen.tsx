import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackRoutes } from '../../routes/types';

type SplashScreenNavigationProp = NativeStackNavigationProp<StackRoutes, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFFAFA', '#0C597D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/LogoSimra2.png')} style={{ width: 200, height: 200 }} />
        <Image source={require('../../assets/simraSlogan.png')} style={styles.title} />
      </View>
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </LinearGradient>
  );
}
