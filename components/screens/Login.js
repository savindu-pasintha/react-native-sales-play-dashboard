import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-check-box';
import { MaterialIcons } from "@expo/vector-icons";
import Images1 from '../Images/logo.png';
import Images2 from '../Images/icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, update, remove, show } from '../SqlLiteDb';

const Login = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [isSelected, setSelection] = useState(true);
    const [err, setErr] = useState({ username: '', password: '', api: '' });

    const loginFun = async () => {
        try {
            if (userName != "" && password != "") {
                if (userName != null && password != null) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userName)) {
                        var myHeaders = new Headers();
                        var res = {};
                        myHeaders.append("Cookie", "PHPSESSID=c4ce8df210bfc959deece4052c6faa02");
                        var formdata = new FormData();
                        formdata.append("action", "LOGIN_AUTH");
                        formdata.append("login_username", userName.toString());
                        formdata.append("login_password", password.toString());
                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: formdata,
                            redirect: 'follow'
                        };
                        await fetch("https://spdevapi.nvision.lk/modules/dasboard_user_login_authentication.php", requestOptions)
                            .then(response => response.json())
                            .then(result => res = result)
                            .catch(error => console.log('error fetch():', error));
                        if (!res) {
                            setErr({ username: '', password: '', api: "Somthing went wrong !" });
                        }
                        else if (res.result.Status == 1) {
                            try {
                                // await AsyncStorage.setItem('@usernameKey', userName);
                                // await AsyncStorage.setItem('@passwordKey', password);
                                setTimeout(() => {
                                    navigation.push("AppNavigationDrawer");
                                    //navigation.navigate("AppNavigationDrawer");
                                }, 1000);
                            } catch (error) {
                                console.log("Login Data Save Error", error);
                            }
                        }
                        else {
                            setErr({ username: "Please Enter Correct username !", password: "Please Enter Correct password !" });
                        }
                    } else {
                        setErr({ username: "Please Enter Correct username !", password: "Please Enter Correct password !" });

                    }
                }
            } else {
                setErr({ username: "Please Enter username..", password: "Please Enter password.." });
            }
        } catch (e) {
            console.log('exception', e);
        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.box1}>
                <Image source={Images1 || Images2} style={styles.image} />
            </View>
            <View style={styles.box2}>
                <View style={styles.row1}>
                    <MaterialIcons name="person" style={styles.icon} />
                    <TextInput onChangeText={(text) => { setUserName(text); }}
                        style={styles.inputText}
                        editable
                        maxLength={40}
                        value={userName}
                        placeholder="Username ................................"
                        placeholderTextColor="black"
                    />
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
                        placeholder="Password .................................."
                        placeholderTextColor="black"
                    />
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
        width: "100%",
        backgroundColor: "white"
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
        width: 300,
        height: 300,
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