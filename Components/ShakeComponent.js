// Components/ShakeComponent.js

import React from 'react';
import RNShakeEvent from 'react-native-shake-event';
import {StyleSheet, View} from 'react-native'
import Video from 'react-native-video';

class ShakeComponent extends React.Component {
    state = {
        shouldPlay: true,
    };

    handlePlayAndPause = () => {
        this.setState(prevState => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    componentWillMount() {
        RNShakeEvent.addEventListener('shake', () => {
            this.handlePlayAndPause();
        });
    }

    componentWillUnmount() {
        RNShakeEvent.removeEventListener('shake');
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Video
                    source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}
                    paused={!this.state.shouldPlay}
                    controls={true} fullscreen={true} onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.backgroundVideo}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default ShakeComponent