import React, {
    Component
} from 'react';

import { DesktopContent } from '../components/content'
import { DEVICES } from '../constants'
import { AppShell } from '../components/app_shell'

export class Home extends Component {
    render() {
        
        // const selectVideoHandler = this.selectVideoHandler.bind(this)
        return (

            <AppShell>
                {({ viewportWidth }) =>
                    viewportWidth >= DEVICES.tablet ?
                        <DesktopContent />
                        :
                        <DesktopContent />
                }
            </AppShell>

        );
    }
}
