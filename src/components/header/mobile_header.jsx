import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import styled, { css } from 'react-emotion'
import { withRouter } from 'react-router'

import { Fetch } from '../../stores/fetch'
import { PlaylistItem } from '../playlistitem'
import { StyledHeader, StyledH1, PaddedDiv } from './styled_header.js'
import { setVideoId, setPlayOnLoad } from '../../stores/localstore'
import { DEVICES, availablePlaylists, initialVideo } from '../../constants'


const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiDrawer: {
      // Name of the rule
      paperAnchorLeft: {
        // Some CSS
        top: 48,
      },
    },
  },
  button: {
    color: 'hotpink'
  },
  paperAnchorLeft: {
    top: 50
  }
});


const StyledDrawerList = styled('div')(({ viewportWidth }) => {
  return {
    width: '350px',
    height: '100%',
    lineHeight: '2.5rem',
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    fontSize: '1.8rem',
    a: {
      color: '#000',
      paddingLeft: 10,
      fontSize: 'initial',
    }
  }
})

const playlistItemClass = css`
  margin-left: .95rem;
  & h5{
    font-size: 1rem;
    line-height: 1.2rem;
    margin-bottom: 10px;
  }
`

const VideoCategoryTitle = styled('span')`
  text-align: center;
  margin-top: 1rem;
`

const styles = {
  button: {
    color: 'hotpink'
  }
};


class HeaderComponent extends React.Component {
  constructor(props) {
    super(props)

    this.playlistsNames = Object.keys(availablePlaylists)

    this.state = {
      open: false,
      playlistsItems: {}
    };
  }

  componentWillMount() {
    this.initializePlaylists(this.playlistsNames, availablePlaylists)
  }

  async initializePlaylists(playlists) {
    const playlistsItems = this.playlistsNames.reduce((acc, element) => {
      acc[element] = []
      return acc
    }, {})
    try {
      this.playlistsNames.map(async element => {
        const playlistId = availablePlaylists[element]
        const data = await this.fetchPlaylist(playlistId)
        playlistsItems[element] = data.items
      })
      this.setState({ playlistsItems })
    }
    catch (e) {
      console.log(e)
      alert('It looks like you have no connection to the internet')
    }
  }

  async fetchPlaylist(playlistId) {
    let data = null
    try {
      data = await Fetch.playlistItems(playlistId)
    }
    catch (e) {
      console.log(e)
      alert('It looks like you have no connection to the internet')
    }
    return data
  }

  toggleDrawer = (open) => () => {
    this.setState({
      open
    });
  };

  toggleCategoryDrawer = (open) => () => {
    this.setState({
      open
    });
  };

  selectVideoHandler(videoId) {
    setVideoId(videoId)
    setPlayOnLoad(true)
    this.props.history.push('/')
  }

  render() {
    const { classes, viewportWidth } = this.props;
    const { playlistsItems, open } = this.state;
    const toggleDrawer = this.toggleDrawer.bind(this)
    const selectVideoHandler = this.selectVideoHandler.bind(this)

    const sideList = (
      <StyledDrawerList viewportWidth={viewportWidth}>
        <Fragment>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/bio">BIO</NavLink>
          <NavLink to="/contacts">CONTACT</NavLink>
        </Fragment>
        {this.playlistsNames.map(element => {
          return (
            <Fragment>
              <Divider />
            <VideoCategoryTitle>{element.toUpperCase()}</VideoCategoryTitle>  
              <PaddedDiv viewportWidth={viewportWidth} key={element}>
              {playlistsItems && playlistsItems[element] && playlistsItems[element].length ?
                playlistsItems[element].map((playlistItem, index) =>
                  <PlaylistItem key={`playlistItem_${index}`} className={playlistItemClass} viewportWidth={viewportWidth} playlistItem={playlistItem} selectVideoHandler={selectVideoHandler} />)
                :
                null
              }
              </PaddedDiv>
            </Fragment>  
          )
        }
        )}
      </StyledDrawerList >
    );

    return (
      <StyledHeader >
        <StyledH1 >
          {/*<img src={logo} className="header-logo" alt="logo" />*/}
          IEVA MAKSELYTE
          </StyledH1>
        {
          <MuiThemeProvider theme={theme}>
            <Fragment>
              <Button className={classes.button} onClick={toggleDrawer(true)}>Menu</Button>
              <Drawer open={open} onClose={toggleDrawer(false)} >
                <div
                  tabIndex={0}
                  role="button"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  {sideList}
                </div>
              </Drawer>
            </Fragment>
          </MuiThemeProvider>

        }
      </StyledHeader>
    )
  }
}

export const MobileHeader = withRouter(withStyles(styles)(HeaderComponent))
