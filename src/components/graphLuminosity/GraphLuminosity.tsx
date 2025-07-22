import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConfig";
import { Text, TouchableOpacity, View } from "react-native";
import styles from './styles';
import { LightbulbIcon, PencilIcon } from "phosphor-react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTooltip } from "victory-native";


export default function GraphLuz() {
    const [luz, setLuz] = useState<number | null>(null);

    useEffect(() => {
        const luzRef = ref(db, 'sensores/lux');
        const unsuscribe = onValue(luzRef, snapshot => {
            setLuz(snapshot.val());
        });

        return () => { unsuscribe() };
    }), [];
    const data = [
        [{ x: 0, y: 300 }],   // Baixa luminosidade
        [{ x: 0, y: 800 }],   // Ideal luminosidade (500 a 1000)
        [{ x: 0, y: 400 }],   // Alta luminosidade (acima de 1000)
    ];

    const barStyles = [
        { data: { fill: "#f3d437", stroke: "#d1b322", strokeWidth: 1 } }, // Baixa
        { data: { fill: "#0ca340", stroke: "#0ca340", strokeWidth: 1 } }, // Ideal
        { data: { fill: "#ff4d4d", stroke: "#ff0000", strokeWidth: 1 } }, // Alta
    ];
    return (
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
                <Text style={styles.value}>{luz !== null ? `${luz}` : '...'}</Text>
                <Text style={styles.additional}>Im</Text>
            </View>
            <View style={styles.graph}>
                <VictoryChart domain={{ y: [0, 1500] }}>
                    <VictoryAxis
                        dependentAxis
                        tickValues={[0, 300, 1100, 1500]}
                        style={{ tickLabels: { fontSize: 10, padding: 10 } }}
                    />
                    <VictoryStack style={{ data: { width: 10, height: 10 } }} horizontal>
                        {data.map((d, i) => (
                            <VictoryBar
                                key={i}
                                data={d}
                                style={barStyles[i]}
                                labelComponent={
                                    <VictoryTooltip
                                        active
                                        dy={-30}
                                        flyoutStyle={{
                                            fill: "#fbf2ca",
                                            stroke: "#ae9308",
                                            strokeWidth: 0.5,
                                        }}
                                    />
                                }
                            />
                        ))}
                    </VictoryStack>
                </VictoryChart>
            </View>
        </View>
    )
}