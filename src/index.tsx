import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { Input } from './input';
import { format } from 'date-fns'

const Main = () => {
  const [tweets, setTweets] = React.useState(null);

  var sorted_tweets = null;
  if(tweets){
    const sorted = tweets.map(tweet_item => {
      const tweet = tweet_item.tweet;
      const date = new Date(tweet.created_at);
      return [
        tweet.favorite_count,
        date,
        tweet.full_text
      ]
    });
    sorted.sort(([fav1, date1, text1], [fav2, date2, text2]) => {
      if(fav1 != fav2){
        return fav2 - fav1;
      }
      return date2 - date1;
    });
    sorted_tweets = sorted.map(([fav, date, text], index) => <p key={index}>
      { `${format(date, 'yyyy/MM/dd HH:mm:ss')}（${fav}いいね）${text}` }
    </p>);
  }
  return <div>
    <Input setTweets={setTweets} />
    { tweets && sorted_tweets }
  </div>
}

ReactDOMClient
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Main/>
    </React.StrictMode>
  );
