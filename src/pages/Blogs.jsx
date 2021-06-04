import React from "react"
import { Col, Container, Row } from "react-bootstrap"

class Blogs extends React.Component {
    state = {
        posts: null
    }

    componentDidMount = async () => {
        this.setState({ posts: await this.props.crud.user.getAll() })
    }

    componentDidUpdate(_previousProps, _previousState) {
        //
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

export default Blogs
