import { Title } from "../../components/Title";

export function UserFunds() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='My funds advertisment' uri="/funds/new" />
                </div>
                {/* <div className="col-12">
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-3">
                            <select className=" form-select"
                                onChange={e => setSelectedCarType(e.target.value)}>
                                <option value="All">All</option>
                                {carTypes.map(ct => (
                                    <option key={ct} value={ct}>{ct}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3">
                            <input type="text" className="form-control" value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </div>

                    </div>
                </div> */}
                <div className="col-12">
                    {/* <CarsTable filterCarType={selectedCarType} filterTitle={title.toLowerCase()} /> */}
                </div>
            </div>
        </div>
    )
}