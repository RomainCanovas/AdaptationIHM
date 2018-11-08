// Components/HandPassingComponent.js

import React from 'react';
import {StyleSheet, View} from 'react-native'
import Video from 'react-native-video';
import Proximity from 'react-native-proximity';

let entry1 = -100;
let entry2 = 0;

class HandPassingComponent extends React.Component {
    state = {
        shouldPlay: false,
        timer: null,
        currentTime: 0,
        counter: 0
    };

    constructor(props, context) {
        super(props, context);
        this._proximityListener = (data) => {
            if(data.proximity===true)
            this.checkCommand()
        };
    }

    componentDidMount() {
        Proximity.addListener(this._proximityListener);
        let timer = setInterval(this.tick, 100);
        this.setState({timer});
    }

    componentWillUnmount() {
        Proximity.removeListener(this._proximityListener);
    }

    checkCommand = () => {
        entry2=this.state.counter;
        this.handlePlayAndPause();
        if(entry2-entry1<=12){
            if (this.state.currentTime - 5 <= 0)
                this.player.seek(0)
            else
                this.player.seek(this.state.currentTime - 5);
        }
        entry1=entry2
    };

    handlePlayAndPause = () => {
        this.setState(prevState => ({
            shouldPlay: !prevState.shouldPlay
        }));
    };

    tick = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    };

    setTime(params) {
        this.setState({currentTime: params.currentTime, maxTime: params.seekableDuration});
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Video
                    source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}
                    paused={this.state.shouldPlay}
                    onProgress={this.setTime.bind(this)}
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

export default HandPassingComponent