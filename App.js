import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import LoadWebPage from './components/util/LoadWebPage';
import Login from './components/screens/Login';
import Spalsh from './components/screens/Spalsh';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProductList() {
  return (
    <View style={{ flex: 1, }}>
      <LoadWebPage style={{ flex: 1, }} dashboard="2" username="indikakules3@gmail.com" USER_CURRENT_DATE="2022-02-19" />
    </View>
  );
}
function Dashboard() {
  return (
    <View style={{ flex: 1, }}>
      <LoadWebPage style={{ flex: 1, }} dashboard="1" username="indikakules3@gmail.com" USER_CURRENT_DATE="2022-01-19" />
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
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={username} />
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
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
