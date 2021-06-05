import React from "react"
import { Navbar, Nav, Form, NavDropdown, FormControl, InputGroup, Button } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { Link } from "react-router-dom"

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
            <Navbar className="border-bottom" bg="white" expand="sm">
                <Link to="/">
                    <Navbar.Brand className="">
                        <Icon.HddNetwork fill="dimgray" /> <span className="text-dim">Tom's Data</span>
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle />

                <Navbar.Collapse id="navbar-scroll">
                    <Nav className="mr-auto">
                        <Link className="px-1 link" to="/">
                            Home
                        </Link>
                        <Link className="px-1 link" to="/blogs">
                            Blogs
                        </Link>
                        <Link className="px-1 link" to="/support">
                            Support
                        </Link>
                    </Nav>
                    {!this.props.user && (
                        <Nav>
                            <Link to="/" className="pr-2 link">
                                Create User
                            </Link>
                            <Link to="/" className="pr-2 link">
                                Log In
                            </Link>
                        </Nav>
                    )}
                    <Form className="pr-2">
                        <InputGroup>
                            <FormControl className="no-active-outline text-dim border" placeholder="Search..." />
                            <InputGroup.Append>
                                <InputGroup.Text
                                    className="bg-white no-active-outline text-dim"
                                    variant="white"
                                    as={Button}
                                >
                                    <Icon.Search />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>

                    {this.props.user && (
                        <Nav className="d-none d-sm-block">
                            <NavDropdown
                                title={<img className="navbar-avatar" alt="" src={this.props.user.avatar} />}
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
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NaviBar
