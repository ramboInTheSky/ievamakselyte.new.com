import * as React from 'react'
import Loader from 'react-loader'
import { css } from 'react-emotion'

const playlistItemClass = css`
    font-family: "Codystar", cursive;
    &:hover{
        opacity: .85;
    }
`

export const PlaylistItem = ({ playlistItem, selectVideoHandler, className }) => {

    return (
        <Loader loaded={!!playlistItem} width={2} lines={12} length={8} color={'#fff'} opacity={0.2} className={'loading'}>
            <div className={`${className || ''} ${playlistItemClass}`} onClick={() => selectVideoHandler(playlistItem.contentDetails.videoId)}>
                <h5>{playlistItem.snippet.title}</h5>
                <img src={playlistItem.snippet.thumbnails.medium.url} alt={playlistItem.snippet.title}/>
            </div>
        </Loader>
    )

}