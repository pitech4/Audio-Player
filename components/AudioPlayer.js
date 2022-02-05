import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/AudioPlayer.module.css';

const AudioPlayer = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const chapters = [
    {
      start: 20,
      end: 35,
    },
    {
      start: 60,
      end: 75,
    }
  ]

  const audioPlayer = useRef(); //referenceing the audio component
  const progressBar = useRef(); // reference to progress bar
  const animationRef = useRef() // refernce the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds; // sets the maximum range to the length of the song.
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);  

  const calculateTime = (secs) => {
      const minutes = Math.floor(secs/60);
      const returnMinutes = minutes<10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs%60);
      const returnSeconds = seconds<10 ? `0${seconds}` : `${seconds}`;

      return `${returnMinutes}:${returnSeconds}`;
  }

  const togglePlayPause= () => {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if(!prevValue) {
          audioPlayer.current.play();
          console.log(prevValue);
          animationRef.current = requestAnimationFrame(whenPlaying);
      }
      else {
          audioPlayer.current.pause();
          cancelAnimationFrame(animationRef.current);
      }

      
  }

  const whenPlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    animationRef.current = requestAnimationFrame(whenPlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  }

  const changeCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value/duration * 100}%`);
    setCurrentTime(progressBar.current.value);
  } 

  const backwards = () => {
    progressBar.current.value = Number(progressBar.current.value) - 5;
    changeRange();
  }

  const forwards = () => {
    progressBar.current.value = Number(progressBar.current.value) + 5;
    changeRange();
  }

  return (
  <div>
      <audio ref={audioPlayer} src='https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3' preload='metadata'></audio>
      <button onClick={backwards}>backword</button>
      <button onClick={togglePlayPause}>
          {isPlaying ? "pause" : "play"}
      </button>
      <button onClick={forwards}>forward</button>

      {/* current time   */}
      <div>{calculateTime(currentTime)}</div>
      
      {/* progress bar */}
      <div className={styles.progressBarWrapper}>
        <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} step="0.05" ></input> 
        {chapters.map((c, i) => {
          const leftStyle = c.start / duration * 100;
          const widthStyle = (c.end - c.start) / duration * 100;
          console.table({i, leftStyle , widthStyle})
          return (
          <div 
          key={i} 
          className={`${styles.chapter} ${c.start == 0 && styles.start} ${c.end == duration && styles.end}`} 
          style={
              {
                '--left' : `${leftStyle}%`,
                '--width' : `${widthStyle}%`,
              }
          }>
          </div>
          )
        })}
      </div> 

      {/* total duration */}
      <div>{calculateTime(duration)}</div>

  </div>
  );
};

export {AudioPlayer}