// import {firebase} from '@react-native-firebase/database';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import shortid from 'shortid';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';


const Add = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loader, setLoader] = useState(false); 
  
  /////
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  

  //////////////////////////////////////////////////////////////////

  //  const getLatLong = async () => {

  // Geocoder.init('AIzaSyBWPqklBvAiQYDqUO9OjPBudm35SB1UwAc');

  //    await Geocoder.from('india')
  //      .then(json => {
  //        var location = json.results[0].geometry.location;
  //        console.log('here is letLong', location);
  //      })
  //      .catch(error => console.warn(error));
  //  };

  // =============== OR ================


  const getLatLong = () => {
    Geocoder.init("AIzaSyAz4oWljxY4v66PMNiD0bEx7bhVMC_aw00");
    Geocoder.from('Colosseum')
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
      })
      .catch(error => console.warn(error))
    }

  /////////////////////////////////////////////////
    // fetchching the current lat long of user 


  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
    });
  };

   useEffect(() => {
     getCurrentPosition();
   }, []);

  // ///////////////////////////////////////////////////

  const addDetails = async () => {
    if (!name || !contactNumber || !district || !city || !zipCode) {
      alert('please provide all the field details');
    } else {
      setLoader(true);
      const userData = {
        name,
        contactNumber,
        district,
        city,
        zipCode,
        id: shortid.generate(),
        lat,
        long,
      };

      const resp = await fetch(
        'https://fictionapp-356b3-default-rtdb.firebaseio.com/places.json',
        {
          method: 'post',
          body: JSON.stringify(userData), //should pass strings only thatz y why stringfy
        },
      );
      const addedData = await resp.json();
      console.log('added data', addedData);

      //  getCurrentPosition();

      navigation.navigate('Home');
      setLoader(false);
    }
  };

  if (loader == true) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* heading */}
        <View style={styles.heading}>
          <Text style={styles.headingText}>Fill the Details Below</Text>
        </View>

        {/* Form ********* */}
        <View style={styles.form}>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Name"
              style={styles.formInput}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              keyboardType="numeric"
              placeholder="contact Number"
              style={styles.formInput}
              value={contactNumber}
              onChangeText={text => setContactNumber(text)}
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              placeholder="district"
              style={styles.formInput}
              value={district}
              onChangeText={text => setDistrict(text)}
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              placeholder="city"
              style={styles.formInput}
              value={city}
              onChangeText={text => setCity(text)}
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Zip code/ Pin code"
              keyboardType="number-pad"
              style={styles.formInput}
              value={zipCode}
              onChangeText={text => setZipCode(text)}
            />
          </View>
          <View style={styles.btnWrap}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn}
              onPress={addDetails}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    backgroundColor: 'green',
  },

  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '5%',
  },
  headingText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#ffe26e',
  },
  form: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  formItem: {
    marginBottom: '5%',
    backgroundColor: '#ffe26e',
    borderRadius: 20,
  },
  formInput: {
    paddingLeft: '5%',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '2%',
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
});

export default Add;
