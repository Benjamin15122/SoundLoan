import React, { Component } from 'react';


function NewsItem({title, date, link}) {

  return (
    <div style={{ width: '100%' }}>
      <span style={{ width: '80%' }}>
        <a href={link} target='_blank'>
          <b>{title}</b>
        </a>
      </span>
      <span style={{ float: 'right' }}>
        <small>{date}</small>
      </span>
    </div>
  );
}

export default NewsItem;
