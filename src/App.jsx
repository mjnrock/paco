import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Components from "./components/package";

@inject("store")
@observer
class App extends Component {
    componentWillMount() {
        const { ListStore } = this.props.store;

        let list1 = ListStore.AddList("List 1"),
            list2 = ListStore.AddList("List 2");

        list1.AddItem("This is a task", 0);
        list1.AddItem("This is a second task", 1);

        list2.AddItem("I am a task", 0);
    }

    StartScreenShare(e) {
        let video = document.getElementById("user-video"),
            videoCanvas = document.getElementById("video-canvas"),
            videoContext = videoCanvas.getContext("2d");

        if(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {                
            if(video.srcObject && video.srcObject.getTracks().length > 0) {
                var hRatio = 1, //dimensions.width / video.videoWidth,
                    vRatio = 1, //dimensions.height / video.videoHeight,
                    ratio  = Math.min(hRatio, vRatio);

                videoContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, 400, video.videoHeight * vRatio);
            } else {
                navigator.mediaDevices.getDisplayMedia().then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                });
            }
        }
    }
    StopScreenShare(e) {
        let video = document.getElementById("user-video");

        video.srcObject.getTracks().forEach(track => track.stop());
    }

    render() {
        const { ListStore } = this.props.store;

        return (
            <div
                className="container"
            >
                <button
                    className="btn btn-success"
                    onClick={ this.StartScreenShare.bind(this) }
                >
                    <i className="material-icons">play_arrow</i>
                </button>
                <button
                    className="btn btn-danger"
                    onClick={ this.StopScreenShare.bind(this) }
                >
                    <i className="material-icons">stop</i>
                </button>
                <video id="user-video"
                    width="400"
                    height="700" autoplay></video>                
                <canvas
                    id="video-canvas"
                    class="ba br2"
                    width="400"
                    height="700"
                ></canvas>

                <Components.ListContainer>
                    <Components.ListGroup title="List Group 1">
                        {
                            Object.values(ListStore.lists).map((v, i) => (
                                <Components.List
                                    key={ i }
                                    title={ v.Title }
                                >
                                    {
                                        Object.values(v.Items).map((w, j) => (
                                            <Components.ListItem
                                                key={ j }
                                                value={ w.Value }
                                            />
                                        ))
                                    }
                                </Components.List>
                            ))
                        }
                    </Components.ListGroup>
                </Components.ListContainer>
            </div>
        );
    }
}

export default App;