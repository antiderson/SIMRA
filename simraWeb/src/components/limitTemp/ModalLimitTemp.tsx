import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css"; // adapte seus estilos
import { ref, set } from "firebase/database";
import { db } from "../../services/firebaseConfig";

type ModalLimitTempProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (limits: { min: number; max: number }) => void;
};

export default function ModalLimitTemp({ visible, onClose, onSave }: ModalLimitTempProps) {
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
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
        const min = parseFloat(minTemp);
        const max = parseFloat(maxTemp);
        if (!isNaN(min) && !isNaN(max)) {
            await set(ref(db, 'limites/temperatura'), {
                min,
                max
            })
            onSave({ min, max });
            onClose();
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <div className={styles.modalContainer}>
                <h2 className="modal-title">Definir limites de Temperatura</h2>

                <input
                    type="number"
                    placeholder="Temperatura mínima"
                    value={minTemp}
                    onChange={(e) => setMinTemp(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="number"
                    placeholder="Temperatura máxima"
                    value={maxTemp}
                    onChange={(e) => setMaxTemp(e.target.value)}
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