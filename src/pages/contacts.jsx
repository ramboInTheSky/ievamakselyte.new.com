import React from 'react'
import { contacts } from '../resources/contacts'
import styled from 'react-emotion'
import { AppShell } from '../components/app_shell'


const ContactsContainer = styled('div')`
width: 100%;
padding-top: 3rem;
text-align: center;
p{
    display: block;
    padding-top: 1rem;    
}
`

const IMDBLink = styled('a')`
    color: hotpink;
`

export const Contacts = () =>
    <AppShell>
        {({ viewportWidth }) =>
            <ContactsContainer>
                <p>{contacts.email}</p>
                <p><IMDBLink href={contacts.imdb} target="_blank" className="notesStyle">IMDB</IMDBLink></p>
            </ContactsContainer>
        }    
    </AppShell>