import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Navigate = () => {
    const { id } = useParams();

    const getUrl = () => {
        const apiUrl = "http://localhost:3000/getLongURL";
        const postData = {
            shortUrlId: id,
        };
        axios
            .post(apiUrl, postData)
            .then((response) => {
                if (response.data.redirectUrl) {
                    window.location.href = response.data.redirectUrl;
                } else {
                    alert("Could not found url ");
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                console.error("Error making POST request:", error);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            getUrl();
        }, 2000);
    }, [id]);

    return (
        <div>
            <div class="loader"></div>
        </div>
    );
};

export default Navigate;
