
import { Title } from "../../components/Title";
import { FundsTable } from "../../components/funds-table/FundsTable";


export function AdminFunds() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Funds advetisment' />
                </div>

                <div className="col-12">
                    <FundsTable />
                </div>
            </div>
        </div>
    )
}