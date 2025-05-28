import React from 'react';

export function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardBody({ children, className }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h2 className={`card-title ${className}`}>{children}</h2>;
}

export function CardContent({ children, className }) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

export function CardDescription({ children, className }) {
  return <p className={`card-description ${className}`}>{children}</p>;
}
export default Card;