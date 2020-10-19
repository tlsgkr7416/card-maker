import React from 'react'
import CardMakerItem from '../cardMakerItem/cardMakerItem';
import CardMakerInput from '../cardMakerInput/cardMakerInput';

export default function CardMakerList({cardMaker, handleCardMaker, handleCardReset, colorChange, user}) {
    return (
        <div>
            {cardMaker.map((item) => <CardMakerItem 
              user={user}
              handleCardReset={handleCardReset}
              key={item.id}
              id={item.id}
              name={item.name} 
              company={item.company} 
              background={item.background} 
              position={item.position} 
              mail={item.mail} 
              content={item.content}
              colorChange={colorChange}/>)}
            <CardMakerInput handleCardMaker={handleCardMaker} user={user}/>
        </div>
    )
}
