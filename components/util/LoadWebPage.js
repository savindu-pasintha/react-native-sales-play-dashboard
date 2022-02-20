import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';


const styles = StyleSheet.create({
    video: {
        marginTop: 20,
        flex: 1
    }
});
export default function LoadWebPage(props) {
    let U_R_L = "https://spdev.nvision.lk/dashboard/" + props.dashboard + "?master_username=" + props.username + "&DeviceCurrentDate=" + props.USER_CURRENT_DATE;
    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri: U_R_L }} style={{ flex: 1 }} />
        </View>
    );
}

//https://spdev.nvision.lk/dashboard/1?master_username=indikakules3@gmail.com&DeviceCurrentDate=2022-02-19
//https://spdev.nvision.lk/dashboard/2?master_username=indikakules3@gmail.com&DeviceCurrentDate=2022-02-19