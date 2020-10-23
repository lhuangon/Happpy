import React from  'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import NursingHomeMap from './pages/NursingHomeMap';
import NursingHomeOne from './pages/NursingHomeOne';

import SelectMapPosition from './pages/createNursingHome/SelectMapPosition';
import NursingHomeData from './pages/createNursingHome/NursingHomeData';
import Header from './components/Header';


export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen 
                    name="NursingHome" 
                    component={NursingHomeMap}
                />
                <Screen 
                    name="NursingHomeOne" 
                    component={NursingHomeOne} 
                    options={{ 
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato"/>
                    }}
                />
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{ 
                        headerShown: true,
                        header: () => <Header title="Selectione no Mapa"/>
                    }}
                />
                <Screen 
                    name="NursingData" 
                    component={NursingHomeData}
                    options={{ 
                        headerShown: true,
                        header: () => <Header title="Informe os dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
};