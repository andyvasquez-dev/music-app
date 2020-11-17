import React from 'react'

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs})=> {
   const songSelectHandler = async () =>{
      await setCurrentSong(song);

      //add active state for hover
      const newSongs = songs.map((newSong)=> {
         if(newSong.id === song.id){
            return{
               ...newSong,
               active:true,
            }
         }
         else{
            return {
               ...newSong,
               active: false,
            }
         }
      })
      setSongs(newSongs)

      // if  song is playing ... 
      if(isPlaying) audioRef.current.play();
   }


  return(
   <div 
      className ={`library-song ${song.active ? 'selected' : ''}`} 
      onClick={songSelectHandler} 
   >
      <img alt={song.name} src={song.cover}/>
      <div className="song-description">
         <h3>{song.name}</h3>
         <h4>{song.artist}</h4>  
      </div>
   </div>
  )
}

export default LibrarySong