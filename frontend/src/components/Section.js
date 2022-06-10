import React from 'react';

export default function Section(props) {
  const { section } = props;
  const { title, link } = section;
  const myArray = link && link.split('&', 1);
  const newLink = myArray && myArray[0].replace('watch?v=', 'embed/');
  return (
    <div>
      <h4>{title}</h4>
      {link && (
        <iframe
          src={newLink}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      )}
    </div>
  );
}
