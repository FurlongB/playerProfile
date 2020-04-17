import React, {useState, useEffect} from 'react';
import axios from 'axios';

import DisplayPlayer from '../DisplayPlayer/DisplayPlayer';
import PlayerCard from './PlayerCard/PlayerCard';
import Aux from '../../hoc/auxiliary';
import Dialog from '../UI/Dialog/Dialog'

import classed from './ViewPlayers.css';

const viewPlayer = () =>{
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState({});
    const [img, setImg] = useState(null);
    const [error, setError] = useState(null);
    const [plyid, setPlayerId] = useState('');// used for display Player
    useEffect(() =>{
        axios.get('https://player-profile-2ca14.firebaseio.com/players.json')
        .then(result =>{
            const todoData = result.data;
            const loadPlayer = [];
            for (const key in todoData ){
                loadPlayer.push({id: key, name: todoData[key].name, img: todoData[key].img})
            }
            setPlayers(loadPlayer);
         })
        .catch(err =>{
            console.log(err)
            setError(err.message)
        });
        return () =>{
            console.log('Clean Up');
        }
    }, []);

    const viewPlayerHandler = (data) =>{
       setPlayerId(data);
        axios.get(`https://player-profile-2ca14.firebaseio.com/players/${data}.json`)
        .then(res => {
            setPlayer(res.data);
            setImg(res.data.img)
        })
        .catch(err =>{
            console.log(err)
            setError(err.message)
        });
    }

    const cancelHandler = () =>{
        setImg(null);
    }

    let diplayPlayer = null;
    if(img !== null){
        diplayPlayer = <DisplayPlayer ids={plyid} img={img} show="true" closed={cancelHandler} profile={player} />
    }

    return(
        <Aux>
            <div className={classed.ViewPlayer}>
                {players.map(plr =>
                    (<PlayerCard key={plr.id} name={plr.name} img={plr.img} clicked={viewPlayerHandler.bind(this, plr.id)}/>)
                )}
            </div>
            <div>
                {diplayPlayer}
            </div>
            {error ? <Dialog title='Network Error' message={error} redirect='/'/> : null}
        </Aux>
    );
}

export default viewPlayer;