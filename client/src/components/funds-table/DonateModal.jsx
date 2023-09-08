import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export function DonateModal({fundId}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
      };

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [donation, setDonation] = useState(0);
    const [donationErr, setDonationErr] = useState('');
    const [formErr, setFormErr] = useState('');


    function updateName(e){
        setName(e.target.value);
    }


    function isValidName(e) {
        const { value } = e.target;
        const minSize = 5;

        if (value.length < minSize) {
            return setNameErr(`Name per trumpas. Minimum ${minSize} simboliu.`);
        }
        return setNameErr('');
    }

    // function isValidDonation(e) {
    //     const { value } = e.target;
    //     const minSize = 1;

    //     if (value.length < minSize) {
    //         return setDonationErr(`Minimum donation ${minSize} €.`);
    //     }
    //     return setDonationErr('');
    // }
    

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3001/api/donation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                fundId,
                name,
                donation,
            }),
        }).then(res => res.json())
            .then(data => {
                console.log(data);

                
            })
            .catch(err => console.error(err));
    }

  return (
    <>
      <button type="button" onClick={handleShow} className="btn-public btn-primary display-4" >Donate</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Donate</Modal.Title>
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
                        <input onChange={updateName} onBlur={isValidName} value={name} type="text" id="name"
                            className={`form-control ${nameErr ? 'is-invalid' : ''} `} />
                        <label htmlFor="email">Your name</label>
                        <div className="invalid-feedback">{nameErr}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={e => setDonation(+e.target.value)} value={donation}  type="number"
                                    className={`form-control ${donationErr ? 'is-invalid' : ''}`} id="donation" min={0} max={1_000_000} step={1} />
                        <label htmlFor="email">Your donation</label>
                        <span className="input-group-text">EUR</span>
                        <div className="invalid-feedback">{donationErr}</div>
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Donate</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
