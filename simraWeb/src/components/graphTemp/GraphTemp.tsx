// GraphTemp.tsx (React Web)
import styles from "./index.module.css";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { VictoryPie } from "victory";
import { db } from "../../services/firebaseConfig";
import { Toast } from 'primereact/toast';

// import ModalLimitTemp from "../limitTemp/ModalLimitTemp";
// import ImportanceTemp from "../importance/ImportanceTemp";

import { PencilIcon, ThermometerIcon } from "@phosphor-icons/react";
import { Heading } from "tamagui";

function getData(percent: number) {
    return [
        { x: 1, y: percent },
        { x: 2, y: 100 - percent }
    ];
}

export default function GraphTemp() {
    const [percent, setPercent] = useState(0);
    const [data, setData] = useState(getData(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImportanceVisible, setModalImportanceVisible] = useState(false);
    const toast = useRef<Toast>(null);

    const handleSaveLimits = async (limits: { min: number; max: number }) => {
        try {
            await set(ref(db, "limites/temperatura"), limits);
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
    console.log("Valor recebido:", percent);
    const novoteste = () => {
        console.log("clicou");
    };

    useEffect(() => {
        const limitesRef = ref(db, "limites/temperatura");
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
                const normalized = Math.min(100, Math.max(0, temp));
                setPercent(normalized);
                setData(getData(normalized));

                if (temp < limitesAtual.min) {
                    toast.current?.show({
                        severity: "warn",
                        summary: `Temperatura muito baixa (atual: ${temp} Im)`,
                        life: 3500,
                    });
                } else if (temp > limitesAtual.max) {
                    toast.current?.show({
                        severity: "warn",
                        summary: `Temperatura muito alta (atual: ${temp} Im)`,
                        life: 3500,
                    });
                }
            }
            
        });
    }, []);

    return (
        <div className={styles.container} style={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'rgba(58, 58, 58, 0.1)' }}>
            <Toast ref={toast} position="bottom-center" />
            <div className={styles.info}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Heading size={"$4"} >Temperatura</Heading>
                    <ThermometerIcon size={32} color="#4a4a4a" weight="duotone" />
                </div>

                <button className={styles.iconBtn} onClick={() => setModalVisible(true)}>
                    <PencilIcon size={32} color="#5e5e5e" weight="duotone" />
                </button>
            </div>
            <div className={styles.footer}>
                <button onClick={novoteste} className={styles.button}>
                    Entenda a importância
                </button>
                <button onClick={novoteste} className={styles.button}>
                    Recomendações
                </button>
            </div>

            <div className={styles.valueContainer}>
                <svg width={360} height={360} viewBox="0 0 400 400">
                    <defs>
                        <linearGradient id="tempGradient" x1="0" y1="1" x2="1" y2="1">
                            <stop offset="0" stopColor="red" />
                            <stop offset="1" stopColor="blue" />
                        </linearGradient>
                    </defs>

                    <VictoryPie
                        standalone={false}
                        animate={{ duration: 1000 }}
                        width={400}
                        height={400}
                        data={data}
                        innerRadius={120}
                        cornerRadius={25}
                        style={{
                            data: {
                                fill: ({ datum }: any) =>
                                    datum.x === 1 ? "url(#tempGradient)" : "transparent"
                            }
                        }}
                        labels={() => null}
                    />

                    <text
                        x={200}
                        y={200}
                        fontSize="40"
                        fontWeight="bold"
                        fill="#333"
                        textAnchor="middle"
                        alignmentBaseline="central"
                    >
                        {Number(percent).toFixed(1)}°C
                    </text>
                </svg>
            </div>

            {/* <ModalLimitTemp
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveLimits}
            /> */}

            {/* <ImportanceTemp
                visible={modalImportanceVisible}
                onClose={() => setModalImportanceVisible(false)}
            /> */}
        </div>
    );
}
