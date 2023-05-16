import React from 'react';
import { PageHero } from '../../components';
import styled from 'styled-components';
import { MeSideBar } from '../../components';
import { Outlet } from 'react-router-dom';

const MePage = () => {
  return (
    <main>
      <PageHero title="me" />
      <Wrapper className="page">
        <div className="dashboard">
          <MeSideBar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .dashboard {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .dashboard-page {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;
  }
`;

export default MePage;
