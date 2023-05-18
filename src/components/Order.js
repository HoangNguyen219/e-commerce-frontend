import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import styled from 'styled-components';

const Order = ({ orders }) => {
  const {} = useUserContext();

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Processing Status</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Order date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => {
              const { id, processStatus, total, paymentMethod, createdAt } =
                order;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      className={
                        processStatus === 'pending' || 'canceled' || 'returned'
                          ? 'status red'
                          : 'status green'
                      }
                    >
                      {processStatus}{' '}
                    </span>
                  </td>
                  <td>{formatPrice(total)}</td>
                  <td>{paymentMethod}</td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/me/orders/${id}`} className="btn btn-safe">
                        View details
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .status {
    font-size: 0.8rem;
    padding: 2px;
  }
  .green {
    border: solid 1px green;
  }
  .red {
    border: solid 1px red;
  }
`;

export default Order;
