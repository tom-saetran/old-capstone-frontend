import React from "react"
import { Navbar, Nav, Form, NavDropdown, FormControl, Button, InputGroup } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { Link } from "react-router-dom"

class NavBar extends React.Component {
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
            <Navbar className="border-bottom" bg="light" expand="sm">
                <Link to="/">
                    <Navbar.Brand>
                        <Icon.HddNetwork /> Tom's Data
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle children={<LoggedInAvatar {...this.props} />} aria-controls="navbar-scroll" />

                <Navbar.Collapse id="navbar-scroll">
                    <Nav className="mr-auto">
                        <Nav.Link to="/" as={Link} active={this.props.location === "Home"}>
                            Home
                        </Nav.Link>
                        <Nav.Link to="/support" as={Link} active={this.props.location === "Support"}>
                            Support
                        </Nav.Link>
                    </Nav>

                    <Form className="pr-2">
                        <InputGroup>
                            <FormControl placeholder="Search..." />
                            <InputGroup.Append>
                                <InputGroup.Text variant="danger" as={Button}>
                                    <Icon.Search />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>

                    {this.props.avatar && (
                        <Nav className="d-none d-sm-block">
                            <NavDropdown title={<img className="bg-dim navbar-avatar" alt="" src={this.props.avatar} />} alignRight>
                                <NavDropdown.Item as={Link} to="/">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/">
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

class LoggedInAvatar extends React.Component {
    render() {
        return (
            <>
                {this.props.avatar && (
                    <div className="center">
                        <NavDropdown
                            style={{
                                height: "100px",
                                width: "100px"
                            }}
                            title={<img className="bg-dim navbar-avatar" alt="" src={this.props.avatar} />}
                            alignRight
                        >
                            <NavDropdown.Item as={Link} to="/">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/">
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                )}
            </>
        )
    }
}

export default NavBar
