import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {  Link, useNavigate } from 'react-router-dom';
import { RegisterModal } from './RegisterModal';
import { GlobalContext } from '../context/GlobalContext';

export function DonateModal() {
    const { updateEmail, updateFullname, updateLoginStatus, updateRole } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [password, setPasword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [formErr, setFormErr] = useState('');


    function updateEmailLogin(e){
        setEmail(e.target.value);
    }

    function updatePasword(e){
        setPasword(e.target.value);
    }


    function isValidEmail(e) {
        const { value } = e.target;
        const minSize = 6;

        if (value.length < minSize) {
            return setEmailErr(`Email per trumpas. Minimum ${minSize} simboliu.`);
        }
        return setEmailErr('');
    }

    function isValidPassword(e) {
        const { value } = e.target;
        const minSize = 6;

        if (value.length < minSize) {
            return setPasswordErr(`Pass per trumpas. Minimum ${minSize} simboliu.`);
        }
        return setPasswordErr('');
    }
    

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
            }),
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'err') {
                    setFormErr(data.msg);
                }
                if (data.status === 'ok') {
                        updateLoginStatus(true);
                        updateEmail(data.user.email);
                        updateFullname(data.user.fullname);
                        updateRole(data.user.role);
                        navigate('/dashboard');
                }
            })
            .catch(err => console.error(err));
    }

  return (
    <>
      <button onClick={handleShow} className="btn btn-outline-success btn-round me-2" >Login</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
                    formErr && (
                        <div className="ml-1 alert alert-danger alert-dismissible fade show" role="alert">
                            {formErr}
                            <button onClick={() => setFormErr('')} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )
                }
        <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={updateEmailLogin} onBlur={isValidEmail} value={email} type="email" id="email"
                            className={`form-control ${emailErr ? 'is-invalid' : ''} `} />
                        <label htmlFor="email">Email address</label>
                        <div className="invalid-feedback">{emailErr}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={updatePasword} onBlur={isValidPassword} value={password} type="password" id="password" 
                            className={`form-control ${passwordErr ? 'is-invalid' : ''} `}/>
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback">{passwordErr}</div>
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
          <RegisterModal />
        </Modal.Footer>
      </Modal>
    </>
  );
}
