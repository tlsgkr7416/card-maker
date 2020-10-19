import React from 'react'
import styles from './title.module.css'
import { useHistory } from 'react-router-dom';

export default function Title({ makeLogOut }) {
    const history = useHistory()
    const logout = () => {
        history.push('/');
        makeLogOut();
    }
    return (
        <React.Fragment>
            <div className={styles.title}>
                <span>Business Card Maker</span>
                {makeLogOut && <span className={styles.logout} onClick={logout}>로그아웃</span>}
            </div>
        </React.Fragment>
    )
}
