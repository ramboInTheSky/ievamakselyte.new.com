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

const BioContainer = styled('div')(
    ({ viewportWidth }) => (
        {
            width: '80%',
            lineHeight: '1.3rem',
            '& > div': {
                clear: 'both',
            },
            p: {
                display: 'inline-block',
                float: 'left',
                textAlign: 'justify',
            },
            '& .nameStyle': {
                fontWeight: 'bold',
                color: '#b25955',
            },
            '& .typeStyle': {
                width: viewportWidth < DEVICES.retina? '100%' : '25%',
                fontWeight: 'bold',
                color: '#b25955',
            },
            '& .titleStyle': {
                width: viewportWidth < DEVICES.retina? '100%' : '25%',
            },
            '& .notesStyle': {
                width: viewportWidth < DEVICES.retina? '100%' : '50%',
                color: '#b25955',
            },
            '& .entriesContainer': {
                paddingTop: '3rem',
            },
            '& .entries': {
                borderBottom: viewportWidth < DEVICES.retina? 'none' : '1px solid #eaeaea',
                paddingBottom: '5px',
            },
            '& .card': {
                display: 'inline-block',
                paddingBottom: viewportWidth < DEVICES.retina ? '2rem' : '0',
                border: viewportWidth < DEVICES.retina? '1px solid #eaeaea' : 'none',
                boxShadow: viewportWidth < DEVICES.retina? '0 2px 2px 0px rgba(0, 0, 0, 0.3)' : 'none',
                borderRadius: '5px',
                padding: '10px',
                width: '90%',
                margin: '5px 10px'
            },
        }
    ))
const Content = ({ viewportWidth }) =>
    <BioContainer viewportWidth={viewportWidth}>
        <p> <span className="nameStyle"> {bio.name} </span> {bio.summary} </p>
        <div className="entriesContainer">
            {bio.experiences.map((experience) =>
                <div key={experience.title} className="card">
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
                <StyledContainer><Content viewportWidth={viewportWidth}/></StyledContainer>
                :
                <StyledContainer><Content viewportWidth={viewportWidth}/></StyledContainer>
        }
    </AppShell>

