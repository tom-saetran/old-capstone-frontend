import React from "react"
import uniqid from "uniqid"
import { Card } from "react-bootstrap"
import { Link, withRouter } from "react-router-dom"

class Ads extends React.Component {
    state = {
        ads: null
    }

    componentDidMount = async () => {
        this.setState({ ads: await this.props.crud.ads.getAll() })
    }

    componentDidUpdate = async (_previousProps, _previousState) => {
        if (_previousProps.match.params.id !== this.props.match.params.id)
            this.setState({ ads: await this.props.crud.ads.getAll() })
    }

    render() {
        return (
            <Card className="border text-dim">
                <Card.Header className="text-center py-1 bg-white">Ads</Card.Header>
                <Card.Body>
                    {this.state.ads &&
                        this.state.ads
                            .map(ad => {
                                return (
                                    <div key={ad._id}>
                                        <Card.Title as={"h6"}>{ad.title}</Card.Title>
                                        <Card.Text>
                                            <Link className="link" to={`/out/ads/${ad.outId}`}>
                                                {ad.outText}
                                            </Link>
                                        </Card.Text>
                                    </div>
                                )
                            })
                            .reduce((prev, curr) => [prev, <hr key={uniqid()} />, curr])}
                </Card.Body>
                <Card.Footer className="text-center py-1 bg-white">
                    <Link className="link" to="/advertise">
                        Advertise Here?
                    </Link>
                </Card.Footer>
            </Card>
        )
    }
}

export default withRouter(Ads)
