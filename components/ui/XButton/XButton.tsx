'use client';

import cn from 'classnames';
import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react';
import { mergeRefs } from 'react-merge-refs';

import styles from './Button.module.css';
import { X } from 'lucide-react';


const XButton = () => {
  return (
    <X
      size={22}
      color="black"
      className="absolute top-0 right-0"
      style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
      onMouseOver={(e) => {
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(1.0)';
      }}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(0.9)';
      }}
      onMouseUp={(e) => {
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(1.0)';
      }}
    />
  )
}
export default XButton;
