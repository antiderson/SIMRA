import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConfig";
import { Text, TouchableOpacity, View } from "react-native";
import styles from './styles';
import { LightbulbIcon, PencilIcon } from "phosphor-react-native";


export default function GraphLuz() {
    const [luz, setLuz] = useState<number | null>(null);
    
    useEffect(() => {
        const luzRef = ref(db, 'sensores/lux');
        onValue(luzRef, snapshot => setLuz(snapshot.val()));
        
    })
    // if (temp !== null && temp > 30) {
        //     console.error("Temperatura acima do limite seguro");
        // } if (temp !== null && temp < 8) {
            //     console.error("Temperatura abaixo do limite seguro");
            // }
            
            return (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //     <Text>Luz: {luz ?? '...'} C°</Text>
                // </View>
                <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.title}>
                    <Text style={styles.text}>Luminosidade</Text>
                    <LightbulbIcon size={32} color="#019695" weight="duotone" />
                </View>
                <TouchableOpacity>
                    <PencilIcon size={32} color="#5e5e5e" weight="duotone" />
                </TouchableOpacity>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{luz !== null ? `${luz} lux` : '...'}</Text>
                <Text style={styles.additional}>{luz !== null ? `${luz} lux` : '...'}</Text>
            </View>
            <View style={styles.graph}>
             {/* Bar - Horizontal Stacked */}
            </View>
        </View>
    )
}