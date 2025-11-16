// src/screens/Home/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        // flex: 0.7,
        alignItems: 'center',
        width: '85%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#d1d1d1ff',
        // backgroundColor: 'rgba(255, 255, 255, 0.10)',
        flex: 1
    },
    info: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        width: '100%',
        // flex: 0.3,

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
        fontSize: 130,
        fontWeight: '400',
        color: '#333',
    },
    additional: {
        fontSize: 50,
        color: '#333',
        fontFamily: 'Poppins_300Light',
        marginBottom: 15,
    },
    graph: {
        flex: 1,
        width: '100%',

        height: 200,
        // backgroundColor: 'red',
        // marginTop: -220,
        borderRadius: 10,
        marginTop: 20,
    },
    footer: {
        // position: 'absolute',
        marginTop: 30,
        // backgroundColor: 'blue',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },

    button: {
        width: 190,
        height: 64,
        backgroundColor: 'rgba(217, 217, 217, 0.58)',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        // Sombras (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 12, height: 17 },
        shadowOpacity: 0.22,
        shadowRadius: 51,
        // Sombra (Android)
        // elevation: 10,










        // width: 190,
        // backgroundColor: 'rgba(217, 217, 217, 0.58)',
        // height: 74,
        // borderColor: 'white',
        // borderWidth: 1,
        // boxShadow: '12px 17px 51px rgba(0, 0, 0, 0.22)',


        //         boxizing: border-box,
        //   backdrop-filter: blur(6px);
        //   border-radius: 17px;
        //   text-align: center;
        //   cursor: pointer;
        //   transition: all 0.5s;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   user-select: none;
        //   font-weight: bolder;
        //   color: black;


    }
});
