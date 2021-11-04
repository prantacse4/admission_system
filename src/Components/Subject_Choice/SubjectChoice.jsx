import React, {useState} from "react";
import { Card, Button, Form, Container, ListGroup } from "react-bootstrap";
import classes from "./subjectchoice.module.css";
import { useHistory } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const SubjectChoice = () => {
    const history = useHistory();

    const subdata = [
        {
            subject: "CSE",
            code: "101"
        },
        {
            subject: "PHYSICS",
            code: "102"
        },
        {
            subject: "CHEMISTRY",
            code: "103"
        },
    ]

        const [subjects, setSubjects] = useState(subdata);

    
  
        const handleDragEnd = (e) => {
            if (!e.destination) return;
            let tempData = Array.from(subjects);
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
            setSubjects(tempData);
            console.log(subjects);
          };

    function handleClick() {
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
                {subjects?.map((user, index) => (
                  <Draggable
                    key={user.code}
                    draggableId={user.code}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td {...provider.dragHandleProps}> = </td>
                        <td>{user.subject}</td>
                        <td>{user.code}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>


                         

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
