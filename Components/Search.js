// Components/Search.js

import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import films from '../Helpers/localData'
import VideoItem from './VideoItem'

class Search extends React.Component {

    _displayDetailForVideo = (id) => {
        if (id === 1)
            this.props.navigation.navigate("FlipComponent");
        else if (id === 2)
            this.props.navigation.navigate("HandPassingComponent");
        else if (id === 3)
            this.props.navigation.navigate("ShakeComponent");
        else
            this.props.navigation.navigate("VoiceComponent");
    };

    // Components/Search.js
/*..............*/

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <VideoItem film={item} displayDetailForFilm={this._displayDetailForVideo}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default Search