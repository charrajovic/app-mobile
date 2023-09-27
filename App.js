import 'react-native-gesture-handler';
import LoadingScreen from './components/loadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleWorkoutAndDietScreen from './screens/scheduleWorkoutAndDiet/scheduleWorkoutAndDietScreen';
import NotificationScreen from './screens/notification/notificationScreen';
import TrainerProfileScreen from './screens/trainerProfile/trainerProfileScreen';
import SubscriptionDetailScreen from './screens/subscriptionDetail/subscriptionDetailScreen';
import ChooseTimeScreen from './screens/chooseTime/chooseTimeScreen';
import SelectPaymentMethodScreen from './screens/selectPaymentMethod/selectPaymentMethodScreen';
import SuccessPaymentScreen from './screens/successPayment/successPaymentScreen';
import BottomTabs from './components/bottomTabs';
import WorkoutCategoryDetailScreen from './screens/workoutCategoryDetail/workoutCategoryDetailScreen';
import VideosScreen from './screens/videos/videosScreen';
import UserProgramScreen from './screens/userProgram/userProgramScreen';
import TrainersScreen from './screens/trainers/trainersScreen';
import DietCategoriesScreen from './screens/dietCategories/dietCategoriesScreen';
import MealCategoryVideoScreen from './screens/mealCategoryVideo/mealCategoryVideoScreen';
import DietCategoryDetailScreen from './screens/dietCategoryDetail/dietCategoryDetailScreen';
import DietDetailScreen from './screens/dietDetail/dietDetailScreen';
import ProgressReportScreen from './screens/progressReport/progressReportScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import PrivacyPolicyScreen from './screens/privacyPolicy/privacyPolicyScreen';
import AboutScreen from './screens/about/aboutScreen';
import FavoriteScreen from './screens/favorite/favoriteScreen';
import DownloadsScreen from './screens/downloads/downloadsScreen';
import HelpScreen from './screens/help/helpScreen';
import UserSubscriptionScreen from './screens/userSubscription/userSubscriptionScreen';
import LanguagesScreen from './screens/languages/languagesScreen';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onBoarding/onboardingScreen';
import SigninScreen from './screens/auth/signinScreen';
import SignupScreen from './screens/auth/signupScreen';
import ForgotPasswordScreen from './screens/auth/forgotPasswordScreen';
import OtpVerificationScreen from './screens/auth/otpVerification';
import NewPasswordScreen from './screens/auth/newPasswordScreen';
import GenderSelectionScreen from './screens/genderSelection/genderSelectionScreen';
import LevelSelectionScreen from './screens/levelSelection/levelSelectionScreen';
import GoalSelectionScreen from './screens/goalSelection/goalSelectionScreen';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import i18n from './languages/index';//don't remove this line

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();


const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="ScheduleWorkoutAndDiet" component={ScheduleWorkoutAndDietScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="TrainerProfile" component={TrainerProfileScreen} />
        <Stack.Screen name="SubscriptionDetail" component={SubscriptionDetailScreen} />
        <Stack.Screen name="ChooseTime" component={ChooseTimeScreen} />
        <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} />
        <Stack.Screen name="SuccessPayment" component={SuccessPaymentScreen} />
        <Stack.Screen name="WorkoutCategoryDetail" component={WorkoutCategoryDetailScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="UserProgram" component={UserProgramScreen} />
        <Stack.Screen name="Trainers" component={TrainersScreen} />
        <Stack.Screen name="DietCategories" component={DietCategoriesScreen} />
        <Stack.Screen name="MealCategoryVideo" component={MealCategoryVideoScreen} />
        <Stack.Screen name="DietCategoryDetail" component={DietCategoryDetailScreen} />
        <Stack.Screen name="DietDetail" component={DietDetailScreen} />
        <Stack.Screen name="ProgressReport" component={ProgressReportScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="Downloads" component={DownloadsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="UserSubscription" component={UserSubscriptionScreen} />
        <Stack.Screen name="Language" component={LanguagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(Route);

export default App = () => {
  return (
    <ReloadAppOnLanguageChange />
  );
}