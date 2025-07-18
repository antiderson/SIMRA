
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <LinearGradient
          colors={['#FFFAFA', '#0C597D']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
        </LinearGradient>
  );
}


