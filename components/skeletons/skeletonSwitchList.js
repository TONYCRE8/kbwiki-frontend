function SkeletonSwitchList() {
    var n = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <div className="flex flex-row flex-wrap justify-center">
            {n.map((n) => (
                <div key={n} className="animate-pulse flex flex-row justify-between w-72 h-32 2xl:m-4 lg:m-1 m-4 rounded-lg cursor-pointer shadow-lg transition transform duration-150 hover:-translate-y-1" style={{background: "var(--bg-accent)"}}>
                    <div className="rounded-lg w-32 h-32 bg-gray-400"></div>
                    <div className="flex flex-col text-right justify-between h-full">
                        <div className="flex flex-col justify-center h-full text-right">
                            <div className="h-8 w-36 mr-1 rounded-lg bg-gray-400"></div>
                        </div>
                        <div className="border-r-8 rounded-br-lg flex flex-col items-end pr-2 py-2" style={{borderColor: "var(--primary-color)"}}>
                            <div className="h-2 w-16 rounded-lg bg-gray-400"></div>
                            <div className="h-2 mt-2 w-16 rounded-lg bg-gray-400"></div>
                            <div className="h-2 mt-2 w-16 rounded-lg bg-gray-400"></div>
                        </div>
                      </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonSwitchList
