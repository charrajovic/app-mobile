import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image, Dimensions, FlatList, Linking, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const { width } = Dimensions.get('window');

const todaysPlans = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food1.png'),
        mealsCategory: 'Breakfast',
        eatTime: '8:00AM - 8.30AM',
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food2.png'),
        mealsCategory: 'Lunch',
        eatTime: '12.30PM - 1.00PM',
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food3.png'),
        mealsCategory: 'Snacks',
        eatTime: '5.00PM - 6.00PM',
    },
    {
        id: '4',
        foodImage: require('../../assets/images/food/food4.png'),
        mealsCategory: 'Dinner',
        eatTime: '8.00PM - 9.00PM',
    }
];

const trainers = [
    {
        id: '1',
        trainerImage: require('../../assets/images/coachs/1.jpeg'),
        trainerName: 'Aatif',
        specialist: 'Coach',
        rating: 4.5,
    },
    {
        id: '2',
        trainerImage: require('../../assets/images/coachs/2.jpeg'),
        trainerName: 'Mouad',
        specialist: 'Coach',
        rating: 4.5,
    },
    {
        id: '3',
        trainerImage: require('../../assets/images/coachs/3.jpeg'),
        trainerName: 'hamza',
        specialist: 'Coach',
        rating: 4.5,
    }
];

const popularWorkouts = [
    {
        id: '1',
        workoutThumbImage: require('../../assets/images/exercises/exercise2.png'),
    },
    {
        id: '2',
        workoutThumbImage: require('../../assets/images/exercises/exercise3.png'),
    },
    {
        id: '3',
        workoutThumbImage: require('../../assets/images/exercises/exercise4.png'),
    },
];

const motivationalVideos = [
    {
        id: '1',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise5.png')
    },
    {
        id: '2',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise6.png')
    },
    {
        id: '3',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise7.png')
    },
];

const HomeScreen = ({ navigation, route, screenProps }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';
    

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    const [userInfo, setUserInfo] = useState(null);
    const [dietsInfo, setDietsInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Add a navigation event listener
        const unsubscribe = navigation.addListener('focus', () => {
          // This code will run every time the screen comes into focus
          console.log('Screen is in focus');
          fetchUserInfo()
        });
        
        // Clean up the event listener when the component unmounts
        return unsubscribe;
      }, [navigation]);

      function loadingDialog() {
        return (

            
            <Overlay
                isVisible={isLoading}
                overlayStyle={styles.dialogStyle}
            >
                <ActivityIndicator size={35} color={Colors.lightPrimaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {tr('wait')}
                </Text>
            </Overlay>
        )
    }

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
  
  
  async function fetchUserInfo() {
    setIsLoading(true)
    try {
        console.log('here')
      await AsyncStorage.getItem('token').then(async (storedValue) => {
        if (storedValue) {
      const response = await axios.get('https://api2v.xxtreme-fitness.com/api/auth/user', {
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      }).then(async (result) => { 
        // console.log(result.data)
        const data = await result.data;
        setUserInfo(data);
        setIsLoading(false)
      return data;
      }).catch((e) => {
        setIsLoading(false)
      });
      
        }})
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
    setIsLoading(false)
    setIsLoading(true)
    try {
        await AsyncStorage.getItem('token').then(async (storedValue) => {
            if (storedValue) {
          const response = await axios.get('https://api2v.xxtreme-fitness.com/api/auth/exercices', {
            headers: {
              Authorization: `Bearer ${storedValue}`,
            },
          }).then(async (result) => { 
            console.log(result.data)
            const data = await result.data.userDiet;
            setDietsInfo(data);
    setIsLoading(false)
          return data;
          }).catch((e)=> {
    setIsLoading(false)

          });
          
            }})
        } catch (error) {
          console.error('Error fetching user information:', error);
          throw error;
    setIsLoading(false)

        }
        setIsLoading(false)
    
}
    

    function tr(key) {
        return t(`homeScreen:${key}`)
    }
    if(userInfo?.status == 1) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
                <View style={{ flex: 1, }}>
                    
                    {header()}
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {console.log('(------------)')}
                    {banner('Your account is pending please contact the admin.')}
                    
                </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
    if(userInfo?.status == 0) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
                <View style={{ flex: 1, }}>
                    
                    {header()}
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {console.log('(------------)')}
                    {banner('Your account is rejected please contact the admin.')}
                    
                </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
    else {
        return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1, }}>
                
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {console.log('(------------)')}
                    {banner()}
                    {todaysPlan()}
                    {trainersInfo()}
                    
                </ScrollView>
                {appointmentDialog()}
                {loadingDialog()}
                
            </View>
        </SafeAreaView>
    )
    }
    

    

    function appointmentDialog() {
        return (
            <Overlay
                isVisible={showAppointmentDialog}
                onBackdropPress={() => setShowAppointmentDialog(false)}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ marginVertical: Sizes.fixPadding * 2.5, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor16Medium }}>
                        {tr('appointmentTitle')}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            setShowAppointmentDialog(false)
                            navigation.push('Trainers')
                        }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor16Bold }}>
                            {tr('bookAppintment')}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        onPress={() => setShowAppointmentDialog(false)}
                        style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}
                    >
                        {tr('skip')}
                    </Text>
                </View>
            </Overlay>
        )
    }

    function motivationalVideosInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{ borderRadius: Sizes.fixPadding - 2.0, marginRight: Sizes.fixPadding * 2.0 }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
                    <ImageBackground
                        source={item.motivationalVideoThumbImage}
                        style={styles.workoutThumbImageStyle}
                        borderRadius={Sizes.fixPadding - 2.0}
                    >
                        <MaterialIcons name="play-arrow" size={40} color={Colors.whiteColor} />
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('motivationalVideoTitle')}
                </Text>
                <FlatList
                    data={motivationalVideos}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function popularWorkoutInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{ borderRadius: Sizes.fixPadding - 2.0, marginRight: Sizes.fixPadding * 2.0 }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
                    <ImageBackground
                        source={item.workoutThumbImage}
                        style={styles.workoutThumbImageStyle}
                        borderRadius={Sizes.fixPadding - 2.0}
                    >
                        <MaterialIcons name="play-arrow" size={40} color={Colors.whiteColor} />
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('popularWorkoutTitle')}
                </Text>
                <FlatList
                    data={popularWorkouts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function trainersInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => { navigation.push('TrainerProfile', {item}) }}
                    style={styles.trainerInfoWrapStyle}
                >
                    <ImageBackground
                        source={item.trainerImage}
                        style={{ width: width / 2.5, height: (width / 2.5) - 30, }}
                        borderTopLeftRadius={Sizes.fixPadding - 2.0}
                        borderTopRightRadius={Sizes.fixPadding - 2.0}
                    >
                    </ImageBackground>
                    <View style={{ ...styles.trainerDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                        <View style={{ flex: 1, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                {item.trainerName}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                                {item.specialist}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <MaterialIcons name="star" size={13} color={Colors.lightPrimaryColor} />
                            <Text style={{ ...Fonts.blackColor12Regular, marginLeft: Sizes.fixPadding - 7.0 }}>
                                {item.rating}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('personalTrainerTitle')}
                </Text>
                <FlatList
                    data={trainers}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }

    function todaysPlan() {
        const renderItem = ({ item }) => {
            console.log(item.diet)
            const path = "https://api2v.xxtreme-fitness.com/"+item.diet.image;
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('MealCategoryVideo', {item})}
                    style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0,  borderWidth: 1}}
                >
                    
                    <Image
                        source={{ uri: path }}
                        style={styles.foodImageStyle}
                    />
                    <View style={styles.mealsCategoryWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.diet.name}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                        {item.diet.recipe}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        console.log(dietsInfo?.length)
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('todayPlanTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                { dietsInfo?.length == 0 ? <Text style={{alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        position: 'absolute',
        bottom: 50.0,
        right: 120,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0}}>No diets affected </Text> : null }
                    <FlatList
                        data={dietsInfo ? dietsInfo : ''}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={false}
                        style={{ minHeight: 150}}
                    />
                </View>
            </View>
        )
    }

    function todayInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('today')}
                </Text>
                <View style={{ ...styles.todayInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Image
                        source={require('../../assets/images/icons/timer.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: "contain" }}
                    />
                    <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                            {tr('sessionStart')}
                        </Text>
                        <View style={{ ...styles.sessionStartTimeWrapStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                09:30:60
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function banner(tstt) {
        return (
            <View style={{ ...styles.bannerWrapStyle, flexDirection: 'row' }}>
                
                <View style={{ }}>
                    <Text style={{ ...Fonts.whiteColor22Bold }}>
                        {tr('object')}
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        {tr('easy')}
                    </Text>
                    <Text style={{ ...Fonts.whiteColor14Medium, color:'orange' }}>
                    {tstt}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => Linking.openURL('https://wa.me/+212665498205')}
                        style={{ ...styles.joinNowButtonStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start',backgroundColor: "green", }}
                    >
                        <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                            {tr('joinNow')}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{ position: 'absolute', right: 0.0, bottom: 2.0 }}>
                    <Image
                        source={require('../../assets/images/coachs/22.png')}
                        style={{
                            height: width / 1.7,
                            resizeMode: 'stretch',
                            width: width / 1.7,
                        }}
                    />
                </View>
            </View>
        )
    }

      function header() {
        
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/user/user1.png')}
                        style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {tr('welc')} {userInfo ? userInfo.name : ''} {userInfo ? userInfo.lastname : ''}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {tr('userWelcome')}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('Notification')}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                >
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.push('ScheduleWorkoutAndDiet')}
                    />
                    <View style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.blackColor} />
                        <View style={styles.newNotificationBellStyle} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    containers: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF', // Set the background color as needed
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
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    newNotificationBellStyle: {
        position: 'absolute',
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.redColor,
        right: 2.5, top: 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0
    },
    joinNowButtonStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0,
    },
    bannerWrapStyle: {
        paddingLeft: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightPrimaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    todayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 7.0
    },
    sessionStartTimeWrapStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        borderColor: Colors.lightPrimaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    mealsCategoryWrapStyle: {
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        position: 'absolute',
        bottom: -30.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0
    },
    foodImageStyle: {
        width: width / 1.5,
        height: width / 2.5,
        resizeMode: 'stretch',
        borderRadius: Sizes.fixPadding - 2.0
    },
    trainerInfoWrapStyle: {
        marginRight: Sizes.fixPadding * 2.0,
        width: width / 2.5,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
    },
    currencyWrapStyle: {
        margin: Sizes.fixPadding - 3.0,
        alignSelf: 'flex-end',
        backgroundColor: Colors.lightPrimaryColor,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trainerDetailWrapStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    workoutThumbImageStyle: {
        width: width / 1.7,
        height: width / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
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