import React from "react";
import { Card, Button, Form, Container, Table } from "react-bootstrap";
import classes from "./info.module.css";
import { useHistory } from "react-router-dom";

const Info = () => {
    const history = useHistory();

    function handleClick() {
        history.push("/subjectchoice");
    }
    return (
        <div>
            <Container className={classes.displayCenter}>
                <Card className={[classes.mycard, "box-shadow"].join(" ")}>
                    <Card.Header className={classes.mybg}>
                        Personal Info
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover size="sm">
                                
                                <tbody>
                                <tr>
                                    <th>Full Name</th>
                                    <td>Student's Full Name</td>
                                </tr>
                                <tr>
                                    <th>Father's Name</th>
                                    <td>Student's Father's Name</td>
                                </tr>
                                <tr>
                                    <th>Mother's Name</th>
                                    <td>Student's Mother's Name</td>
                                </tr>
                                </tbody>
                                
                               
                        </Table>

                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="presentaddresss"
                            >
                                <Form.Label>Your Present Address</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter Present Address" />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="permanentaddress"
                            >
                                <Form.Label>Your Present Address</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter Permanent Address" />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="mobile"
                            >
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your mobile"
                                />
                            </Form.Group>

                         

                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleClick}
                            >
                                Submit & Next
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Info;
