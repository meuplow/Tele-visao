import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
    backgroundColor: '#fff',
    container:{
        display: 'flex',
        maxWidth: '100%',
        marginTop: 100,
    },

    containerCentralize:{
        margin: 20,
        display: 'flex',
        backgroundColor: '#fff',
        color: '#363636',
    },
    titleLogin: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#363636',
        marginBottom: 20,
        marginLeft: 20,
      },
    
    titleButton: {
        textAlign: 'center',
        fontSize: 21,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#FFF'
    },

    fieldLogin: {
        backgroundColor: '#F2F2F5',
        height: 56,
        width: 338,
        marginBottom: 20,
        marginTop: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 16,
        fontSize: 16,
        marginLeft: 20,
    },

    textLogin: {
        display: 'flex',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 5,
        marginLeft:20,
    },

    textLoginLink: {
        display: 'flex',
        textAlign: 'center',
        fontSize: 16,
        paddingLeft: 5,
        marginLeft:20,
    },

    link: {
        display: 'flex',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#6A79A8',
        textDecorationLine: 'underline', // Adicione esta linha
    },

    buttonLogin: {
        marginTop: 30,
        marginLeft: 5,
        paddingVertical: 10,
        borderRadius: 16,
        backgroundColor: '#6A79A8',
        height: 57,
        width: 335,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default loginStyle;