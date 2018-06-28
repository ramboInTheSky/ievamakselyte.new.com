import React from 'react';
import styled, { css } from 'react-emotion'
import {
    DEVICES
} from '../constants'
import { AppShell } from '../components/app_shell'

const StyledContainer = styled('div')(
    ({ viewportWidth }) => (
        {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '50px',
            alignItems: 'center'
        }
    ))

export const Bio = (props) =>
    <AppShell>
        {({ viewportWidth }) =>
            viewportWidth < DEVICES.tablet ?
                <StyledContainer>BIO TABLET/MOBILE</StyledContainer>
                :
                <StyledContainer>BIO DESKTOP AND BIGGER</StyledContainer>
        }
    </AppShell>

