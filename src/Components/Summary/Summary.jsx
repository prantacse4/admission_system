import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    Form,
    Container,
    Table,
    ListGroup,
} from "react-bootstrap";
import classes from "./summary.module.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { domain } from "../env";

const Summary = () => {
    const history = useHistory();
    const baseURL = domain;
    const subdata = [
        {
            subject: "CSE",
            code: "101",
        },
        {
            subject: "PHYSICS",
            code: "102",
        },
        {
            subject: "CHEMISTRY",
            code: "103",
        },
    ];

    const [subjects, setSubjects] = useState(subdata);
    const [present_address, setpresent_address] = useState(null);
    const [permanent_address, setpermanent_address] = useState(null);
    const [F_name, setF_name] = useState("Father's Full Name");
    const [M_name, setM_name] = useState("Mother's Full Name");
    const [Full_name, setFull_name] = useState("Full Name");
    const getGst_roll = localStorage.getItem("gst_roll");
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

                    // history.push("/subjectchoice");
                });
        } catch (error) {
            console.log(error.response);
            // throw error;
        }
        
    }, []);


    const Cpresent_address = (event) => {
        setpresent_address(event.target.value);
    };
    const Cpermanent_address = (event) => {
        setpermanent_address(event.target.value);
    };

    const SubmitDataFun = async (event) => {
        event.preventDefault();

        const body = JSON.stringify({
            gst_roll: getGst_roll,
            final: true
        });
        console.log(body);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios
                .get(baseURL + "api/apply/", body, config)
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
        alert("Submission Successfull! You can login now");
        history.push("/");
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
                                    <td>{academic.name}</td>
                                </tr>
                                <tr>
                                    <th>GST Roll</th>
                                    <td>{gst_data.gst_roll}</td>
                                </tr>
                                <tr>
                                    <th>GST Rank</th>
                                    <td>{gst_data.gst_position}</td>
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



                        <br />

                        <Button
                            variant="primary"
                            onClick={handleClick}
                            type="submit"
                        >
                            Final Submit
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Summary;
