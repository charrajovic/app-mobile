import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState,  useCallback, useRef  } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const LanguagesScreen = ({ navigation, route }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    console.log(isRtl)
    const listRef = useRef();
    const [backClickCount, setBackClickCount] = useState(0);
    const [currentScreen, setCurrentScreen] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);

    function tr(key) {
        return t(`languagesScreen:${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {languages()}
                {skipNextAndLoginText()}
            </View>
        </SafeAreaView>
    )

    function languages() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}>
                
                {languageShort({ language: `${tr('french')}`, lang: 'id' })}
                {languageShort({ language: `${tr('english')}`, lang: 'en' })}
                {languageShort({ language: `${tr('arabic')}`, lang: 'ar' })}
            </ScrollView>
        )
    }

    async function onChangeLang(lang) {
        i18n.changeLanguage(lang);
        try {
            await AsyncStorage.setItem('@APP:languageCode', lang);
        } catch (error) {
            alert('something goes wrong')
        }
    }

    function languageShort({ language, lang }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                    onChangeLang(lang)
                    setSelectedLanguage(lang)
                }}
                style={{ ...styles.languageWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}
            >
                <View style={{
                    ...styles.radioButtonStyle,
                    borderColor: selectedLanguage == lang ? Colors.lightPrimaryColor : Colors.whiteColor,
                    backgroundColor: selectedLanguage == lang ? Colors.lightPrimaryColor : Colors.grayColor,
                }}>
                    <View style={{ backgroundColor: Colors.whiteColor, width: 8.0, height: 8.0, borderRadius: 4.0 }} />
                </View>
                <Text style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0, ...Fonts.blackColor16Medium }}>
                    {language}
                </Text>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
    function skipNextAndLoginText() {
        return (
            <View style={{ ...styles.skipNextAndLogoinWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text
                    onPress={() => { navigation.push('Signin') }}
                    style={{ ...Fonts.blackColor16SemiBold }}
                >
                    {currentScreen == 2 ? '' : tr('skip')}
                </Text>
                <Text
                    onPress={() => currentScreen >= 0 ? navigation.push('Signin') : scrollToIndex({ index: currentScreen + 1 })}
                    style={{ ...Fonts.primaryColor16SemiBold }}
                >
                    {currentScreen == 2 ? tr('signin') : tr('next')}
                </Text>
            </View>
        )
    }
}


export default LanguagesScreen;

const styles = StyleSheet.create({
    languageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    skipNextAndLogoinWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    radioButtonStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    }
})