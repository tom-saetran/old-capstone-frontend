import React, { useEffect } from "react"
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
    InputGroup,
    Modal,
    FormGroup
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
        cover: null,
        update: false
    }

    componentDidMount = async () => {
        this.setState({ posts: await this.props.crud.blogs.getAll() })
    }

    componentDidUpdate = async (_previousProps, _previousState) => {
        if (this.state.loading && this.state.posts && !this.state.update) this.setState({ loading: false })
        if (this.state.loading && this.state.update)
            this.setState({ posts: await this.props.crud.blogs.getAll(), update: false })

        if (this.state.update !== _previousState.update)
            this.setState(async state => {
                return { ...state, update: false, loading: false }
            })
    }

    handleUpdate = () => {
        this.setState({ update: true, loading: true })
    }

    render() {
        return (
            <Container fluid className="px-0">
                <Row className="py-3 no-gutters">
                    <Col className="pr-3 pr-sm-0 pl-3 pl-xl-0" xs={12} sm={4} md={3} xl={{ span: 2, offset: 1 }}>
                        <User user={this.props.user} />
                        <hr />
                        <div className="d-none d-sm-block">
                            <Ads />
                        </div>
                        <hr className="d-sm-none" />
                    </Col>
                    <Col className="px-3" xs={12} sm={8} md={6}>
                        <Controls
                            onUpdate={this.handleUpdate}
                            crud={this.props.crud}
                            user={this.props.user}
                            cover={this.state.cover}
                        />
                        <hr />
                        <Posts
                            crud={this.props.crud}
                            user={this.props.user}
                            posts={this.state.posts}
                            loading={this.state.loading}
                            onUpdate={this.handleUpdate}
                        />
                    </Col>
                    <Col className="pr-3 d-none d-md-block pr-xl-0" md={3} xl={2}>
                        <Tools />
                        <hr />
                        <Neighbourhood crud={this.props.crud} user={this.props.user} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const AddBlogModal = props => {
    const [show, setShow] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [validated, setValidated] = React.useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleSubmit = async e => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            e.preventDefault()
            await handleSend()
            setShow(false)
            props.onUpdate()
        }
        setValidated(true)
    }

    useEffect(() => {
        setContent(props.content)
    }, [props.content])

    const handleSend = async () => {
        const data = {
            title,
            content,
            category,
            author: props.user._id
        }

        await props.crud.blogs.post(data)
    }

    return (
        <>
            <Button className="border rounded text-dim no-active-outline" variant="white" onClick={handleShow}>
                Send
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                    <Card.Header className="text-center text-dim py-2 bg-white">Add New</Card.Header>
                    <Modal.Body style={{ height: "320px" }}>
                        <Form.Group controlId="formTitle">
                            <Form.Text className="pl-1 text-dim">Title</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                type="text"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <Form.Control.Feedback className="pl-1 text-dim" type="invalid">
                                Title is required.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback className="pl-1 text-dim" type="valid">
                                Thats a nice title!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Text className="pl-1 text-dim">Content</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                as="textarea"
                                rows={2}
                                required
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            <Form.Control.Feedback className="pl-1 text-dim" type="invalid">
                                Content is required.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback className="pl-1 text-dim" type="valid">
                                Thats some quality content!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Text className="pl-1 text-dim">Category</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                type="text"
                                required
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                            <Form.Control.Feedback className="pl-1 text-dim" type="invalid">
                                Category is required.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback className="pl-1 text-dim" type="valid">
                                Thats a nice category!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>

                    <div className="d-flex justify-content-end pb-3 pr-3">
                        <ButtonToolbar>
                            <ButtonGroup className="mr-2 border rounded">
                                <Button className="pb-2 text-dim no-active-outline" variant="white">
                                    <Icon.Image fill="dimgrey" />
                                </Button>
                                <Button className="pb-2 border-left text-dim no-active-outline" variant="white">
                                    <Icon.EmojiLaughing fill="dimgrey" />
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button
                                    className="border rounded text-dim no-active-outline"
                                    variant="white"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

const EditBlogModal = props => {
    const [show, setShow] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [validated, setValidated] = React.useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleSubmit = async e => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            e.preventDefault()
            await handleSend()
            setShow(false)
            props.onUpdate()
        }
        setValidated(true)
    }

    useEffect(() => {
        setContent(props.post.content)
    }, [props.post.content])

    useEffect(() => {
        setTitle(props.post.title)
    }, [props.post.title])

    useEffect(() => {
        setCategory(props.post.category)
    }, [props.post.category])

    const handleSend = async () => {
        const data = {
            title,
            content,
            category,
            author: props.post.author
        }

        await props.crud.blogs.put(props.post._id, data)
    }

    return (
        <>
            <Button className="text-dim pb-2 no-active-outline" variant="white" onClick={handleShow}>
                <Icon.Pen className="mb-1" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                    <Card.Header className="text-center text-dim py-2 bg-white">Edit {props.post.title}</Card.Header>
                    <Modal.Body style={{ height: "320px" }}>
                        <Form.Group controlId="formTitle">
                            <Form.Text className="pl-1 text-dim">Title</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                type="text"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Text className="pl-1 text-dim">Content</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                as="textarea"
                                rows={2}
                                required
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Text className="pl-1 text-dim">Category</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                type="text"
                                required
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <div className="d-flex justify-content-end pb-3 pr-3">
                        <ButtonToolbar>
                            <ButtonGroup className="mr-2 border rounded">
                                <Button className="pb-2 text-dim no-active-outline" variant="white">
                                    <Icon.Image fill="dimgrey" />
                                </Button>
                                <Button className="pb-2 border-left text-dim no-active-outline" variant="white">
                                    <Icon.EmojiLaughing fill="dimgrey" />
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button
                                    className="border rounded text-dim no-active-outline"
                                    variant="white"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

const RemoveBlogModal = props => {
    const [show, setShow] = React.useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleDelete = async () => {
        await props.crud.blogs.delete(props.post._id)
        setShow(false)
        props.onUpdate()
    }

    return (
        <>
            <Button className="text-danger pb-2 border-left no-active-outline" variant="white" onClick={handleShow}>
                <Icon.Trash className="mb-1" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="justify-content-center py-2 text-dim">
                    This will remove the blog post permanently!
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex">
                        <Card.Title as={"h6"}>{props.post.title}</Card.Title>
                        <div className="ml-auto">
                            <Badge pill className="text-dim bg-white border">
                                {props.post.category}
                            </Badge>
                        </div>
                    </div>
                    <Card.Text>{props.post.content}</Card.Text>
                </Modal.Body>
                <Modal.Footer className="justify-content-center align-items-end">
                    <Button className="border text-dim no-active-outline" variant="white" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="border text-danger no-active-outline" variant="white" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const AddComment = props => {
    const [comment, setComment] = React.useState("")
    const [validated, setValidated] = React.useState(false)

    const handleSubmit = async e => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            e.preventDefault()
            await handleSend()
            setComment("")
            props.onUpdate()
        }
        setValidated(true)
    }

    const handleSend = async () => {
        const id = props.post._id
        const data = {
            comment,
            author: props.user._id
        }

        await props.crud.blogs.comments.post(id, data)
    }

    return (
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
            <FormGroup controlId="formComment">
                <Form.Text className="pl-1">Add a comment to {props.post.title}</Form.Text>
                <div className="d-flex">
                    <InputGroup>
                        <Form.Control
                            className="border no-active-outline"
                            as="input"
                            value={comment}
                            required
                            onChange={e => setComment(e.target.value)}
                            placeholder="Comment..."
                        />
                        <InputGroup.Append>
                            <InputGroup.Text
                                as={Button}
                                type="submit"
                                variant="white"
                                className="bg-white text-dim no-active-outline"
                            >
                                <Icon.ChatText />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </FormGroup>
        </Form>
    )
}

const EditCommentModal = props => {
    const [show, setShow] = React.useState(false)
    const [comment, setComment] = React.useState("")
    const [validated, setValidated] = React.useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleSubmit = async e => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            e.preventDefault()
            await handleSend()
            setShow(false)
            props.onUpdate()
        }
        setValidated(true)
    }

    useEffect(() => {
        setComment(props.comment.comment)
    }, [props.comment.comment])

    const handleSend = async () => {
        const data = {
            comment,
            author: props.comment.author
        }

        await props.crud.blogs.comments.put(props.post._id, data, props.comment._id)
    }

    return (
        <>
            <Button className="text-dim pb-2 no-active-outline" variant="white" onClick={handleShow}>
                <Icon.Pen className="mb-1" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                    <Card.Header className="text-center text-dim py-2 bg-white">
                        Edit comment in {props.post.title}
                    </Card.Header>
                    <Modal.Body style={{ height: "140px" }}>
                        <Form.Group controlId="formComment">
                            <Form.Text className="pl-1 text-dim">Comment</Form.Text>
                            <Form.Control
                                className="border text-dim cursor-text no-active-outline"
                                type="text"
                                required
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <div className="d-flex justify-content-end pb-3 pr-3">
                        <Button className="border rounded text-dim no-active-outline" variant="white" type="submit">
                            Send
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

const RemoveCommentModal = props => {
    const [show, setShow] = React.useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleDelete = async () => {
        await props.crud.blogs.comments.delete(props.post._id, props.comment._id)
        setShow(false)
        props.onUpdate()
    }

    return (
        <>
            <Button className="mb-1 text-danger border-left no-active-outline" variant="white" onClick={handleShow}>
                <Icon.Trash />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="justify-content-center py-2 text-dim">
                    This will remove the comment permanently!
                </Modal.Header>
                <Modal.Footer className="justify-content-center align-items-end">
                    <Button className="border text-dim no-active-outline" variant="white" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="border text-danger no-active-outline" variant="white" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
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
                <Spinner className="spinner" animation="border" />
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
    const [content, setContent] = React.useState("")

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
                            value={content}
                            onChange={e => setContent(e.target.value)}
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
                                    <AddBlogModal
                                        onUpdate={props.onUpdate}
                                        crud={props.crud}
                                        user={props.user}
                                        cover={props.cover}
                                        content={content}
                                    />
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
                                    <div className="d-flex align-items-baseline">
                                        <Card.Title className="pr-1" as={"h6"}>
                                            {post.title}
                                        </Card.Title>
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
                                        <Col className="d-flex justify-content-end p-0 px-2">
                                            <Form.Text className="pr-3">
                                                {post.likes.find(like => like === props.user._id) ? (
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={async e => {
                                                            await props.crud.blogs.unlike(post._id, {
                                                                id: props.user._id
                                                            })

                                                            props.onUpdate()
                                                        }}
                                                    >
                                                        <span className="pr-1 text-dim">{post.likes.length}</span>
                                                        <Icon.HeartFill fill="#dc3545" />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={async e => {
                                                            await props.crud.blogs.like(post._id, {
                                                                id: props.user._id
                                                            })

                                                            props.onUpdate()
                                                        }}
                                                    >
                                                        <span className="pr-1">{post.likes.length}</span>
                                                        <Icon.HeartFill fill="lightgray" />
                                                    </div>
                                                )}
                                            </Form.Text>
                                            <Accordion.Toggle as="div" eventKey="0">
                                                <div className="d-flex">
                                                    <Form.Text className="border rounded px-1 cursor-pointer">
                                                        <span>
                                                            {post.comments.length} Comment
                                                            {post.comments.length === 0 ? "s" : ""}
                                                            {post.comments.length > 1 ? "s" : ""}{" "}
                                                            <Icon.ChatText className="mb-1" />
                                                        </span>
                                                    </Form.Text>
                                                </div>
                                            </Accordion.Toggle>
                                        </Col>
                                        <Col className="d-none d-lg-block text-end p-0">
                                            {post.createdAt === post.updatedAt ? (
                                                <Form.Text>
                                                    Posted: <ReactTimeAgo date={new Date(post.createdAt)} />
                                                </Form.Text>
                                            ) : (
                                                <Form.Text>
                                                    Edited: <ReactTimeAgo date={new Date(post.updatedAt)} />
                                                </Form.Text>
                                            )}
                                        </Col>
                                    </div>
                                </div>

                                {props.user && props.user._id === post.author._id && (
                                    <div className="pt-3">
                                        <ButtonGroup className="border rounded">
                                            <EditBlogModal onUpdate={props.onUpdate} post={post} crud={props.crud} />
                                            <RemoveBlogModal onUpdate={props.onUpdate} post={post} crud={props.crud} />
                                        </ButtonGroup>
                                    </div>
                                )}
                                <hr />
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="py-0">
                                    <AddComment
                                        onUpdate={props.onUpdate}
                                        user={props.user}
                                        post={post}
                                        crud={props.crud}
                                    />
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
                                                        {comment.createdAt === comment.updatedAt ? (
                                                            <Form.Text>
                                                                Posted:{" "}
                                                                <ReactTimeAgo date={new Date(comment.createdAt)} />
                                                            </Form.Text>
                                                        ) : (
                                                            <Form.Text>
                                                                Edited:{" "}
                                                                <ReactTimeAgo date={new Date(comment.updatedAt)} />
                                                            </Form.Text>
                                                        )}
                                                    </div>
                                                    {props.user && props.user._id === comment.author._id && (
                                                        <div className="pt-3">
                                                            <ButtonGroup className="border rounded">
                                                                <EditCommentModal
                                                                    comment={comment}
                                                                    crud={props.crud}
                                                                    post={post}
                                                                    onUpdate={props.onUpdate}
                                                                />
                                                                <RemoveCommentModal
                                                                    comment={comment}
                                                                    crud={props.crud}
                                                                    post={post}
                                                                    onUpdate={props.onUpdate}
                                                                />
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
                <Spinner className="spinner" animation="border" />
            </Card.Body>
        </Card>
    ) : (
        <Card>
            <Card.Body className="text-center text-dim p-5">Failed to fetch content!</Card.Body>
        </Card>
    )
}

export default Blogs
