import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"

const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [remember, setRemember] = React.useState(false)

    return (
        <Col md={6} className="center-horizontal py-3">
            <Form validated noValidate>
                <Form.Group controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required value={email} onChange={e => setEmail(e.target.value)} className="border" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="loginPassword">
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
                <Form.Group className="mt-2 py-2" controlId="loginRemember">
                    <Form.Check
                        onChange={() => setRemember(!remember)}
                        checked={remember}
                        inline
                        style={{ top: "0.4rem" }}
                        className="mr-0"
                        type="switch"
                        label="Remember me"
                    />
                </Form.Group>
                <Button className="w-100" variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
            <hr />
            <Link to="/login/oauth/google">
                <Button className="w-100 mb-3">
                    <Icon.Google className="mr-1 mb-1" />
                    Log in with Google
                </Button>
            </Link>
            <Link to="/login/oauth/google">
                <Button className="w-100 mb-3">
                    <Icon.Facebook className="mr-1 mb-1" />
                    Log in with Facebook
                </Button>
            </Link>
            <Link to="/login/oauth/google">
                <Button className="w-100 mb-3">
                    <Icon.Github className="mr-1 mb-1" />
                    Log in with GitHub
                </Button>
            </Link>
        </Col>
    )
}

export default withRouter(Login)
