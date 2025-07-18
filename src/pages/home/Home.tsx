
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import GraphTemp from '../../components/graphTemp/GraphTemp';

export default function Home() {
  return (
    <LinearGradient
          colors={['#FFFAFA', '#0C597D']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Image source={require('../../assets/simraText.png')} style={styles.simratext} />
            {/* <Text style={styles.title}>Welcome to Simra</Text> */}
          </View>
          <GraphTemp />
        </LinearGradient>
  );
}


