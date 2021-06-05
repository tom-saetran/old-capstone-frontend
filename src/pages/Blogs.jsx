import React from "react"
import {
    Card,
    Col,
    Container,
    Row,
    Form,
    Button,
    ButtonToolbar,
    ButtonGroup,
    Spinner,
    Badge,
    Accordion
} from "react-bootstrap"
import { Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import ReactTimeAgo from "react-time-ago"

class Blogs extends React.Component {
    state = {
        posts: null,
        users: null,
        loading: true,
        cover: null
    }

    componentDidMount = async () => {
        this.setState({ posts: await this.props.crud.blogs.getAll() })
        this.setState({ users: await this.props.crud.users.getAll() })
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
                        <Posts user={this.props.user} posts={this.state.posts} loading={this.state.loading} />
                    </Col>
                    <Col xs={2}>
                        <Tools />
                        <hr />
                        <Neighbourhood user={this.props.user} users={this.state.users} />
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
                        CLICK HERE! 🐕🐩🐕‍🦺
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
                        Click here to see our potent selection! (ID REQUIRED)
                    </Link>
                </Card.Text>
                <hr />
                <Card.Title as={"h6"}>Research Chemicals 🧪 Wholesale! 📦</Card.Title>
                <Card.Text>
                    <Link className="link" to="/out/ads/RC">
                        Almost out of stock! CLICK HERE NOW!
                    </Link>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center py-1 bg-white">
                <Link className="link" to="/advertise">
                    Advertise Here?
                </Link>
            </Card.Footer>
        </Card>
    )
}

const User = props => {
    return props.user ? (
        <Card className="border text-dim">
            <Card.Header className="text-center py-1 bg-white">{props.user.name}</Card.Header>
            <Card.Body>
                <Row className="justify-content-center pb-3">
                    <Card.Img className="card-avatar" alt="" src={props.user.avatar} />
                </Row>
                <Card.Title as={"h6"} className="text-center">
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

const Neighbourhood = props => {
    return props.users ? (
        <Card className="text-dim">
            <Card.Header className="text-center py-1 bg-white">People you may know</Card.Header>
            <Card.Body>
                {props.users.result.map(user => {
                    if (user._id === props.user._id) return null
                    return (
                        <div key={user._id}>
                            <Card.Title as={"h6"}>
                                <Card.Img className="friend-avatar mr-2" alt="" src={user.avatar} />
                                {user.name} {user.surname}
                            </Card.Title>
                            <Card.Text>
                                {user.description.slice(0, 42)}
                                {user.description.length > 42 ? "..." : ""}
                            </Card.Text>
                            <hr />
                        </div>
                    )
                })}
            </Card.Body>
        </Card>
    ) : (
        <Card className="text-dim text-center">
            <Card.Body>
                <Spinner animation="border" />
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
                        <Accordion key={post._id}>
                            <Accordion.Toggle as="div" eventKey="0">
                                <div key={post._id}>
                                    <Row>
                                        <div className="pl-3">
                                            <Card.Title as={"h6"}>{post.title}</Card.Title>
                                            <Card.Text>{post.content}</Card.Text>
                                            <Form.Text>
                                                by {post.author.name} {post.author.surname}
                                            </Form.Text>
                                        </div>

                                        {post.comments.length > 0 && (
                                            <Form.Text className="d-flex flex-column justify-content-end">
                                                <span>
                                                    {post.comments.length} Comment
                                                    {post.comments.length > 1 ? "s" : ""} <Icon.ChatText />
                                                </span>
                                            </Form.Text>
                                        )}

                                        <div className="ml-auto pr-3 d-flex flex-column justify-content-between">
                                            <div className="ml-auto">
                                                <Badge pill variant="secondary">
                                                    {post.category}
                                                </Badge>
                                            </div>
                                            <Form.Text>
                                                Posted: <ReactTimeAgo date={new Date(post.createdAt)} />
                                            </Form.Text>
                                        </div>
                                    </Row>
                                    {props.user && props.user._id === post.author._id && (
                                        <div className="pt-3">
                                            <ButtonGroup className="border rounded">
                                                <Button className="text-dim" variant="light">
                                                    <Icon.Pen />
                                                </Button>
                                                <Button className="text-danger border-left" variant="light">
                                                    <Icon.Trash />
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    )}
                                    <hr />
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="border rounded">
                                    {post.comments.map(comment => {
                                        return (
                                            <div key={comment._id}>
                                                <div>{comment.comment}</div>
                                                <Form.Text>
                                                    by {comment.author.name} {comment.author.surname}
                                                </Form.Text>
                                                {props.user._id === comment.author._id && (
                                                    <div className="pt-3">
                                                        <ButtonGroup className="border rounded">
                                                            <Button className="text-dim" variant="light">
                                                                <Icon.Pen />
                                                            </Button>
                                                            <Button className="text-danger border-left" variant="light">
                                                                <Icon.Trash />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div>
                                                )}
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
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
