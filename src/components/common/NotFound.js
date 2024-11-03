import { Row, Col } from "react-bootstrap";

export default function NotFound() {
    return (
        <Row className="sections">
            <Col lg="12">
                <div class="text-center">
                    <h3 class="h2 mb-2">Oops! You're lost.</h3>
                    <p class="mb-5">The page you are looking for was not found.</p>
                    <a class="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" href="/" role="button">Back to Home</a>
                </div>
            </Col>
        </Row>
    );
}