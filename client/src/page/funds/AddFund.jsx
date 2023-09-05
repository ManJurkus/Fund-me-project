import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

import defaultImage from '../../assets/preview.png';
import { Title } from "../../components/Title";
import { Forbiden } from "../Forbiden";

export function AddFund() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const { role } = useContext(GlobalContext);

    const [image, setImage] = useState('');
    const [imageErr, setImageErr] = useState('');
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [fundText, setFundText] = useState('');
    const [fundTextErr, setFundTextErr] = useState('');
    const [fundSum, setFundSum] = useState(0);
    const [fundSumErr, setFundSumErr] = useState('');

    if (role !== 'user') {
        return <Forbiden />;
    }

    function updateImage(e) {
        const formData = new FormData();
        formData.append('fund_image', e.target.files[0]);

        fetch('http://localhost:3001/api/upload/car', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => setImage(`http://localhost:3001/${data.path}`))
            .catch(err => console.error(err));
    }

    function imageValidity() {
        if (image === '') {
            return 'Reikalinga nuotrauka.';
        }

        return '';
    }

    function titleValidity() {
        const maxSize = 100;

        if (title === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (title.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function fundTextValidity() {
        const minSize = 100;

        if (title === '') {
            return 'Reikalingas tekstas.';
        }

        if (title.length < minSize) {
            return `Per trumpas aprasymas. Min leidziama ${minSize} simboliai.`;
        }

        return '';
    }

    function fundSumValidity() {
        const min = 0;
        const max = 1_000_000;

        if (fundSum < min) {
            return `Kaina negali buti mazesne uz ${min}.`;
        }

        if (fundSum > max) {
            return `Kaina negali buti didesne uz ${max}.`;
        }

        return '';
    }



    function isValidForm() {
        const imageMsg = imageValidity();
        setImageErr(imageMsg);

        const titleMsg = titleValidity();
        setTitleErr(titleMsg);

        const fundSumMsg = fundSumValidity();
        setFundSumErr(fundSumMsg);

        const fundTextMsg = fundTextValidity();
        setFundTextErr(fundTextMsg);

        return !imageMsg && !titleMsg && !fundSumMsg && !fundTextMsg;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!isValidForm()) {
            return;
        }

        fetch('http://localhost:3001/api/funds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                image, title, fundSum, fundText
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    navigate('/funds');
                }
            })
            .catch(console.error);
    }

    const defaultImageStyle = {
        height: 300,
        objectFit: 'cover',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };
    const imageStyle = {
        height: 300,
        objectFit: 'contain',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="New funds" />
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8">
                    <div className="row mb-3">
                        <img src={image ? image : defaultImage} alt="Car" className="col-12 p-0 mb-3"
                            style={image ? imageStyle : defaultImageStyle} />
                        <label className="col-12 col-md-4 form-label" htmlFor="image">Image</label>
                        <div className="col-12 col-md-8">
                            <input onChange={updateImage} type="file"
                                className={`form-control ${imageErr ? 'is-invalid' : ''}`} id="image" />
                            <div className="invalid-feedback">{imageErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Title</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setTitle(e.target.value)} value={title} type="text"
                                className={`form-control ${titleErr ? 'is-invalid' : ''}`} id="title" />
                            <div className="invalid-feedback">{titleErr}</div>
                            <small className="text-body-secondary">Example: Mano 4 ratai</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Fund Text</label>
                        <div className="col-12 col-md-8">
                            <textarea  onChange={e => setFundText(e.target.value)} value={fundText} type="text" rows="5"
                                className={`form-control ${fundTextErr ? 'is-invalid' : ''}`} id="fundText" />
                            <div className="invalid-feedback">{fundTextErr}</div>
                            <small className="text-body-secondary">Example: Mano 4 ratai</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="price">Fund amount</label>
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <input onChange={e => setFundSum(+e.target.value)} value={fundSum}  type="number"
                                    className={`form-control ${fundSumErr ? 'is-invalid' : ''}`} id="fundSum" min={0} max={1_000_000} step={1} />
                                <span className="input-group-text">EUR</span>
                                <div className="invalid-feedback">{fundSumErr}</div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <button className="btn btn-primary py-2" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}