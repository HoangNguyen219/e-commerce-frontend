import React from 'react';
import NavLinks from './NavLinks';
import styled from 'styled-components';

const MeSideBar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container ">
        <div className="content">
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: block;
  box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  .text {
    display: none;
    @media (min-width: 800px) {
      display: contents;
    }
  }
  .sidebar-container {
    background: var(--clr-white);
    min-height: 100vh;
    height: 100%;
    width: fit-content;

    transition: var(--transition);
  }
  .content {
    position: sticky;
    top: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--clr-grey-5);
    padding: 1rem 1rem;
    padding-left: 2rem;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    background: var(--clr-grey-10);
    padding-left: 3rem;
    color: var(--clr-grey-2);
  }
  .nav-link:hover .icon {
    color: var(--clr-primary-5);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--clr-grey-2);
  }
  .active .icon {
    color: var(--clr-primary-5);
  }
`;

export default MeSideBar;
