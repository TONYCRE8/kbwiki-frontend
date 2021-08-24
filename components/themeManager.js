import {useState, useEffect} from "react"
import themes from "../styles/themes"

function ThemeManager() {
    const [theme, setTheme] = useState("dark")
    useEffect(() => {
        const localTheme = localStorage.getItem("theme")

        if (localTheme) {
            setTheme(localTheme)
        }
    })
    const toggleTheme = e => {
        localStorage.setItem("theme", e.target.value)
        setTheme(e.target.value)
    }
    return (
        <>
            <style key={`style-${theme}`}>
                {`
                :root {
                    --bg-color: ${themes[theme].bgColor};
                    --bg-accent: ${themes[theme].bgAccent};
                    --primary-color: ${themes[theme].primaryColor};
                    --secondary-color: ${themes[theme].secondaryColor};
                    --tertiary-color: ${themes[theme].tertiaryColor};
                    --text-color: ${themes[theme].textColor};
                }
                `}
            </style>
            <div className="absolute md:top-2 top-24 md:right-2 -right-2">
                <label className={
                    `relative inline-block w-12 h-6 ring-2 rounded-full transition-all duration-200 ${theme == "dark" ? "bg-white ring-white" : "bg-gray-darkest ring-gray-darkest"}`
                    }>
                    <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        onClick={toggleTheme}
                        value={theme == "dark" ? "light" : "dark"}
                    />
                    <span className={
                        `absolute w-6 h-6 rounded-full transition-all duration-200 top-0 bottom-0
                        ${theme == "dark" ? "left-0 right-0 bg-gray-darkest" : "left-6 right-0 bg-white"}`
                    }></span>
                </label>
            </div>
        </>
    )
}

export default ThemeManager
