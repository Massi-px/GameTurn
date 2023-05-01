import React from "react"
import {Button} from "@mui/material";

export default function Home() {

    function disconnect(){
        localStorage.removeItem('token')
        window.location.href='/'
    }

    return (
        <div>
            <p>test</p>
            <p>Token : {localStorage.getItem('token')}</p>
            <Button onClick={disconnect}>
                Disconnect
            </Button>
        </div>
        );
}