import React from 'react';
import styled, { css } from 'react-emotion'
import {
    DEVICES
} from '../constants'
import bio from '../resources/bio'
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

const BioContainer = styled('div')`
width: 80%;
line-height: 1.3rem;
& > div{
    clear: both;
}
p{
    display: inline-block;
    float: left;
    text-align: justify;
}
& .nameStyle{
    font-weight: bold;
    color: #b25955;
}
& .typeStyle{
    width: 25%;
    font-weight: bold;
    color: #b25955;
}
& .titleStyle{
    width: 25%;
}
& .notesStyle{
    width: 50%;
    color: #b25955;
}
& .entriesContainer{
    padding-top: 3rem;
}
& .entries{
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 5px;
}
`
const Content = () =>
    <BioContainer>
        <p> <span className="nameStyle"> {bio.name} </span> {bio.summary} </p>
        <div className="entriesContainer">
            {bio.experiences.map((experience) =>
                <div key={experience.title}>
                    <p className="typeStyle entries">{experience.type}</p>
                    <p className="titleStyle entries">{experience.title}</p>
                    <p className="notesStyle entries">{experience.notes}</p>
                </div>
            )}
        </div>
    </BioContainer>

export const Bio = (props) =>
    <AppShell>
        {({ viewportWidth }) =>
            viewportWidth < DEVICES.tablet ?
                <StyledContainer><Content /></StyledContainer>
                :
                <StyledContainer><Content /></StyledContainer>
        }
    </AppShell>

