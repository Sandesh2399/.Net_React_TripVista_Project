import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material"
import { IPackageBox } from "../Interfaces/IPackageBox"
import { useEffect } from "react"

type props = {
    packageDetails: IPackageBox
}
const HotelDetails = (props: props) => {

    return (
        <>
            <Grid container spacing={2} style={{ width: "582px" }}>
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={props.packageDetails?.hotelDetails?.imageUrl}
                        alt={props.packageDetails?.hotelDetails?.name ?? 'Hotel image'}
                        sx={{ objectFit: 'cover', height: '100%' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            {props.packageDetails?.hotelDetails?.name ?? 'N/A'}
                        </Typography>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Address
                            </Typography>
                            <Typography variant="body2">
                                {props.packageDetails?.hotelDetails?.address ?? 'N/A'}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Typography variant="body2">
                                {props.packageDetails?.hotelDetails?.phoneNumber ?? 'N/A'}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Typography variant="body2">
                                {props.packageDetails?.hotelDetails?.email ?? 'N/A'}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Typography variant="body2">
                                {props.packageDetails?.hotelDetails?.website ?? 'N/A'}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </>
    )
}

export default HotelDetails