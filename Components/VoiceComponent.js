// Components/VoiceComponent.js

import React from 'react';
import Video from 'react-native-video';
import {
    StyleSheet,
    View,
    AppRegistry, TouchableOpacity,
} from 'react-native';
import Voice from 'react-native-voice';


class VoiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldPlay: true,
            recognized: '',
            started: '',
            results: [],
            currentTime: 0,
            maxTime: 0,
        };

        Voice.onSpeechResults = this.onSpeechResults.bind(this);
    }

    handlePlayAndPause = () => {
        this.setState(prevState => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    async _startRecognition(e) {
        this.setState({
            recognized: '',
            started: '',
            results: [],
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    setTime(params) {
        this.setState({currentTime: params.currentTime, maxTime: params.seekableDuration});
    }

    onSpeechResults(e) {
        this.setState({
            results: e.value,
        });
        if (this.state.results[0] === 'pause' || this.state.results[1] === 'pause') {
            if (this.state.shouldPlay === true) {
                this.handlePlayAndPause();
            }
        }
        if (this.state.results[0] === 'play' || this.state.results[1] === 'play') {
            if (this.state.shouldPlay === false) {
                this.handlePlayAndPause();
            }
        }
        if (this.state.results[0] === 'stop' || this.state.results[1] === 'stop') {
            this.player.seek(0);
            if (this.state.shouldPlay === true) {
                this.handlePlayAndPause();
            }
        }
        if (this.state.results[0] === 'replay' || this.state.results[1] === 'replay') {
            this.player.seek(0);
            if (this.state.shouldPlay === false) {
                this.handlePlayAndPause();
            }
        }
        if (this.state.results[0] === 'previous 5' || this.state.results[1] === 'previous 5') {
            if (this.state.currentTime - 5 <= 0)
                this.player.seek(0)
            else
                this.player.seek(this.state.currentTime - 5);
        }
        if (this.state.results[0] === 'previous 10' || this.state.results[1] === 'previous 10') {
            if (this.state.currentTime - 10 <= 0)
                this.player.seek(0)
            else
                this.player.seek(this.state.currentTime - 10);
        }
        if (this.state.results[0] === 'next 5' || this.state.results[1] === 'next 5') {
            if (this.state.currentTime + 5 >= this.state.maxTime) {
                this.player.seek(0)
                if (this.state.shouldPlay === true) {
                    this.handlePlayAndPause();
                }
            }
            else
                this.player.seek(this.state.currentTime + 5);
        }
        if (this.state.results[0] === 'next 10' || this.state.results[1] === 'next 10') {
            if (this.state.currentTime + 10 >= this.state.maxTime) {
                this.player.seek(0)
                if (this.state.shouldPlay === true) {
                    this.handlePlayAndPause();
                }
            }
            else
                this.player.seek(this.state.currentTime + 10);
        }
    }

    render() {

        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={this._startRecognition.bind(this)}>
                    <Video
                        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}
                        paused={!this.state.shouldPlay}
                        onProgress={this.setTime.bind(this)}
                        controls={true} fullscreen={true} onBuffer={this.onBuffer}
                        onError={this.videoError}
                        style={styles.backgroundVideo}/>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    transcript: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
        top: '400%',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
AppRegistry.registerComponent('VoiceNative', () => VoiceNative);


export default VoiceComponent