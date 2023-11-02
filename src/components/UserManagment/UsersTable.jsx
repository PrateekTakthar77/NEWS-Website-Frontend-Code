// import React, { useEffect, useState } from "react";
// import {
//   Center,
//   Heading,
//   Box,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Spinner,
//   IconButton,
//   Flex,
//   useToast,
//   Link,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { AdminState } from "../context/context";
// import "./ArticlePage.css";
// import { FaTrash, FaEdit } from "react-icons/fa";

// const UserTable = () => {
//   const [loading, setLoading] = useState(true);
//   const [article, setArticle] = useState([]);
//   const [error, setError] = useState(null);
//   const toast = useToast();

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(
//           `https://news-so1v.onrender.com/api/article`
//         );
//         setArticle(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError(
//           (prev) =>
//             error.response.data.message ||
//             error.response.data.error ||
//             error.message ||
//             "Error while fetching users"
//         );
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={8}>
//         <Spinner size="xl" />
//       </Box>
//     );
//   }
//   const handleDeletearticlle = async (articleId) => {
//     try {
//       // Make an HTTP request to delete the category
//       const response = await axios.delete(
//         `https://news-so1v.onrender.com/api/article/${articleId}`
//         // {
//         //   data: { categoryId },
//         // }
//       );
//       toast({
//         title: "Deleted",
//         description: "Deleted Successfully.",
//         status: "success",
//         position: "top",
//         duration: 4000,
//       });

//       const updateStatus = await axios.get(
//         "https://news-so1v.onrender.com/api/article/"
//       );
//       const requested = updateStatus.data;
//       setArticle(requested);

//       console.log("Deleted Successfully", articleId);
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   return (
//     <Box className="user-table-container">
//       <Center>
//         <Heading as="h1" size="lg" mb={4} mt={2}>
//           All Articles Posted
//         </Heading>
//       </Center>
//       {error ? (
//         <Box className="error-box">{error}</Box>
//       ) : (
//         <Table variant="striped" colorScheme="teal">
//           <Thead>
//             <Tr>
//               <Th>Title</Th>
//               <Th>Category</Th>
//               <Th>Subcategory</Th>
//               <Th>Created At</Th>
//               <Th>actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {article.map((news) => (
//               <Tr key={news._id}>
//                 <Td>{news.title}</Td>
//                 <Td>{news.category}</Td>
//                 <Td>{news.subcategory}</Td>
//                 <Td>
//                   {new Date(news.createdAt).toLocaleString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                     hour: "numeric",
//                     minute: "numeric",
//                     hour12: true,
//                   })}
//                 </Td>
//                 <Td>
//                   <IconButton
//                     icon={<FaTrash />} // Delete icon
//                     colorScheme="red"
//                     size="sm"
//                     onClick={() => handleDeletearticlle(news._id)}
//                   />
//                 </Td>
//                 <Td>
//                   <Link to={`/edit-article/${news._id}`}>
//                     {news.title}
//                     <IconButton
//                       icon={<FaEdit />}
//                       colorScheme="teal"
//                       size="sm"
//                       ml={2} // Add some margin to separate it from the title
//                     />
//                   </Link>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       )}
//     </Box>
//   );
// };

// export default UserTable;

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
  Spinner,
  IconButton,
  Flex,
  useToast,
  Link,
  HStack, // Import HStack for horizontal alignment
} from "@chakra-ui/react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink from react-router-dom

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://news-so1v.onrender.com/api/article`
        );
        setArticle(response.data);
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

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }
  const handleDeleteArticle = async (articleId) => {
    try {
      // Make an HTTP request to delete the article
      const response = await axios.delete(
        `https://news-so1v.onrender.com/api/article/${articleId}`
      );
      toast({
        title: "Deleted",
        description: "Deleted Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });

      const updateStatus = await axios.get(
        "https://news-so1v.onrender.com/api/article/"
      );
      const requested = updateStatus.data;
      setArticle(requested);

      console.log("Deleted Successfully", articleId);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
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
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {article.map((news) => (
              <Tr key={news._id}>
                <Td>{news.title}</Td>
                <Td>{news.category}</Td>
                <Td>{news.subcategory}</Td>
                <Td>
                  {new Date(news.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Td>
                <Td>
                  <HStack>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteArticle(news._id)}
                    />
                    {/* <Link to={`/edit/:${news._id}`}>
                      <IconButton
                        icon={<FaEdit />}
                        colorScheme="teal"
                        size="sm"
                      />
                    </Link> */}
                    {/* <Link to={`/edit/${news._id}`}>
                      <IconButton
                        icon={<FaEdit />}
                        colorScheme="teal"
                        size="sm"
                      />
                    </Link> */}
                    <RouterLink to={`/edit/${news._id}`}>
                      {" "}
                      {/* Use RouterLink */}
                      <IconButton
                        icon={<FaEdit />}
                        colorScheme="teal"
                        size="sm"
                      />
                    </RouterLink>
                  </HStack>
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
