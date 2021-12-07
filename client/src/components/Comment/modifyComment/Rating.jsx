import { Box, Typography, makeStyles } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles((theme) => ({
    ratingBox: {
        width: 20,
        backgroundColor: "#ffffff",
    }
}))
export default function Rating(props) {
    const comment = props.comment;
    const classes = useStyles();
    return (
        <>
            <Box classname={classes.ratingBox}>
                
        </Box>
    </>);
}
