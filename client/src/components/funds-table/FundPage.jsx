import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DonateModal } from './DonateModal';



export function FundPage() {

    const [exactFund, setExactFund] = useState([]);
    const [donationList, setdonationList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:3001/api/fundsPublic', {
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
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/api/donation/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setdonationList(data.list)

            })
            .catch(err => console.error(err));
    }, []);


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
                    <div className="card-body align-center">
                        <h5 className="card-title card-title mbr-fonts-style mbr-bold align-center display-5">{exactFund.title}</h5>
                        <p className="card-text mbr-text mbr-fonts-style align-center display-7">{exactFund.fundText}</p>
                        <p className="mbr-text mbr-fonts-style align-center display-7">
                                    Donation goal: {exactFund.fundSum} €
                            </p>
                        <div className="progress m-2">
                            <div className="progress-bar" role="progressbar" style={{width: '10%'}} >10%</div>
                        </div>
                        <p className="mbr-text mbr-fonts-style align-center display-7">
                                Donation received : 50 €
                        </p>
                        <DonateModal fundId={id}/>
                    </div>
                </div>
            </div>

            {
                donationList.map((donation, index) => (
                    <div key={index} className="row">
                        <div className="card-underline">
                        <div className="line"></div>
                </div>
                <h3> Donator name: {donation.name}</h3>
                <p> Donated: {donation.donation} €</p>
                
            </div>
                ))
            }

            
        </div>
    );
}
