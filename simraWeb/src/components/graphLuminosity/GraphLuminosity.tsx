import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { db } from "../../services/firebaseConfig";
import styles from "./index.module.css";
// Victory (web)
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryStack,
    VictoryTooltip,
} from "victory";

// Toastify (web)
import { LightbulbIcon, PencilIcon } from "@phosphor-icons/react";
import { Toast } from 'primereact/toast';
import { Heading } from "tamagui";
import ModalLimitLum from "../limitLum/ModalLimitLum";

// import ModalLimitLum from "../limitLum/ModalLimitLum";

export default function GraphLuz() {
    const [luz, setLuz] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const toast = useRef<Toast>(null);

    const handleSaveLimits = async (limits: { min: number; max: number }) => {
        try {
            await set(ref(db, "limites/luminosidade"), limits);
            toast.current?.show({
                severity: "success",
                summary: `Limites salvos! Mín: ${limits.min} | Máx: ${limits.max}`
            });
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Erro ao salvar limites",
                life: 3500,
            })
        }
    };

    const handleRecomendation = () => {
        window.location.href = 'https://www.thesprucepets.com/fish-and-aquariums-4162060';
    };

    useEffect(() => {
        const luzRef = ref(db, "sensores/lux");
        const limitesRef = ref(db, "limites/luminosidade");

        let limitesAtual = { min: 0, max: 1500 };

        onValue(limitesRef, (snapshot) => {
            if (snapshot.exists()) {
                limitesAtual = snapshot.val();
            }
        });

        onValue(luzRef, (snapshot) => {
            const lum = snapshot.val();
            setLuz(lum);

            if (typeof lum === "number") {
                if (lum < limitesAtual.min) {
                    toast.current?.show({
                        severity: "warn",
                        summary: `Luz muito baixa (atual: ${lum} Im)`,
                        life: 3500,
                    });
                } else if (lum > limitesAtual.max) {
                    toast.current?.show({
                        severity: "warn",
                        summary: `Luz muito alta (atual: ${lum} Im)`,
                        life: 3500,
                    });
                }
            }
        });

        const unsubscribe = onValue(luzRef, (snapshot) => {
            setLuz(snapshot.val());
        });

        return () => unsubscribe();
    }, []);

    const data = [
        [{ x: 0, y: 300 }],
        [{ x: 0, y: 800 }],
        [{ x: 0, y: 400 }],
    ];

    const barStyles = [
        { data: { fill: "#f3d437", stroke: "#d1b322", strokeWidth: 1 } },
        { data: { fill: "#0ca340", stroke: "#0ca340", strokeWidth: 1 } },
        { data: { fill: "#ff4d4d", stroke: "#ff0000", strokeWidth: 1 } },
    ];

    const novoteste = () => {
        console.log("clicou");
    };
    return (
        <div className={styles.container} style={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'rgba(58, 58, 58, 0.1)' }}>
              <Toast ref={toast} position="bottom-center" />
            <div className={styles.info}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Heading size={"$4"} >Luminosidade</Heading>
                    <LightbulbIcon size={32} color="#4a4a4a" weight="duotone" />
                </div>

                <button onClick={() => setModalVisible(true)} className={styles.iconBtn}>
                    <PencilIcon size={32} color="#4a4a4a" weight="duotone" />
                </button>
            </div>
            <div className={styles.footer}>
                <button onClick={novoteste} className={styles.button}>
                    Entenda a importância
                </button>
                <button onClick={handleRecomendation} className={styles.button}>
                    Recomendações
                </button>
            </div>

            <div className={styles.valueContainer}>
                <span className={styles.value}>
                    {luz !== null ? `${luz}` : "..."}
                </span>
                <span className={styles.additional}>Im</span>
            </div>

            <div className={styles.graph}>
                <VictoryChart height={100} width={700} domain={{ y: [0, 1500] }}>
                    <VictoryAxis
                        dependentAxis
                        tickValues={[0, 300, 1100, 1500]}
                        style={{ tickLabels: { fontSize: 10, padding: 10 } }}
                    />

                    <VictoryStack style={{ data: { width: 10 } }} horizontal>
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
            </div>

            <ModalLimitLum
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveLimits}
            />
        </div>
    );
}
