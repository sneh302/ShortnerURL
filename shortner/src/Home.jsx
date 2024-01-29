import { useState } from "react";
import "./Home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [object, setObject] = useState(null);

    const curruntPath = window.location.href;

    function isValidUrl(url) {
        // Regular expression for a basic URL validation
        const urlPattern =
            /^(https?|ftp):\/\/(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[A-F0-9]*:[A-F0-9:]+\]?)\S*$/i;

        return urlPattern.test(url);
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Text copied to clipboard!");
        } catch (err) {
            console.error("Error copying to clipboard:", err);
        }
    };

    const submitButtonDidPress = () => {
        if (isLoading) {
            alert("Please wait...");
            return;
        }
        if (!isValidUrl(url)) {
            alert("Please Enter Valid URL!");
            return;
        }

        setIsLoading(true);
        setObject(null);

        const apiUrl = "http://localhost:3000/create";
        const postData = {
            longURL: url,
        };

        axios
            .post(apiUrl, postData)
            .then((response) => {
                const obj = response.data.object;

                if (obj.error) {
                    alert("Error: " + obj.error);
                } else {
                    setTimeout(() => {
                        setObject(obj);
                        setIsLoading(false);
                    }, 1000);
                }
            })
            .catch((error) => {
                alert(error.message);
                setIsLoading(true);
            });
    };
    return isLoading ? (
        <div className="loader"></div>
    ) : (
        <div className="main-container">
            <h1 style={{ textAlign: "center", color: "blue", padding: "1rem" }}>
                URL Shortner
            </h1>
            <div className="container">
                <h2>Paste the URL to be shortened</h2>
                <div className="input-container">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                        }}
                        placeholder="Enter the link here"
                    />
                    <div id="submit-btn" onClick={submitButtonDidPress}>
                        <p>Shorten URL</p>
                    </div>
                </div>
                <p>
                    ShortURL is a free tool to shorten URLs and generate short
                    links URL shortener allows to create a shortened link making
                    it easy to share
                </p>
            </div>
            {object && (
                <div className="container2">
                    <h2>Your Shortened URL</h2>
                    <p>
                        Copy the short link and share it in messages, texts,
                        posts, websites and other locations.
                    </p>
                    <div className="shorten-url">
                        <div id="short-url-btn">
                            {curruntPath}
                            {object.shortURL_id}
                        </div>
                        <div
                            id="copy-btn"
                            onClick={() => {
                                copyToClipboard(
                                    `${curruntPath}${object.shortURL_id}`
                                );
                            }}
                        >
                            Copy URL
                        </div>
                    </div>
                    <p>
                        Long URL -
                        <span
                            style={{ color: "blue" }}
                            onClick={() => {
                                window.location.href = object.longURL;
                            }}
                        >
                            {object.longURL}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;
