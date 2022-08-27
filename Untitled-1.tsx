<div className='flex h-screen'>
            <div className='m-auto'>
                <div className="p-8 border border-gray-100 shadow-xl rounded-xl">

                    <div className="mt-4 text-gray-500 sm:pr-8">
                        <FontAwesomeIcon icon={RegularIcons.faUser} />

                        <h5 className="mt-4 text-xl font-bold text-gray-900">
                            Login to Horizons
                        </h5>

                        <p className="hidden mt-2 text-sm sm:block">
                            You can manage phone, email and chat conversations all from a single mailbox.
                        </p>


                        <br />


                        <div className='flex justify-around'>

                            <Buttons.Solid style='solid' primaryColor=''>
                                <span className="text-sm font-medium">
                                    Login
                                </span>

                                <FontAwesomeIcon icon={SolidIcons.faUser} className="w-5 h-5 ml-3" />
                            </Buttons.Solid>


                            <div>
                                <a className="inline-flex items-center px-8 py-3 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring" href="/download">
                                    <span className="text-sm font-medium">
                                        Signup
                                    </span>

                                    <FontAwesomeIcon icon={SolidIcons.faArrowRightLong} className="w-5 h-5 ml-3" />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
    </div>