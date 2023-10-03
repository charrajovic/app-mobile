import { SafeAreaView, Text, View, StatusBar, Image, Dimensions } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../constants/styles'

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <StatusBar translucent={false} backgroundColor={Colors.yellowColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {appIcon()}
                {appName()}
            </View>
        </SafeAreaView>
    )

    function appName() {
        return (
            <Text style={{ ...Fonts.primaryColor48SemiBold }}>
                Fitness
            </Text>
        )
    }

    function appIcon() {
        return (
            <Image
                source={require('../assets/images/icons/appIcon.png')}
                style={{ width: width / 5.0, height: width / 5.0, resizeMode: 'contain' }}
            />
        )
    }
}

export default SplashScreen;
