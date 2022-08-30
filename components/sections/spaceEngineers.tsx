import { NextPage } from "next"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcons from "@fortawesome/free-solid-svg-icons"
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'


const SpaceEngineers: NextPage = () => {
    return (
        <section className="text-white bg-gray-900 shadow-lg rounded-lg">

            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">Space Engineers</h2>

                    <p className="mt-4 text-gray-300">
                        Space Engineers is a cooperative space-sim game, TODO: more info
                    </p>

                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 text-center">

                    <a className="block p-8 transition border border-gray-800 shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10" href="/services/digital-campaigns">
                        <FontAwesomeIcon icon={SolidIcons.faBuilding} />

                        <h3 className="mt-4 text-xl font-bold text-white">US Server</h3>

                        <p className="mt-1 text-sm text-gray-300 mb-4">
                            Info For The US Server
                        </p>
                    </a>

                    <a className="block p-8 transition border border-gray-800 shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10" href="/services/digital-campaigns">
                        <FontAwesomeIcon icon={SolidIcons.faUmbrellaBeach} />

                        <h3 className="mt-4 text-xl font-bold text-white">OCE Server</h3>

                        <p className="mt-1 text-sm text-gray-300 mb-4">
                            Info For The OCE Server
                        </p>
                    </a>

                    <a className="block p-8 transition border border-gray-800 shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10" href="/services/digital-campaigns">
                        <FontAwesomeIcon icon={SolidIcons.faEuro} />

                        <h3 className="mt-4 text-xl font-bold text-white">EU Server</h3>

                        <p className="mt-1 text-sm text-gray-300 mb-4">
                            Info For The EU Server
                        </p>
                    </a>

                </div>

                <div className="mt-12 text-center">
                    <a className="inline-flex items-center px-8 py-3 mt-8 text-white bg-pink-600 border border-pink-600 rounded hover:bg-transparent active:text-pink-500 focus:outline-none focus:ring transition-all" href="/space-engineers">
                        <span className="text-sm font-medium"> More Info </span>
                    </a>
                </div>

            </div>

        </section>
    )
}

export default SpaceEngineers