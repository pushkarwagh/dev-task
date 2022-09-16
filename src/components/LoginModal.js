import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import API from "../assests/Api/Api"
import { setVisibility } from "../redux/slices/ModalSlice";

const api = new API();
function LoginModal() {
    const [show, setShow] = useState(true);
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
    });

    const dispatch = useDispatch();
    const visible = useSelector(state => state.modal.visible);

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleLogin = () => {
        const { email, password } = state;

        const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
        );
        if (email === "") {
            setErrors({ emailError: " Email is Required " });
        } else if (!emailCheck) {
            setErrors({ emailError: " Enter a valid Email" });
        } else if (password === "") {
            setErrors({ passwordError: "password is required  " });
        } else if (password.length < 7) {
            setErrors({
                passwordError: "password  must contain  eight characters ",
            });
        } else {
            api.login({ identifier: email, password }).then(res => {
                localStorage.setItem('token', res.data.jwt);
                dispatch(setVisibility(false));
            }).catch(err => (err));
        }
    };


    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header /*{closeButton}*/>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={state.email}
                            onChange={(e) => handleChange(e)}
                            autoFocus
                        />
                        {errors?.emailError && (
                            <p style={{ color: "red" }}>*{errors.emailError}</p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors?.passwordError && (
                            <p style={{ color: "red" }}>*{errors.passwordError}</p>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;

