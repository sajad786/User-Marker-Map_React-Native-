import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

export default class test extends Component {
  render() {
    return (
      <View style={styles.MainContainer}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: 28.57966,
            longitude: 77.32111,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: 28.57966, longitude: 77.32111}}
            title={'initial marker'}
            description={'something '}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
