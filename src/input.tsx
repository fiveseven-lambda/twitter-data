import * as React from 'react';
import * as JSZip from 'jszip';

export const Input = ({
  setTweets
}: {
  setTweets(tweets): void,
}) => <div>
  <input type='file' onChange={
    event => {
      const files = event.target.files;
      const zip = JSZip();
      if(files.length > 0){
        zip.loadAsync(files[0]).then(archive => {
          archive.file('data/tweets.js').async('text').then(text => {
            setTweets(JSON.parse(text.replace(/[^=]*=/, '')));
          })
        })
      }
    }
  }></input>
</div>