import {Stack} from 'expo-router';
import {useEffect} from 'react';
import {setStatusBarStyle} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// just for tests
// delay splash hiding screen for 5 sec
// SplashScreen.preventAutoHideAsync();
// setTimeout(() => {
//     console.log('hide async')
//     SplashScreen.hideAsync();
// }, 5000);

export default function RootLayout() {
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('set light')
    //         setStatusBarStyle("light");
    //     }, 5000);
    // }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}
