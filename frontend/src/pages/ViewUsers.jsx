import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../services/users/userSlice";

export const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <div>Hello World</div>;
};

export default Users;
