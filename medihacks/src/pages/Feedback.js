import React, { useState } from 'react';
import '../styles/feedback.css';
import { PropagateLoader } from 'react-spinners';
import Upload from "../img/upload.png";
import pdfToText from 'react-pdftotext';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [burden, setBurden] = useState({});
    const [pdfUrl, setPdfUrl] = useState("");
    const [scores, setScores] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryScores, setCategoryScores] = useState({});
    const [testText, setTestText] = useState("");
    const navigate = useNavigate();

    const handleForwardClick = () => {
        navigate('/18234709827134');
    };

    const handleFileUpload = async (text) => {
        // Mock response for frontend testing
        const mockResponse = {
            "Category1": { "DataPoint1": 1, "DataPoint2": 2 },
            "Category2": { "DataPoint3": 3, "DataPoint4": 4 }
        };
        const mockBurden = 10;
        const mockCategoryScores = {
            "Category1": 3,
            "Category2": 7
        };

        setScores(mockResponse);
        setBurden(mockBurden);
        setCategoryScores(mockCategoryScores);
        setFileUploaded(true);
        setLoading(false);
    };

    function extractText(event) {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        console.log("hellooo", url);
        setPdfUrl(url);
        console.log(pdfUrl);
        setLoading(true);
        pdfToText(file)
            .then(text => {
                console.log(text);
                setTestText(text);
                handleFileUpload(text);
            })
            .catch(error => {
                console.error("Failed to extract text from pdf");
                setLoading(false);
            });
    }

    return (
        <div className="feedback-container" style={{ marginTop: "20px" }}>
            {!fileUploaded && (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
                    <div className="onboarding">
                        <h1 style={{ fontSize: "50px", marginBottom: "60px", color: "rgb(53, 53, 53)" }}>Protocol Burden Scoring</h1>
                    </div>
                    <div className='upload-file' onClick={() => document.getElementById('file-input').click()}>
                        {!loading && (
                            <div>
                                <h1 style={{ color: "rgb(78, 78, 78)", marginBottom: "30px", marginTop: "60px" }}>Upload your Protocol:</h1>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept=".pdf"
                                    onChange={extractText}
                                    style={{ display: 'none' }}
                                />
                                <img src={Upload} alt="upload" width={"100px"} />
                            </div>
                        )}
                        {loading && (
                            <div style={{ marginTop: "30px" }}>
                                <h2>Calculating Burden...</h2>
                                <PropagateLoader color="#36d7b7" />
                            </div>
                        )}
                    </div>
                    <p style={{ textOverflow: "ellipsis", whiteSpace: "normal", width: "700px", lineHeight: "35px", color: "rgb(53, 53, 53)" }}>
                        At ProtoScore, we provide a detailed assessment of your research protocol to evaluate the potential patient burden. By inputting your protocol details, you will receive a ProtoScore, which quantifies the burden placed on participants. This score helps you identify areas within your protocol that may need adjustments to enhance feasibility and participant comfort, thereby improving study outcomes and adherence.
                    </p>
                </div>
            )}

            {fileUploaded && !loading && (
                <div className="protocol-container">
                    <div className="iframe-container">
                        <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }}></iframe>
                    </div>
                </div>
            )}
            {fileUploaded && !loading && (
                <div className="score-container">
                    <div>
                        <p style={{ fontSize: '17px', fontWeight: '300', marginBottom: '-1px' }}>Your Burden Score</p>
                        <span style={{ fontSize: '50px', fontWeight: '600' }}>{burden || 'N/A'}</span>
                        <div className="scores-breakdown" style={{ marginTop: "10px", maxHeight: "540px", overflowY: "auto" }}>
                            {Object.keys(scores).map((category) => (
                                <div key={category} style={{ width: "100%", textAlign: "left", cursor: "pointer" }} onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}>
                                    <h3>{category} ({categoryScores[category]}){selectedCategory === category ? <FaChevronDown style={{ float: "right" }} /> : <FaChevronRight style={{ float: "right" }} />}</h3>
                                    {selectedCategory === category && (
                                        <div>
                                            {Object.keys(scores[category]).map((dataPoint) => (
                                                <p key={dataPoint}>{`${dataPoint}: ${scores[category][dataPoint]}`}</p>
                                            ))}
                                        </div>
                                    )}
                                    <hr style={{ border: "1px solid #ccc" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {testText.includes("Insulin Delivery Settings") || testText.includes("Diabetes Homeless Support") ? (
                        <div style={{ bottom: '0', left: '0', right: '0', marginTop: '40px', backgroundColor: 'white' }}>
                            <FaChevronRight onClick={handleForwardClick} style={{ marginLeft: '40px', fontSize: '30px' }} />
                        </div>
                    ) : (
                        <div style={{ marginTop: "20px" }}>No related articles found.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Feedback;
