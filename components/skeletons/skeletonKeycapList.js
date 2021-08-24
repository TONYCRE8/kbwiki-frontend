function SkeletonKeycapList() {
    var n = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <div className="flex flex-row flex-wrap justify-center">
            {n.map((n) => (
                <div key={n} className="w-72 m-4 cursor-pointer shadow-lg animate-pulse">
                    <div className="w-full bg-gray-400 h-14 rounded-t-3xl" />
                    <div className="flex flex-col items-end justify-between">
                        <div className="w-48 h-6 mb-1 mt-2 rounded-lg bg-gray-400"></div>
                        <div className="border-r-8 rounded-br-lg" style={{borderColor: "var(--primary-color)"}}>
                            <div className="flex flex-col items-end mr-4 mt-2 pb-2">
                                <div className="h-2 mb-2 rounded-lg w-16 bg-gray-400" />
                                <div className="h-2 mb-2 rounded-lg w-32 bg-gray-400" />
                                <div className="h-2 pb-4 rounded-lg w-24 bg-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonKeycapList
