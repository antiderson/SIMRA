import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';
import GraphLuz from '../../components/graphLuminosity/GraphLuminosity';
import GraphTemp from '../../components/graphTemp/GraphTemp';
import styles from './styles';

export default function Home() {
  return (
    <LinearGradient
          colors={['#FFFAFA', '#0C597D']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Image source={require('../../assets/simraSlogan.png')} style={styles.simratext} />
          </View>
          <GraphLuz />
          <GraphTemp />
        </LinearGradient>
  );
}


