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

      const updateState = await axios.get(
        "https://news-so1v.onrender.com/api/article/"
      );
      const requested = updateState.data;
      setArticle(requested);

      console.log("Deleted Successfully", articleId);
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Updated",
        description: "error deleting blog.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
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
        <Table variant="striped" colorScheme="gray" size="md">
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
                    <RouterLink to={`/edit/${news._id}`}>
                      <IconButton
                        icon={<FaEdit />}
                        backgroundColor={"#0a2351"}
                        color={"white"}
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
