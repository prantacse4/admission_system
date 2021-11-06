import React, { useEffect, useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import classes from "./subjectchoice.module.css";
import { useHistory } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { domain } from "../env";
import axios from "axios";

const SubjectChoice = () => {
    const history = useHistory();
    const baseURL = domain;
    var getHsc_roll = localStorage.getItem("hsc_roll");
    const [automigrate, setautomigrate] = useState("off");
    const [academic, setAcademic] = useState({});
    const [gst_data, setgst_data] = useState({});
    const [gSub, setgetSubjects] = useState({});
    const [subjects, setSubjects] = useState({});
    const [gSub_U, setgetSubjectsCngUnit] = useState({});
    getHsc_roll  = parseInt(getHsc_roll);
    const [loading, setLoading] = useState(false);

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
                    response.data.Data.subjects = response.data.Data.subjects.concat(response.data.Data.subject_with_unit_change);

                    setSubjects(response.data.Data.subjects);
                    setLoading(true);
                    
               
                })
                .catch((error) => {
                    alert("Something Wrong");

                });
        } catch (error) {
            console.log(error.response);
        }
        
    }, []);

    const handleDragEnd = (e) => {
        if (!e.destination) return;
        let tempData = Array.from(subjects);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        setSubjects(tempData);
    };

    const Cautomigrate = (event) => {
      setautomigrate(event.target.value);
      

  };

  const handleClick = async (event) =>  {
        event.preventDefault();

        var has_auto_migrate = 0;
        if(automigrate === "on"){
          has_auto_migrate = 1;
        }
        const body = JSON.stringify({
            hsc_roll: getHsc_roll,
            has_auto_migrate:has_auto_migrate,
            subjects: subjects,
        });
        console.log(body);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios
                .post(baseURL + "api/subject-choice", body, config)
                .then((response) => {
                    console.log(response.data);
                    history.push("/summary");

                })
                .catch((error) => {
                    console.log(error.response);
                    alert("Something Wrong");

                });
        } catch (error) {
            console.log(error.response);
            // throw error;
        }

    }
    if (loading===false) return null;

    return (
        <div>
            <Container className={classes.displayCenter}>
                <Card className={[classes.mycard, "box-shadow"].join(" ")}>
                    <Card.Header className={classes.mybg}>
                        Drag and Drop according to your choice
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <table className="table borderd">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th>Subject Name</th>
                                            <th>Subject Code</th>
                                        </tr>
                                    </thead>
                                    <Droppable droppableId="droppable-1">
                                        {(provider) => (
                                            <tbody
                                                className="text-capitalize"
                                                ref={provider.innerRef}
                                                {...provider.droppableProps}
                                            >
                                                {subjects?.map(
                                                    (subj, index) => (
                                                        <Draggable
                                                            key={subj.subj_code}
                                                            draggableId={
                                                                subj.subj_code
                                                            }
                                                            index={index}
                                                        >
                                                            {(provider) => (
                                                                <tr
                                                                    {...provider.draggableProps}
                                                                    ref={
                                                                        provider.innerRef
                                                                    }
                                                                >
                                                                    <td
                                                                        {...provider.dragHandleProps}
                                                                    >
                                                                        {" "}
                                                                        ={" "}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            subj.subj_name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            subj.subj_code
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                                {provider.placeholder}
                                            </tbody>
                                        )}
                                    </Droppable>
                                </table>
                            </DragDropContext>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                            >
                                <Form.Check
                                    onChange={Cautomigrate}
                                    type="checkbox"
                                    label="Apply for Auto Migrate"
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

export default SubjectChoice;
