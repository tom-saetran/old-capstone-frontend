import React from "react"
import { NavDropdown } from "react-bootstrap"
import * as Theme from "./themes/"

const ThemeProvider = () => {
    const setTheme = theme => {
        console.log(Theme[theme])
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
    }

    return (
        <>
            <NavDropdown alignRight title="Theme" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setTheme("lightGreys")}>Light - Greys</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTheme("lightContrast")}>Light - Contrast</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setTheme("darkPhosphor")}>Dark - Phosphor</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTheme("darkAmber")}>Dark - Amber</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default ThemeProvider
