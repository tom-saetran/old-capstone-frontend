import React from "react"
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./global.css"

import Footer from "./components/Footer"
import NaviBar from "./components/NaviBar"

import Home from "./pages/Home"
import Users from "./pages/Users"
import Blogs from "./pages/Blogs"
import HTTP404 from "./pages/HTTP404"
import HTTP501 from "./pages/HTTP501"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
TimeAgo.addLocale(en)

class App extends React.Component {
    state = {
        user: null,
        load: process.env.REACT_APP_CURRENT || null
    }

    componentDidMount = async () => {
        if (this.state.load) this.setState({ user: await this.crud.users.get(this.state.load) })
    }

    componentDidUpdate = async (_previousProps, _previousState) => {
        //
    }

    crud = {
        endpoint: process.env.REACT_APP_ENDPOINT,

        users: {
            // Create new User
            post: async data => {
                let results
                try {
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.stcrudate.endpoint + "/users/", {
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
                    results = await fetch(this.crud.endpoint + "/users/", {
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
                    results = await fetch(this.crud.endpoint + "/users/" + id, {
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

                    results = await fetch(this.crud.endpoint + "/users/" + id, {
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
                    results = await fetch(this.state.endpoint + "/users/" + id, {
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

                    results = await fetch(this.crud.endpoint + "/users/" + id + "/avatar", {
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
        },

        blogs: {
            // Create new Blog
            post: async data => {
                let results
                try {
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.stcrudate.endpoint + "/blogs/", {
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
            // Get all Blogs
            getAll: async () => {
                let results
                try {
                    results = await fetch(this.crud.endpoint + "/blogs?sort=-createdAt", {
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
            // Get Blog with ID
            get: async id => {
                let results
                try {
                    results = await fetch(this.crud.endpoint + "/blogs/" + id, {
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
            // Edit Blog with ID
            put: async (id, data) => {
                let results
                try {
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.crud.endpoint + "/blogs/" + id, {
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
            // Delete Blog with ID
            delete: async id => {
                let results
                try {
                    if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                    results = await fetch(this.state.endpoint + "/blogs/" + id, {
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
            // Upload Cover to Blog with ID
            cover: async (id, data) => {
                let results
                try {
                    if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                    if (data === "" || data === undefined || data === null) throw new Error("data must be present")

                    results = await fetch(this.crud.endpoint + "/blogs/" + id + "/cover", {
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

    render() {
        return (
            <Router>
                <Route render={routeProps => <NaviBar user={this.state.user} {...routeProps} />} />
                <Switch>
                    <Route render={routeProps => <Home {...routeProps} />} exact path="/" />
                    <Route
                        render={routeProps => <Blogs {...routeProps} user={this.state.user} crud={this.crud} />}
                        exact
                        path="/blogs"
                    />
                    <Route
                        render={routeProps => <Users {...routeProps} user={this.state.user} crud={this.crud} />}
                        exact
                        path="/users/:id"
                    />
                    <Route render={routeProps => <HTTP501 {...routeProps} />} exact path="/signup" />
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

    render() {
        return this.knownRoutes[this.props.match.params.id] ? (
            <Redirect to={{ pathname: window.location.assign(this.knownRoutes[this.props.match.params.id]) }} />
        ) : (
            <Redirect to={"/404"} />
        )
    }
}

export default App
