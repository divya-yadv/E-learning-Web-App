import React from 'react';

export default function Section(props) {
  const { section, count } = props;
  const { title, video } = section;
  return (
    <div>
      <h4>
        {count}. {title}
      </h4>
      <video loop autoPlay>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
