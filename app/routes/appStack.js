import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from "react-navigation"
import Home from "../components/Home";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

const screens = {
    
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

const appStack = createStackNavigator(screens);
export default createAppContainer(appStack);