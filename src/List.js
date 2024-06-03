import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';

const List = ({navigation}) => {
  const array = useSelector((state) => state.array);
  console.log(array);

  const handlePress = (index)=>{
    navigation.navigate('User',{index:index})
  }
    return (
      <ScrollView style={styles.mainContainer}>
      {array.map((item,index)=>(
        <TouchableOpacity style={styles.container} onPress={()=>handlePress(index)}>
          <Image source={{uri:item.userImage}} style={styles.image} />
          <Text style={styles.title}>UserName:{item.name}</Text>
          <Text style={styles.title}>UserLocation:{item.userLocation}</Text>

          <Text style={styles.title}>Logitude:{item.logitude}</Text>
          <Text style={styles.title}>Logitude:{item.latitude}</Text>
        </TouchableOpacity>
      )
    )}
    </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      mainContainer:{
        backgroundColor:"#36454F"
      },
      container: {
        width:250,
        alignSelf:"center",
        alignItems: 'center',
        marginBottom:10,
        marginTop:10,
        backgroundColor:"#F0F8FF",
        padding: 10,
        borderRadius:30
      },
      image: {
        marginTop:40,
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
        borderRadius: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'purple'
      },
    });
export default List