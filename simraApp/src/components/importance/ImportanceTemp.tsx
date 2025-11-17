import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from './styles'

type ImportanceTempProps = {
    visible: boolean;
    onClose: () => void;
};

export default function ImportanceTemp({ visible, onClose }: ImportanceTempProps) {
    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Importancia de uma temperatura estabilizada</Text>
                    <Text style={styles.modalText}>
                        A temperatura da água é essencial para a vida dos peixes,
                        porque influencia diretamente sua respiração, metabolismo e
                        bem-estar. Quando a água está muito fria, o metabolismo do
                        peixe diminui, ele fica lento e pode parar de comer.
                        Quando está muito quente, o metabolismo acelera demais,
                        causando estresse e podendo reduzir a quantidade de
                        oxigênio dissolvido na água. Cada espécie tem uma faixa
                        ideal, e manter essa estabilidade ajuda os peixes a
                        viverem mais, se desenvolverem melhor e evitarem doenças.
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