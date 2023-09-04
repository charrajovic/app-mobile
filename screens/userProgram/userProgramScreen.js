import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image, BackHandler, Dimensions } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VideoPlayer from 'expo-video-player';
import { ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');


const UserProgramScreen = ({ navigation, route }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    const itm = route.params.item.exercice;

    console.log(itm)

    function tr(key) {
        return t(`userProgramScreen:${key}`)
    }

    const [inFullscreen2, setInFullsreen2] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [inFavorite, setInFavorite] = useState(false);


    const backAction = async () => {
        if (inFullscreen2) {
            await changeScreenToPotrait()
            setInFullsreen2(false)
        }
        else {
            navigation.pop()
        }
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    useEffect(() => {
        return async () => {
            await changeScreenToPotrait();
        };
    }, []);

    async function changeScreenToPotrait() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar hidden={inFullscreen2 ? true : false} translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {videoDisplay()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {trainerInfo()}
                    {caloriesEquipmentAndDurationInfo()}
                    {benifitsInfo()}
                    {sessionDetail()}
                </ScrollView>
            </View>
            {snackBar()}
        </SafeAreaView>
    )


    function sessionDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('sessionDetails')}
                </Text>
                {beginWithTotalMinuteInfo()}
                {sessionDetailWithSession()}
            </View>
        )
    }

    function sessionDetailWithSession() {
        return (
            <View>
                {itm.sessions ? itm.sessions.map((item) => (
                    <View
                        key={`${item.id}`}
                        style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                    >
                        <View style={{ width: 20.0, height: 4.0, backgroundColor: ('#' + Math.random().toString(16).substr(-6)) }} />
                        <Text style={{ marginRight: Sizes.fixPadding + 10.0, marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Regular }}>
                            {!item.duree ? 0 : item.duree.length == 1 ? `0${item.duree}` : item.duree} min
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.name}
                        </Text>
                    </View>
                )) : ''}
            </View>
        )
    }

    function beginWithTotalMinuteInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>
                    {tr('begin')}
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', flex: 1, }}>
                    {itm.sessions ? itm.sessions.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{
                                backgroundColor: '#' + Math.random().toString(16).substr(-6),
                                flex: parseInt(item.duree) / itm.sessions.reduce((s, { duree }) => s + parseInt(duree), 0),
                                height: 4.0,
                                marginHorizontal: Sizes.fixPadding - 9.0
                            }} />
                    )) : ''}
                </View>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {itm.sessions.reduce((s, { duree }) => s + parseInt(duree), 0)} {tr('min')}
                </Text>
            </View>
        )
    }

    function benifitsInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('benefits')}
                </Text>
                {
                   itm.benefits ? itm.benefits.split(' ').map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                •
                            </Text>
                            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                                {item}
                            </Text>
                        </View>
                    )) : ''
                }
            </View>
        )
    }

    function caloriesEquipmentAndDurationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                {caloriesInfo()}
                <View style={{ width: 1.0, backgroundColor: Colors.grayColor, height: '100%', marginHorizontal: Sizes.fixPadding * 2.0, }} />
                {equipmentInfo()}
                <View style={{ width: 1.0, backgroundColor: Colors.grayColor, height: '100%', marginHorizontal: Sizes.fixPadding * 2.0, }} />
                {durationInfo()}
            </View>
        )
    }

    function caloriesInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('calories')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/calories.png')}
                        style={{ width: 15.0, height: 15.0, resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        {itm.calories}
                    </Text>
                </View>
            </View>
        )
    }

    function durationInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('netDuration')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="clock-time-four" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        {itm.duree} min.
                    </Text>
                </View>
            </View>
        )
    }

    function equipmentInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('equpiment')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="fitness-center" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        {itm.equipments ? itm.equipments : 'None'}
                    </Text>
                </View>
            </View>
        )
    }

    function snackBar() {
        return (
            <Snackbar
                style={{ backgroundColor: Colors.lightBlackColor, elevation: 0.0 }}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {inFavorite ? tr('addInFav') : tr('removeFromFav')}
            </Snackbar>
        )
    }

    function trainerInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ ...Fonts.blackColor18SemiBold }}>
                        {itm.name}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor14SemiBold }}>
                        {itm.description}
                    </Text>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <MaterialIcons
                        name={inFavorite ? "favorite" : "favorite-outline"}
                        size={24}
                        color={Colors.primaryColor}
                        style={{ marginRight: isRtl ? 0.0 : Sizes.fixPadding + 5.0, marginLeft: isRtl ? Sizes.fixPadding + 5.0 : 0.0 }}
                        onPress={() => {
                            setShowSnackBar(true)
                            setInFavorite(!inFavorite)
                        }}
                    />
                    <Octicons name="download" size={25} color={Colors.primaryColor} />
                </View>
            </View>
        )
    }

    function videoDisplay() {
        return (
            <View>
                <VideoPlayer
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.STRETCH,
                        source: require('../../assets/images/ex/2.mp4')
                    }}
                    slider={{ visible: true, }}
                    style={{
                        videoBackgroundColor: Colors.lightGrayColor,
                        height: inFullscreen2 ? width : 230.0,
                        width: inFullscreen2 ? height : width,
                    }}
                    icon={{
                        pause: <MaterialIcons name='pause' color={Colors.whiteColor} size={40} style={{ marginBottom: 20.0, }} />,
                        play: <MaterialIcons name='play-arrow' color={Colors.whiteColor} size={40} style={{ marginBottom: 20.0, }} />,
                        replay: <MaterialIcons name="replay" color={Colors.whiteColor} size={40} style={{ marginBottom: 20.0, }} />,
                    }}
                    activityIndicator={{ color: Colors.whiteColor, size: 40.0, marginBottom: 20.0 }}
                    fullscreen={{
                        inFullscreen: inFullscreen2,
                        enterFullscreen: async () => {
                            setInFullsreen2(!inFullscreen2)
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                        },
                        exitFullscreen: async () => {
                            setInFullsreen2(!inFullscreen2)
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                        },
                    }}
                />
                {header()}
            </View>
        )
    }

    function header() {
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.whiteColor}
                    onPress={async () => {
                        if (inFullscreen2) {
                            await changeScreenToPotrait()
                            setInFullsreen2(false)
                        }
                        else {
                            navigation.pop()
                        }
                    }}
                />
                <MaterialIcons name="share" size={24} color={Colors.whiteColor} />
            </View>
        )
    }
}

export default UserProgramScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        top: 20.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    videoThumbImageCoverStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
})