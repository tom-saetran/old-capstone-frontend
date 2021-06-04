import React from "react"
import { Card, Col, Container, Row, Form, Button, ButtonToolbar, ButtonGroup, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"

class Blogs extends React.Component {
    state = {
        posts: null,
        loading: true,
        cover: null
    }

    componentDidMount = async () => {
        this.setState({ posts: await this.props.crud.blogs.getAll() })
    }

    componentDidUpdate(_previousProps, _previousState) {
        if (this.state.loading && this.state.posts) this.setState({ loading: false })
    }

    render() {
        return (
            <Container fluid>
                <Row className="py-4">
                    <Col xs={{ span: 2, offset: 1 }}>
                        <User user={this.props.user} />
                        <hr />
                        <Ads />
                    </Col>
                    <Col xs={6}>
                        <Controls cover={this.state.cover} />
                        <hr />
                        <Posts posts={this.state.posts} loading={this.state.loading} />
                    </Col>
                    <Col xs={2}>
                        <Tools />
                        <hr />
                        <Neighbourhood />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const Ads = () => {
    return (
        <Card className="border text-dim">
            <Card.Header className="text-center py-1 bg-white">Ads</Card.Header>
            <Card.Body>
                <Card.Title as={"h6"}>BUY 🐕 DOGE!</Card.Title>
                <Card.Text>
                    <Link className="link" to="/out/ads/DOGE">
                        CLICK HERE!
                    </Link>
                </Card.Text>
                <hr />
                <Card.Title as={"h6"}>Is your 🍆 floppy?</Card.Title>
                <Card.Text>
                    <Link className="link" to="/out/ads/Viagra">
                        Click Here To Fix It Now!👀
                    </Link>
                </Card.Text>
                <hr />
                <Card.Title as={"h6"}>Medical Cannabis 🍀🔞</Card.Title>
                <Card.Text>
                    <Link className="link" to="/out/ads/420">
                        Click here for potent selection! (ID REQUIRED)
                    </Link>
                </Card.Text>
                <hr />
                <Card.Title as={"h6"}>Research Chemicals - Wholesale!</Card.Title>
                <Card.Text>
                    <Link className="link" to="/out/ads/RC">
                        Almost out of stock! CLICK HERE NOW!
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

const User = props => {
    return props.user ? (
        <Card className="border text-dim">
            <Card.Body>
                <Row className="justify-content-center pb-3">
                    <Card.Img className="card-avatar" alt="" src={props.user.avatar} />
                </Row>
                <Card.Title as={"h6"}>
                    {props.user.name} {props.user.surname}
                </Card.Title>
                <Card.Text>{props.user.description}</Card.Text>
            </Card.Body>
        </Card>
    ) : null
}

const Tools = () => {
    return (
        <Card className="border text-dim">
            <Card.Header className="text-center py-1 bg-white">Tools</Card.Header>
            <Card.Body className="py-3">
                <Link className="link" to="/profile">
                    Profile
                </Link>
                <br />
                <Link className="link" to="/profile/settings">
                    Settings
                </Link>
                <br />
                <Link className="link" to="/help">
                    Help
                </Link>
                <br />
                <Link className="link" to="/help/faq">
                    FAQ
                </Link>
                <br />
            </Card.Body>
        </Card>
    )
}

const Neighbourhood = () => {
    return (
        <Card className="text-dim">
            <Card.Header className="text-center py-1 bg-white">You may also know</Card.Header>
            <Card.Body>
                <Card.Title as={"h6"}>Secondary Card Title</Card.Title>
                <Card.Text>Some quick example text</Card.Text>
                <hr />
                <Card.Title as={"h6"}>Secondary Card Title</Card.Title>
                <Card.Text>Some quick example text</Card.Text>
                <hr />
                <Card.Title as={"h6"}>Secondary Card Title</Card.Title>
                <Card.Text>Some quick example text</Card.Text>
                <hr />
                <Card.Title as={"h6"}>Secondary Card Title</Card.Title>
                <Card.Text>Some quick example text</Card.Text>
                <hr />
                <Card.Title as={"h6"}>Secondary Card Title</Card.Title>
                <Card.Text>Some quick example text</Card.Text>
            </Card.Body>
        </Card>
    )
}

const Controls = props => {
    return (
        <Card className="text-dim">
            <Card.Body className="pt-0 pb-3 px-3">
                <Form>
                    <Form.Group controlId="blogForm">
                        <Form.Text>Whats on your mind?</Form.Text>
                        <Form.Control as="textarea" rows={3} placeholder="Type here..." />
                    </Form.Group>
                    <Row>
                        <div className="pl-3">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2 border rounded">
                                    <Button className="pb-2" variant="light">
                                        <Icon.Paperclip fill="dimgrey" />
                                    </Button>
                                    <Button className="pb-2 border-left" variant="light">
                                        <Icon.Image fill="dimgrey" />
                                    </Button>
                                    <Button className="pb-2 border-left" variant="light">
                                        <Icon.EmojiLaughing fill="dimgrey" />
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button className="border rounded text-dim" variant="light" type="submit">
                                        Send
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                        <div className="pt-2 pl-2">
                            <span>Cover Image Selected: {props.cover ? props.cover : "..."} </span>
                            <span>File Selected: ...</span>
                        </div>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

const Posts = props => {
    return props.posts ? (
        <Card className="text-dim">
            <Card.Body>
                {props.posts.result.map(post => {
                    return (
                        <>
                            <Card.Title as={"h6"}>{post.title}</Card.Title>
                            <Card.Text>{post.content}</Card.Text>
                            <hr />
                        </>
                    )
                })}
            </Card.Body>
        </Card>
    ) : props.loading ? (
        <Card>
            <Card.Body className="text-center text-dim p-5">
                <Spinner animation="border" />
            </Card.Body>
        </Card>
    ) : (
        <Card>
            <Card.Body className="text-center text-dim p-5">Failed to fetch content!</Card.Body>
        </Card>
    )
}

export default Blogs
