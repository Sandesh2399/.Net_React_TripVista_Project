import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type props = {
    show: boolean,
    setShow: (show: boolean) => void,
}

function BookingForm(props: props) {
    const handleClose = () => props.setShow(false);

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col className='mb-3'>
                                <Form.Label>Destination</Form.Label>
                                <select className="form-control" aria-label="Default select example">
                                    <option>Select Destination</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </Col>
                            <Col className='mb-3'>
                                <Form.Label>People</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder="# of People"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-3'>
                                <Form.Label>Check In</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder="Check In"
                                />
                            </Col>
                            <Col className='mb-3'>
                                <Form.Label>Check Out</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder="Check Out"
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col className='mb-3'>
                                <Form.Label>First name</Form.Label>
                                <Form.Control placeholder="First name" />
                            </Col>
                            <Col className='mb-3'>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control placeholder="Last name" />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-3'>
                                <Form.Label>Phone No</Form.Label>
                                <Form.Control
                                    placeholder="Phone No"
                                />
                            </Col>
                            <Col className='mb-3'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Username"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder="Password"
                                />
                            </Col>
                            <Col className='mb-3'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder="Confirm Password"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookingForm