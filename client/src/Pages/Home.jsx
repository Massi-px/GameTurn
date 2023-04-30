import React from "react"

export default function Home() {

    return (
        <div>
            <p>test</p>
            <p>Token : {localStorage.getItem('token')}</p>
        </div>
        );
}