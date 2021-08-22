function SkeletonSwitch() {

    return (
        <div className="flex flex-col animate-pulse">
                        <div className="flex flex-row justify-between items-end">
                            <div className="w-96 mb-1 h-10 rounded-lg bg-gray-400"></div>
                            <div className="w-40 mb-1 h-4 rounded-lg bg-gray-400"></div>
                        </div>
                        <hr></hr>
                        <div className="flex md:flex-row flex-col mt-8">
                            <div className="rounded-lg bg-gray-400 w-1/2"></div>
                            <div className="md:w-1/2 max-w-md w-full md:ml-4">
                                <div className="rounded-lg p-4 mb-4" style={{background: "var(--bg-accent)"}}>
                                    <section className="mb-4">
                                        <div className="h-6 mb-2 w-full rounded-lg bg-gray-400"></div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                    </section>
                                    <section className="mb-4">
                                        <div className="h-6 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                            
                                        </div>
                                    </section>
                                    <section>
                                        <div className="h-6 mb-2 w-full rounded-lg bg-gray-400">

                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                        </div>
                                        <div className="h-4 mb-2 w-full rounded-lg bg-gray-400">
                                        </div>
                                        <div className="h-4 w-full rounded-lg bg-gray-400">
                                        </div>
                                    </section>
                                </div>
                                <section className="flex justify-between">
                                    <button className="w-1/2 mr-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--primary-color)"}}></button>
                                    <button className="w-1/2 ml-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}></button>
                                </section>
                            </div>
                        </div>
                    </div>
    )
}

export default SkeletonSwitch
