import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './login.module.css'
import Title from '../title/title'
import Footer from '../footer/footer'
import firestore, { signInWithGoogle, signInWithGithub } from '../../firebase.utils.js';

export default function Login({ userCheck }) {
    let history = useHistory();
    const checkLogin = (event) => {
        if (event.currentTarget.textContent === 'google') {
            signInWithGoogle().then((result) => {
                userCheck(result);
                history.push('/main');
            });
        } else {
            signInWithGithub().then((result) => {
                userCheck(result);
                history.push('/main');
            });
        }

    }
    
    return (
        <div className={styles.container}>
            <Title />
            <ul className={styles.content}>
              <li className={styles.login}>Login</li>
              <li className={styles.loginForm} onClick={checkLogin}>google</li>
              <li className={styles.loginForm} onClick={checkLogin}>Github</li>
            </ul>
            <Footer />
        </div>
    )
}
