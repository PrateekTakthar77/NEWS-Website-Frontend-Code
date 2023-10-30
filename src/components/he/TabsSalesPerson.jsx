import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons

const OrdersTable = () => {
  const [categories, setCategories] = useState([]);
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const toast = useToast();

  useEffect(() => {
    axios
      .get("https://news-so1v.onrender.com/api/article/category/get")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleEditSubcategory = (categoryId, subcategory) => {
    setEditSubcategory(subcategory);
    setEditCategoryId(categoryId);
  };

  const handleUpdateSubcategory = async () => {
    try {
      // Make an HTTP request to update the subcategory
      const response = await axios.put(
        `https://news-so1v.onrender.com/api/article/category/add/${editCategoryId}`,
        {
          // categoryId: editCategoryId,
          subcategory: editSubcategory,
        }
      );
      toast({
        title: "Updated",
        description: "Subcategory Updated Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });

      // // After successfully updating, fetch the updated data from the server
      const updatedDataResponse = await axios.get(
        "https://news-so1v.onrender.com/api/article/category/get"
      );
      const updatedData = updatedDataResponse.data;

      // Update your state with the fetched updated data
      setCategories(updatedData);

      console.log("Before state update:", categories);
      // setCategories(updatedCategories);
      console.log("After state update:", categories);

      // Reset the edit subcategory input
      setEditSubcategory("");
      setEditCategoryId("");
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // Make an HTTP request to delete the category
      const response = await axios.delete(
        `https://news-so1v.onrender.com/api/article/category/delete`,
        {
          data: { categoryId },
        }
      );
      toast({
        title: "Deleted",
        description: "Deleted Successfully.",
        status: "success",
        position: "top",
        duration: 4000,
      });

      setCategories((prevCategories) => {
        return prevCategories.filter((category) => category._id !== categoryId);
      });
      console.log("Category Deleted Successfully", categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Box p={6} bg="gray.100" border="1px solid #ccc" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Button
          mt={4}
          colorScheme="teal"
          size="sm"
          rounded="md"
          style={{ width: "20%" }}
        >
          <Link to="/addcategory">Add new category</Link>
        </Button>
        <Heading as="h3" size="sm" p={2} rounded="md">
          Categories
        </Heading>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Box key={category._id} bg="white" p={2} rounded="md">
              <Text m={5} pr={2} fontWeight="bold">
                {category.name}
                <IconButton
                  icon={<FaTrash />} // Delete icon
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  onClick={() => handleDeleteCategory(category._id)}
                  style={{ display: "flex", float: "right" }}
                />
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="teal"
                  size="sm"
                  ml={2}
                  onClick={() =>
                    handleEditSubcategory(category._id, category.subcategory)
                  }
                  style={{ display: "flex", float: "right" }}
                />
              </Text>
              <SimpleGrid columns={1} spacing={2} pl={6}>
                {category.subcategory.map((subcat) => (
                  <Text key={subcat} bg="lightgray" p={2} mb={4} rounded="md">
                    - {subcat}
                  </Text>
                ))}
              </SimpleGrid>
            </Box>
          ))
        ) : (
          <Text bg="white" p={2} rounded="md">
            No categories available
          </Text>
        )}
        {editCategoryId && (
          <Box>
            <Input
              value={editSubcategory}
              onChange={(e) => setEditSubcategory(e.target.value)}
              placeholder="Edit subcategory"
            />
            <Button
              onClick={handleUpdateSubcategory}
              colorScheme="teal"
              size="sm"
            >
              Update Subcategory
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default OrdersTable;
