import React, { useState } from "react";
import { Card, Button, Form, Container, ListGroup } from "react-bootstrap";
import classes from "./subjectchoice.module.css";
import { useHistory } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { domain } from "../env";
import axios from "axios";

const SubjectChoice = () => {
    const history = useHistory();
    const baseURL = domain;
    const getHsc_roll = localStorage.getItem("hsc_roll");
    const [automigrate, setautomigrate] = useState("off");

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

    function handleClick() {

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
                .post(baseURL + "api/apply/", subjects, config)
                .then((response) => {
                    // history.push("/subjectchoice");
                    console.log(response.data);
                    alert("Success");
                })
                .catch((error) => {
                    console.log(error.response);
                    alert("Something Wrong");

                    history.push("/summary");
                });
        } catch (error) {
            console.log(error.response);
            // throw error;
        }

        history.push("/info");
    }
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
                                            <th>Subject COde</th>
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
                                                            key={subj.code}
                                                            draggableId={
                                                                subj.code
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
                                                                            subj.subject
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            subj.code
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
