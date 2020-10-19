import React from 'react';
import styles from './previewList.module.css';
import PreviewItem from '../previewItem/previewItem'

export default function PreviewList({cardMaker}) {
    return (
        <div>
            {cardMaker.map((item) => <PreviewItem 
              key={item.id}
              id={item.id}
              name={item.name} 
              company={item.company} 
              background={item.background} 
              position={item.position} 
              mail={item.mail}
              imgFile={item.imgFile}
              content={item.content}/>)}
        </div>
    )
}
