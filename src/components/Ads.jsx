import { Card } from "react-bootstrap"
import { Link, withRouter } from "react-router-dom"

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

export default withRouter(Ads)
