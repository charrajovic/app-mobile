import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`privacyPolicyScreen:${key}`)
    }

    const [state, setState] = useState({
        notification: true,
        autoUpdate: true,
        theme: true,
    });

    const { notification, autoUpdate, theme } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {notificationSetting()}
                    {applicationUpdateInfo()}
                    {themeInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function themeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                <View style={{ ...styles.settingWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
                        {tr('themes')}
                    </Text>
                    <Switch
                        value={theme}
                        onValueChange={() => updateState({ theme: !theme })}
                        color={Colors.primaryColor}
                        style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
                    />
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 20.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor14Regular }}>
                    {theme ? tr('darkMode') : tr('lightMode')}
                </Text>
            </View>
        )
    }

    function applicationUpdateInfo() {
        return (
            <View>
                <View style={{ ...styles.settingWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
                        {tr('applicationUpdate')}
                    </Text>
                    <Switch
                        value={autoUpdate}
                        onValueChange={() => updateState({ autoUpdate: !autoUpdate })}
                        color={Colors.primaryColor}
                        style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
                    />
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 15.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas proin nec, turpis iaculis viverra massa malesuada lacus.
                </Text>
            </View>
        )
    }

    function notificationSetting() {
        return (
            <View style={{ ...styles.settingWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
                    {tr('notification')}
                </Text>
                <Switch
                    value={notification}
                    onValueChange={() => updateState({ notification: !notification })}
                    color={Colors.primaryColor}
                    style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }], }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    settingWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})