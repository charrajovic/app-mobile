import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');


const ProgressReportScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`progressReportScreen:${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
            </View>
        </SafeAreaView>
    )

    


    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
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

export default ProgressReportScreen;

const styles = StyleSheet.create({
    progressPercentageStyle: {
        position: 'absolute',
        textAlign: 'center',
        marginTop: Sizes.fixPadding,
        ...Fonts.primaryColor24SemiBold
    },
    progressInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        borderColor: Colors.lightGrayColor,
        borderWidth: 0.50,
        borderBottomWidth: 0.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
    }
})