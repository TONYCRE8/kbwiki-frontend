function SkeletonKeycapList() {
    var n = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <div className="flex flex-row flex-wrap justify-center">
            {n.map((n) => (
                <div key={n} className="w-72 2xl:m-4 lg:m-1 m-4 rounded-lg cursor-pointer shadow-lg animate-pulse" style={{background: "var(--bg-accent)"}}>
                    <div className="w-full bg-gray-400 h-14 rounded-t-lg" />
                    <div className="flex flex-col items-start justify-between w-72">
                        <div className="w-48 h-6 mb-1 mt-2 ml-1 rounded-lg bg-gray-400"></div>
                        <div className="border-l-8 rounded-bl-lg flex flex-col justify-between items-end w-full" style={{borderColor: "var(--primary-color)"}}>
                            <div className="flex flex-row items-end justify-between w-full mt-2 ml-1 pb-1">
                                <div className="ml-2">
                                    <div className="h-2 mb-2 rounded-lg w-16 bg-gray-400" />
                                    <div className="h-2 mb-2 rounded-lg w-32 bg-gray-400" />
                                    <div className="h-2 mb-2 rounded-lg w-24 bg-gray-400" />
                                </div>
                                <div className="h-4 mb-2 rounded-lg w-24 mr-1" style={{background: "var(--secondary-color)"}} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonKeycapList
