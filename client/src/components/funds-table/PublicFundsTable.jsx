import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';

export function PublicFundsTable() {
    const { funds, updateFunds } = useContext(GlobalContext);

    useEffect(() => {
        fetch('http://localhost:3001/api/funds/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updateFunds(data.list);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="container">
            <div className="row">
                {
                    funds
                    .filter(fund => fund.is_blocked_fund !== 3)
                    .map((fund, index) =>(
                        <div key={fund.title + index} className="card col-4" >
                            <img className="card-img-top" src={fund.image} alt="Fund"/>
                            <div className="card-body">
                                <h5 className="card-title">{fund.title}</h5>
                                <p className="card-text">{fund.fundText}</p>
                                <Link to={`/funds/view/${fund.id}`} className="btn btn-primary">Read about</Link>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
       
    )
}


