import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

const Footer = () => {
    return (
        <Container fluid className="footer border-top">
            <Row className="text-center pt-3">
                <Col xs={{ span: 6 }} md={{ span: 2, offset: 2 }} className="d-flex flex-column">
                    <Link to="/latest" className="link pb-3">
                        <Icon.Newspaper /> Latest News
                    </Link>
                    <Link to="/tutorial" className="link pb-3">
                        <Icon.Book /> Tutorial
                    </Link>
                    <Link to="/signup" className="link pb-3">
                        <Icon.Pen /> Register
                    </Link>
                    <Link to="/login" className="link pb-3">
                        <Icon.Key /> Sign In
                    </Link>
                </Col>
                <Col xs={{ span: 6 }} md={{ span: 2 }} className="d-flex flex-column">
                    <Link target="_blank" to="/out/telegram" className="link pb-3">
                        <Icon.Telegram fill="#3ca2d9" /> Telegram
                    </Link>
                    <Link target="_blank" to="/out/linkedin" className="link pb-3">
                        <Icon.Linkedin fill="#0a66c2" /> LinkedIn
                    </Link>
                    <Link target="_blank" to="/out/github" className="link pb-3">
                        <Icon.Github fill="#333" /> GitHub
                    </Link>
                    <Link target="_blank" to="/out/twitter" className="link pb-3">
                        <Icon.Twitter fill="#1DA1F2" /> Twitter
                    </Link>
                </Col>
                <Col xs={{ span: 6 }} md={{ span: 2, offset: 0 }} className="mt-3 mt-md-0 d-flex flex-column">
                    <Link to="/policies/tos" className="link pb-3">
                        Term of Service
                    </Link>
                    <Link to="/about" className="link pb-3">
                        <Icon.InfoCircle /> About Us
                    </Link>
                    <Link to="/jobs" className="link pb-3">
                        <Icon.PersonPlus /> Jobs
                    </Link>
                    <Link to="/faq" className="link pb-3">
                        <Icon.QuestionCircle /> FAQ
                    </Link>
                </Col>
                <Col xs={{ span: 6 }} md={{ span: 2 }} className="mt-3 mt-md-0 d-flex flex-column">
                    <Link to="/policies/shipping" className="link pb-3">
                        Shipping Policy
                    </Link>
                    <Link to="/policies/privacy" className="link pb-3">
                        Privacy Policy
                    </Link>
                    <Link to="/policies/return" className="link pb-3">
                        Return Policy
                    </Link>
                    <Link to="/policies/order" className="link pb-3">
                        Order Policy
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
