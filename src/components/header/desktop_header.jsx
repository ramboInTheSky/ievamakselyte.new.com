import React from 'react';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { MuiThemeProvider, createMuiTheme/*, withStyles*/ } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { StyledList, StyledHeader, StyledH1, PaddedDiv } from './styled_header.js'
import { PlaylistItem } from '../playlistitem'
import { availablePlaylists, initialVideo } from '../../constants'
import { Fetch } from '../../stores/fetch'
import { setVideoId, setPlayOnLoad } from '../../stores/localstore'

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiDrawer: {
            // Name of the rule
            paperAnchorRight: {
                // Some CSS
                top: 51,
                width: 420,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingBottom: 50,
                backgroundColor: '#ffffff00',
                color: '#e0d8d8',
            },
        },
    },
});



export class DesktopHeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            playlistsItems: [],
        };
    }

    selectPlaylist = async (category, callback) => {
        const playlistId = availablePlaylists[category]
        try {
            const data = await Fetch.playlistItems(playlistId)
            this.setState({ playlistsItems: data.items }, () => callback())
        }
        catch (e) {
            console.log('It looks like you have no connection to the internet', e)
        }
    }

    selectVideoHandler(videoId) {
        setVideoId(videoId)
        setPlayOnLoad(true)
        this.props.history.push('/')
    }

    toggleDrawer(open = true) {
        this.setState({
            open
        });
    };

    playlistClickHandler(category) {
        this.selectPlaylist(category, () => this.toggleDrawer(true))
    }

    goToHomePage() {
        setVideoId(initialVideo)
        this.props.history.push('/')
        setPlayOnLoad(false)
    }

    render() {

        const { /*classes,*/ viewportWidth, /*selectPlaylist*/ } = this.props;
        const { playlistsItems } = this.state
        const selectVideoHandler = this.selectVideoHandler.bind(this)
        // const playlistClickHandler = this.playlistClickHandler.bind(this)

        const sideList = (
            <StyledList viewportWidth={viewportWidth}>
                <a onClick={() => this.playlistClickHandler('film')}>FILM</a>
                <a onClick={() => this.playlistClickHandler('digital')}>DIGITAL</a>
                <a onClick={() => this.playlistClickHandler('music')}>MUSIC</a>
                <NavLink to="/bio">BIO</NavLink>
                <NavLink to="/contacts">CONTACT</NavLink>
            </StyledList >
        );

        return (
            <StyledHeader >
                <StyledH1 onClick={() => this.goToHomePage()}>
                    {/*<img src={logo} className="header-logo" alt="logo" />*/}
                    IEVA MAKSELYTE
        </StyledH1>
                <MuiThemeProvider theme={theme}>
                    <Drawer open={this.state.open} onClose={() => this.toggleDrawer(false)}
                        anchor="right"
                        role="button"
                        onClick={() => this.toggleDrawer(false)}
                        onKeyDown={() => this.toggleDrawer(false)}
                    ><PaddedDiv>
                            {playlistsItems && playlistsItems.length ?
                                playlistsItems.map((playlistItem, index) => <PlaylistItem key={`playlistItem_${index}`} playlistItem={playlistItem} selectVideoHandler={selectVideoHandler} />)
                                :
                                null
                            }
                        </PaddedDiv>
                    </Drawer>
                </MuiThemeProvider>
                {sideList}
            </StyledHeader>
        )
    }
}
export const DesktopHeader = withRouter(DesktopHeaderComponent)
// export const DesktopHeader = withStyles(styles)(HeaderComponent)
