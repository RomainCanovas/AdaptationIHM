// Components/FlipComponent.js

import React from 'react';
import {StyleSheet, View} from 'react-native'
import Video from 'react-native-video';
import Proximity from 'react-native-proximity';

class FlipComponent extends React.Component {
    state = {
        shouldPlay: true,
    };

    constructor(props, context) {
        super(props, context);
        this._proximityListener = (data) => {
            this.handlePlayAndPause()
        };
    }

    componentDidMount() {
        Proximity.addListener(this._proximityListener);
    }

    componentWillUnmount() {
        Proximity.removeListener(this._proximityListener);
    }

    handlePlayAndPause = () => {
        this.setState(prevState => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    render() {
        return (
            <View style={styles.main_container}>
                <Video
                    source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}
                    paused={this.state.shouldPlay}
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

export default FlipComponent