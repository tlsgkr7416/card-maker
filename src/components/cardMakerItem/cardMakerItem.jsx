import React, {useRef} from 'react'
import styles from './cardMakerItem.module.css'
import { firestore } from '../../firebase.utils';

export default function CardMakerItem({id, name, company, background, position, mail, content, handleCardReset, colorChange, user}) {
    const selectRef = useRef();

    const handleDelete = () => {
        firestore
            .collection('users')
            .doc(user)
            .collection('card')
            .doc(id)
            .delete()
            .then(() => {
                handleCardReset(id);        
            });       
    };

    const handleChange = () => {
        let color = selectRef.current.value;
        
        firestore
            .collection('users')
            .doc(user)
            .collection('card')
            .doc(id)
            .update({
                background: selectRef.current.value
            }).then(() => {
                colorChange(id, color);
            })
    };
 
    return (
        <div className={styles.container}>
            <div className={styles.item}>{name}</div>
            <div className={styles.item}>{company}</div>              
            <select name='background' ref={selectRef} className={styles.item} value={background} onChange={handleChange}>
                <option value="dark">dark</option>
                <option value='white'>white</option>
                <option value="pink">pink</option>
            </select>
            <div className={styles.item}>{position}</div>
            <div className={styles.item}>{mail}</div>
            <div className={styles.item}>{content}</div>
            <div className={styles.item}>{name}</div>
            <button className={styles.item} onClick={handleDelete}>delete</button>
        </div>
    )
}
