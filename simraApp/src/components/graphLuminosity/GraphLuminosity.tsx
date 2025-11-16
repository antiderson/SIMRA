import { onValue, ref, set } from "firebase/database";
import { useEffect, useState,  } from "react";
import { db } from "../../services/firebaseConfig";
import { Button, Text, TouchableOpacity, View } from "react-native";
import styles from './styles';
import { LightbulbIcon, PencilIcon } from "phosphor-react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTooltip } from "victory-native";
import Toast from "react-native-toast-message";
import ModalLimitLum from "../limitLum/ModalLimitLum";


export default function GraphLuz() {
    const [luz, setLuz] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false)

    const handleSaveLimits = async (limits: { min: number, max: number }) => {
        try {
            await set(ref(db, 'limites/luminosidade'), limits)
            console.log("Limties salvos:", limits);
            Toast.show({
                type: "success",
                text1: "Limites salvos com sucesso",
                text2: `Mín ${limits.min} Im | Máx: ${limits.max} Im`,
                text1Style: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    // color: '#00ff00',
                },
                visibilityTime: 3500,
                text2Style: {
                    fontSize: 14
                },
            });
        }
        catch (error) {
            console.log("Erro ao salvar limites:", error);
            Toast.show({
                type: "error",
                text1: "Erro ao salvar limites",
                text1Style: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    // color: '#00ff00',
                },
                visibilityTime: 3500,
            })
        }
    };

    useEffect(() => {
        const luzRef = ref(db, 'sensores/lux');
        const limitesRef = ref(db, 'limites/luminosidade')
        let limitesAtual = { min: 0, max: 1500 }

        onValue(limitesRef, (snapshot) => {
            if (snapshot.exists()) {
                limitesAtual = snapshot.val();
            }
        });

        onValue(luzRef, (snapshot) => {
            const lum = snapshot.val();
            if (typeof lum === 'number') {
                if (lum < limitesAtual.min) {
                    Toast.show({
                        type: "error",
                        text1: "Luz muito baixa",
                        text2: `Luz atual: ${lum} Im`,
                        text1Style: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            // color: '#00ff00',
                        },
                        visibilityTime: 3500,
                        text2Style: {
                            fontSize: 14
                        },

                    });
                } else if (lum > limitesAtual.max) {
                    Toast.show({
                        type: "error",
                        text1: "Luz muito alta",
                        text2: `Luz atual: ${lum} Im`,
                        text1Style: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            // color: '#00ff00',
                        },
                        visibilityTime: 3500,
                        text2Style: {
                            fontSize: 14
                        },
                    });
                }
            }
        });


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

    const novoteste =() =>{
        console.error("clicou")
    }
   
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.title}>
                    <Text style={styles.text}>Luminosidade</Text>
                    <LightbulbIcon size={32} color="#019695" weight="duotone" />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <PencilIcon size={32} color="#5e5e5e" weight="duotone" />
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => novoteste()} style={styles.button}><Text>Entenda a importancia</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => novoteste()} style={styles.button}><Text>Recomendações</Text></TouchableOpacity>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{luz !== null ? `${luz}` : '...'}</Text>
                <Text style={styles.additional}>Im</Text>
            </View>
            {/* <View style={styles.graph}> */}
            <VictoryChart height={80} width={700} domain={{ y: [0, 1500] }}>
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
            {/* </View> */}
            <ModalLimitLum
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveLimits}
            />
        </View>
    )
}