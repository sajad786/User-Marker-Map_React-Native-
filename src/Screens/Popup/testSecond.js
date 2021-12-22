import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';


 const  testSecond = () => {
        const [lat, setLat] = useState(0)
        const [long, setLong] = useState(0)

    //  getData () {
    //     Geocoder.init('AIzaSyAz4oWljxY4v66PMNiD0bEx7bhVMC_aw00');
    //     Geocoder.from('new delhi')
    //       .then(json => {
    //         var location = json.results[0].geometry.location;
    //         alert(location);
    //       })
    //       .catch(error => console.warn(error));

    // }
    
     
    useEffect(() => {
     getCurrentPosition();
    }, [input])

   const  getCurrentPosition = () => {
        Geolocation.getCurrentPosition(info => {
            console.log(info);
            setLat(info.coords.latitude);
            setLong(info.coords.longitude);
        });

    }
        return (
          <View style={styles.MainContainer}>
            <TouchableOpacity
              onPress={() => {
                getCurrentPosition();
              }}>
              <Text>Get data</Text>
            </TouchableOpacity>
            <Text>{lat}</Text>
            <Text>{long}</Text>
          </View>
        );
    
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: "white",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

});

export default testSecond