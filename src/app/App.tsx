import React from 'react';
import styles from './App.module.scss'
import RoutersPage from "../common/components/routers/RoutersPage";
import Header from "../common/components/header/Header";


function App() {
    return (
        <div className={styles.app}>
            <div className={styles.containerApp}>
                <Header/>
                <RoutersPage/>
            </div>
        </div>
    );
}

export default App;
