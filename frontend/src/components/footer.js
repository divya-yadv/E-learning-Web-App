import React from 'react';

export default function Footer() {
  const Year = new Date().getFullYear();
  return (
    <div className="text-center footer">All rights reserved © Educatify {Year}</div>
  );
}
