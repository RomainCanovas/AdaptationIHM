// Components/Search.js

import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import films from '../Helpers/localData'
import VideoItem from './VideoItem'

class Search extends React.Component {

    _displayDetailForFilm = (idFilm) => {
        if (idFilm === 1)
            this.props.navigation.navigate("FlipComponent")
        else if (idFilm === 2)
            this.props.navigation.navigate("HandPassingComponent")
        else if (idFilm === 3)
            this.props.navigation.navigate("ShakeComponent")
        else
            this.props.navigation.navigate("VoiceComponent")

    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <VideoItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
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
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search