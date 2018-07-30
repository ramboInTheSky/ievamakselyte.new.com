import {
    observable,
    action
} from 'mobx'
import {
    initialVideo
} from '../constants'

export const LocalStore = observable.object({
    //initial state
    videoId: initialVideo,
    playOnLoad: false,
})

export const setVideoId = action(
    videoId => {
        LocalStore.videoId = videoId
    })


export const setPlayOnLoad = action(
    playOnLoad => {
        LocalStore.playOnLoad = playOnLoad
    })