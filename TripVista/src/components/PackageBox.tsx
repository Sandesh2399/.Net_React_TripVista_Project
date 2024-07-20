import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { IPackageBox } from "../Interfaces/IPackageBox"

type props = {
    PackageBox: IPackageBox,
    setPackageDetails: (packageDetails: IPackageBox) => void
}

function PackageBox(props: props) {
    return (
        <>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <Card className="card-hover" style={{maxHeight:"324px"}}
                    sx={{ maxWidth: 345, cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModalLg" onClick={() => props.setPackageDetails(props.PackageBox)}>
                    <Box role="button">
                        <CardMedia
                            component="img"
                            alt="Package Image"
                            height="140"
                            image={props.PackageBox?.imageUrl}
                            sx={{ cursor: 'pointer' }}
                        />
                    </Box>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {/* <RoomIcon sx={{ mr: 1 }} /> */}
                            <Typography variant="subtitle1">
                                {props.PackageBox?.destination}
                            </Typography>
                        </Box>
                        <Typography variant="h5" component="div">
                            {props.PackageBox?.packageName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{whiteSpace:"nowrap", overflow:"hidden",textOverflow:"ellipsis"}}>
                            {props.PackageBox?.description}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                            Rs {props.PackageBox?.price}/Person
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default PackageBox