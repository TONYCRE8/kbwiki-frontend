function SkeletonSwitchList() {
    return (
        <div className="flex flex-row justify-evenly">
            <div className="flex flex-row justify-between w-80 h-28 mx-2 border-r-8 rounded-md cursor-pointer animate-pulse" style={{borderColor: "var(--primary-color)"}}>
                <div className="rounded-lg w-28 h-28 bg-gray-400"/>
                <div className="flex flex-col mr-4 items-end justify-between h-full">
                    <div className="h-8 w-40 rounded-lg bg-gray-400"></div>
                    <div className="h-2 w-24 rounded-lg bg-gray-400"></div>
                    <div className="h-2 -mt-6 w-24 rounded-lg bg-gray-400"></div>
                    <div className="h-2 -mt-6 w-24 rounded-lg bg-gray-400"></div>
                </div>
            </div>
            <div className="flex flex-row justify-between w-80 h-28 mx-2 border-r-8 rounded-md cursor-pointer animate-pulse" style={{borderColor: "var(--primary-color)"}}>
                <div className="rounded-lg w-28 h-28 bg-gray-400"/>
                <div className="flex flex-col mr-4 items-end justify-between h-full">
                    <div className="h-8 w-40 rounded-lg bg-gray-400"></div>
                    <div className="h-2 w-24 rounded-lg bg-gray-400"></div>
                    <div className="h-2 -mt-6 w-24 rounded-lg bg-gray-400"></div>
                    <div className="h-2 -mt-6 w-24 rounded-lg bg-gray-400"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonSwitchList
