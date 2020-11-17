import React, {useState, useRef} from 'react';
//import scss
import "./styles/app.scss"
//import component
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
//import song info
import data from './data'


function App() {
  //Ref ... to access song title data
    const audioRef = useRef(null);
  // state 
  const [songs, setSongs] = useState(data()) //GETS SONG DATA FROM DATA FILE
  const [currentSong, setCurrentSong] = useState(songs[0]) // SETS CURRENT SONG, SENDS STATE TO SONG COMPONENT
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(false)

  //state to pass downt to the player
  const [songInfo, setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage:0
   })
  const timeUpdateHandler = (e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calc percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent/roundedDuration)*100)
    setSongInfo({...songInfo, currentTime:current, duration, animationPercentage :animation})
 }

 // handlers
 const songEndHandler = async () =>{
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
  await setCurrentSong(songs[(currentIndex+1) % songs.length ]);
  if(isPlaying) audioRef.current.play()
}

  return (
    <div className={`App ${ libraryStatus ? 'library-active' : '' }`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song 
        currentSong={currentSong}
        isPlaying={isPlaying}
      />
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio 
         onTimeUpdate={timeUpdateHandler} 
         ref={audioRef} 
         src={currentSong.audio}
         onLoadedMetadata={timeUpdateHandler}
         onEnded={songEndHandler}
      >
      </audio>
    
    </div>
  );
}

export default App;
