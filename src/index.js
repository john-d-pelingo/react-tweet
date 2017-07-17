/* eslint-disable react/require-default-props */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import './index.css';

function Avatar({ hash }) {
  const url = `https://www.gravatar.com/avatar/${ hash }`;
  return (
    <img src={ url } alt="avatar" className="avatar" />
  );
}
Avatar.propTypes = { hash: PropTypes.string };

function Message({ text }) {
  return (
    <div className="message">
      { text }
    </div>
  );
}
Message.propTypes = { text: PropTypes.string };

function NameWithHandle({ author }) {
  const { name, handle } = author;
  return (
    <span className="name-with-handle">
      <span className="name">{ name }</span>
      <span className="handle">@{ handle }</span>
    </span>
  );
}
NameWithHandle.propTypes = { author: PropTypes.object.isRequired };

const Time = ({ time }) => <span className="time">{ moment(time).fromNow() }</span>;
Time.propTypes = { time: PropTypes.string };

const ReplyButton = () => <i className="fa fa-reply reply-button" />;

function getRetweetCount(count) {
  return count > 0 ? <span className="retweet-count">{ count }</span> : null;
}

const RetweetButton = ({ count }) => <span className="retweet-button"><i className="fa fa-retweet" />{ getRetweetCount(count) }</span>;
RetweetButton.propTypes = { count: PropTypes.number };

const LikeButton = ({ count }) => <span className="like-button"><i className="fa fa-heart" />{ count > 0 && <span className="like-count">{ count }</span> }</span>;
LikeButton.propTypes = { count: PropTypes.number };

const MoreOptionsButton = () => <i className="fa fa-ellipsis-h more-options-button" />;

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <Avatar hash={ tweet.gravatar } />
      <div className="content">
        <NameWithHandle author={ tweet.author } /><Time time={ tweet.timestamp } />
        <Message text={ tweet.message } />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={ tweet.retweets } />
          <LikeButton count={ tweet.retweets } />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired,
    author: PropTypes.shape({
      handle: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    likes: PropTypes.number.isRequired,
    retweets: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired
};

const testTweet = {
  message: 'Something about cats.',
  gravatar: 'xyz',
  author: {
    handle: 'catperson',
    name: 'IAMA Cat Person'
  },
  likes: 2,
  retweets: 1,
  timestamp: '2016-07-30 21:24:37'
};


ReactDOM.render(
  <Tweet tweet={ testTweet } />,
  document.getElementById('root')
);
