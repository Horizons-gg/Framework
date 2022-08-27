import type { NextPage } from 'next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'

import { Simple as Layout } from '@components/layouts/panels'
import * as Buttons from '@components/ui/buttons'

const Login: NextPage = () => {
    return (
        <Layout title="Login to Horizons" subtitle="You can manage phone, email and chat conversations all from a single mailbox.">

            <div className='flex justify-around'>
                <Buttons.Simple style='solid' primaryColor=''>
                    <span className="text-sm font-medium">
                        Login
                    </span>

                    <FontAwesomeIcon icon={SolidIcons.faUser} className="w-5 h-5 ml-3" />
                </Buttons.Simple>

                <Buttons.Simple style='regular' primaryColor=''>
                    <span className="text-sm font-medium">
                        Signup
                    </span>

                    <FontAwesomeIcon icon={SolidIcons.faArrowRightLong} className="w-5 h-5 ml-3" />
                </Buttons.Simple>
            </div>

        </Layout>
    )
}

export default Login