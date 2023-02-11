import React, { useEffect, useState } from 'react'
import "../App.css";
function Card() {
   //  const[data,setData]=useState({});
    const[pokemondata,setPokemondata]=useState([]);
    const[next,setNext]=useState();
    const[prev,setPrev]=useState();
    const[url,setUrl]=useState('https://pokeapi.co/api/v2/pokemon/');
    const getPokemon=(data)=>{
        data.map(async (dt)=>{
           const res= await fetch(dt.url);
           const result = await res.json();
           setPokemondata(state=>{
             state=[...state,result];
             return state;
           });
           
        });
    };
    const getdata= async()=>{
       const response = await fetch(url);
      //  setData(await response.json());
       const data= await response.json();
       getPokemon(data.results);
       setNext(data.next);
       setPrev(data.previous);
    };
  useEffect(()=>{
   let unsb = false;  
    if(!unsb){
      getdata();
    }
    return ()=>{
      unsb=true;
    };
  },[url]);

  return (
   <>
    <div className='btns'>
    <button onClick={()=>{
      setPokemondata([]);
      setUrl(prev);
    }}>Previous</button>
    <button onClick={()=>{
      setPokemondata([]);
      setUrl(next);
    }}>Next</button> 
    </div>
    <div className='row'>
         {
            pokemondata.map((pdata)=>{
                return <div className='col'>
                   <img className='col-row1' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pdata.id}.svg`} alt="" />
                   <h1>{pdata.name}</h1>
                  <div className='col-row2'> 
                  <h2>POKEDEX</h2>
                   <h2>(Type : {pdata.types[0].type.name})</h2>
                   </div>
                   <div className="col-row3">
                   <h2 className='col-row3-col'>Weight : {pdata.weight}</h2>
                   <h2 className='col-row3-col'>height : {pdata.height}</h2>
                   </div>
                   <div className="col-row4">
                   <h2 className='col-row4-col'>hp : {pdata.stats[0].base_stat}</h2>
                   <h2 className='col-row4-col'>Attack : {pdata.stats[1].base_stat}</h2>
                   <h2 className='col-row4-col'>Defence : {pdata.stats[2].base_stat}</h2>
                   </div>
                </div>
            })
         }
    </div>
    </>
  )
}

export default Card