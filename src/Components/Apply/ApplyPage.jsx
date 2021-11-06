import React, { useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import classes from "./ApplyPage.module.css";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { domain } from "../env";
import axios from "axios";

const ApplyPage = () => {
    const baseURL = domain;
    const [gst_roll, setgst_roll] = useState(null);
    const [hsc_roll, sethsc_roll] = useState(null);
    const [hsc_pass, sethsc_pass] = useState(null);

    const [board, setboard] = useState(null);
    const history = useHistory();

    const options = [
        { value: "2020", label: "2020" },
        { value: "2019", label: "2019" },
    ];
    const options2 = [
        { value: "Barishal", label: "Barishal" },
        { value: "Dhaka", label: "Dhaka" },
        { value: "Jashore", label: "Jashore" },
    ];

    const [submitData, setsubmitData] = useState({
        gst_roll: "",
        hsc_board: "",
        hsc_passing_year: "",
        hsc_roll: "",
    });

    const gst_rollc = (event) => {
        setgst_roll(event.target.value);
    };
    const hsc_rollc = (event) => {
        sethsc_roll(event.target.value);
    };
    const hsc_passing_yearc = (event) => {
        sethsc_pass(event.value);
    };
    const hsc_boardc = (event) => {
        setboard(event.value);
    };

    const SubmitDataFun = async (event) => {
        event.preventDefault();

        const body = JSON.stringify({
            gst_roll: gst_roll,
            hsc_board: board,
            hsc_passing_year: hsc_pass,
            hsc_roll: hsc_roll,
        });
        console.log(body);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios
                .post(baseURL + "api/apply", body, config)
                .then((response) => {
                    console.log(response.data);

                    localStorage.setItem('hsc_roll', hsc_roll);
                    history.push("/info");
                    alert("Success");
                })
                .catch((error) => {
                    console.log(error.response);
                    alert("Something Wrong");

                    localStorage.setItem('hsc_roll', hsc_roll);

                    // history.push("/info");

                });
        } catch (error) {
            console.log(error.response);
            // throw error;
            
        }
    };

    // function handleClick() {
    //   history.push("/info");
    // }

    return (
        <div>
            <Container className={classes.displayCenter}>
                <Card className={[classes.mycard, "box-shadow"].join(" ")}>
                    <Card.Header className={classes.mybg}>Apply</Card.Header>
                    <Card.Body>
                        <Form onSubmit={SubmitDataFun}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>GST ROLL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter GST ROLL"
                                    required
                                    onChange={gst_rollc}
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
                                    required
                                    onChange={hsc_rollc}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="passingYear"
                            >
                                <Form.Label>HSC Passing Year</Form.Label>
                                <Select
                                    value={options.find(
                                        (obj) => obj.value === hsc_pass
                                    )}
                                    options={options}
                                    required
                                    onChange={hsc_passing_yearc}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="HSC Board">
                                <Form.Label>HSC BOARD</Form.Label>
                                <Select
                                    value={options2.find(
                                        (obj) => obj.value === board
                                    )}
                                    options={options2}
                                    required
                                    onChange={hsc_boardc}
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

export default ApplyPage;
