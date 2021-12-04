import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Menu from "../Menu/Menu"

import {makeStyles, Box} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    chatBox: {
        display: "flex",     
    },
    leftComponent: {
        minWidth: 380,

    },
    rightComponent: {
        borderLeft: "1px solid rgba(0,0,0, 0.15)"
    }

    
}));

const ChatBox = () => {
    
    const classes = useStyles();
    return (
        <>
            <Box className={classes.chatBox}>
                <Box className={classes.leftComponent}>
                    <Menu/>
                </Box>
                <Box className={classes.rightComponent}>
                    hi
                </Box>
            </Box>
        </>
    )
}

export default ChatBox;


