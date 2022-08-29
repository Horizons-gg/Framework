import { NextPage } from "next"

import Theme from "@assets/themes/dark"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'
import * as BrandIcons from '@fortawesome/free-brands-svg-icons'



export const Standard: NextPage = () => {
    return (

        <footer className="bg-slate-800 border-solid border border-x-0 border-b-0" style={{borderColor: Theme.palette.primary.main}}>
            <div className="max-w-5xl px-4 pt-4 pb-16 mx-auto sm:px-6 lg:px-8">

                <p className="max-w-xl mx-auto mt-6 leading-relaxed text-center text-gray-400">
                    Join Horizons And Be Apart Of An Active And Growing Large Community.
                </p>

                <nav className="mt-12" aria-labelledby="footer-navigation">
                    <h2 className="sr-only" id="footer-navigation">Footer navigation</h2>
                    <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">

                        <li>
                            <a className="text-white transition hover:text-white/75" href="/">
                                Main Page
                            </a>
                        </li>

                        <li>
                            <a className="text-white transition hover:text-white/75" href="/login">
                                Login
                            </a>
                        </li>

                        <li>
                            <a className="text-white transition hover:text-white/75" href="/space-engineers">
                                Space Engineers
                            </a>
                        </li>

                    </ul>
                </nav>

                <ul className="flex justify-center gap-6 mt-12 md:gap-8">

                    <li>
                        <a href="https://discord.gg/horizons" target="_blank" className="text-white transition hover:text-white/75">
                            <span className="sr-only">Discord</span>
                            <FontAwesomeIcon size="lg" icon={BrandIcons.faDiscord} />
                        </a>
                    </li>

                    <li>
                        <a href="https://github.com/horizons-gg" target="_blank" className="text-white transition hover:text-white/75">
                            <span className="sr-only">Github</span>
                            <FontAwesomeIcon size="lg" icon={BrandIcons.faGithub} />
                        </a>
                    </li>

                    <li>
                        <a href="https://steamcommunity.com/groups/horizons-gg" target="_blank" className="text-white transition hover:text-white/75">
                            <span className="sr-only">Steam</span>
                            <FontAwesomeIcon size="lg" icon={BrandIcons.faSteam} />
                        </a>
                    </li>

                    <li>
                        <a href="https://www.patreon.com/join/corehorizons" target="_blank" className="text-white transition hover:text-white/75">
                            <span className="sr-only">Patreon</span>
                            <FontAwesomeIcon size="lg" icon={BrandIcons.faPatreon} />
                        </a>
                    </li>

                </ul>
            </div>
        </footer>
    )
}


export default Standard