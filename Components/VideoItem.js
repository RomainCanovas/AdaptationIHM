// Components/VideoItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class VideoItem extends React.Component {

    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForFilm(film.id)}>
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>{film.release_date}</Text>
                    </View>
                    <View style={styles.eval_container}>
                        <Text style={styles.vote_text}>Recommandée à {film.vote_average}%</Text>
                    </View>
                </View>
                <Image
                    style={styles.image}
                    source={{uri: film.miniature}}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        textAlign: 'right',
        color: '#666666'
    },
    description_container: {
        flex: 6
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    eval_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
});

export default VideoItem