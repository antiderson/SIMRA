import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    loadingContainer: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    title: {
        width: 200,
        height: 60,
        marginTop: 60,
    },
    text:{
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 70,
    }
});
