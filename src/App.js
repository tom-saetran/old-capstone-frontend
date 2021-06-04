import React from "react"
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./global.css"

import Footer from "./components/Footer"
import NaviBar from "./components/NaviBar"

import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import HTTP404 from "./pages/HTTP404"
import HTTP501 from "./pages/HTTP501"

const tempAvatar = "https://res.cloudinary.com/tomsdata/image/upload/v1621955597/avatars/taechviyngxbwmnvwbiy.png"

class App extends React.Component {
    state = {
        posts: null
    }

    crud = {
        endpoint: process.env.REACT_APP_ENDPOINT,

        user: {
            // Create new User
            post: async data => {
                let results
                try {
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.stcrudate.endpoint + "users/", {
                        method: "POST",
                        headers: {
                            //Authorization: this.state.authtoken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                    results = await results.json()
                } catch (error) {
                    console.error(error)
                    return null
                }
                return await results
            },
            // Get all Users
            getAll: async () => {
                let results
                try {
                    results = await fetch(this.crud.endpoint + "users/", {
                        headers: {
                            //Authorization: this.state.authtoken
                        }
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                    results = await results.json()
                } catch (error) {
                    console.error(error)
                    return null
                }
                return await results
            },
            // Get User with ID
            get: async id => {
                let results
                try {
                    results = await fetch(this.crud.endpoint + "users/" + id, {
                        headers: {
                            //Authorization: this.state.authtoken
                        }
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                    results = await results.json()
                } catch (error) {
                    console.error(error)
                    return null
                }
                return await results
            },
            // Edit User with ID
            put: async (id, data) => {
                let results
                try {
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.crud.endpoint + "users/" + id, {
                        method: "PUT",
                        headers: {
                            //Authorization: this.state.authtoken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                    results = await results.json()
                } catch (error) {
                    console.error(error)
                    return null
                }
                return await results
            },
            // Delete User with ID
            delete: async id => {
                let results
                try {
                    if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                    results = await fetch(this.state.endpoint + "users/" + id, {
                        method: "DELETE",
                        headers: {
                            //Authorization: this.state.authtoken,
                            "Content-Type": "application/json"
                        }
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                    results = await results.json()
                } catch (error) {
                    console.error(error)
                    return null
                }
                return await results
            },
            // Upload Avatar to User with ID
            avatar: async (id, data) => {
                let results
                try {
                    if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                    if (data === "" || data === undefined || data === null) throw new Error("data must be present")

                    results = await fetch(this.crud.endpoint + "user/" + id + "/avatar", {
                        method: "POST",
                        body: data
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                    if (results.status !== 201) return false
                    results = await results.json()
                } catch (error) {
                    console.error(error)
                    return null
                }
                return await results
            }
        }
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
                <Route render={routeProps => <NaviBar location="Support" avatar={tempAvatar} {...routeProps} />} />
                <Switch>
                    <Route render={routeProps => <Home {...routeProps} />} exact path="/" />

                    <Route render={routeProps => <Blogs {...routeProps} crud={this.crud} />} exact path="/blogs" />
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
            <>
                <h1 className="text-center">Redirecting...</h1>
                <Redirect to={{ pathname: window.location.assign(this.knownRoutes[this.props.match.params.id]) }} />
            </>
        ) : (
            <Redirect to={"/404"} />
        )
    }
}

export default App
