import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S',];



const VideosScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function getUserInfo() {
        try {
          const data = await fetchUserInfo();
          console.log(userInfo)
        } catch (error) {
          // Handle error
        }
      }
  
      getUserInfo();
    }, []);

    function loadingDialog() {
        return (

            
            <Overlay
                isVisible={isLoading}
                overlayStyle={styles.dialogStyle}
            >
                <ActivityIndicator size={35} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {tr('wait')}
                </Text>
            </Overlay>
        )
    }
  
  
  async function fetchUserInfo() {
    setIsLoading(true)
    try {
    
        console.log('here')
      await AsyncStorage.getItem('token').then(async (storedValue) => {
        if (storedValue) {
      const response = await axios.get('https://xxtreme-fitness.com/api/auth/exercices', {
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      }).then(async (result) => { 
        console.log(result.data.userExercice)
        const data = await result.data.userExercice;
        setUserInfo(data);
      return data;
      });
      
        }})
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
    setIsLoading(false)
}

    function tr(key) {
        return t(`videosScreen:${key}`)
    }

    const monthsList = [t('calender:jan'), t('calender:feb'), t('calender:mar'), t('calender:apr'), t('calender:may'), t('calender:jun'), t('calender:jul'), t('calender:aug'), t('calender:sep'), t('calender:oct'), t('calender:nov'), t('calender:dec')];

    const [state, setState] = useState({
        defaultDate: new Date().getDate(),
        defaultMonth: new Date().getMonth(),
        defaultYear: new Date().getFullYear(),
        showFullCalender: false,
        selectedIndex: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { defaultDate, defaultMonth, defaultYear, showFullCalender, selectedIndex } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {calendarInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {selectedDayAndWorkoutsInfo()}
                            {workoutInfo()}
                            
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
                
            </View>
            {loadingDialog()}
        </SafeAreaView>
    )
    

    function workoutInfo() {
        const renderItem = ({ item }) => {
            const path = "https://api2v.xxtreme-fitness.com/"+item.exercice.image;
            console.log(path)
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => {
                        // console.log(item)
                        navigation.push('UserProgram', {item})
                    }}
                    style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}
                >
                    
                    {
                            <View
                                key={`${item.exercice.id}`}
                                style={styles.workoutInfoWrapStyle}
                            >
                                <View style={{ align: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={{ uri: path }}
                                        style={styles.workoutImageStyle}
                                    />
                                    <MaterialIcons
                                        name="play-arrow"
                                        size={40}
                                        color={Colors.whiteColor}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                                <View style={{ ...styles.workoutDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                                        {item.exercice.name}
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14Regular }}>
                                        {item.exercice.duree}
                                    </Text>
                                </View>
                            </View>
                    }
                </TouchableOpacity>
            )
        }
        return (
            <FlatList
                data={userInfo ? userInfo : ''}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        )
    }

    function selectedDayAndWorkoutsInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {defaultDate} {monthsList[defaultMonth]}
                </Text>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Today you have  {userInfo ? userInfo.length : ''} workout.
                </Text>
            </View>
        )
    }

    function calendarInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, flex: showFullCalender ? 1 : 0, zIndex: showFullCalender ? 1 : 0, }}>
                <View style={{
                    ...styles.calendarWrapStyle,
                    height: showFullCalender ? 380 : 150.0,
                }}>
                    <Calendar
                        monthFormat={`${defaultDate} MMMM  yyyy`}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={0}
                        renderArrow={direction => direction == 'left'
                            ?
                            <MaterialIcons name="arrow-back-ios" color={Colors.blackColor} size={20} style={{ marginLeft: -Sizes.fixPadding, bottom: 40.0, }} />
                            :
                            <MaterialIcons name="arrow-forward-ios" color={defaultMonth == new Date().getMonth() ? Colors.grayColor : Colors.blackColor} size={20} style={{ right: 20.0, bottom: 40.0, }} />
                        }
                        renderHeader={date => {
                            return (
                                <Text numberOfLines={1} style={{ ...styles.calenderSelectedDateStyle, maxWidth: width / 2.0 }}>
                                    {defaultDate} {monthsList[defaultMonth]} {defaultYear}
                                </Text>
                            )
                        }}
                        dayComponent={({ date, state }) => { return dayComponent({ date, state }) }}
                        theme={{
                            calendarBackground: 'transparent',
                            textSectionTitleColor: Colors.blackColor,
                            textMonthFontFamily: 'Montserrat_Regular',
                            textDayHeaderFontFamily: 'Montserrat_Medium',
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16,
                        }}
                        hideDayNames={true}
                        onPressArrowLeft={subtractMonth => {
                            subtractMonth()
                            updateState({ defaultMonth: defaultMonth - 1 })
                        }}
                        onPressArrowRight={addMonth => {
                            if (defaultMonth !== new Date().getMonth()) {
                                addMonth()
                                updateState({ defaultMonth: defaultMonth + 1 })
                            }
                        }}
                        enableSwipeMonths={true}
                        style={{ borderRadius: Sizes.fixPadding + 5.0, paddingTop: Sizes.fixPadding * 4.0, }}
                    />
                    {upDownCalenderIcon()}
                    {calendarDays()}
                </View>
            </View>
        )
    }

    function dayComponent({ date, state }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({
                        selectedDate: `${monthsList[date.month - 1]} ${date.year}`,
                        defaultDate: date.day,
                        defaultMonth: date.month - 1
                    })
                }}
                style={{
                    ...styles.dayWrapStyle,
                    backgroundColor: date.day == defaultDate ? Colors.primaryColor : Colors.whiteColor
                }}
            >
                <Text style={date.day == defaultDate ? { ...Fonts.whiteColor18SemiBold } : { ...Fonts.grayColor18SemiBold }}>
                    {date.day}
                </Text>
            </TouchableOpacity>
        )
    }

    function upDownCalenderIcon() {
        return (
            <MaterialIcons
                name={showFullCalender ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="black"
                style={{ position: 'absolute', right: 15.0, top: 15.0, }}
                onPress={() => updateState({ showFullCalender: !showFullCalender })}
            />
        )
    }

    function calendarDays() {
        return (
            <View style={{ ...styles.dayNameWrapStyle }}>
                {dayNames.map((item, index) => (
                    <Text
                        key={`${index}`}
                        style={{ width: 25.0, ...Fonts.blackColor18Bold, textAlign: 'center' }}
                    >
                        {item}
                    </Text>
                ))}
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

export default VideosScreen;


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.5,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    goalWrapStyle: {
        borderColor: Colors.primaryColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    },
    dialogStyle: {
        width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.5,
        paddingTop: Sizes.fixPadding * 3.0,
        elevation: 3.0,
    },
    calenderSelectedDateStyle: {
        flex: 1,
        ...Fonts.blackColor18Bold,
        bottom: 30.0,
        left: -100.0,
        position: 'absolute'
    },
    dayWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35.0,
        height: 35.0,
    },
    dayNameWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 15.0,
        right: 15.0,
        top: 50.0,
    },
    calendarWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 5.0,
        overflow: 'hidden'
    },
    workoutImageStyle: {
        width: '100%',
        height: 126.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        borderTopRightRadius: Sizes.fixPadding - 2.0,
        resizeMode: 'stretch'
    },
    workoutDetailWrapStyle: {
        padding: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    workoutInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 2.0,
        elevation: 2.0,
    }
})