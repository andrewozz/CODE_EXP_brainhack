import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from "react-navigation"

//components
import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

// main tabs and screens for the application
const screens = {

    Login: {
        screen: Login,
    },
    Signup : {
        screen : Signup,
    },
    Home: {
        screen: Home,
    },
    Profile : {
        screen : Profile,
    },
    Settings :
    {
        screen: Settings,
    }

}

const authStack = createStackNavigator(screens);
export default createAppContainer(authStack);