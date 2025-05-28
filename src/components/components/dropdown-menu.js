import React from 'react';

export function DropdownMenu({ children }) {
  return <div className="dropdown-menu">{children}</div>;
}

export function DropdownMenuTrigger({ children }) {
  return <button className="dropdown-trigger">{children}</button>;
}

export function DropdownMenuContent({ children }) {
  return <div className="dropdown-content">{children}</div>;
}

export function DropdownMenuItem({ children }) {
  return <div className="dropdown-item">{children}</div>;
}

export function DropdownMenuLabel({ children }) {
  return <div className="dropdown-label">{children}</div>;
}

export function DropdownMenuSeparator() {
  return <hr className="dropdown-separator" />;
}

export function DropdownMenuGroup({ children }) {
  return <div className="dropdown-group">{children}</div>;
}
