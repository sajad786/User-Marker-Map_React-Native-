import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Button,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useIsFocused} from '@react-navigation/native';
    




const Home = ({navigation, route}) => {
  const [fetchedData, setFetchedData] = useState([]);
  const isFocused = useIsFocused();




  
 

  // const getLatLong = async () => {
    // Geocoder.init('AIzaSyCuhCjB3gBdzNrmTBe3ZsuaCzx_cFzkjEs');
  //   Geocoder.from('Colosseum')
  //     .then(json => {
  //       var location = json.results[0].geometry.location;
  //       console.log('here is letLong', location);
  //     })
  //     .catch(error => console.warn(error));
  // };

  

  useEffect(() => {
    fetchUserPlaces();
  }, [isFocused]);

  const fetchUserPlaces = async () => {
    try {
      const resp = await fetch(
        'https://fictionapp-356b3-default-rtdb.firebaseio.com/places.json',
      );
      const data = await resp.json();
      console.log('fetched data', data);

      let usersFetchedData = [];

      for (let key in data) {
        usersFetchedData.push(data[key]);
      }

      setFetchedData(usersFetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  const userLatLong = [];

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <MapView
        initialRegion={{
          latitude: -33.447487,
          longitude: -70.673676,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 1}}>
        <Marker
          // onPress={() => popupScreen}
          coordinate={{latitude: -33.447487, longitude: -70.673676}}
          title="Origin Marker"
          description="initial Marker has been added "
          >
          <Image
            style={styles.markerImage}
            source={require('./../../Assets/Images/homeMarker.png')}
          />
          {fetchedData.map((item) =>(
            console.log(item.city, item.contactNumber, "data item!!!")
            
            )
          ) }
          <Callout tooltip>
            <View style={styles.popup}>
              <View style={styles.PopTextWrapper}>
                <Text> Name </Text>
                <Text>Contact number </Text>
                <Text> District </Text>
                <Text>City</Text>
                <Text> Zip code</Text>
              </View>
              <View style={styles.btnWrap}>
                <TouchableOpacity style={styles.btn}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Callout>
        </Marker>
        
      </MapView> */}

      <MapView
        initialRegion={{
          latitude: 21.7679,
          longitude: 78.8718,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 1}}>
        {fetchedData.map((marker, index) => {
          console.log('lat', marker.lat);
          console.log('long', marker.long);
          return (
            <Marker
              key={index}
              coordinate={{latitude: marker.lat, longitude: marker.long}}
              title={marker.district}
              description="click and get the details">
              <Callout tooltip>
                <View style={styles.popup}>
                  <View style={styles.PopTextWrapper}>
                    <Text> {marker.name} </Text>
                    <Text>{marker.contactNumber} </Text>
                    <Text> {marker.district} </Text>
                    <Text>{marker.city}</Text>
                    <Text> {marker.zipCode}</Text>
                  </View>
                  <View style={styles.btnWrap}>
                    <TouchableOpacity onPress={() => marker[index].hideCallout()} style={styles.btn}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('clicked me') } style={styles.btn}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}


      </MapView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Add')}
        style={styles.touchableOpacityStyle}>
        <Image
          source={require('../../Assets/Images/plus.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 40,
    backgroundColor: 'green',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    tintColor: 'white',
    //backgroundColor:'black'
  },
  markerImage: {
    height: 35,
    width: 35,
  },
  popup: {
    // flex:1,
    height: 150,
    width: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  PopTextWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },

  btn: {
    backgroundColor: '#ffe26e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Home;
