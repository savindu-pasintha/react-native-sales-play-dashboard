import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-check-box';
import { MaterialIcons } from "@expo/vector-icons";
import { APILogin } from '../API';
import Images from '../Images/Login_page_image.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, update, remove, show } from '../SqlLiteDb';

const Login = ({ navigation }) => {


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [isSelected, setSelection] = useState(true);
    const [err, setErr] = useState({ username: '', password: '', api: '' });

    /*
    await axios.post("https://spdevapi.nvision.lk/modules/dasboard_user_login_authentication.php",
        {
            "action": "LOGIN_AUTH",
            "login_username": "indikakules3@gmail.com",
            "login_password": "12345678"
        }).then((e) => { console.log(e); }).catch((e) => {
            console.log(e);
        })
        */

    //validate with username/password /relpace queries

    const loginFun = async () => {
        console.log(create('items'));
        if (userName != "" && password != "") {
            if (userName != null && password != null) {
                var result = { Status: 1 }; //APILogin(userName, password);
                if (result.Status == 1) {
                    // try {
                    // await AsyncStorage.setItem('@usernameKey', userName);
                    // await AsyncStorage.setItem('@passwordKey', password);
                    // setTimeout(() => {
                    navigation.push("AppNavigationDrawer");
                    //navigation.navigate("AppNavigationDrawer");
                    // }, 1000);
                    // } catch (error) {
                    //     throw e;
                    // console.log("Login Data Save Error", error);
                    // }
                    //console.log("line 19 - login pass");
                }
                else { setErr({ username: "Please Enter username..", password: "Please Enter password.." }); }
                if (!result) {
                    setErr({ username: '', password: '', api: "Somthing went wrong !" });
                    //console.log("line 21 - Login fail !");
                }
            }
        } else {
            setErr({ username: "Please Enter username..", password: "Please Enter password.." });
            //console.log("line 25 - Please Enter values ! ");
        }

        /*
        try {
            var person = {
                'action': "LOGIN_AUTH",
                "login_username": "indikakules3@gmail.com",
                "login_password": "12345678"
            };
 
            var formData = new FormData();
            formData.append("action", "LOGIN_AUTH");
            formData.append("login_username", "indikakules3@gmail.com");
            formData.append("login_password", "12345678");
 
            const options = {
                method: 'POST',
                mode: 'no-cors',
                cache: "no-cache",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: formData
            };
 
            await fetch('https://spdevapi.nvision.lk/modules/dasboard_user_login_authentication.php', options)
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(JSON.stringify(responseJson));
                    console.log(responseJson);
                })
                .catch((e) => { console.log(e) })
 
            /*
            //body: JSON.stringify(person)
            const rawResponse = await fetch('https://spdevapi.nvision.lk/modules/dasboard_user_login_authentication.php', options);
            const content = await rawResponse.json();
            console.log('content', content);
            */

        /*if (userName != "" && password != "") {
            if (userName != null && password != nurll) {
                var result = ''; //APILogin(userName, password);
                if (result.Status == 1) { console.log("line 19 - login pass"); }
                else { setErr({ username: "Please Enter ..", password: "Please Enter .." }); }
                if (!result) { setErr({ username: '', password: '', api: "Somthing went wrong !" }); console.log("line 21 - Login fail !"); }
            }
        } else {
            setErr({ username: "Please Enter ..", password: "Please Enter .." });
            console.log("line 25 - Please Enter values ! ");
        }
    } catch (e) {
        console.log('exception', e);
    }
        */
    }

    const remember = () => {
        if (chk == true) { console.log("password and user name saved !"); }
        else { console.log("password and user name nat saved ..."); }
    }

    //source={{ uri: "https://picsum.photos/id/237/200/300" }} require('./Images/Login_page_image.png')
    return (
        <View style={styles.mainView}>
            <View style={styles.box1}>
                <Image source={Images} style={styles.image} />
            </View>
            <View style={styles.box2}>
                <View style={styles.row1}>
                    <MaterialIcons name="person" style={styles.icon} />
                    <TextInput onChangeText={(text) => { setUserName(text); }}
                        style={styles.inputText}
                        editable
                        maxLength={40}
                        value={userName}
                        placeholder="Username ..." />
                    <Text style={styles.text} >{((err.username != '') ? err.username : '')}</Text>
                </View>
                <View style={styles.row1}>
                    <MaterialIcons onPress={() => { show ? setShow(false) : setShow(true); }} name={show ? "visibility" : "visibility-off"} style={styles.icon} />
                    <TextInput onChangeText={(text) => { setPassword(text); }}
                        style={styles.inputText}
                        editable
                        maxLength={40}
                        value={password}
                        secureTextEntry={show}
                        placeholder="Password ..." />
                    <Text style={styles.text}>{((err.password != '') ? err.password : '')}</Text>
                </View>

                <View style={styles.row2}>
                    <TouchableOpacity onPress={(e) => { loginFun(); }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>{((err.api != '') ? err.api : '')}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: 'auto',
        width: "100%"
    },
    box1: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
    },
    box2: {
        width: '100%',
        height: '40%',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: '25%'
    },
    row1: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
    },
    inputText: {
        width: '70%',
        height: 50,
    },
    text: {
        width: '70%',
        height: 'auto',
        fontSize: 12,
        color: 'red'
    }, icon: {
        right: 130,
        paddingTop: 10
    },
    row2: {
        width: '100%',
        height: 'auto',
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: '70%',
        height: 50,
        top: 20
    },
    buttonText: {
        width: 250,
        height: 50,
        fontSize: 20,
        borderRadius: 25,
        color: 'white',
        backgroundColor: 'blue',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        letterSpacing: 1
    }
});
export default Login;
/*
 <CheckBox onChange={(e) => { setChk(e.target.value); }} checked={true} color="green" /> Remember me
 */