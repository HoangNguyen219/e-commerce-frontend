import React from 'react';
import { meLinks } from '../utils/constants';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <div className="nav-links">
      {meLinks.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
