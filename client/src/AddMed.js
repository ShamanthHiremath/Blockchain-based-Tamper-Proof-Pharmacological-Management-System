<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import './AddMed.css';

function AddMed() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState({});
    const [MedName, setMedName] = useState("");
    const [MedDes, setMedDes] = useState("");
    const [MedStage, setMedStage] = useState([]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (let i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to current network');
        }
    }

    if (loader) {
        return (
            <div style={styles.container}>
                <h1 className="wait">Loading...</h1>
            </div>
        )
    }

    const redirect_to_home = () => {
        history.push('/')
    }

    const handlerChangeNameMED = (event) => {
        setMedName(event.target.value);
    }

    const handlerChangeDesMED = (event) => {
        setMedDes(event.target.value);
    }

    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addMedicine(MedName, MedDes).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    }

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/medicineshutterstock_1421041688.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
        }}>
            <div className="addmed-content" style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                boxShadow: '0px 0px 32px 8px rgba(0,0,0,0.25)',
                border: '1.5px solid #fff',
                zIndex: 2,
                position: 'relative',
            }}>
                <div className="addmed-header">
                    <span><b>Current Account Address:</b> {currentaccount}</span>
                    <span onClick={redirect_to_home} className="addmed-homeButton">HOME</span>
                </div>
                <br />
                <h5>Add Medicine Order:</h5>
                <form onSubmit={handlerSubmitMED} className="addmed-form">
                    <input className="form-control-sm" type="text" onChange={handlerChangeNameMED} placeholder="Medicine Name" required />
                    <input className="form-control-sm" type="text" onChange={handlerChangeDesMED} placeholder="Medicine Description" required />
                    <button className="addmed-submitButton" type="submit">Order</button>
                </form>
                <br />
                <h5>Ordered Batteries:</h5>
                <table className="addmed-table table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Current Stage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(MED).map((key) => (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].description}</td>
                                <td>{MedStage[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f0f4c3 30%, #c5e1a5 90%)', // Background gradient
        padding: '20px'
    },
    content: {
        backgroundColor: '#ffffffcc', // Slightly transparent white background
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '700px',
        width: '100%',
        textAlign: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    homeButton: {
        marginLeft: 'auto',
        cursor: 'pointer'
    },
    form: {
        marginBottom: '20px'
    },
    submitButton: {
        marginTop: '10px'
    },
    table: {
        marginTop: '20px'
    }
}

=======
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import './AddMed.css';

function AddMed() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState({});
    const [MedName, setMedName] = useState("");
    const [MedDes, setMedDes] = useState("");
    const [MedStage, setMedStage] = useState([]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (let i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to current network');
        }
    }

    if (loader) {
        return (
            <div style={styles.container}>
                <h1 className="wait">Loading...</h1>
            </div>
        )
    }

    const redirect_to_home = () => {
        history.push('/')
    }

    const handlerChangeNameMED = (event) => {
        setMedName(event.target.value);
    }

    const handlerChangeDesMED = (event) => {
        setMedDes(event.target.value);
    }

    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            const reciept = await SupplyChain.methods.addMedicine(MedName, MedDes).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    }

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/medicineshutterstock_1421041688.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
        }}>
            <div className="addmed-content" style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                boxShadow: '0px 0px 32px 8px rgba(0,0,0,0.25)',
                border: '1.5px solid #fff',
                zIndex: 2,
                position: 'relative',
            }}>
                <div className="addmed-header">
                    <span><b>Current Account Address:</b> {currentaccount}</span>
                    <span onClick={redirect_to_home} className="addmed-homeButton">HOME</span>
                </div>
                <br />
                <h5>Add Medicine Order:</h5>
                <form onSubmit={handlerSubmitMED} className="addmed-form">
                    <input className="form-control-sm" type="text" onChange={handlerChangeNameMED} placeholder="Medicine Name" required />
                    <input className="form-control-sm" type="text" onChange={handlerChangeDesMED} placeholder="Medicine Description" required />
                    <button className="addmed-submitButton" type="submit">Order</button>
                </form>
                <br />
                <h5>Ordered Batteries:</h5>
                <table className="addmed-table table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Current Stage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(MED).map((key) => (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].description}</td>
                                <td>{MedStage[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f0f4c3 30%, #c5e1a5 90%)', // Background gradient
        padding: '20px'
    },
    content: {
        backgroundColor: '#ffffffcc', // Slightly transparent white background
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '700px',
        width: '100%',
        textAlign: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    homeButton: {
        marginLeft: 'auto',
        cursor: 'pointer'
    },
    form: {
        marginBottom: '20px'
    },
    submitButton: {
        marginTop: '10px'
    },
    table: {
        marginTop: '20px'
    }
}

>>>>>>> c37c2baaba4126f1f014121c51c93ad1669ad6a6
export default AddMed