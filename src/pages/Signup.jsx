import React from "react"
import { withRouter, Link } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"

const Signup = () => {
    const [firstName, setFirstName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [agrees, setAgrees] = React.useState(false)

    const signup = e => {
        e.preventDefault()
    }

    return (
        <Col md={6} className="center-horizontal py-3">
            <Form validated noValidate onSubmit={e => signup(e)}>
                <Form.Group controlId="signupFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="border"
                        type="text"
                        placeholder="Enter first name"
                    />
                </Form.Group>

                <Form.Group controlId="signupSurname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        className="border"
                        type="text"
                        placeholder="Enter last name"
                    />
                </Form.Group>

                <Form.Group controlId="signupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required value={email} onChange={e => setEmail(e.target.value)} className="border" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-0" controlId="signupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border"
                        type="password"
                        placeholder="Enter password"
                    />
                </Form.Group>

                <Form.Group className="mt-2 py-2" controlId="signupAccept">
                    <Form.Check required onChange={() => setAgrees(!agrees)} checked={agrees} inline style={{ top: "0.4rem" }} className="mr-0" type="switch" />
                    {"I agree to the "}
                    <Link target="_blank" className="link" to={"/policies/tos"}>
                        Terms of Service
                    </Link>
                    {" and the "}
                    <Link target="_blank" className="link" to={"/policies/coc"}>
                        Code of Conduct
                    </Link>
                </Form.Group>
                <Button className="w-100" type="submit">
                    Sign Up
                </Button>
            </Form>
            <hr />
            <Link to="/login/oauth/google">
                <Button className="w-100 mb-3">
                    <Icon.Google className="mr-1 mb-1" />
                    Sign up with Google
                </Button>
            </Link>
            <Link to="/login/oauth/google">
                <Button className="w-100 mb-3">
                    <Icon.Facebook className="mr-1 mb-1" />
                    Sign up with Facebook
                </Button>
            </Link>
            <Link to="/login/oauth/google">
                <Button className="w-100 mb-3">
                    <Icon.Github className="mr-1 mb-1" />
                    Sign up with GitHub
                </Button>
            </Link>
        </Col>
    )
}

export default withRouter(Signup)
