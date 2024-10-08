import React from 'react'
import { ActivityIndicator, ImageBackground } from 'react-native'
import COLORS from '../assets/colors/Colors'
import IMAGES from '../assets/images/Images'
import { SpaceComponent } from '../components'

const SplashScreen = () => {

    return (
        <ImageBackground source={IMAGES.SplashScreen} style = {{flex: 1}}>
            <SpaceComponent height={400}/>
            <ActivityIndicator color={COLORS.WHITE} size={40}/>
        </ImageBackground>
    )
}

export default SplashScreen