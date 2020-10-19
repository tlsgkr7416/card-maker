import React from 'react';
import Title from '../title/title';
import Footer from '../footer/footer';
import styles from './main.module.css';
import CardMakerList from '../cardMakerList/cardMakerList';
import PreviewList from '../previewList/previewList';


export default function Main({cardMaker, handleCardMaker, handleCardReset, colorChange, user, makeLogOut}) {
    return (
        <div className={styles.container}>
            <Title makeLogOut={makeLogOut} />
            <ul className={styles.mainContainer}>
                <li className={styles.cardMaker}>
                    <div className={styles.leftTitle}>Card Maker</div>
                    <CardMakerList cardMaker={cardMaker} 
                                   handleCardMaker={handleCardMaker} 
                                   handleCardReset={handleCardReset} 
                                   colorChange={colorChange}
                                   user={user}/>
                </li>
                <li className={styles.cardPreview}>
                    <div className={styles.rightTitle}>Card Preview</div>
                    <PreviewList cardMaker={cardMaker}/>
                </li>
            </ul>
            <Footer />
        </div>
    )
}
