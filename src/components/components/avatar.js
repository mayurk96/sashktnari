import React from 'react';

export function Avatar({ src, alt, className }) {
  return (
    <img
      src={src || 'https://via.placeholder.com/150'}
      alt={alt || 'Avatar'}
      className={`rounded-full ${className}`}
    />
  );
}

export function AvatarImage({ src, alt, className }) {
  return <img src={src} alt={alt} className={`avatar-image ${className}`} />;
}

export function AvatarFallback({ fallbackText, className }) {
  return <div className={`avatar-fallback ${className}`}>{fallbackText}</div>;
}
