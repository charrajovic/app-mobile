import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Fonts, Colors, Sizes } from '../../constants/styles';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');



const WorkoutScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`workoutScreen:${key}`)
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    {workouts()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )



    function workouts() {
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                {tr('header')}
                </Text>
                <View>
                    {workoutsShort({ icon: require('../../assets/images/icons/workout.png'), title: tr('header'), onPress: () => { navigation.push('Videos') } })}
                    {workoutsShort({ icon: require('../../assets/images/icons/trainer.png'), title: tr('trainer'), onPress: () => { navigation.push('Trainers') } })}
                </View>
            </View>
        )
    }

    function workoutsShort({ icon, title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.50}
                onPress={onPress}
                style={styles.workoutsWrapStyle}
            >
                <Image
                    source={icon}
                    style={{ height: height / 5.0, resizeMode: 'contain', marginBottom: Sizes.fixPadding + 8.0 }}
                />
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    
    

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                {tr('header')}
            </Text>
        )
    }
}

export default WorkoutScreen

const styles = StyleSheet.create({
    workoutInfoWrapStyle: {
        marginTop: -Sizes.fixPadding * 4.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    workoutCategoryImageCoverStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    workoutsWrapStyle: {
        paddingVertical: Sizes.fixPadding + 8.0,
        backgroundColor: Colors.whiteColor, elevation: 2.0,
        borderRadius: Sizes.fixPadding + 2.0,
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        borderBottomWidth: 0.0,
        borderColor: Colors.blackColor,
        borderWidth: 1,
        margin: 10
    },
    workoutThumbImageStyle: {
        width: width / 1.7,
        height: width / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currencyWrapStyle: {
        backgroundColor: Colors.lightPrimaryColor,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5.0,
        right: 5.0,
    },
    buttonStyle: {
        backgroundColor: Colors.lightPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
})