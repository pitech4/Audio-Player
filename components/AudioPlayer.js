import React from 'react';

const AudioPlayer = () => {
  return (
  <div>
      <audio src='https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3' preload='metadata'></audio>
      <button>backword</button>
      <button>play or pause</button>
      <button>forward</button>

      {/* current time   */}
      <div>current time</div>
      
      {/* progress bar */}
      <div>
        <input type="range"></input> 
      </div> 

      {/* total duration */}
      <div>duration</div>

  </div>
  );
};

export {AudioPlayer}