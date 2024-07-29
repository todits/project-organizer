import { useState } from "react";

export const useUsers = () => {
   const [users, setUsers] = useState([]);

   const getUsers = () => {
      const tempUsers = ["Daryl"];
      setUsers(tempUsers);
   };

   const Button = () => {
      return <button>Test</button>;
   };

   return { users, getUsers, Button };
};

export const testFunction = () => {
   const [users, setUsers] = useState([]);

   return { users };
};
