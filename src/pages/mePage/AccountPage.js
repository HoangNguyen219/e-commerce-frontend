import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { Link } from 'react-router-dom';
const AccountPage = () => {
  const { user, getCurrentUser } = useUserContext();
  useEffect(() => {
    getCurrentUser();
  }, []);
  const { name, email } = user;
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <div className="actions">
                <Link to="/me/account/edit" className="btn btn-safe">
                  Edit Account
                </Link>
                <Link
                  to="/me/account/change-password"
                  type="button"
                  className="btn btn-danger"
                >
                  Change password
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  th,
  td {
    text-transform: none;
  }
`;

export default AccountPage;
