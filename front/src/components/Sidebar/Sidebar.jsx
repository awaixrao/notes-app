import React from 'react'
import { Link } from "react-router-dom";
import {House, Bell, SmilePlus, PencilLine, Trash, Pin} from "lucide-react";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <span>Noty</span>
      </div>
      <ul>
        <li>
          <Link className='sidebar-link' to='/'>
            <House size={22} color='black' />
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/'>
            <Bell size={22} color='black' />
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/'>
            <PencilLine size={22} color='black' />
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/'>
            <Pin size={22} color='black' />
          </Link>
        </li>
        <li>
          <Link className='sidebar-link' to='/'>
            <Trash size={22} color='black' />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar