import React, { useEffect, useState} from  'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout ,PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import iconLogo from '../images/icon-logo.png';
import api from '../services/api';

interface NursingHome {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function NursingHomeMap() {
    const [nursingHome, setNursingHome] = useState<NursingHome[]>([]);

    const navigation = useNavigation();

    useEffect(() => {
      api.get('/nursingHome').then(response => {
        setNursingHome(response.data);

      });
    }, []);

    function handleNavigationNursingHomeOne(id: number) {
        navigation.navigate('NursingHomeOne', { id })
    }

    function handleNavigationToCreateNursing() {
      navigation.navigate('SelectMapPosition')
    }

    return (

    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -15.796331,
          longitude: -47.9008521,
          latitudeDelta: 0.080,
          longitudeDelta: 0.080,
        }} 
      >
        {nursingHome.map(NursingHome => {
          return (
            <Marker
            key={NursingHome.id}
            icon={iconLogo}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
          }}
          coordinate={{
            latitude: NursingHome.latitude,
            longitude: NursingHome.longitude,
          }}
          >
            <Callout 
              tooltip={true}
              onPress={() => handleNavigationNursingHomeOne(NursingHome.id)}
            >
              <View style={styles.calloutContainer}>
        <Text style={styles.calloutText}>{NursingHome.name}</Text>
              </View>

            </Callout>
          </Marker>
          )
        })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{nursingHome.length} orfanatos encontrados</Text>

        <RectButton 
          style={styles.createNursingButton} 
          onPress={handleNavigationToCreateNursing}>
            <Feather name="plus" size={20} color="#fff"/>
        </RectButton>
      </View>

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 16,
      justifyContent: 'center',
      
    },
  
    calloutText: {    
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createNursingButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  });