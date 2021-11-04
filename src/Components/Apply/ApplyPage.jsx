import React from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import classes from "./ApplyPage.module.css";
import Select from "react-select";
import { useHistory } from "react-router-dom";
const ApplyPage = () => {
    const options = [
        { value: "2020", label: "2020" },
        { value: "2019", label: "2019" },
    ];
    const options2 = [
        { value: "Barishal", label: "Barishal" },
        { value: "Dhaka", label: "Dhaka" },
        { value: "Jashore", label: "Jashore" },
    ];

    const history = useHistory();

    function handleClick() {
      history.push("/info");
    }


    return (
        <div>
            <Container className={classes.displayCenter}>
                <Card className={[classes.mycard, "box-shadow"].join(" ")}>
                    <Card.Header className={classes.mybg}>Apply</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>GST ROLL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter GST ROLL"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>HSC ROLL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter HSC ROLL"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="passingYear"
                            >
                                <Form.Label>HSC Passing Year</Form.Label>
                                <Select options={options} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="HSC Board">
                                <Form.Label>HSC BOARD</Form.Label>
                                <Select options={options2} />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleClick}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ApplyPage;
