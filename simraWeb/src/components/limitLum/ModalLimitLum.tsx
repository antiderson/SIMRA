import { useEffect, useRef, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../services/firebaseConfig";
import styles from "../limitTemp/index.module.css"; // adapte seus estilos

interface ModalLimitLumProps {
    visible: boolean;
    onClose: () => void;
    onSave: (limits: { min: number; max: number }) => void;
}

export default function ModalLimitLum({
    visible,
    onClose,
    onSave,
}: ModalLimitLumProps) {
    const [minLum, setMinLum] = useState("");
    const [maxLum, setMaxLum] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (visible) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [visible]);

    const handleSave = async () => {
        const min = parseFloat(minLum);
        const max = parseFloat(maxLum);

        if (!isNaN(min) && !isNaN(max)) {
            await set(ref(db, "limites/luminosidade"), { min, max });
            onSave({ min, max });
            onClose();
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <div className={styles.modalContainer}>
                <h2 className="modal-title">Definir limites de Luminosidade</h2>

                <input
                    type="number"
                    placeholder="Luminosidade mínima"
                    value={minLum}
                    onChange={(e) => setMinLum(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="number"
                    placeholder="Luminosidade máxima"
                    value={maxLum}
                    onChange={(e) => setMaxLum(e.target.value)}
                    className={styles.input}
                />

                <div className={styles.buttonRow}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancelar
                    </button>

                    <button onClick={handleSave} className={styles.saveButton}>
                        Salvar
                    </button>
                </div>
            </div>
        </dialog>
    );
}
