import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';



export function FundPage() {

    const [exactFund, setExactFund] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:3001/api/funds', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const filteredFund = data.list.filter(fund => fund.id === parseInt(id, 10));
                if (filteredFund.length === 1) {
                    setExactFund(filteredFund[0]);
                }

            })
            .catch(err => console.error(err));
    }, [id]);

    // const { funds } = useContext(GlobalContext);
    // const { id } = useParams();
    // const fund = findFund(Number(id));

    // function findFund(id) {
    //     return funds.filter(fund => fund.id === id)
    //     }

    // if (!fund) {
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <div>Fund not found.</div>
    //             </div>
    //         </div>
        
    //     )
    // }

    // console.log(funds[1]);
    // console.log(id);
    // console.log(funds[1].id === id);
    // console.log(typeof Number(id));
    // console.log(typeof funds[0].id);

    return (
        <div className="container">
            <div className="row">
                <div className="card col-12">
                    <img className="card-img-top" src={exactFund.image} alt="Fund" />
                    <div className="card-body">
                        <h5 className="card-title">{exactFund.title}</h5>
                        <p className="card-text">{exactFund.fundText}</p>
                        <p className="card-text">Renkama suma: {exactFund.fundSum}</p>
                        <Link to="/" className="btn btn-primary">
                            Donate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
