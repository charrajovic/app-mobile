import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Dimensions, TouchableOpacity, ImageBackground, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

const DietCategoriesScreen = ({ navigation, route }) => {

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`dietCategoriesScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';

    const [dietCategories, setDietCategories] = useState(route.params.dietCategories);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {dietCategoriesData()}
            </View>
            {snackBar()}
        </SafeAreaView>
    )

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                style={{ elevation: 0.0, }}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        )
    }

    function updateDietCategories({ id }) {
        const copyData = dietCategories;
        const updatedData = copyData.map((item) => {
            if (item.id == id) {
                setSnackBarMsg(item.inFavorite ? tr('removeFromFav') : tr('addInFav'))
                return { ...item, inFavorite: !item.inFavorite }
            }
            else {
                return { ...item }
            }
        })
        setShowSnackBar(true);
        setDietCategories(updatedData);
    }

    function dietCategoriesData() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('DietCategoryDetail')}
                style={styles.dietCategoriesInfoWrapStyle}
            >
                <ImageBackground
                    source={item.foodImage}
                    style={{ height: height / 6.0 }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                    <MaterialIcons
                        name={item.inFavorite ? "favorite" : "favorite-outline"}
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                        onPress={() => updateDietCategories({ id: item.id })}
                    />
                </ImageBackground>
                <View style={{ alignItems: 'center', padding: Sizes.fixPadding - 5.0 }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.dietCategory}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Medium }}>
                        {item.planOfDays} day plan
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={dietCategories}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
                showsVerticalScrollIndicator={false}
            />
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

export default DietCategoriesScreen;

const styles = StyleSheet.create({
    dietCategoriesInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})