import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

import Onboarding1 from './Screens/OnboardingScreens/Onboardnig1';
import Onboarding2 from './Screens/OnboardingScreens/Onboarding2';
import OnboardingWelcome from './Screens/OnboardingScreens/OnboardingWelcome';
import EmailSignUp from './Screens/SignUpScreens/EmailSignUp';
import NamesSignUp from './Screens/SignUpScreens/NamesSignUp';
import PhoneSignUp from './Screens/SignUpScreens/PhoneSignUp';
import CarSignUp from './Screens/SignUpScreens/CarSignUp';
import DisabledSignUp from './Screens/SignUpScreens/DisabledSignUp';
import MomSignUp from './Screens/SignUpScreens/MomSignUp';
import PasswordSignUp from './Screens/SignUpScreens/PasswordSignUp';
import CreateSuccess from './Screens/SignUpScreens/CreateSuccess';
import SummaryScreen from './Screens/SignUpScreens/SummaryScreen';
import LogIn from './Screens/LogInScreens/LogIn';
import ForgotPassword from './Screens/LogInScreens/ForgotPassword';
import ForgotConfirm from './Screens/LogInScreens/ForgotConfirm';
import HomeMap from './Screens/MainScreens/HomeMap';
import Parkings from './Screens/MainScreens/Parkings';
import Profile from './Screens/MainScreens/Profile';
import AdminDash from './Screens/MainScreens/AdminDash';
import UsersPanel from './Screens/DashScreens/UsersPanel';
import ParkingLotsPanel from './Screens/DashScreens/ParkingLotsPanel';
import ParkingSpotsPanel from './Screens/DashScreens/ParkingSpotsPanel';
import ChangePass from './Screens/MainScreens/ChangePass';

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    const setupNotifications = async () => {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted!');
        return;
      }

      // Set notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Listen to incoming notifications
      const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification);
      });

      // Listen to notification interactions
      const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification tapped:', response);
      });

      // Cleanup listeners on unmount
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    };

    setupNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding1">
              <Stack.Screen name="Onboardnig1" component={Onboarding1} options={{ headerShown: false }} />
              <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ headerShown: false }} />
              <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcome} options={{ headerShown: false }} />
              <Stack.Screen name="EmailSignUp" component={EmailSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="NamesSignUp" component={NamesSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="PhoneSignUp" component={PhoneSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="CarSignUp" component={CarSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="DisabledSignUp" component={DisabledSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="MomSignUp" component={MomSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="PasswordSignUp" component={PasswordSignUp} options={{ headerShown: false }} />
              <Stack.Screen name="CreateSuccess" component={CreateSuccess} options={{ headerShown: false }} />
              <Stack.Screen name="SummaryScreen" component={SummaryScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotConfirm" component={ForgotConfirm} options={{ headerShown: false }} />
              <Stack.Screen name="HomeMap" component={HomeMap} options={{ headerShown: false }} />
              <Stack.Screen name="Parkings" component={Parkings} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="AdminDash" component={AdminDash} options={{ headerShown: false }} />
              <Stack.Screen name="UsersPanel" component={UsersPanel} options={{ headerShown: false }} />
              <Stack.Screen name="ParkingLotsPanel" component={ParkingLotsPanel} options={{ headerShown: false }} />
              <Stack.Screen name="ParkingSpotsPanel" component={ParkingSpotsPanel} options={{ headerShown: false }} />
              <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
