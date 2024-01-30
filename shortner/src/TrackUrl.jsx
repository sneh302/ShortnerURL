import React, { useState } from "react";
import "./TrackUrl.css";
import axios from "axios";

const TrackUrl = () => {
    const [x, setx] = useState(null);
    const [id, setId] = useState("");
    const [showCount, setShowCount] = useState("");
    const countUrl = (shortUrlId) => {
        const apiUrl = "http://localhost:3000/getCount";
        const postData = {
            shortUrlId,
        };
        axios
            .post(apiUrl, postData)
            .then((res) => {
                if (res.data.clickCount) setx(res.data.clickCount);
                else alert("Could not found URL Id");
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="tracturl">
            <input
                type="text"
                value={id}
                onChange={(e) => {
                    setId(e.target.value);
                }}
                placeholder="Enter your ShortURL ID"
            />
            <button
                onClick={() => {
                    setShowCount(countUrl(id));
                }}
            >
                Get Count
            </button>
            <p>{x}</p>
        </div>
    );
};

export default TrackUrl;
