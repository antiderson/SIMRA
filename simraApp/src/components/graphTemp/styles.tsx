// src/screens/Home/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        width: 350,
        height: 60,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        marginBottom: 50,
    },
    info: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        width: 350,

    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 180,
    },
    text: {
        color: '#292929cc',
        fontFamily: 'Poppins_300Light',
        fontSize: 24,
        letterSpacing: -0.76,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 50,
    },
    value: {
        fontSize: 100,
        fontWeight: '400',
        color: '#333',
    },
    additional: {
        fontSize: 40,
        color: '#333',
        fontFamily: 'Poppins_300Light',
        marginBottom: 15,
    },
});
