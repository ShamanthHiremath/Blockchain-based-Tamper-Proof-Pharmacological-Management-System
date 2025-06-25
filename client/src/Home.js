import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Home.css'

function Home() {
    const history = useHistory();
    const [clicked, setClicked] = useState(false);

    const redirectTo = (path) => {
        setClicked(true);  // Activate the burst animation
        setTimeout(() => {
            setClicked(false); // Reset animation after click
            history.push(path);
        }, 500); // Delay to allow animation to play
    }

    return (
        <div style={{
            ...styles.container,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/medicineshutterstock_1421041688.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div style={{
                ...styles.content,
                backgroundColor: 'rgba(255,255,255,0.97)',
                boxShadow: '0px 0px 32px 8px rgba(0,0,0,0.25)',
                border: '1.5px solid #fff',
                zIndex: 2,
                position: 'relative',
                width: 'fit-content',
                minWidth: '700px',
                maxWidth: '90vw',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '48px 48px 40px 48px',
            }}>
                <h3 style={{color: '#222', fontWeight: 700, fontSize: '2.2rem', letterSpacing: '1px', marginBottom: '32px'}}>Supply Chain Manager</h3>
                <div style={{
                    ...styles.buttonGroup,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '0',
                    marginBottom: '0',
                }}>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        style={{ fontSize: '22px', padding: '20px 36px', minWidth: '180px' }}
                        onClick={() => redirectTo('/roles')}
                    >
                        Register Roles
                    </button>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        style={{ fontSize: '22px', padding: '20px 36px', minWidth: '180px' }}
                        onClick={() => redirectTo('/addmed')}
                    >
                        Order Materials
                    </button>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        style={{ fontSize: '22px', padding: '20px 36px', minWidth: '180px' }}
                        onClick={() => redirectTo('/track')}
                    >
                        Track Materials
                    </button>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        style={{ fontSize: '22px', padding: '20px 36px', minWidth: '180px' }}
                        onClick={() => redirectTo('/supply')}
                    >
                        Supply Materials
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
    },
    content: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '30px',
    }
}

export default Home;