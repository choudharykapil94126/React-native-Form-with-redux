import { View, Text , TextInput, Button, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import { addToArray } from '../store/actions/arrayActions';
import { updateToArray } from '../store/actions/arrayActions';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';
// import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
// import { useSelector } from 'react-redux';

const User = ({navigation,route}) => {
  const dispatch = useDispatch();
  const indexOfItem = route.params.index;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userName , setUserName] = useState(null);
  const [locationName , setLocationName] = useState(null);
  const [userArray , setUserArray] = useState([]);

  const [selectimage, setSelectedImage] = useState(null);

  useEffect(() => {
    requestLocationPermission()
    findLocation()
    requestCameraProperty()

  }, []);

  // const openImagePicker = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //     quality: 1,
  //   };
  //   }


  // const launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('Image picker error: ', response.error);
  //     } else {
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       setSelectedImage(imageUri);
  //     }
  //   });
  // };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  }
  
  useEffect(()=>{
  const fetchLocationName = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDTWIhZVf2a-guaVMA2sPvUXlcNsmL1CtA`
      );

      // Extract location name from response
      const addressComponents = response.data.results[0].address_components;
      let name = '';
      for (const component of addressComponents) {
        if (component.types.includes('locality')) {
          name = component.long_name;
          break;
        }
      }
      setLocationName(name);
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  fetchLocationName();
}, [latitude, longitude]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const findLocation = () =>{
     Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }

  const requestCameraProperty = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePress = ()=>{
    const data = {};
    data.name = userName;
    data.logitude = longitude;
    data.latitude = latitude;
    data.userImage = selectimage;
    data.userLocation = locationName;

    // setUserArray([...userArray,data]);
    // console.log(userArray);
    if(indexOfItem != null){
      dispatch(updateToArray(data,indexOfItem));
      navigation.goBack();
      console.log('update m h')
    }
    else{
      dispatch(addToArray(data));
      navigation.goBack();
      console.log('add m')
    }
  }

  

  return (
    <View style={{flex:1,justifyContent:"center"}}>
      <Text style={{alignSelf:"center", fontSize:24,color:"black"}}>LATITUDE:{latitude}</Text>
      <Text style={{alignSelf:"center", fontSize:24,color:"black"}}>LONGITUDE:{longitude}</Text>
      <Text style={{alignSelf:"center", fontSize:24,color:"black"}}>LOCATION:{locationName}</Text>

      {/* <Text>LOCATION_NAME:{locationName}</Text> */}
      {selectimage ?
        <View style={{ height: 200, width: 200,alignSelf:"center"}}>
          <Image source={{ uri: selectimage }} style={{ width: 200, height: 200 }} />
        </View>
       : <View style={{width:200,height:200,alignSelf:"center",marginTop:"10%",borderWidth: 1,borderColor: "thistle",borderRadius: 50}}>
          <TouchableOpacity onPress={handleCameraLaunch} style={{alignSelf:"center",marginTop:"40%"}}>
            <Text style={{color:"black"}}>Press for Click Photo</Text>
          </TouchableOpacity>
         </View>}
      <TextInput
        style={{ height: 40,margin: 12,borderWidth: 1,padding: 10,borderRadius:15,width:"80%",alignSelf:"center",color:"black" }}
        onChangeText={setUserName}
        placeholderTextColor="grey"
        placeholder='Plese fill your name'
        value={userName}
      />

      

      <View style={{width:"80%",alignSelf:"center", marginTop:"10%"}}>
      <Button title="Submit" onPress={()=>handlePress()} disabled={!selectimage || !userName}/>
      </View>
{/* 
      <View style={{width:"80%",alignSelf:"center",marginTop:"10%",borderRadius:15}}>
      <Button title="internal upload" onPress={openImagePicker}/>
      </View> */}








    </View>
  )
}


export default User