import React from "react"
import * as Router from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

class Footer extends React.Component {
    render() {
        return (
            <Container fluid className="bg-light border-top">
                <Row className="text-center pt-3">
                    <Col xs={{ span: 6 }} md={{ span: 2, offset: 2 }} className="d-flex flex-column">
                        <Router.Link to="/latest" className="footer-link pb-3">
                            <Icon.Newspaper /> Latest News
                        </Router.Link>
                        <Router.Link to="/tutorial" className="footer-link pb-3">
                            <Icon.Book /> Tutorial
                        </Router.Link>
                        <Router.Link to="/register" className="footer-link pb-3">
                            <Icon.Pen /> Register
                        </Router.Link>
                        <Router.Link to="/signin" className="footer-link pb-3">
                            <Icon.Key /> Sign In
                        </Router.Link>
                    </Col>
                    <Col xs={{ span: 6 }} md={{ span: 2 }} className="d-flex flex-column">
                        <Router.Link target="_blank" to="/out/telegram" className="footer-link pb-3">
                            <Icon.Telegram fill="#3ca2d9" /> Telegram
                        </Router.Link>
                        <Router.Link target="_blank" to="/out/linkedin" className="footer-link pb-3">
                            <Icon.Linkedin fill="#0a66c2" /> LinkedIn
                        </Router.Link>
                        <Router.Link target="_blank" to="/out/github" className="footer-link pb-3">
                            <Icon.Github fill="#333" /> GitHub
                        </Router.Link>
                        <Router.Link target="_blank" to="/out/twitter" className="footer-link pb-3">
                            <Icon.Twitter fill="#1DA1F2" /> Twitter
                        </Router.Link>
                    </Col>
                    <Col xs={{ span: 6 }} md={{ span: 2, offset: 0 }} className="mt-3 mt-md-0 d-flex flex-column">
                        <Router.Link to="/policies/tos" className="footer-link pb-3">
                            Term of Service
                        </Router.Link>
                        <Router.Link to="/about" className="footer-link pb-3">
                            <Icon.InfoCircle /> About Us
                        </Router.Link>
                        <Router.Link to="/jobs" className="footer-link pb-3">
                            <Icon.PersonPlus /> Jobs
                        </Router.Link>
                        <Router.Link to="/faq" className="footer-link pb-3">
                            <Icon.QuestionCircle /> FAQ
                        </Router.Link>
                    </Col>
                    <Col xs={{ span: 6 }} md={{ span: 2 }} className="mt-3 mt-md-0 d-flex flex-column">
                        <Router.Link to="/policies/shipping" className="footer-link pb-3">
                            Shipping Policy
                        </Router.Link>
                        <Router.Link to="/policies/privacy" className="footer-link pb-3">
                            Privacy Policy
                        </Router.Link>
                        <Router.Link to="/policies/return" className="footer-link pb-3">
                            Return Policy
                        </Router.Link>
                        <Router.Link to="/policies/order" className="footer-link pb-3">
                            Order Policy
                        </Router.Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Footer
