function SkeletonSwitchList() {
    var n = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <div className="flex flex-row flex-wrap justify-center">
            {n.map((n) => (
                <div key={n} className="flex flex-row justify-between w-80 h-28 m-4 border-r-8 rounded-md cursor-pointer animate-pulse shadow-lg" style={{borderColor: "var(--primary-color)"}}>
                    <div className="rounded-lg w-28 h-28 bg-gray-400"/>
                    <div className="flex flex-col mr-4 items-end justify-between h-full pb-2">
                        <div className="h-8 w-40 rounded-lg bg-gray-400"></div>
                        <div className="h-2 w-16 rounded-lg bg-gray-400"></div>
                        <div className="h-2 -mt-6 w-24 rounded-lg bg-gray-400"></div>
                        <div className="h-2 -mt-6 w-8 rounded-lg bg-gray-400"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonSwitchList
