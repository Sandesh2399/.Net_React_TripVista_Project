function UserList() {
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title"> Users</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th> User </th>
                                                <th> First name </th>
                                                <th> Progress </th>
                                                <th> Amount </th>
                                                <th> Deadline </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-1">
                                                    
                                                </td>
                                                <td> Herman Beck </td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                                                    </div>
                                                </td>
                                                <td> $ 77.99 </td>
                                                <td> May 15, 2015 </td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">
                                                    
                                                </td>
                                                <td> Messsy Adam </td>
                                                <td>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "75%"}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                                                    </div>
                                                </td>
                                                <td> $245.30 </td>
                                                <td> July 1, 2015 </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023 <a href="https://www.bootstrapdash.com/" target="_blank">BootstrapDash</a>. All rights reserved.</span>
                        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
                    </div>
                </footer>

            </div>
        </>
    )
}

export default UserList