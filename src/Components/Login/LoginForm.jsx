import React from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import classes from "./Login.module.css";
const LoginForm = () => {
    return (
        <div>

            <Container className={classes.displayCenter} >
                <Card className={[classes.mycard, "box-shadow"].join(" ")} >
                    <Card.Header className={classes.mybg} >Login</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Application ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                />
                                <Form.Text className="text-muted">
                                    Application id you received at application time
                                </Form.Text>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                           
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginForm;
