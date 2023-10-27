import { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  FormLabel,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";

function AddCategoryAndSubcategoryForm() {
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [status, setStatus] = useState("active"); // Default status

  const handleAddCategoryAndSubcategory = async () => {
    try {
      console.log(category);
      console.log(subcategories);
      console.log(status);
      if (category === "" || subcategories.length === 0) {
        console.error(
          "Both category and at least one subcategory are required."
        );
        return;
      }

      // Send a POST request to add the category and subcategories
      await axios.post("http://localhost:5009/api/article/category/", {
        category,
        subcategories,
        status, // Include the status in the request
      });

      // Clear the input fields after successful submission
      setCategory("");
      setSubcategories([]);

      // Optionally, show a success message or update the UI to reflect the change.
    } catch (error) {
      console.error("Error adding category and subcategories:", error);
    }
  };

  return (
    <form>
      <FormControl id="category">
        <FormLabel>Category</FormLabel>
        <Input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormControl>

      <FormControl id="subcategories">
        <FormLabel>Subcategories</FormLabel>
        <Input
          type="text"
          value={subcategories.join(",")}
          onChange={(e) => setSubcategories(e.target.value.split(","))}
        />
      </FormControl>

      <FormControl id="status">
        <FormLabel>Status</FormLabel>
        <RadioGroup value={status} onChange={setStatus}>
          <Radio value="active">Active</Radio>
          <Radio value="disable">Disable</Radio>
        </RadioGroup>
      </FormControl>

      <Button onClick={handleAddCategoryAndSubcategory} marginTop={"20px"}>
        Add Category and Subcategories
      </Button>
    </form>
  );
}

export default AddCategoryAndSubcategoryForm;
