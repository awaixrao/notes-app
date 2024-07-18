import React from 'react'

import {Search} from "lucide-react";

const Topbar = () => {
  return (
    <div className='topbar'>
      <div className='user-info'>
        <div className='photo'>
          <img src='https://i.pravatar.cc/300' />
        </div>
        <div className='info'>
          <h5>Mahdi Jalil</h5>
          <p>masifmirza927@gmail.com</p>
        </div>
      </div>
      <div className='search-input'>
        <Search color='#707070' className='searchIcon' />
        <input type='search' className='search' />
      </div>
    </div>
  )
}

export default Topbar