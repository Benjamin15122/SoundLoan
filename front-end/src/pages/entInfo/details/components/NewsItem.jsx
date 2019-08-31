import React, { Component } from 'react';


function NewsItem({title, date, link}) {

  return (
    <div>
      <div>
        <a href={link}>
          {title}
        </a>
      </div>
      <div>
        {date}
      </div>
    </div>
  );
}

export default NewsItem;
