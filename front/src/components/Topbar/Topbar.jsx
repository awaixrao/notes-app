import React from 'react'

import {Search} from "lucide-react";

const Topbar = () => {
  return (
    <div className='topbar'>
      <div className='user-info'>
        <div className='photo'>
          <img src='https://media.licdn.com/dms/image/D4D03AQEE1hNyxCJlHQ/profile-displayphoto-shrink_200_200/0/1699612917132?e=2147483647&v=beta&t=J8jJVTzg0MyHqqk_D95hW4W8Pt_lGnT6EhzFOq-CNVU' />
        </div>
        <div className='info'>
          <h5>Awais Rao</h5>
          <p>awais@gmail.com</p>
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