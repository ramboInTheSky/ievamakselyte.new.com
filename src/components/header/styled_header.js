import styled from 'react-emotion'
import { DEVICES } from '../../constants'

export const StyledHeader = styled('header')
`
    background-color: #fff;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0.2rem 1rem;
    color: white;
    border-top: 2px solid white;
    position: fixed;
    left: 0;
    right: 0;
    border-bottom: 3px solid white;
`
export const StyledList = styled('div')(
    ({
        viewportWidth
    }) => {
        return {
            width: 'auto',
            lineHeight: '2.5rem',
            display: 'flex',
            flexDirection: 'row',
            fontSize: '1.8rem',
            fontFamily: '"Codystar", cursive',
            cursor: 'pointer',
            a: {
                color: '#000',
                paddingLeft: 10,
                fontSize: '1.2rem',
            }
        }
    })

export const StyledH1 = styled('h1')(
    props => ({
        fontSize: '1.8rem',
        fontWeight: 400,
        color: 'black'
    }))

export const PaddedDiv = styled('div')(
    ({ viewportWidth }) => {
        return {
            paddingBottom: viewportWidth < DEVICES.tablet ? '50px' : '100px'
        }
    })