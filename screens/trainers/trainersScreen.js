import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, FlatList, TextInput, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const trainers = [
    {
        id: '1',
        trainerImage: require('../../assets/images/coachs/1.jpeg'),
        trainerName: "Aatif",
        speciality: "Coach",
        yearOfExperience: 6,
        rating: 4.5,
    },
    {
        id: '2',
        trainerImage: require('../../assets/images/coachs/2.jpeg'),
        trainerName: "Mouad",
        speciality: "Coach",
        yearOfExperience: 5,
        rating: 4.5,
    },
    {
        id: '3',
        trainerImage: require('../../assets/images/coachs/3.jpeg'),
        trainerName: "Coach 3",
        speciality: "Coach",
        yearOfExperience: 6,
        rating: 4.5,
    },
    
];

const TrainersScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`trainersScreen:${key}`)
    }

    const [search, setSearch] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {searchField()}
                {trainersData()}
            </View>
        </SafeAreaView>
    )

    function trainersData() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('TrainerProfile', {item})}
                style={{ ...styles.trainerInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}
            >
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', }}>
                    <Image
                        source={item.trainerImage}
                        style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <View style={{ marginBottom: Sizes.fixPadding - 6.0 }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.trainerName}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                {item.speciality}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 6.0, }}>
                            <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                                {item.yearOfExperience} {tr('years')}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                {tr('experiance')}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={16} color={Colors.yellowColor} />
                    <Text style={{
                        marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 7.0,
                        marginRight: isRtl ? Sizes.fixPadding - 7.0 : 0.0,
                        ...Fonts.blackColor14SemiBold
                    }}>
                        {item.rating}
                    </Text>
                </View>
            </TouchableOpacity >
        )
        return (
            <FlatList
                data={trainers}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function searchField() {
        return (
            <View style={{ ...styles.searchFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <MaterialIcons name="search" size={22} color={Colors.grayColor} />
                <TextInput
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

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

export default TrainersScreen;

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: '#F0F0F0',
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        marginLeft: Sizes.fixPadding,
        ...Fonts.blackColor14Medium,
        flex: 1,
        height: 20.0,
    },
    trainerInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    }
})