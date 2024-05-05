import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./constant";

function SimpleDataFetcher() {
    const [data, setData] = useState();

    const fetchData = async () => {

        console.log(SERVER_URL)
        const response = await fetch(
            SERVER_URL,
            { method: 'GET', redirect: "follow"}
        ).then((response) => response.json());

        setData(response)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Data Fetcher</h1>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            <button onClick={fetchData}>Reload Data</button>
        </div>
    );
}

export default SimpleDataFetcher;