import React from 'react'
import './loading.css';

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
  <div className="loader">
    <div className="loader__bar" />
    <div className="loader__bar" />
    <div className="loader__bar" />
    <div className="loader__bar" />
    <div className="loader__bar" />
    <div className="loader__ball" />
  </div>
</div>

  )
}
