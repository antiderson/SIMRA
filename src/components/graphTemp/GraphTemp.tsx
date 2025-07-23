// historico : https://nearform.com/open-source/victory/docs/examples/histogram-with-slider

import { onValue, ref, set } from "firebase/database";
import { PencilIcon, ThermometerIcon } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg from "react-native-svg";
import { VictoryPie } from "victory-native";
import { db } from "../../services/firebaseConfig";
import styles from './styles';
import { Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg";
import ModalLimitTemp from "../limitTemp/ModalLimitTemp";
import Toast from "react-native-toast-message";


function getData(percent: number) {
    return [
        { x: 1, y: percent },
        { x: 2, y: 100 - percent },
    ];
}

export default function GraphTemp() {

    const [percent, setPercent] = useState(0);
    const [data, setData] = useState(getData(0));
    const [modalVisible, setModalVisible] = useState(false);

    const handleSaveLimits = async (limits: { min: number; max: number }) => {
        try {
            await set(ref(db, 'limites/temperatura'), limits)
            console.log("Limites salvos:", limits);
            Toast.show({
                type: "success",
                text1: "Limites salvos com sucesso",
                text2: `Mín: ${limits.min} °C | Máx: ${limits.max} °C`,
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
    }

    useEffect(() => {
        const limitesRef = ref(db, 'limites/temperatura')
        const tempRef = ref(db, "sensores/temperatura");
        let limitesAtual = { min: 0, max: 100 };

        onValue(limitesRef, (snapshot) => {
            if (snapshot.exists()) {
                limitesAtual = snapshot.val();
            }
        });

        onValue(tempRef, (snapshot) => {
            const temp = snapshot.val();
            if (typeof temp === "number") {
                const normalized = Math.min(100, Math.max(0, (temp / 100) * 100));
                setPercent(normalized);
                setData(getData(normalized));

                if (temp < limitesAtual.min) {
                    Toast.show({
                        type: "error",
                        text1: "Temperatura abaixo do limite mínimo",
                        text2: `${temp} °C abaixo do mínimo`,
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
                } else if (temp > limitesAtual.max) {
                    Toast.show({
                        type: "error",
                        text1: "Temperatura acima do limite máximo",
                        text2: `${temp} °C acima do máximo`,
                        text1Style: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            // color: '#00ff00',
                        },
                        visibilityTime: 3500,
                    });
                }
            }
        });
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.title}>
                    <Text style={styles.text}>Temperatura</Text>
                    <ThermometerIcon size={32} color="#019695" weight="duotone" />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <PencilIcon size={32} color="#5e5e5e" weight="duotone" />
                </TouchableOpacity>
            </View>
            <View style={styles.valueContainer}>
                <Svg width={250} height={250} viewBox="0 0 400 400">
                    <Defs>
                        <LinearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor="blue" />
                            <Stop offset="1" stopColor="red" />
                        </LinearGradient>
                    </Defs>
                    <VictoryPie
                        standalone={false}
                        animate={{ duration: 1000 }}
                        width={400}
                        height={400}
                        data={data}
                        innerRadius={120}
                        cornerRadius={25}
                        labels={() => null}
                        style={{
                            data: {
                                fill: ({ datum }) =>
                                    datum.x === 1 ? "url(#tempGradient)" : "transparent",
                            },
                        }} />
                    <SvgText
                        x={200}
                        y={200}
                        fontSize="40"
                        fontWeight="bold"
                        fill="#333"
                        textAnchor="middle" >
                        {`${Math.round(percent)}°c`}
                    </SvgText>
                </Svg>
            </View>
            <ModalLimitTemp
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveLimits}
            />
        </View>
    );
}