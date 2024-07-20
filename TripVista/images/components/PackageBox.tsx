import { IPackageBox } from "../Interfaces/IPackageBox"

type props={
    PackageBox: IPackageBox,
    handleShow: () => void
}

function PackageBox(props:props) {
    return (
        <>
                <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <div className="media-1">
                        <div className="d-block mb-3" onClick={props.handleShow}><img src={props.PackageBox.imageUrl} alt="Image" className="img-fluid" style={{cursor:"pointer"}}/></div>
                        <span className="d-flex align-items-center loc mb-2">
                            <span className="icon-room mr-3"></span>
                            <span>{props.PackageBox.destination}</span>
                        </span>
                        <div className="d-flex align-items-center">
                            <div>
                                <h3>{props.PackageBox.packageName}</h3>
                                <span>{props.PackageBox.description}</span>
                                <div className="price ml-auto mt-2">
                                    <span>Rs {props.PackageBox.price}/Person</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
        </>
    )
}

export default PackageBox