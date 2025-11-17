import { View, TouchableOpacity, Modal, Text, TextInput } from "react-native";
import { useState } from "react";
import styles from "./styles";
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

    const handleSave = async () => {
        const min = parseFloat(minTemp);
        const max = parseFloat(maxTemp);
        if (!isNaN(min) && !isNaN(max)) {
            await set(ref(db, 'limites/temperatura'),{
                min,
                max
            })
            onSave({ min, max });
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}> Definir limites de temperatura</Text>
                    <TextInput
                        placeholder="Temperatura mínima"
                        placeholderTextColor={"#999"}
                        keyboardType="numeric"
                        value={minTemp}
                        onChangeText={setMinTemp}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Temperatura máxima"
                        placeholderTextColor={"#999"}
                        keyboardType="numeric"
                        value={maxTemp}
                        onChangeText={setMaxTemp}
                        style={styles.input}
                        
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

}