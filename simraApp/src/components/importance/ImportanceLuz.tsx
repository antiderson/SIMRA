import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from './styles'

type ImportanceTempProps = {
    visible: boolean;
    onClose: () => void;
};

export default function ImportanceLux({ visible, onClose }: ImportanceTempProps) {
    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Importancia de uma luminnosidade adequada</Text>
                    <Text style={styles.modalText}>
                        A luminosidade afeta o comportamento, alimentação, ciclo de sono e até a reprodução dos peixes.
                         Luz em excesso pode causar estresse, crescimento exagerado de algas e atrapalhar o descanso dos peixes.
                          Luz de menos pode dificultar que eles se alimentem ou manterem seus ciclos naturais. Controlar a luz de
                           maneira equilibrada simula o ambiente natural, melhora a saúde e reduz os riscos de doenças. Cada espécie
                            e ambiente (rio, lago, profundidade) tem um nível ideal de luminosidade.
                    </Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}