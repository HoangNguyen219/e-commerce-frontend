import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../context/user_context';
import { Loading } from '../components';

const VerifyPage = () => {
  const { isLoading, isError, verifyToken } = useUserContext();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  useEffect(() => {
    if (!isLoading) {
      verifyToken({
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
    }
  }, []);

  if (isLoading) {
    return (
      <Wrapper className="page-100">
        <Loading />
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper className="page-100">
        <h4>There was an error, please double check your verification link </h4>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="page-100">
      <section>
        <h2>Account Confirmed</h2>
        <Link to="/login" className="btn">
          Please login
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default VerifyPage;
