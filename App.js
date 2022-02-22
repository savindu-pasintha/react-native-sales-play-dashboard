import * as React from 'react';
import { View, BackHandler, Alert, Platform, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerView, } from '@react-navigation/drawer';
import LoadWebPage from './components/util/LoadWebPage';
import Login from './components/screens/Login';
import { MaterialIcons } from "@expo/vector-icons";

function currentDate() {
  var date = new Date();
  return (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay());
}
function ProductList() {
  return (
    <View style={{ flex: 1, }}>
      <LoadWebPage style={{ flex: 1, }} dashboard="2" username="indikakules3@gmail.com" USER_CURRENT_DATE={currentDate()} />
    </View>
  );
}
function Dashboard() {
  return (
    <View style={{ flex: 1, }}>
      <LoadWebPage style={{ flex: 1, }} dashboard="1" username="indikakules3@gmail.com" USER_CURRENT_DATE={currentDate()} />
    </View>
  );
}
function Home() { return (<Dashboard />); }
//async
function CustomDrawerContent(props) {
  var username = "Please Login Now !";
  /*
  try {
    var value = await AsyncStorage.getItem("@usernameKey");
    if (value !== null) { username = value; }
  } catch (e) {
    throw e;
    //console.log("Username cannot get ", e)
  }
 */
  const createAlertIos = () =>
    Alert.alert('Do you want to Exit app ?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => BackHandler.exitApp() },
    ]);

  const createAlertAndroid = () =>
    Alert.alert(
      'Do you want to Exit app ?',
      '',
      [
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
      ]
    );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList style={{ color: 'blue' }} {...props} />
      <DrawerItem label="Exit app" onPress={() => {
        if (Platform.OS === 'ios') { createAlertIos(); }
        else if (Platform.OS === 'android') { createAlertAndroid(); }
      }} />
      <DrawerItem label="Help with us .." onPress={() => Linking.openURL('https://mywebsite.com/help')} />
      <DrawerItem label="www.nvision.lk" />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
function AppNavigationDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Product List" component={ProductList} />
    </Drawer.Navigator>
  );
}

function AppRootNavigationPathSet() {
  const screenOptions = { headerShown: false, };
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AppNavigationDrawer" component={AppNavigationDrawer} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Product List" component={ProductList} />
    </Stack.Navigator>
  );
}
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AppRootNavigationPathSet />
      {/*<Login /> <AppNavigationDrawer />  <AppRootNavigationPathSet />*/}
    </NavigationContainer>
  );
}
