import React from "react"
import { Card, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"

class Neighbourhood extends React.Component {
    state = {
        users: null
    }

    componentDidMount = async () => {
        this.setState({ users: await this.props.crud.users.getAll() })
    }

    render() {
        return this.state.users && this.props.user ? (
            <Card className="text-dim">
                <Card.Header className="text-center py-1 bg-white">People you may know</Card.Header>
                <Card.Body>
                    {this.state.users.result.map(user => {
                        if (user._id === this.props.user._id) return null
                        return (
                            <div key={user._id}>
                                <Link className="link" to={"/users/" + user._id}>
                                    <Card.Title as={"h6"}>
                                        <Card.Img className="friend-avatar mr-2" alt="" src={user.avatar} />
                                        {user.name} {user.surname}
                                    </Card.Title>
                                </Link>
                                <Link className="link" to={"/users/" + user._id}>
                                    <Card.Text>
                                        {user.description.slice(0, 42)}
                                        {user.description.length > 42 ? "..." : ""}
                                    </Card.Text>
                                </Link>
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
}

export default Neighbourhood
