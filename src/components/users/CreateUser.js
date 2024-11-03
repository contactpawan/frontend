import {Row, Col, Alert, Form, Button} from "react-bootstrap";
import companyImage from "../../assets/images/companyImage.png"
import "./users.css";
import { useState } from "react";
import axios from "axios";
import { BE_URLS, CREATE_USER_RESPONSE } from "../../utils/constants";

export default function CreateUser () {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [responseMessage, setResponseMessage] = useState(CREATE_USER_RESPONSE.DEFAULT);

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const findFormErrors = () => {
        const { firstname, lastname, uemail } = form;
        const newErrors = {};
        const firstNameError = nameValidation("firstname", firstname);
        if(firstNameError) {
            newErrors.firstname = firstNameError;
        }

        const lastNameError = nameValidation("lastname", lastname);
        if(lastNameError) {
            newErrors.lastname = lastNameError;
        }

        const emailError = emailValidation(uemail);
        if(emailError) {
            newErrors.uemail = emailError;
        }
        
        return newErrors
    }

    const nameValidation = (name, val) => {
        const pattern = /^[A-Za-z]+$/;
        let errorDetails = null;
        if(!val || val === "") {
            errorDetails = `${name} cannot be blank.!`;
        } else if(val.length>100) {
            errorDetails = `${name} is too long.!`;
        } else if(!val.match(pattern)) {
            errorDetails = `Please enter a valid ${name}`;
        }
        return errorDetails;
    };

    const emailValidation = (val) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let errorDetails = null;
        if (!val || val === '' ) {
            errorDetails = 'email cannot be blank.!';
        } else if(!val.match(pattern)) {
            errorDetails = `Please enter a valid email id.!`;
        }
        return errorDetails;
    };

    const addUser = () => {
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
            return;
        }

        const {firstname, lastname, uemail} = form;
        if(firstname && lastname && uemail) {
            const userObj = {
                firstname,
                lastname,
                uemail
            };
            axios.post(BE_URLS.ADD_USER, userObj)
              .then(function (response) {
                resetFields();
                setShowMessage(true);
                setResponseMessage(CREATE_USER_RESPONSE.SUCCESS)
              })
              .catch(function (error) {
                setShowMessage(true);
                setResponseMessage(CREATE_USER_RESPONSE.SOMETHING_WENT_WRONG)
              });
        } else {
            setShowMessage(true);
            setResponseMessage(CREATE_USER_RESPONSE.BAD_REQUEST)
        }
    };

    const resetFields = () => {
        setForm({});
        setShowMessage(false);
        setIsDisabled(true);
    };

    return(
        <Row className="sections">
            <Col lg="4" className="brandSection">
            <img alt="Sapiens" src={companyImage} />
            </Col>
            <Col lg="8" className="formBlock">
                <h2>Add Users</h2>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="firstnameValidate">
                            <Form.Label>First name*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                maxLength={100}
                                placeholder="First name"
                                value={(form && form.firstname) || ""}
                                onChange={e => setField('firstname', e.target.value)}
                                isInvalid={ !!errors.firstname }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errors.firstname }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="lastnameValidate">
                            <Form.Label>Last name*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={(form && form.lastname) || ""}
                                onChange={e => setField('lastname', e.target.value)}
                                isInvalid={ !!errors.lastname }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errors.lastname }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="uemailValidate">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={(form && form.uemail) || ""} onChange={e => setField('uemail', e.target.value)} isInvalid={ !!errors.uemail } required />
                            <Form.Control.Feedback type='invalid'>
                                { errors.uemail }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="button" onClick={(e)=>addUser(e)} disabled={false}>Submit form</Button>
                </Form>
                {showMessage?
                (
                    <Alert variant={responseMessage.type} onClose={() => setShowMessage(false)} style={{marginTop: "15px"}} dismissible>
                        <Alert.Heading>{responseMessage.title}</Alert.Heading>
                        <p>{responseMessage.message}</p>
                    </Alert>
                )
                :
                (<></>)}
            </Col>
        </Row>
    );
}