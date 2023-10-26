import React, { useEffect, useState } from "react";
import {
  Center,
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import "./ArticlePage.css";

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const response = await axios.get(
          `https://news-so1v.onrender.com/api/article`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          (prev) =>
            error.response.data.message ||
            error.response.data.error ||
            error.message ||
            "Error while fetching users"
        );
        setLoading(false);
      }
    };

    fetchNewUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    // <div className="user-table-container">
    //   <Center>
    //     <Heading as="h1" size="lg" mb={4} mt={2}>
    //       All Articles Posted
    //     </Heading>
    //   </Center>
    //   {error ? (
    //     <Box className="error-box">{error}</Box>
    //   ) : (
    //     <Table variant="striped" colorScheme="teal">
    //       <Thead>
    //         <Tr>
    //           <Th>Title</Th>
    //           <Th>Category</Th>
    //           <Th>Subcategory</Th>
    //           <Th>Created At</Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody>
    //         {users.map((user) => (
    //           <Tr key={user._id}>
    //             <Td>{user.title}</Td>
    //             <Td>{user.category}</Td>
    //             <Td>{user.subcategory}</Td>
    //             <Td>
    //               {new Date(user.createdAt).toLocaleString("en-IN", {
    //                 day: "numeric",
    //                 month: "short",
    //                 year: "numeric",
    //                 hour: "numeric",
    //                 minute: "numeric",
    //                 hour12: true,
    //               })}
    //             </Td>
    //           </Tr>
    //         ))}
    //       </Tbody>
    //     </Table>
    //   )}
    // </div>

    <Box className="user-table-container">
      <Center>
        <Heading as="h1" size="lg" mb={4} mt={2}>
          All Articles Posted
        </Heading>
      </Center>
      {error ? (
        <Box className="error-box">{error}</Box>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Subcategory</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.title}</Td>
                <Td>{user.category}</Td>
                <Td>{user.subcategory}</Td>
                <Td>
                  {new Date(user.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default UserTable;
