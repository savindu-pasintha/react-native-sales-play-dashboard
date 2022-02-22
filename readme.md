  "@react-native-community/masked-view": "*",
    "react-native-gesture-handler": "~1.10.2",
    "react-native-pager-view": "5.4.6",
    "react-native-paper": "^4.7.2",
    "react-native-reanimated": "~2.2.0",
    "react-native-safe-area-context": "3.3.2",
    "react-native-screens": "~3.8.0",
    "react-native-tab-view": "^3.0.0",
    "@react-navigation/bottom-tabs": "6.0.4",
    "@react-navigation/drawer": "6.1.3",
    "@react-navigation/elements": "1.0.4",
    "@react-navigation/material-bottom-tabs": "6.0.4",
    "@react-navigation/material-top-tabs": "6.0.2",
    "@react-navigation/native-stack": "6.0.5",
    "@react-navigation/native": "6.0.2",
    "@react-navigation/stack": "6.0.6"

    "@expo/vector-icons": "^12.0.0",
    "@react-native-community/masked-view": "*",
    "react-native-gesture-handler": "~1.10.2",
    "react-native-pager-view": "5.4.6",
    "react-native-paper": "^4.7.2",
    "react-native-reanimated": "~2.2.0",
    "react-native-safe-area-context": "3.3.2",
    "react-native-screens": "~3.8.0",
    "react-native-tab-view": "^3.0.0",
    "@react-navigation/bottom-tabs": "6.0.4",
    "@react-navigation/drawer": "6.1.3",
    "@react-navigation/elements": "1.0.4",
    "@react-navigation/material-bottom-tabs": "6.0.4",
    "@react-navigation/material-top-tabs": "6.0.2",
    "@react-navigation/native-stack": "6.0.5",
    "@react-navigation/native": "6.0.2",
    "@react-navigation/stack": "6.0.6"


    const lg = async () => {
        //
        var url = "/dasboard_user_login_authentication.php";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("mode", "cors");
        xhr.setRequestHeader("Credentials", "true");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };
        var data = "action=LOGIN_AUTH&login_username=indikakules3%40gmail.com&login_password=12345678";
        xhr.send(data);
    }

    options={{
        title: 'Home',
        drawerIcon: ({ focused, size }) => (
          <MaterialIcons
            name="visibility"
            size={size}
            color={focused ? '#7cc' : '#ccc'}
          />
        ),
      }}