// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FlipComponent from "../Components/FlipComponent";
import HandPassingComponent from "../Components/HandPassingComponent";
import ShakeComponent from "../Components/ShakeComponent";
import VoiceComponent from "../Components/VoiceComponent";


const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Accueil'
        }
    },
    FlipComponent: {
        screen: FlipComponent
    },
    HandPassingComponent: {
        screen: HandPassingComponent
    },
    ShakeComponent: {
        screen: ShakeComponent
    },
    VoiceComponent: {
        screen: VoiceComponent
    }

});

export default SearchStackNavigator