import type { NextPage } from 'next'
import { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'

import { Simple as Layout } from '@components/layouts/panels'
import * as UI from '@components/ui'


const Login: NextPage = () => {

    return (
        <Layout title="Login to Horizons" subtitle="You can manage phone, email and chat conversations all from a single mailbox.">

            <UI.TextBoxes.Simple type='text' style='solid' placeholder='Email or Username' />
            <UI.TextBoxes.Simple type='password' style='solid' placeholder='Password' />

            <div className='flex justify-around'>
                <UI.Buttons.Simple style='solid'>
                    <span className="text-sm font-medium">
                        Login
                    </span>

                    <FontAwesomeIcon icon={"fa-user"} className="w-5 h-5 ml-3" />
                </UI.Buttons.Simple>

                <UI.Buttons.Simple style='regular'>
                    <span className="text-sm font-medium">
                        Register
                    </span>

                    <FontAwesomeIcon icon={SolidIcons.faArrowRightLong} className="w-5 h-5 ml-3" />
                </UI.Buttons.Simple>
            </div>

        </Layout>
    )
}

export default Login