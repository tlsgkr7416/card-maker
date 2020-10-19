import React, { useRef, useState } from 'react';
import styles from './cardMakerInput.module.css';
import { firestore } from '../../firebase.utils';

export default function CardMakerInput({handleCardMaker, user}) {
    const [imgFile, setImgFile] = useState(null);
    const nameInput = useRef(),
          companyInput = useRef(),
          positionInput = useRef(),
          mailInput = useRef(),
          messageInput = useRef(),
          backgroundInput = useRef(),
          imgCheck = useRef();
    
    const onClickCard = (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_CLOUDINARY_URL;
        const formData = new FormData();
        formData.append('file', imgFile);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        fetch(url, {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.text();
        }).then((data) => {
            data = JSON.parse(data);
            const items = {
                id: String(Date.now()),
                name: nameInput.current.value,
                company: companyInput.current.value,
                position: positionInput.current.value,
                mail: mailInput.current.value,
                content: messageInput.current.value,
                background: backgroundInput.current.value,
                imgFile: data.url,
            }
            
            nameInput.current.value = '';
            companyInput.current.value = '';
            positionInput.current.value = '';
            mailInput.current.value = '';
            messageInput.current.value = '';
            backgroundInput.current.value = 'dark';
            setImgFile(null);
            imgCheck.current.textContent = '업로드';
    
            firestore
                 .collection('users')
                 .doc(user)
                 .collection('card')
                 .doc(items.id)
                 .set({
                     name: items.name, company: items.company,
                     position: items.position, mail: items.mail,
                     content: items.content, background: items.background,
                     imgFile: data.url
                 }).then(() => {
                    handleCardMaker(items);
                 });
        })
    };

    const handleImg = (e) => {
        setImgFile(e.target.files[0]);
        imgCheck.current.textContent = '완료'
    };

    return (
        <form className={styles.container} onSubmit={onClickCard}>
            <input type="text" ref={nameInput} className={styles.item} placeholder="Name" />
            <input type="text" ref={companyInput} className={styles.item} placeholder="Company" />              
            <select name='background' ref={backgroundInput} className={styles.item}>
                <option value="dark">dark</option>
                <option value='pink'>pink</option>
                <option value="white">white</option>
            </select>
            <input type="text" ref={positionInput} className={styles.item} placeholder="Title"/>
            <input type="text" ref={mailInput} className={styles.item} placeholder="Email" />
            <input type="text" ref={messageInput} className={styles.item} placeholder="Message" />
            <div className={styles.item}>
                <label for="ex_file" ref={imgCheck}>업로드</label>
                <input type="file" id="ex_file" onChange={handleImg} />
            </div>
            <button className={styles.item}>Add</button>
            
        </form>
    )
}