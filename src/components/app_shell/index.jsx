import React, {
    Component,
    Fragment
} from 'react';
import Measure from 'react-measure';
import styled from 'react-emotion'

import { DesktopHeader, MobileHeader } from '../header'
import { DEVICES } from '../../constants'


const MainSectionNode = styled('section') `
    padding-top: 50px;
`

export class AppShell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewportWidth: window.innerWidth,
        }
    }

    render() {
        const { viewportWidth } = this.state
        const { selectVideoHandler } = this.props
        return (
            <Measure bounds onResize={(contentRect) => this.setState({ viewportWidth: contentRect.bounds.width })}>
                {
                    ({ measureRef }) =>
                        <div ref={measureRef}>
                            {viewportWidth >= DEVICES.tablet ?
                                <Fragment>
                                    <DesktopHeader viewportWidth={viewportWidth} selectVideoHandler={selectVideoHandler} />
                                    <MainSectionNode>
                                        {this.props.children({ viewportWidth })}
                                    </MainSectionNode>
                                </Fragment>
                                :
                                <Fragment>
                                    <MobileHeader viewportWidth={viewportWidth} />
                                    <MainSectionNode>
                                        {this.props.children({ viewportWidth })}
                                    </MainSectionNode>
                                </Fragment>
                            }
                        </div>
                }
            </Measure>
        );
    }
}