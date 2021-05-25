import React from "react"
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./global.css"

import Footer from "./components/Footer"
import NavBar from "./components/NavBar"

import Home from "./pages/Home"
import HTTP404 from "./pages/HTTP404"
import HTTP501 from "./pages/HTTP501"

const tempAvatar = "https://res.cloudinary.com/tomsdata/image/upload/v1621955597/avatars/taechviyngxbwmnvwbiy.png"

class App extends React.Component {
    state = {
        //
    }

    crud = {
        endpoint: process.env.REACT_APP_ENDPOINT,

        imageUpload: async () => {}
    }

    componentDidMount = () => {
        //
    }

    componentDidUpdate = (_previousProps, _previousState) => {
        //
    }

    render() {
        return (
            <Router>
                <Route render={routeProps => <NavBar location="Support" avatar={tempAvatar} {...routeProps} />} />
                <Switch>
                    <Route render={routeProps => <Home {...routeProps} />} exact path="/" />

                    <Route render={routeProps => <HTTP501 {...routeProps} />} exact path="/login" />
                    <Route render={routeProps => <HTTP501 {...routeProps} />} exact path="/user" />
                    <Route render={routeProps => <HTTP501 {...routeProps} />} exact path="/user/settings" />
                    <Route render={routeProps => <Out {...routeProps} />} exact path="/out/:id" />
                    <Route render={routeProps => <HTTP404 {...routeProps} />} exact path="/404" />
                    <Route render={routeProps => <HTTP404 {...routeProps} />} />
                </Switch>
                <Route render={routeProps => <Footer {...routeProps} />} />
            </Router>
        )
    }
}

class Out extends React.Component {
    knownRoutes = {
        linkedin: "https://www.linkedin.com/in/tom-lennart-saetran/",
        github: "https://github.com/tom-saetran",
        twitter: "https://twitter.com/tom_saetran",
        telegram: "https://t.me/zingo_fox"
    }

    componentWillUnmount = () => {
        // Run logger
    }

    render() {
        return this.knownRoutes[this.props.match.params.id] ? (
            <Redirect to={{ pathname: window.location.assign(this.knownRoutes[this.props.match.params.id]) }} />
        ) : (
            <Redirect to={"/404"} />
        )
    }
}

export default App
