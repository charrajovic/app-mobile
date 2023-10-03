import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, Dimensions, FlatList, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Fonts, Colors, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Overlay } from 'react-native-elements';

const { width, height } = Dimensions.get('window');



const DietScreen = ({ navigation }) => {

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

    const { t, i18n } = useTranslation();

    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('tt')
      async function getUserInfo() {
        try {
          const data = await fetchUserInfo();
          console.log(userInfo)
        } catch (error) {
          // Handle error
        }
      }
  
      fetchUserInfo();
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
  
  
  async function fetchUserInfo() {
    setIsLoading(true)
    try {
        console.log('here')
      await AsyncStorage.getItem('token').then(async (storedValue) => {
        if (storedValue) {
      const response = await axios.get('https://api2v.xxtreme-fitness.com/api/auth/exercices', {
        headers: {
          Authorization: `Bearer ${storedValue}`,
        },
      }).then(async (result) => { 
        console.log('tt')
        const data = await result.data.userDiet;
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
}

console.log(userInfo)

    function tr(key) {
        return t(`dietScreen:${key}`)
    }


    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.lightPrimaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {todaysDietPlanInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {snackBar()}
            {loadingDialog()}
        </SafeAreaView>
    )

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                style={styles.sanckBarStyle}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        )
    }


    function todaysDietPlanInfo() {
        const renderItem = ({ item }) => {
            console.log(item)
            const path = "https://api2v.xxtreme-fitness.com/"+item.diet.image;
            console.log(path)
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('MealCategoryVideo', {item})}
                    style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0, borderWidth: 1 }}
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
        console.log(userInfo)
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('todayPlanTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={userInfo ? userInfo : ''}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
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

export default DietScreen

const styles = StyleSheet.create({
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
        width: width - 100,
        height: width - 100,
        resizeMode: 'stretch',
        borderRadius: Sizes.fixPadding - 2.0
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
    dietCategoriesInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    favoriteDietImageStyle: {
        width: width / 2.4,
        height: height / 3.8,
        borderRadius: Sizes.fixPadding - 2.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    sanckBarStyle: {
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
        backgroundColor: Colors.lightBlackColor,
        elevation: 0.0,
    },
    dietCategoriesHeaderWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})