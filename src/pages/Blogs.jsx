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
    Accordion,
    InputGroup
} from "react-bootstrap"
import { Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import ReactTimeAgo from "react-time-ago"
import Ads from "../components/Ads"
import Neighbourhood from "../components/Neighbours"

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
                        <Posts user={this.props.user} posts={this.state.posts} loading={this.state.loading} />
                    </Col>
                    <Col xs={2}>
                        <Tools />
                        <hr />
                        <Neighbourhood crud={this.props.crud} user={this.props.user} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const User = props => {
    return props.user ? (
        <Card className="border text-dim">
            <Card.Header className="text-center py-1 bg-white">{props.user.name}</Card.Header>
            <Card.Body>
                <Link className="link" to={"users/" + props.user._id}>
                    <Row className="justify-content-center pb-3">
                        <Card.Img className="card-avatar" alt="" src={props.user.avatar} />
                    </Row>
                </Link>
                <Link className="link" to={"users/" + props.user._id}>
                    <Card.Title as={"h6"} className="text-center">
                        {props.user.name} {props.user.surname}
                    </Card.Title>
                </Link>
                <hr />
                <Card.Text>{props.user.description}</Card.Text>
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

const Controls = props => {
    return (
        <Card className="text-dim">
            <Card.Body className="pt-1 pb-3 px-3">
                <Form>
                    <Form.Group controlId="blogForm">
                        <Form.Text className="pl-1">Whats on your mind?</Form.Text>
                        <Form.Control
                            className="border text-dim cursor-text no-active-outline"
                            as="textarea"
                            rows={2}
                            placeholder="Type here..."
                        />
                    </Form.Group>
                    <Row>
                        <div className="pl-3">
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2 border rounded">
                                    <Button className="pb-2 no-active-outline" variant="white">
                                        <Icon.Image fill="dimgrey" />
                                    </Button>
                                    <Button className="pb-2 border-left no-active-outline" variant="white">
                                        <Icon.EmojiLaughing fill="dimgrey" />
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button className="border rounded text-dim no-active-outline" variant="white">
                                        Send
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                        <div className="pt-2 pl-2">
                            {props.cover && <span>Cover Image Selected: {props.cover} </span>}
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
                            <div>
                                <div>
                                    <div className="d-flex">
                                        <Card.Title as={"h6"}>{post.title}</Card.Title>
                                        <div className="ml-auto">
                                            <Badge pill className="text-dim bg-white border">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Card.Text>{post.content}</Card.Text>

                                    <div className="d-flex justify-content-between">
                                        <Col className="p-0">
                                            <Form.Text>
                                                <Link className="link" to={"users/" + post.author._id}>
                                                    by {post.author.name} {post.author.surname}
                                                </Link>
                                            </Form.Text>
                                        </Col>
                                        <Col className="d-flex justify-content-end p-0">
                                            <Accordion.Toggle as="div" eventKey="0">
                                                <Form.Text className="border rounded px-1 cursor-pointer">
                                                    <span>
                                                        {post.comments.length} Comment
                                                        {post.comments.length === 0 ? "s" : ""}
                                                        {post.comments.length > 1 ? "s" : ""}{" "}
                                                        <Icon.ChatText className="mb-1" />
                                                    </span>
                                                </Form.Text>
                                            </Accordion.Toggle>
                                        </Col>
                                        <Col className="d-flex justify-content-end p-0">
                                            <Form.Text>
                                                Posted: <ReactTimeAgo date={new Date(post.createdAt)} />
                                            </Form.Text>
                                        </Col>
                                    </div>
                                </div>

                                {props.user && props.user._id === post.author._id && (
                                    <div className="pt-3">
                                        <ButtonGroup className="border rounded">
                                            <Button
                                                className="text-dim pb-2 no-active-outline"
                                                variant="white"
                                                onClick={e => editPost(e)}
                                            >
                                                <Icon.Pen className="mb-1" />
                                            </Button>
                                            <Button
                                                className="text-danger pb-2 border-left no-active-outline"
                                                variant="white"
                                            >
                                                <Icon.Trash className="mb-1" />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                )}
                                <hr />
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="py-0">
                                    <Form>
                                        <Form.Text className="pl-1">Add a comment to {post.title}</Form.Text>
                                        <div className="d-flex">
                                            <InputGroup>
                                                <Form.Control
                                                    className="border no-active-outline"
                                                    as="input"
                                                    placeholder="Comment..."
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text
                                                        as={Button}
                                                        variant="white"
                                                        className="bg-white text-dim no-active-outline"
                                                    >
                                                        <Icon.ChatText />
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </div>
                                    </Form>
                                    <hr />
                                    {post.comments
                                        .slice(0)
                                        .reverse()
                                        .map(comment => {
                                            return (
                                                <div key={comment._id}>
                                                    <Card.Text className="mb-0">{comment.comment}</Card.Text>
                                                    <div className="d-flex justify-content-between">
                                                        <Form.Text>
                                                            <Link className="link" to={"users/" + comment.author._id}>
                                                                by {comment.author.name} {comment.author.surname}
                                                            </Link>
                                                        </Form.Text>
                                                        <Form.Text>
                                                            Posted: <ReactTimeAgo date={new Date(comment.createdAt)} />
                                                        </Form.Text>
                                                    </div>
                                                    {props.user._id === comment.author._id && (
                                                        <div className="pt-3">
                                                            <ButtonGroup className="border rounded">
                                                                <Button
                                                                    className="mb-1 text-dim no-active-outline"
                                                                    variant="white"
                                                                >
                                                                    <Icon.Pen />
                                                                </Button>
                                                                <Button
                                                                    className="mb-1 text-danger border-left no-active-outline"
                                                                    variant="white"
                                                                >
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

const editPost = e => {
    e.preventDefault()
}

export default Blogs
