import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      textAlign: 'left',
      fontSize: 25,
      fontWeight: 'bold'
    },
    subtitle: {
      marginBottom: 16,
      textAlign: 'left',
      fontSize: 20,
    },
    list_title: {
      marginTop: 5,
      textAlign: 'left',
      fontSize: 25,
      fontWeight: 'bold'
    },
    list_subtitle: {
      marginBottom: 5,
      textAlign: 'left',
      fontSize: 20
    },
    list_icon: {
      marginBottom: 5,
      marginRight: 10
    },
    field_name: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    },
    field: {
      backgroundColor: '#F2F2F5',
      borderRadius: 5,
      height: 40,
      width: 250,
      marginBottom: 20,
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      border: 0
    },
    big_field: {
      backgroundColor: '#F2F2F5',
      borderRadius: 5,
      height: 150,
      width: 250,
      marginBottom: 20,
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      border: 0
    },
    picker: {
      backgroundColor: '#F2F2F5',
      borderRadius: 5,
      width: 250,
      marginBottom: 20,
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      border: 0
    },
    button: {
      marginTop: 30,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#6A79A8',
      width: 200
    },
    menu_button: {
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#F2F2F5',
      height: 150,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center'
    },
    list_button: {
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#F2F2F5',
      height: 100,
      width: 250,
      marginBottom: 20,
      marginTop: 10,
      padding: 20,
      justifyContent: 'center'
    },
    text: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold'
    },
    text_menu_button: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold'
    }
  }
);

export default styles;