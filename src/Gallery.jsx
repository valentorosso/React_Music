import React, { Component } from 'react';
import './styles/Gallery.css';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({ playing: true, playingUrl: previewUrl, audio })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({ playing: false });
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({ playingUrl: previewUrl, playing: true, audio });
            }
        }
    }

    render() {
        const { tracks } = this.props;
        return (
            <div className="Gallery">
                {
                    tracks.map((track, k) => {
                        const trackImg = track.album.images[0].url;
                        return (
                            <div
                                key={k}
                                className="Track"
                                onClick={() => this.playAudio(track.preview_url)}
                            >
                                <img
                                    src={trackImg}
                                    alt="track"
                                    className="Track-img"
                                />
                                <div className="Track-play">
                                    <div className="Track-play-inner">
                                        {
                                            this.state.playingUrl === track.preview_url
                                            ? <span>||</span>
                                            : <span> &#9654; </span>
                                        }
                                    </div>
                                </div>

                                <p className="Track-text">
                                    {track.name}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Gallery;