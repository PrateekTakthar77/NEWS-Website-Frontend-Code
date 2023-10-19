import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../../context/context";

const OrdersTable = () => {
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const { API_BASE_URL } = AdminState();

  const handleAddCategory = () => {
    if (newCategory) {
      // Send a POST request to add a new category
      axios
        .post(`${API_BASE_URL}/api/article/category/`, { name: newCategory })
        .then((response) => {
          // Handle success or provide user feedback
          console.log("New category added:", response.data);
          // Optionally, you can update the availableCategories state with the new category
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory) {
      // Send a POST request to add a new subcategory
      axios
        .post(`${API_BASE_URL}/api/article/subcategory/`, {
          name: newSubcategory,
        })
        .then((response) => {
          // Handle success or provide user feedback
          console.log("New subcategory added:", response.data);
          // Optionally, you can update the availableSubCategories state with the new subcategory
        })
        .catch((error) => {
          console.error("Error adding subcategory:", error);
        });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" mb={4}>
          Add New Category
        </Heading>
        <Input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleAddCategory}>Add Category</Button>
      </VStack>
      <Box mt={8}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg" mb={4}>
            Add New SubCategory
          </Heading>
          <Input
            type="text"
            placeholder="New Subcategory"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
          />
          <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrdersTable;
