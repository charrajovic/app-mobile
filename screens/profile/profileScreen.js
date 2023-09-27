import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useState } from 'react';
import { Fonts, Colors, Sizes } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');



const ProfileScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    AsyncStorage.getItem('token').then(async (storedValue) => {
        if (storedValue) {
            try {
                const response = await axios.get('https://xxtreme-fitness.com/api/auth/user', {
                  headers: {
                    Authorization: `Bearer ${storedValue}`,
                  },
                }).then((result) => {
                    // console.log(result.data)
                    data = result.data;
                    console.log('------------------------')
                    console.log('------------from home------------')
                    console.log(data)
                });
              } catch (error) {
                // Handle error
                console.error(error);
              }
        }
      });

    function tr(key) {
        return t(`profileScreen:${key}`)
    }

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <View style={styles.sheetStyle}>
                    {profilePic()}
                    {editProfileButton()}
                    
                </View>
            </View>
            {logoutDialog()}
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => setShowLogoutDialog(false)}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                        {tr('logoutInfo')}
                    </Text>
                    <View style={styles.cancelAndLogoutButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => setShowLogoutDialog(false)}
                            style={{ ...styles.cancelButtonStyle, ...styles.cancelAndLogoutButtonStyle, }}
                        >
                            <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.grayColor18SemiBold }}>
                                {tr('cancel')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => {
                                setShowLogoutDialog(false)
                                try {
                                    AsyncStorage.removeItem('token')
                                    
                                    navigation.push('Signin')
                                }
                                catch(e) {
                                    console.log(e)
                                }
                            }}
                            style={{ ...styles.logoutButtonStyle, ...styles.cancelAndLogoutButtonStyle, }}
                        >
                            <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.whiteColor18SemiBold }}>
                                {tr('logout')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
        )
    }

    function profileOptions() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/favorite.png'), option: tr('favourite'), onPress: () => { navigation.push('Favorite') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/progress.png'), option: tr('progressReport'), onPress: () => { navigation.push('ProgressReport') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/notification.png'), option: tr('notification'), onPress: () => { navigation.push('Notification') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/privacyPolicy.png'), option: tr('privacyPolicy'), onPress: () => { navigation.push('PrivacyPolicy') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/download.png'), option: tr('downloadVideo'), onPress: () => { navigation.push('Downloads') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/subscription.png'), option: tr('subscriptionPlan'), onPress: () => { navigation.push('UserSubscription') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/about.png'), option: tr('about'), onPress: () => { navigation.push('About') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/help.png'), option: tr('help'), onPress: () => { navigation.push('Help') } })}
                    {profileOptionShort({ icon: require('../../assets/images/settingIcons/language.png'), option: tr('languages'), onPress: () => { navigation.push('Language') } })}
                </View>
            </ScrollView>
        )
    }

    function profileOptionShort({ option, onPress, icon }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={onPress}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <Image
                            source={icon}
                            style={{ width: 16.0, height: 16.0, resizeMode: 'contain' }}
                        />
                        <Text numberOfLines={1} style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding,
                            marginRight: isRtl ? Sizes.fixPadding : 0.0,
                            flex: 1, ...Fonts.blackColor16SemiBold
                        }}>
                            {option}
                        </Text>
                    </View>
                    <MaterialIcons name={isRtl ? "arrow-back-ios" : "arrow-forward-ios"} size={18} color="black" />
                </TouchableOpacity>
                {
                    icon == require('../../assets/images/settingIcons/language.png')
                        ?
                        <View style={{ marginVertical: Sizes.fixPadding * 2.0 }} />
                        :
                        <View
                            style={{ marginVertical: Sizes.fixPadding * 2.0, backgroundColor: Colors.lightGrayColor, height: 1.0, }}
                        />
                }
            </View>
        )
    }

    function editProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('EditProfile')}
                style={styles.editProfileButtonStyle}
            >
                <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                    {tr('editProfile')}
                </Text>
            </TouchableOpacity>
        )
    }

    function profilePic() {
        return (
            <Image
                source={require('../../assets/images/user/user1.png')}
                style={styles.profilePicStyle}
            />
        )
    }

    function header() {
        return (
            <View style={{ padding: Sizes.fixPadding * 2.0, }}>
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor18SemiBold }}>
                    {tr('header')}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => setShowLogoutDialog(true)}
                    style={styles.logoutIconWrapStyle}
                >
                    <MaterialCommunityIcons name="logout" size={17} color={Colors.redColor} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProfileScreen

const styles = StyleSheet.create({
    logoutIconWrapStyle: {
        width: 28.0,
        height: 28.0,
        borderRadius: 14.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        right: 20.0,
        top: 20.0,
    },
    profilePicStyle: {
        width: width / 4.0,
        height: width / 4.0,
        borderRadius: (width / 4.0) / 2.0,
        marginTop: -40.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        alignSelf: 'center',
    },
    editProfileButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
        paddingHorizontal: Sizes.fixPadding * 4.0,
        marginVertical: Sizes.fixPadding,
        alignSelf: 'center',
    },
    sheetStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    cancelAndLogoutButtonStyle: {
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        flex: 1,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        marginRight: Sizes.fixPadding,
        borderColor: Colors.lightGrayColor,
    },
    logoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
    },
    cancelAndLogoutButtonWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})