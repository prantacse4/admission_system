import React, { useEffect, useState } from "react";
import { Card, Button, Form, Container, Table } from "react-bootstrap";
import classes from "./info.module.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { domain } from "../env";

const Info = () => {
    const history = useHistory();
    const baseURL = domain;

    const [present_address, setpresent_address] = useState(null);
    const [permanent_address, setpermanent_address] = useState(null);
    const [mobile, setmobile] = useState(null);
    const [F_name, setF_name] = useState("Father's Full Name");
    const [M_name, setM_name] = useState("Mother's Full Name");
    const [Full_name, setFull_name] = useState("Full Name");

    const getGst_roll = localStorage.getItem("gst_roll");

    const Cpresent_address = (event) => {
        setpresent_address(event.target.value);
    };
    const Cpermanent_address = (event) => {
        setpermanent_address(event.target.value);
    };

    const Cmobile = (event) => {
        setmobile(event.target.value);
    };

    const SubmitDataFun = async (event) => {
        event.preventDefault();

        const body = JSON.stringify({
            gst_roll: getGst_roll,
            present_address: present_address,
            permanent_address: permanent_address

        });
        console.log(body);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios
                .post(baseURL + "api/apply/", body, config)
                .then((response) => {
                    history.push("/subjectchoice");
                    console.log(response.data);
                    alert("Success");
                })
                .catch((error) => {
                    console.log(error.response);
                    alert("Something Wrong");


                    history.push("/subjectchoice");

                });
        } catch (error) {
            console.log(error.response);
            // throw error;
            
        }
    };

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
                                    <td>{Full_name}</td>
                                </tr>
                                <tr>
                                    <th>Father's Name</th>
                                    <td>{F_name}</td>
                                </tr>
                                <tr>
                                    <th>Mother's Name</th>
                                    <td>{M_name}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <Form onSubmit={SubmitDataFun}>
                            <Form.Group
                                className="mb-3"
                                controlId="presentaddresss"
                            >
                                <Form.Label>Your Present Address</Form.Label>
                                <Form.Control
                                onChange={Cpresent_address}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Present Address"
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="permanentaddress"
                            >
                                <Form.Label>Your Permanent Address</Form.Label>
                                <Form.Control
                                    onChange={Cpermanent_address}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Permanent Address"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="mobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                     onChange={Cmobile}
                                    type="text"
                                    placeholder="Enter your mobile"
                                    required
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
