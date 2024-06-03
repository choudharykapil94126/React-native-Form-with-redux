import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react'

const Home = ({navigation}) => {

    const NaviToUserInput=()=>{
        navigation.navigate('User',{
            index:null
        })
    }

    const NaviToAllUserList=()=>{
        navigation.navigate('List')
    }

  return (
    <View style={styles.container}>
        <View>
            <View style={{width:"80%",alignSelf:"center"}}>
            <Button
                title="Click To Add User Data"
                onPress={()=>NaviToUserInput()}
            />
            </View>
             <View style={{marginTop:"10%",width:"80%",alignSelf:"center"}}>
            <Button
                title="Click to See User Data List"
                onPress={()=>NaviToAllUserList()}
            />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",

    }
})

export default Home


// `
// https://maps.googleapis.com/maps/api/geocode/json?latlng=
// ${
// waypoint.lat
// }
// ,
// ${
// waypoint.lng
// }
// &key=AIzaSyDTWIhZVf2a-guaVMA2sPvUXlcNsmL1CtA