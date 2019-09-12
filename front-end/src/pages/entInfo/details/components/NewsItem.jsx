import React, { Component } from 'react';

function NewsItem({ title, date, link, source, extract }) {
  return (
    <div style={{ width: '100%' }}>
      <h6 style={{ width: '80%' }}>
        <a href={link} target="_blank">
          <b>{title}</b>
        </a>
      </h6>
      <p>{extract}</p>
      <div style={{ width: '150px' }}>
        <small>来源：{source}</small>
      </div>
      <div>
        <small>{date}</small>
      </div>
    </div>
  );
}

export default NewsItem;
