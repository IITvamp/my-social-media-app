import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    ratingBox: {
        width: 20,
        backgroundColor: "#ffffff",
    }
}))
export default function Rating(props) {
    const classes = useStyles();
    return (
        <>
            <Box classname={classes.ratingBox}>
                
        </Box>
    </>);
}
