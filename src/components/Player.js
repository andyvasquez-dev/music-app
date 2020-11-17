import React from 'react'

// component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faPlay,
   faAngleLeft, 
   faAngleRight,
   faPause
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
   setCurrentSong, 
   currentSong, 
   isPlaying, 
   setIsPlaying,
   audioRef, 
   setSongInfo, 
   songInfo, 
   songs,
   setSongs
})=>{

   const  activeLibraryHandler = (nextPrev) => {
      const newSongs = songs.map((newSong)=> {
         if(newSong.id === nextPrev.id){
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
   }

   //event handlers
   const playSongHandler = ()=>{

      if(isPlaying){
         audioRef.current.pause()
         setIsPlaying(!isPlaying)
      }
      else{
         audioRef.current.play()
         setIsPlaying(!isPlaying)
      }
   }
            // method to convert time
   const getTime = (time)=>{
      return(
         Math.floor(time / 60) + ':' + ('0'+ Math.floor(time % 60)).slice(-2)
         )
   }
   
   const dragHandler = (e) =>{
      audioRef.current.currentTime = e.target.value;
      setSongInfo({...songInfo, currentTime: e.target.value
      })
   }


   const skipTrackHandler = async (direction) => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
      if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex+1) % songs.length ]);
            activeLibraryHandler(songs[(currentIndex+1) % songs.length ])
      }
      if(direction === 'skip-backward'){
         if((currentIndex-1) % songs.length === -1){
            await setCurrentSong(songs[songs.length - 1]);
            activeLibraryHandler(songs[songs.length - 1]);
            if(isPlaying) audioRef.current.play()
            return
         }
            await setCurrentSong(songs[(currentIndex-1) % songs.length ]);
            activeLibraryHandler(songs[(currentIndex-1) % songs.length ])
      }
      if(isPlaying) audioRef.current.play()
   }

   // adding styles to input
   const trackAnim = {
      transform:`translateX(${songInfo.animationPercentage}%)`
   }

  return(
   <div className='player'>
      <div className="time-control">
         <p>{getTime(songInfo.currentTime)}</p>
         <div style={{background:`linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}className="track">
               <input 
                  min={0} 
                  max={songInfo.duration || 0} 
                  type="range" 
                  value={songInfo.currentTime} 
                  onChange={dragHandler}
               />
            <div className="animate-track" style={trackAnim}></div>
         </div>
         <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      
      <div className="play-control">
         <FontAwesomeIcon 
            className="skip-back" size="2x" 
            icon={faAngleLeft} 
            onClick={()=>skipTrackHandler('skip-back')}
         />
         <FontAwesomeIcon 
            className="play" 
            size='2x' 
            icon={ isPlaying ? faPause : faPlay } 
            onClick={playSongHandler}
         />
         <FontAwesomeIcon 
            className="skip-forward"  
            size="2x" icon={faAngleRight} 
            onClick={()=>skipTrackHandler('skip-forward')}
         />
         
      </div>

   </div>
  )
}

export default Player