import React, { useEffect } from 'react';
import Loading from '../../components/Loading';
import AddButton from '../../components/AddButton';
import { useUserContext } from '../../context/user_context';
import Address from '../../components/Address';

const AddressPage = () => {
  const { isLoading, isError, getAddresses, addresses } = useUserContext();

  useEffect(() => {
    getAddresses();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (addresses.length < 1) {
    return (
      <h4 style={{ textTransform: 'none' }}>
        No addresses to display...
        <AddButton />
      </h4>
    );
  }
  return (
    <>
      <h5 className="inline">
        {addresses.length} address
        {addresses.length > 1 && 'es'} found
        <AddButton mgLeft={true} />
      </h5>

      <Address addresses={addresses} />
    </>
  );
};

export default AddressPage;
