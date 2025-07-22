// historico : https://nearform.com/open-source/victory/docs/examples/histogram-with-slider

import { onValue, ref } from "firebase/database";
import { PencilIcon, ThermometerIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";
import { VictoryLabel, VictoryPie } from "victory-native";
import { db } from "../../services/firebaseConfig";
import styles from './styles';

function getData(percent: number) {
    return [
        { x: 1, y: percent },
        { x: 2, y: 100 - percent },
    ];
}

export default function GraphTemp() {

    const [percent, setPercent] = useState(0);
    const [data, setData] = useState(getData(0));

    useEffect(() => {
        const tempRef = ref(db, "sensores/temperatura");
        onValue(tempRef, (snapshot) => {
            const temp = snapshot.val();
            if (typeof temp === "number") {
                const normalized = Math.min(100, Math.max(0, (temp / 100) * 100));
                setPercent(normalized);
                setData(getData(normalized));
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
                <TouchableOpacity>
                    <PencilIcon size={32} color="#5e5e5e" weight="duotone" />
                </TouchableOpacity>
            </View>
            <View style={styles.valueContainer}>
                <Svg width={250} height={250} viewBox="0 0 400 400">
                    <Defs>
                        <LinearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor="blue" />
                            {/* <Stop offset="0.5" stopColor="yellow" /> */}
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
                    <VictoryLabel
                        textAnchor="middle"
                        verticalAnchor="middle"
                        x={200}
                        y={200}
                        text={`${Math.round(percent)}c°`}
                        style={{ fontSize: 70, fontWeight: "bold", fill: "#333" }}
                    />
                </Svg>
            </View>
        </View>

    );
}