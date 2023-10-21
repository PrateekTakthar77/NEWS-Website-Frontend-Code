import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrdersTable = () => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://news-b4c3.onrender.com/api/article/category/get")
      .then((response) => {
        const categoryNames = response.data.map((category) => category.name);
        setAvailableCategories(categoryNames);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get("https://news-b4c3.onrender.com/api/article/subcategory/get")
      .then((response) => {
        if (
          Array.isArray(response.data.subcategories) &&
          response.data.subcategories.length > 0
        ) {
          const subcategoryNames = response.data.subcategories.map(
            (subcategory) => subcategory.name
          );
          setAvailableSubCategories(subcategoryNames);
        } else {
          console.error(
            "Subcategories data is not in the expected format:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <Box p={6} bg="gray.100" border="1px solid #ccc" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Link to="/category">
          <Button mt={4} colorScheme="teal" size="sm" rounded="md">
            Add new category
          </Button>
        </Link>
        <Heading as="h3" size="sm" p={2} rounded="md">
          Categories
        </Heading>
        {Array.isArray(availableCategories) &&
        availableCategories.length > 0 ? (
          <SimpleGrid columns={1} spacing={2}>
            {availableCategories.map((cat) => (
              <Text key={cat} bg="white" p={2} rounded="md">
                {cat}
              </Text>
            ))}
          </SimpleGrid>
        ) : (
          <Text bg="white" p={2} rounded="md">
            No categories available
          </Text>
        )}
      </VStack>

      <VStack spacing={4} align="stretch">
        <Heading as="h3" size="sm" p={2} mt={3} rounded="md">
          Subcategories
        </Heading>
        {Array.isArray(availableSubCategories) &&
        availableSubCategories.length > 0 ? (
          <SimpleGrid columns={1} spacing={2}>
            {availableSubCategories.map((subcat) => (
              <Text key={subcat} bg="white" p={2} rounded="md">
                {subcat}
              </Text>
            ))}
          </SimpleGrid>
        ) : (
          <Text bg="white" p={2} rounded="md">
            No subcategories available
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default OrdersTable;
