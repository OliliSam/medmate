import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSlice, { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './userSlice';

const useUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const fetchUsers = async () => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get('/api/users');
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };

  const loginUser = async (id) => {
    dispatch(loginUserRequest(id));
  };

  const logoutUser = async (id) => {
    dispatch(logoutUserRequest(id));
  };

  return { users, fetchUsers, loginUser, logoutUser };
};

export default useUser;
