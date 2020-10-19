import React from 'react';
import styles from './previewItem.module.css';

export default function PreviewItem({name, company, background, position, mail, content, imgFile}) {
    const makeColor = (background) => {
         switch (background) {
             case 'dark':
                 return '#000000';
             case 'white':
                 return '#ffffff';
             case 'pink':
                 return '#ffc0cb';
         }
    } 
    
    return (
        <div className={styles.container} style={{backgroundColor: makeColor(background)}}>
            <div className={styles.cardImg}>
                <img src={imgFile} />
            </div>
            <ul className={background === 'dark' ? styles.cardContainerDark : styles.cardContainer}>
              <li className={styles.name}>{name}</li>
              <li className={styles.company}>{company}</li>
              <li>{position}</li>
              <li>{mail}</li>
              <li>{content}</li>
            </ul>
        </div>
    )
}
