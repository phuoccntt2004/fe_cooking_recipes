import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import { DetailCookingRecipes } from '../screen';


const MainNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='TabNavigator' component={TabNavigator}/>
            <Stack.Screen name='DetailCookingRecipes' component={DetailCookingRecipes}/>
        </Stack.Navigator>
    )
}

export default MainNavigator