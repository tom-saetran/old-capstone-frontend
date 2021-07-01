import React from "react"
import { Navbar, Nav, Form, NavDropdown, FormControl, InputGroup, Button, Col } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import ThemeProvider from "./ThemeProvider"

class NaviBar extends React.Component {
    state = {
        //
    }

    componentDidMount = () => {
        //
    }

    componentDidUpdate = (_previousProps, _previousState) => {
        //
    }

    render() {
        return (
            <div className="navigation card-border-bottom">
                <Col className="px-xl-0" xl={{ span: 10, offset: 1 }}>
                    <Navbar className="p-0" style={{ height: "4.5rem" }}>
                        <Link to="/">
                            <Navbar.Brand className="pb-2">
                                <Icon.HddNetwork className="mb-1 icon" />
                                <span className="ml-2 cursor-pointer">Tom's Data</span>
                            </Navbar.Brand>
                        </Link>

                        <Nav className="">
                            <div className="d-none d-sm-block">
                                <Link className="pr-1 link" to="/">
                                    Home
                                </Link>
                                <Link className="px-1 link" to="/blogs">
                                    Blogs
                                </Link>
                                <Link className="pl-1 link" to="/support">
                                    Support
                                </Link>
                            </div>
                        </Nav>
                        {!this.props.user && (
                            <Nav className="ml-auto">
                                <Link to="/" className="pr-2 link">
                                    Create User
                                </Link>
                                <Link to="/" className="pr-2 link">
                                    Log In
                                </Link>
                            </Nav>
                        )}

                        {this.props.user && (
                            <>
                                <Form className="d-none d-md-block ml-auto">
                                    <InputGroup>
                                        <FormControl className="no-active-outline border" placeholder="Search..." />
                                        <InputGroup.Append>
                                            <InputGroup.Text className="no-active-outline" as={Button}>
                                                <Icon.Search className="icon" />
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                                <Nav className="ml-auto ml-md-0 pl-3">
                                    <NavDropdown id="userNav" title={<img className="navbar-avatar" alt="" src={this.props.user.avatar} />} alignRight>
                                        <NavDropdown.Item as={Link} to={"/users/" + this.props.user._id}>
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/settings">
                                            Settings
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/logout">
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                        <ThemeProvider />
                    </Navbar>
                </Col>
            </div>
        )
    }
}

export default NaviBar
