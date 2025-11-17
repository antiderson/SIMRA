import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../limitTemp/styles'
import { ref, set } from "firebase/database";
import { db } from "../../services/firebaseConfig";

type ModalLimitLumProps ={
    visible: boolean;
    onClose: () => void;
    onSave: (limits: { min: number; max: number }) => void;
};

export default function ModalLimitLum({ visible, onClose, onSave}: ModalLimitLumProps){
    const [minLum, setMinLum] = useState('');
    const [maxLum, setMaxLum] = useState('');

    const handleSave = async() => {
        const min = parseFloat(minLum);
        const max = parseFloat(maxLum);
        if(!isNaN(min) && !isNaN(max)){
            await set(ref(db, 'limites/luminosidade'),{
                min, 
                max
            })
            onSave({min, max});
            onClose();
        }
    }

    return(
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Definir limites de Luminosidade</Text>
                    <TextInput 
                    placeholder="Luminosidade mínima"
                    placeholderTextColor={"#999"}
                    keyboardType="numeric"
                    value={minLum}
                    onChangeText={setMinLum}
                    style={styles.input}
                    />
                    <TextInput 
                    placeholder="Luminosidade máxima"
                    placeholderTextColor={"#999"}
                    keyboardType="numeric"
                    value={maxLum}
                    onChangeText={setMaxLum}
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
    )
}