import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import Screen2 from './Screens/Screen2';
import Screen3 from './Screens/Screen3';
import Screen4 from './Screens/Screen4';
import Screen5 from './Screens/Screen5';
import Screen6 from './Screens/Screen6';
import Screen7 from './Screens/Screen7';
import Screen8 from './Screens/Screen8';
import Screen9 from './Screens/Screen9';
import Screen10 from './Screens/Screen10';
import Screen11 from './Screens/Screen11';
import Screen12 from './Screens/Screen12';
import Screen13 from './Screens/Screen13';
import Screen14 from './Screens/Screen14';
import Screen15 from './Screens/Screen15';
import Screen16 from './Screens/Screen16';
import Screen19 from './Screens/Screen19';
import Screen20 from './Screens/Screen20';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
        <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Screen2">
              <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} />
              <Stack.Screen name="Screen3" component={Screen3} options={{ headerShown: false }} />
              <Stack.Screen name="Screen4" component={Screen4} options={{ headerShown: false }} />
              <Stack.Screen name="Screen5" component={Screen5} options={{ headerShown: false }} />
              <Stack.Screen name="Screen6" component={Screen6} options={{ headerShown: false }} />
              <Stack.Screen name="Screen7" component={Screen7} options={{ headerShown: false }} />
              <Stack.Screen name="Screen8" component={Screen8} options={{ headerShown: false }} />
              <Stack.Screen name="Screen9" component={Screen9} options={{ headerShown: false }} />
              <Stack.Screen name="Screen10" component={Screen10} options={{ headerShown: false }} />
              <Stack.Screen name="Screen11" component={Screen11} options={{ headerShown: false }} />
              <Stack.Screen name="Screen12" component={Screen12} options={{ headerShown: false }} />
              <Stack.Screen name="Screen13" component={Screen13} options={{ headerShown: false }} />
              <Stack.Screen name="Screen14" component={Screen14} options={{ headerShown: false }} />
              <Stack.Screen name="Screen15" component={Screen15} options={{ headerShown: false }} />
              <Stack.Screen name="Screen16" component={Screen16} options={{ headerShown: false }} />
              <Stack.Screen name="Screen19" component={Screen19} options={{ headerShown: false }} />
              <Stack.Screen name="Screen20" component={Screen20} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

