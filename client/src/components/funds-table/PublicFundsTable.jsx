import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import './PublicFundsTable.css';
import defaultImage from '../../assets/preview.png';

export function PublicFundsTable() {
    const { fundsPublic, updateFundsPublic } = useContext(GlobalContext);

    useEffect(() => {
        fetch('http://localhost:3001/api/fundsPublic/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updateFundsPublic(data.list);
                }
            })
            .catch(console.error);
    }, []);

    return (
    
        <div className="container">
            <div className="row">
                {
                    fundsPublic
                    .filter(fund => fund.is_blocked_fund !== 3)
                    .map((fund, index) =>(
                        <div key={fund.title + index} className="card p-3 col-12 col-md-6 col-lg-4">
                    <div className="card-wrapper">
                        <div className="card-img">
                            <img src={fund.image ? fund.image : defaultImage } alt="Fund" />
                        </div>
                        <div className="card-box"> 
                            <h4 className="card-title mbr-fonts-style mbr-bold align-center display-5">
                                {fund.title}
                            </h4>
                           <div className="card-underline align-center">
                               <div className="line"></div>
                           </div>
                            <p className="mbr-text mbr-fonts-style align-center display-7">
                                {fund.fundText}
                            </p>
                            <p className="mbr-text mbr-fonts-style align-center display-7">
                                    Donation goal: {fund.fundSum} €
                            </p>
                            <div className="progress m-2">
                                <div className="progress-bar" role="progressbar" style={{width: '10%'}} >10%</div>
                            </div>
                            <p className="mbr-text mbr-fonts-style align-center display-7">
                                Donation received : 50 €
                            </p>
                        </div>
                        <div className="mbr-section-btn align-center">
                            <Link to={`/funds/view/${fund.id}`} className="btn-public btn-primary display-4">Read about</Link>
                        </div>  
                    </div>
                </div>
                    ))
                }
                
            </div>
        </div>

       
    )
}


