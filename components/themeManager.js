import {useState, useLayoutEffect} from 'react'
import themes from '../styles/themes'

function ThemeManager() {
    const [theme, setTheme] = useState('dark')
    useLayoutEffect(() => {
        const localTheme = localStorage.getItem('theme')

        if (localTheme) {
            setTheme(localTheme)
        }
    })
    const toggleTheme = e => {
        localStorage.setItem('theme', e.target.value)
        setTheme(e.target.value)
    }
    return (
        <>
            <style key={`style-${theme}`}>
                {`
                :root {
                    --bg-color: ${themes[theme].bgColor};
                    --primary-color: ${themes[theme].primaryColor};
                    --secondary-color: ${themes[theme].secondaryColor};
                    --tertiary-color: ${themes[theme].tertiaryColor};
                    --text-color: ${themes[theme].textColor};
                }
                `}
            </style>
            <button 
                onClick={toggleTheme}
                value='light'
            />
            <button 
                onClick={toggleTheme}
                value='dark'
            />
        </>
    )
}

export default ThemeManager
