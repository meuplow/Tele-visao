import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundColor: '#fff',
    container: {
      margin: 20,
      display: 'flex',
      backgroundColor: '#fff',
      color: '#363636'
    },
    welcome: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10
    },
    title: {
      textAlign: 'center',
      fontSize: 21,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#363636'
    },
    menu: {
      marginTop: 40,
      marginBottom: 10,
      alignContent: 'center',
      fontFamily: 'Arial',
      textAlign: 'center',
      fontSize: 21,
      color: '#363636',
      fontWeight: 'normal',
    },
    subtitle: {
      marginBottom: 16,
      textAlign: 'center',
      fontFamily: 'Arial',
      color: '#363636',
      fontSize: 13,
    },
    list: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    list_title: {
      marginTop: 5,
      textAlign: 'left',
      fontSize: 20,
      fontWeight: 'bold'
    },
    list_subtitle: {
      textAlign: 'left',
      marginLeft: 10,
      marginTop: 5,
      fontSize: 15
    },
    list_icon: {
      padding: 10
    },
    field_name: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    },
    field_name_left: {
      display: 'flex',
      marginLeft: 'auto',
      textAlign: 'left',
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
      paddingHorizontal: 20
    },
    big_field: {
      backgroundColor: '#F2F2F5',
      borderRadius: 5,
      height: 150,
      width: 250,
      marginBottom: 20,
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    picker: {
      backgroundColor: '#F2F2F5',
      borderRadius: 5,
      width: 250,
      marginBottom: 20,
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    button: {
      marginTop: 30,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#6A79A8',
      width: 200
    },
    menu_button: {
      margin: 10,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: '#F7EFEE',
      height: 150,
      width: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    menu_button_container: {
      marginTop: 5,
      display: 'flex',
      flexDirection: 'row',
    },
    list_button: {
      height: 100,
      width: 250,
      padding: 20,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 20,
      paddingVertical: 10,
      backgroundColor: '#F2F2F5'
    },
    list_button_local: {
      display: 'flex',
      flexDirection: 'row'
    },
    text: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold'
    },
    text_menu_button: {
      fontFamily: 'Arial',
      color: '#363636',
      textAlign: 'center',
      fontSize: 15,
      marginTop: 10,
      width: 100,
      fontWeight: 'bold'
    }
  }
);

export default styles;