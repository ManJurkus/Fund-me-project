import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export function FundsTable() {
    const { role, funds, deleteFund, changeFundStatus } = useContext(GlobalContext);



    function deleteFundHandler(title) {
        fetch('http://localhost:3001/api/funds/' + title, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    deleteFund(title);
                }
            })
            .catch();
    }

    const imageStyle = {
        width: 100,
        height: 50,
        objectFit: 'container',
        objectPosition: 'center',
    }

    function handleStatusChange(fundID, status) {
        fetch('http://localhost:3001/api/funds/' + fundID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newStatus: status }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 'ok') 
                {
                    changeFundStatus(data.info.fundId, data.info.newStatus )
                }
            })
            .catch(console.error);
    }

    const Block = ({ fundID }) => (
        <button
            onClick={() => handleStatusChange(fundID, 3)}
            className='btn btn-outline-danger btn-sm'
            >
            Block
        </button>
    );

    const Active = ({ fundID }) => (
        <button
            onClick={() => handleStatusChange(fundID, 2)}
            className='btn btn-outline-primary btn-sm'>
            Make active
        </button>
    );

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Goal</th>
                        <th scope="col">Status</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        funds
                            // .filter(car => filterCarType === 'All' ? true : car.carType === filterCarType)
                            // .filter(car => filterTitle === '' ? true : car.title.toLowerCase().includes(filterTitle))
                            .map((fund, idx) => (
                                <tr key={fund.title + idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img style={imageStyle} src={fund.image} alt="Car" />
                                    </td>
                                    <td>{fund.title}</td>
                                    <td>{fund.fundSum}</td>
                                    <td >
                                        {
                                            fund.is_blocked_fund === 1 ? (
                                                <div className="badge text-bg-warning rounded-pill">Pending</div>
                                            ) : fund.is_blocked_fund === 2 ? (
                                                <div className="badge text-bg-success rounded-pill">Active</div>
                                            ) : fund.is_blocked_fund === 3 ? (
                                                <div className="badge text-bg-danger rounded-pill">Blocked</div>
                                            ) : null 
                                        }
                                    </td>

                                    <td>
                                        {role === 'user' ? (
                                            <div className="d-flex gap-2 justify-content-end">
                                                <Link className="btn btn-primary btn-sm" to={`/funds/${fund.id}/edit`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteFundHandler(fund.title)}
                                                    className="btn btn-danger btn-sm"
                                                    type="button"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ) : role === 'admin' ? (
                                            <div className="d-flex gap-2 justify-content-end">
                                                    <Active fundID={fund.id}/>
                                                    <Block fundID={fund.id}/>
                                            </div>
                                        ) : null}
                                     </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}