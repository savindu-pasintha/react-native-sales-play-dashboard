import axios from 'axios';

const Development_API_Base_URL = "https://spdevapi.nvision.lk";
//const Live_API_Base_URL = "https://dev.salesplaypos.com";
const LOGIN_Authentication_Url = Development_API_Base_URL + "/modules/dasboard_user_login_authentication.php";
//const Login_end_point = "https://dev.salesplaypos.com/modules/dasboard_user_login_authentication.php?action=LOGIN_AUTH&login_username=indikakules3@gmail.com&login_password=12345678"

const Dashboard_Data_Development_Base_URL = "https://spdev.nvision.lk";
const Dashboard_Live_Base_URL = "https://cloud.salesplaypos.com";

const Dashboard_Page = "BASE_URL/dashboard/1?master_username=LOGIN_USERNAME&DeviceCurrentDate=USER_CURRENT_DATE";
const Products_Page = "BASE_URL/dashboard/2?master_username=LOGIN_USERNAME&DeviceCurrentDate=USER_CURRENT_DATE";
/*
//response
{"error":"","status":"SUCCESS","result":{"Status":1,"Description":"Login
Successful","login_username":"indikakules3@gmail.com"}}

var date = new Date().toString(); //YYYY-MM-DD 2022-02-16
*/
const ApiLogin = async (login_username, login_password) => {
    var response_data = "";
    if (login_username != "" && login_password != "") {
        await axios.post("https://spdevapi.nvision.lk/modules/dasboard_user_login_authentication.php",
            { 'login_username': login_username, 'login_password': login_password }
        )
            .then((response) => {
                console.log(response);
                if (response.result.Status == 1) {
                    response_data = response;
                    console.log(response.result.Description);
                } else if (response.result.Status == 0) {
                    response_data = response;
                    console.log(response.Error);
                } else {
                    response_data = response;
                    console.log("Login Faile ! API CALL NOT WORKING !");
                }
            })
            .catch((err) => {
                response_data = err;
                console.log("Login Error : ", err);
            });
    }
    return response_data;
}
module.exports = { ApiLogin }; 