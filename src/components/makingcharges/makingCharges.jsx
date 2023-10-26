import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Select,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";

function AddSubcategoryForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  // Fetch existing categories from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5009/api/article/category/get")
      .then((response) => {
        setCategories(response.data); // Assuming the server provides a list of categories
      });
  }, []);

  // const handleAddSubcategory = async () => {
  //   try {
  //     // Send a POST request to add the subcategory to the selected category
  //     await axios.post(`/add-subcategory/${selectedCategory}`, { subcategory });
  //     // Handle success or show a notification to the user
  //     // You can use state or a notification library to inform the user.
  //   } catch (error) {
  //     // Handle errors and show an error message to the user
  //   }
  // };

  const handleAddSubcategory = async () => {
    try {
      if (selectedCategory === "" || subcategory === "") {
        // Add client-side validation to ensure both fields are filled
        // You can show an error message to the user.
        console.error("Both fields are required.");
        return;
      }

      // Send a POST request to add the subcategory to the selected category
      await axios.post(
        `http://localhost:5009/api/article/category/add/${selectedCategory}`,
        {
          subcategory,
        }
      );

      // Clear the subcategory input field after successful submission
      setSubcategory("");

      // Optionally, show a success message or update the UI to reflect the change.
    } catch (error) {
      // Handle errors and show an error message to the user
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <form>
      <FormControl id="category">
        <FormLabel>Select Category</FormLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="subcategory">
        <FormLabel>Add Subcategory</FormLabel>
        <Input
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
    </form>
  );
}

export default AddSubcategoryForm;
