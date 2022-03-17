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
      marginTop: 30,
      marginBottom: 40,
      textAlign: 'center',
      fontFamily: 'Arial',
      color: '#363636',
      fontSize: 18
    },
    list: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    list_title: {
      textAlign: 'left',
      fontSize: 18,
      marginTop: 10,
      color: '#363636'
    },
    list_subtitle: {
      textAlign: 'left',
      marginLeft: 10,
      marginTop: 5,
      color: '#6A79A8',
      fontSize: 13,
    },
    list_icon: {
      padding: 10,
      paddingLeft: 30,
      paddingRight: 10
    },
    sublist_icon: {
      marginTop: 5
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
      height: 150,
      width: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      shadowRadius: 15,
      shadowOpacity: 0.1
    },
    menu_button_container: {
      marginTop: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'center',
    },
    flex_row: {
      display: 'flex',
      flexDirection: 'row',
    },
    list_button: {
      marginTop: 20,
      paddingVertical: 5,
      borderRadius: 10,
      maxWidth: 380,
      minHeight: 75,
      alignContent: 'flex-start',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      shadowRadius: 15,
      shadowOpacity: 0.1
    },
    list_information: {
      marginLeft: 20,
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
      fontSize: 16.5,
      marginTop: 10,
      width: 100,
    }
  }
);

export default styles;