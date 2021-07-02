import React from "react"
import { NavDropdown } from "react-bootstrap"
import * as Theme from "./themes/"

const ThemeProvider = () => {
    React.useEffect(() => {
        if (sessionStorage.getItem("theme")) setTheme(sessionStorage.getItem("theme"))
        else setTheme("lightGreys")
    }, [])

    const setTheme = theme => {
        document.documentElement.style.setProperty("--activeBackgroundColor", Theme[theme].activeBackgroundColor)
        document.documentElement.style.setProperty("--activeBorderColor", Theme[theme].activeBorderColor)
        document.documentElement.style.setProperty("--activeFooterBackgroundColor", Theme[theme].activeFooterBackgroundColor)
        document.documentElement.style.setProperty("--activeNavBarBackgroundColor", Theme[theme].activeNavBarBackgroundColor)
        document.documentElement.style.setProperty("--activeCardBackgroundColor", Theme[theme].activeCardBackgroundColor)
        document.documentElement.style.setProperty("--activeButtonBackgroundColor", Theme[theme].activeButtonBackgroundColor)
        document.documentElement.style.setProperty("--activeInputBackgroundColor", Theme[theme].activeInputBackgroundColor)
        document.documentElement.style.setProperty("--activeTextColor", Theme[theme].activeTextColor)
        document.documentElement.style.setProperty("--activeLinkColor", Theme[theme].activeLinkColor)
        document.documentElement.style.setProperty("--activeLinkHoverColor", Theme[theme].activeLinkHoverColor)
        document.documentElement.style.setProperty("--activeInputTextColor", Theme[theme].activeInputTextColor)
        document.documentElement.style.setProperty("--activeInputPlaceholderTextColor", Theme[theme].activeInputPlaceholderTextColor)
        document.documentElement.style.setProperty("--activeIconColor", Theme[theme].activeIconColor)
        document.documentElement.style.setProperty("--activeEditIconColor", Theme[theme].activeEditIconColor)
        document.documentElement.style.setProperty("--activeDeleteIconColor", Theme[theme].activeDeleteIconColor)
        sessionStorage.setItem("theme", theme)
    }

    return (
        <>
            <NavDropdown alignRight title="Theme" id="themeDropdown">
                <NavDropdown.Item onClick={() => setTheme("lightGreys")}>Light - Greys</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTheme("lightContrast")}>Light - Contrast</NavDropdown.Item>
                <hr className="m-0 mx-3" />
                <NavDropdown.Item onClick={() => setTheme("darkPhosphor")}>Dark - Phosphor</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTheme("darkAmber")}>Dark - Amber</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default ThemeProvider
