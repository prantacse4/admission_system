import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    Form,
    Container,
    Table,
    ListGroup,
} from "react-bootstrap";
import classes from "./info.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { domain } from "../env";

const Info = () => {
    const history = useHistory();
    const baseURL = domain;

    const [present_address, setpresent_address] = useState(null);
    const [permanent_address, setpermanent_address] = useState(null);
    const [mobile, setmobile] = useState(null);
    const [email, setemail] = useState(null);
    const [academic, setAcademic] = useState({});
    const [gst_data, setgst_data] = useState({});
    const [gSub, setgetSubjects] = useState({});
    const [gSub_U, setgetSubjectsCngUnit] = useState({});
    const [unit_change, setunit_change] = useState("off");
    const [loading, setLoading] = useState(false);
    var getHsc_roll = localStorage.getItem("hsc_roll");
    getHsc_roll  = parseInt(getHsc_roll);

    useEffect(() => {
        const body = JSON.stringify({
            hsc_roll: getHsc_roll,
        });

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios
                .post(baseURL + "api/get-student", body, config)
                .then((response) => {
                    setAcademic(response.data.Data.academic_info);
                    setgetSubjects(response.data.Data.subjects);
                    setgetSubjectsCngUnit(response.data.Data.subject_with_unit_change);
                    setgst_data(response.data.Data.gst_info);
                    setLoading(true);
                })
                .catch((error) => {
                    console.log(error.response);
                    alert("Something Wrong");
                });
        } catch (error) {
            console.log(error.response);
        }
        
    }, []);


    const Cpresent_address = (event) => {
        setpresent_address(event.target.value);
    };
    const Cpermanent_address = (event) => {
        setpermanent_address(event.target.value);
    };
    const Cunit_change = (event) => {
        setunit_change(event.target.value);
    };

    const Cmobile = (event) => {
        setmobile(event.target.value);
    };

    const Cemail = (event) => {
        setemail(event.target.value);
    };

    const SubmitDataFun = async (event) => {
        event.preventDefault();
        var myunit = 0;
        if (unit_change === "on") {
            myunit = 1;
        }

        const body = JSON.stringify({
            hsc_roll: getHsc_roll,
            has_unit_change: myunit,
            phone: mobile,
            email: email,
            present_address: present_address,
            permanent_address: permanent_address,
        });
        console.log(body);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios
                .post(baseURL + "api/apply/payment", body, config)
                .then((response) => {
                    history.push("/subjectchoice");
                })
                .catch((error) => {
                    alert("Something Wrong");

                });
        } catch (error) {
            console.log(error.response);
        }
    };

    if (loading===false) return null;
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
                                    <td>{academic.name}</td>
                                </tr>
                                <tr>
                                    <th>Father's Name</th>
                                    <td>{academic.father_name}</td>
                                </tr>
                                <tr>
                                    <th>Mother's Name</th>
                                    <td>{academic.mother_name}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <h5>HSC Data</h5>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <th>HSC Roll</th>
                                    <td>{academic.hsc_roll}</td>
                                </tr>
                                <tr>
                                    <th>Passing Year</th>
                                    <td>{academic.hsc_passing_year}</td>
                                </tr>
                                <tr>
                                    <th>Board</th>
                                    <td>{academic.hsc_board}</td>
                                </tr>

                                <tr>
                                    <th>Group</th>
                                    <td>{academic.hsc_group}</td>
                                </tr>
                                <tr>
                                    <th>GPA</th>
                                    <td>{academic.hsc_gpa}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <h5>GST Data</h5>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <th>GST Roll</th>
                                    <td>{gst_data.gst_roll}</td>
                                </tr>
                                <tr>
                                    <th>Unit</th>
                                    <td>{gst_data.gst_unit}</td>
                                </tr>
                                <tr>
                                    <th>GST Board</th>
                                    <td>{gst_data.hsc_board}</td>
                                </tr>
                                <tr>
                                    <th>Rank</th>
                                    <td>{gst_data.gst_position}</td>
                                </tr>

                                <tr>
                                    <th>Total Marks</th>
                                    <td>{gst_data.total_score}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br />
                      
                        <Form onSubmit={SubmitDataFun}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            >
                                <Form.Check
                                    onChange={Cunit_change}
                                    type="checkbox"
                                    label="Apply for Unit Change"
                                />
                            </Form.Group>
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
                                <Form.Label>Mobile (Must be 11 Didits)</Form.Label>
                                <Form.Control
                                    onChange={Cmobile}
                                    type="text"
                                    placeholder="01XXXXXXXXX"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={Cemail}
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                />
                            </Form.Group>

                            <br />

                            <h5>ELIGIBLE SUBJECT</h5>
                        <ListGroup as="ul">
                            {gSub.map((sub) => (
                                <ListGroup.Item as="li" key={sub.subj_code}>
                                    {sub.subj_name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <br />
                        <h5>ELIGIBLE SUBJECT WITH UNIT CHANGE</h5>
                        <ListGroup as="ul">
                            {gSub_U.map((sub) => (
                                <ListGroup.Item as="li" key={sub.subj_code}>
                                    {sub.subj_name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <br />

                            <Button
                                variant="primary"
                                type="submit"
                                // onClick={handleClick}
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
