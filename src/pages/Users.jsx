import React from "react"
import { Col, Container, Row, Card, Spinner, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Ads from "../components/Ads"
import ReactTimeAgo from "react-time-ago"
import Neighbourhood from "../components/Neighbours"

class Users extends React.Component {
    state = {
        renderedUser: null,
        users: null,
        loading: true
    }

    componentDidMount = async () => {
        this.setState({ renderedUser: await this.props.crud.users.get(this.props.match.params.id) })
        this.setState({ users: await this.props.crud.users.getAll() })
    }

    componentDidUpdate = async (_previousProps, _previousState) => {
        if (this.state.loading && this.state.renderedUser) this.setState({ loading: false })
        if (this.state.renderedUser._id !== this.props.match.params.id)
            this.setState({ renderedUser: await this.props.crud.users.get(this.props.match.params.id) })
    }

    render() {
        return (
            <Container fluid>
                <Row className="py-4">
                    <Col xs={{ span: 8, offset: 1 }}>
                        <User self={this.props.user} user={this.state.renderedUser} loading={this.state.loading} />
                        <UserBlogs self={this.props.user} user={this.state.renderedUser} loading={this.state.loading} />
                        <UserExperiences
                            self={this.props.user}
                            user={this.state.renderedUser}
                            loading={this.state.loading}
                        />
                        <UserEducation
                            self={this.props.user}
                            user={this.state.renderedUser}
                            loading={this.state.loading}
                        />
                        <UserEmployment
                            self={this.props.user}
                            user={this.state.renderedUser}
                            loading={this.state.loading}
                        />
                    </Col>
                    <Col xs={2}>
                        <Ads />
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
        <>
            <Card className="border text-dim">
                <Card.Header className="text-center py-1 bg-white">
                    {props.user.name} {props.user.surname}
                </Card.Header>
                <Card.Body>
                    <Card.Img className="home-avatar" alt="" src={props.user.avatar} />
                    <Card.Title as={"h6"}>
                        {props.user.name} {props.user.surname}
                    </Card.Title>
                    <hr />
                    <Card.Text>{props.user.description}</Card.Text>
                    <Form.Text>
                        Joined: <ReactTimeAgo date={new Date(props.user.createdAt)} />
                    </Form.Text>
                    <hr />
                    {props.user.biography > 0 ? (
                        <Card.Text>{props.user.biography}</Card.Text>
                    ) : props.self && props.user._id === props.self._id ? (
                        <Card.Text>
                            No biography is added yet. You can add one by clicking edit profile below.
                        </Card.Text>
                    ) : (
                        <Card.Text>
                            {props.user.name} {props.user.surname} haven't added a biography yet.
                        </Card.Text>
                    )}
                </Card.Body>

                {props.self && props.user._id === props.self._id ? (
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/">
                            Update Profile
                        </Link>
                    </Card.Footer>
                ) : null}
            </Card>
            <hr />
        </>
    ) : props.loading ? (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">
                    <Spinner animation="border" />
                </Card.Body>
            </Card>
            <hr />
        </>
    ) : (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">Failed to fetch content!</Card.Body>
            </Card>
            <hr />
        </>
    )
}

const UserBlogs = props => {
    return props.user ? (
        props.user.blogs.length > 0 ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Blogs</Card.Header>
                    {props.user.blogs.map(blog => {
                        return (
                            <Card.Body key={blog._id}>
                                <Card.Title as={"h6"}>{blog.title}</Card.Title>
                                <Card.Text>{blog.content}</Card.Text>
                                <hr />
                            </Card.Body>
                        )
                    })}
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/blogs">
                            Go to Blogs
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : props.self && props.user._id === props.self._id ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Blogs</Card.Header>
                    <Card.Body className="text-center p-5">No Blogs added yet.</Card.Body>
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/blogs">
                            Go to Blogs
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : null
    ) : props.loading ? (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">
                    <Spinner animation="border" />
                </Card.Body>
            </Card>
            <hr />
        </>
    ) : (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">Failed to fetch content!</Card.Body>
            </Card>
            <hr />
        </>
    )
}

const UserExperiences = props => {
    return props.user ? (
        props.user.experiences.length > 0 ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Experiences</Card.Header>
                    {props.user.experiences.map(experience => {
                        return (
                            <Card.Body>
                                <Card.Title as={"h6"}>{experience.title}</Card.Title>
                                <Card.Text>{experience.content}</Card.Text>
                                <hr />
                            </Card.Body>
                        )
                    })}
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/NYI">
                            Add Experience
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : props.self && props.user._id === props.self._id ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Experiences</Card.Header>
                    <Card.Body className="text-center p-5">No Experience added yet.</Card.Body>
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/NYI">
                            Add Experience
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : null
    ) : props.loading ? (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">
                    <Spinner animation="border" />
                </Card.Body>
            </Card>
            <hr />
        </>
    ) : (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">Failed to fetch content!</Card.Body>
            </Card>
            <hr />
        </>
    )
}

const UserEducation = props => {
    return props.user ? (
        props.user.educations.length > 0 ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Education</Card.Header>
                    {props.user.educations.map(education => {
                        return (
                            <Card.Body>
                                <Card.Title as={"h6"}>{education.field}</Card.Title>
                                <Card.Text>{education.description}</Card.Text>
                                <hr />
                            </Card.Body>
                        )
                    })}
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/NYI">
                            Add Education
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : props.self && props.user._id === props.self._id ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Education</Card.Header>
                    <Card.Body className="text-center p-5">No Education added yet.</Card.Body>
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/NYI">
                            Add Education
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : null
    ) : props.loading ? (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">
                    <Spinner animation="border" />
                </Card.Body>
            </Card>
            <hr />
        </>
    ) : (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">Failed to fetch content!</Card.Body>
            </Card>
            <hr />
        </>
    )
}

const UserEmployment = props => {
    return props.user ? (
        props.user.employments.length > 0 ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Employment</Card.Header>
                    {props.user.employments.map(employment => {
                        return (
                            <Card.Body>
                                <Card.Title as={"h6"}>{employment.title}</Card.Title>
                                <Card.Text>{employment.content}</Card.Text>
                                <hr />
                            </Card.Body>
                        )
                    })}
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/NYI">
                            Add Employment
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : props.self && props.user._id === props.self._id ? (
            <>
                <Card className="border text-dim">
                    <Card.Header className="text-center py-1 bg-white">Employment</Card.Header>
                    <Card.Body className="text-center p-5">No Employment added yet.</Card.Body>
                    <Card.Footer className="text-center py-1 bg-white">
                        <Link className="link" to="/NYI">
                            Add Employment
                        </Link>
                    </Card.Footer>
                </Card>
                <hr />
            </>
        ) : null
    ) : props.loading ? (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">
                    <Spinner animation="border" />
                </Card.Body>
            </Card>
            <hr />
        </>
    ) : (
        <>
            <Card className="border text-dim">
                <Card.Body className="text-center p-5">Failed to fetch content!</Card.Body>
            </Card>
            <hr />
        </>
    )
}

export default Users
