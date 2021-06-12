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
import ScrollToTop from "./components/ScrollToTop"
TimeAgo.addLocale(en)

class App extends React.Component {
    state = {
        user: null,
        _load: "60bb67d73168d10015436242",
        load: process.env.REACT_APP_CURRENT || "60bc15a8ae33b80015046cbd"
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

                    results = await fetch(this.crud.endpoint + "/users/", {
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
                    results = await fetch(this.crud.endpoint + "/users/" + id, {
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

                    results = await fetch(this.crud.endpoint + "/blogs", {
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
                    results = await fetch(this.crud.endpoint + "/blogs?sort=-updatedAt", {
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
                    results = await fetch(this.crud.endpoint + "/blogs/" + id, {
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
            },
            // Like Blog with ID
            like: async (id, data) => {
                let results
                try {
                    if (typeof id !== "string") throw new Error("id must be a string")
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.crud.endpoint + "/blogs/" + id + "/like", {
                        method: "POST",
                        headers: {
                            //Authorization: this.state.authtoken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                } catch (error) {
                    console.error(error)
                    return null
                }
                return "OK"
            },
            // Unlike Blog with ID
            unlike: async (id, data) => {
                let results
                try {
                    if (typeof id !== "string") throw new Error("id must be a string")
                    if (typeof data !== "object") throw new Error("data must be an object")

                    results = await fetch(this.crud.endpoint + "/blogs/" + id + "/unlike", {
                        method: "POST",
                        headers: {
                            //Authorization: this.state.authtoken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })

                    if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                } catch (error) {
                    console.error(error)
                    return null
                }
                return "OK"
            },

            comments: {
                post: async (postId, data) => {
                    let results
                    try {
                        if (typeof postId !== "string") throw new Error("postID must be a string")
                        if (typeof data !== "object") throw new Error("data must be an object")

                        results = await fetch(this.crud.endpoint + "/blogs/" + postId, {
                            method: "POST",
                            headers: {
                                //Authorization: this.state.authtoken,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })

                        if (!results.ok) throw new Error("got data in return but the ok flag is not true!", results)
                        results = await results.json()
                    } catch (error) {
                        console.error(error)
                        return null
                    }
                    return await results
                },
                put: async (postId, data, commentId) => {
                    let results
                    try {
                        if (typeof postId !== "string") throw new Error("postID must be a string")
                        if (typeof data !== "object") throw new Error("data must be an object")
                        if (typeof commentId !== "string") throw new Error("commentID must be a string")

                        results = await fetch(this.crud.endpoint + "/blogs/" + postId + "/comment/" + commentId, {
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
                delete: async (postId, commentId) => {
                    let results
                    try {
                        if (typeof postId !== "string") throw new Error("postID must be a string")
                        if (typeof commentId !== "string") throw new Error("commentID must be a string")
                        results = await fetch(this.crud.endpoint + "/blogs/" + postId + "/comment/" + commentId, {
                            method: "DELETE",
                            headers: {
                                //Authorization: this.state.authtoken,
                            }
                        })

                        if (!results.ok) throw new Error("got data in return but the ok flag is not true!")
                        results = await results.json()
                    } catch (error) {
                        console.error(error)
                        return null
                    }
                    return await results
                }
            }
        },

        ads: {
            getAll: async () => {
                let results
                try {
                    results = await fetch(this.crud.endpoint + "/ads/", {
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

            getSome: async () => {
                let results
                try {
                    results = await fetch(this.crud.endpoint + "/ads/some", {
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
            }
        }
    }

    render() {
        return (
            <Router>
                <ScrollToTop />
                <Route render={routeProps => <NaviBar user={this.state.user} {...routeProps} />} />
                <Switch>
                    <Route render={routeProps => <Home {...routeProps} />} exact path="/" />
                    <Route render={routeProps => <Blogs {...routeProps} user={this.state.user} crud={this.crud} />} exact path="/blogs" />
                    <Route render={routeProps => <Users {...routeProps} user={this.state.user} crud={this.crud} />} exact path="/users/:id" />
                    <Route render={routeProps => <HTTP501 {...routeProps} />} exact path="/signup" />
                    <Route render={routeProps => <Out {...routeProps} crud={this.crud} />} exact path="/out/:id" />
                    <Route render={routeProps => <HTTP404 {...routeProps} />} exact path="/404" />
                    <Route render={routeProps => <HTTP404 {...routeProps} />} />
                </Switch>
                <Route render={routeProps => <Footer {...routeProps} />} />
            </Router>
        )
    }
}

class Out extends React.Component {
    state = {
        loaded: false,
        knownRoutes: {
            linkedin: "https://www.linkedin.com/in/tom-lennart-saetran/",
            github: "https://github.com/tom-saetran",
            twitter: "https://twitter.com/tom_saetran",
            telegram: "https://t.me/zingo_fox"
        }
    }

    componentDidMount = async () => {
        const ads = await this.props.crud.ads.getAll()
        let obj = {}
        ads.forEach(ad => {
            obj[ad.outId] = ad.outLink
        })

        this.setState({ knownRoutes: { ...this.state.knownRoutes, ...obj } })
    }

    componentDidUpdate = (_previousProps, _previousState) => {
        if (_previousState.knownRoutes !== this.state.knownRoutes) this.setState({ loaded: true })
    }

    render = () => {
        return this.state.loaded ? (
            this.state.knownRoutes[this.props.match.params.id] ? (
                <Redirect to={{ pathname: window.location.assign(this.state.knownRoutes[this.props.match.params.id]) }} />
            ) : (
                <Redirect to={"/404"} />
            )
        ) : null
    }
}

export default App
