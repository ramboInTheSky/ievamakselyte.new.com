import React from 'react'
import YouTube from 'react-youtube';
import { css } from 'emotion'
import { observer } from 'mobx-react'
import { LocalStore } from '../../stores/localstore'

const videoContainerClass = css`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: -10;
`
export const DesktopContent = observer(
    () => {

        const opts = {
            // height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 1,
                rel: 0,
                showinfo: 0,
                loop: 1,
                modestbranding: 1
            }
        };

        const onVideoReady = (event) => {
            // access to player in all event handlers via event.target
            const videoApiControls = event.target
            //allow for the video to render first
            if (!LocalStore.playOnLoad)
                setTimeout(() => videoApiControls.pauseVideo(), 500)
        }
        const onVideoPaused = (event) => {

        }
        const onVideoPlayed = (event) => {

        }

        return (
            <div >
                <YouTube
                    videoId={LocalStore.videoId}
                    opts={opts}
                    onReady={onVideoReady}
                    className={videoContainerClass}
                    onPlay={onVideoPlayed}
                    onPause={onVideoPaused}
                />
                {/*{availabilityBanner}*/}
            </div>
        )
    }
)