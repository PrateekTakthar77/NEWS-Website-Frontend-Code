// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Input,
// //   Button,
// //   VStack,
// //   Heading,
// //   Text,
// //   SimpleGrid,
// //   IconButton,
// //   Spacer,
// //   useToast,
// // } from "@chakra-ui/react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons

// // const OrdersTable = () => {
// //   const [categories, setCategories] = useState([]);
// //   const toast = useToast();

// //   useEffect(() => {
// //     axios
// //       .get("https://news-b4c3.onrender.com/api/article/category/get")
// //       .then((response) => {
// //         setCategories(response.data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching categories:", error);
// //       });
// //   }, []);

// //   // Function to handle category deletion
// //   const handleDeleteCategory = async (categoryId) => {
// //     try {
// //       // Make an HTTP request to delete the category
// //       const response = await axios.delete(
// //         `http://localhost:5009/api/article/category/delete`,
// //         {
// //           data: { categoryId },
// //         }
// //       );
// //       toast({
// //         titile: "Deleted",
// //         description: "Deleted Successfully.",
// //         status: "success",
// //         position: "top",
// //         duration: 4000,
// //       });

// //       setCategories((prevCategories) => {
// //         return prevCategories.filter((category) => category._id !== categoryId);
// //       });
// //       console.log("Category Deleted Successfully", categoryId);
// //     } catch (error) {
// //       console.error("Error deleting category:", error);
// //     }
// //   };

// //   // Function to handle updating the category status
// //   const handleUpdateCategory = (categoryId) => {
// //     // Implement the status update logic here
// //   };

// //   return (
// //     <Box p={6} bg="gray.100" border="1px solid #ccc" borderRadius="lg">
// //       <VStack spacing={4} align="stretch">
// //         <Link to="/category">
// //           <Button mt={4} colorScheme="teal" size="sm" rounded="md">
// //             Add new category
// //           </Button>
// //         </Link>
// //         <Heading as="h3" size="sm" p={2} rounded="md">
// //           Categories
// //         </Heading>
// //         {categories.length > 0 ? (
// //           categories.map((category) => (
// //             <Box key={category._id} bg="white" p={2} rounded="md">
// //               <Text m={5} pr={2} fontWeight="bold">
// //                 {category.name}
// //                 <IconButton
// //                   icon={<FaTrash />} // Delete icon
// //                   colorScheme="red"
// //                   size="sm"
// //                   ml={2}
// //                   onClick={() => handleDeleteCategory(category._id)}
// //                   style={{ display: "flex", float: "right" }}
// //                 />
// //                 <IconButton
// //                   icon={<FaEdit />}
// //                   colorScheme="teal"
// //                   size="sm"
// //                   ml={2}
// //                   onClick={() => handleUpdateCategory(category._id)}
// //                   style={{ display: "flex", float: "right" }}
// //                 />
// //               </Text>
// //               <SimpleGrid columns={1} spacing={2} pl={6}>
// //                 {category.subcategory.map((subcat) => (
// //                   <Text key={subcat} bg="lightgray" p={2} mb={4} rounded="md">
// //                     {subcat}
// //                   </Text>
// //                 ))}
// //               </SimpleGrid>
// //             </Box>
// //           ))
// //         ) : (
// //           <Text bg="white" p={2} rounded="md">
// //             No categories available
// //           </Text>
// //         )}
// //       </VStack>
// //     </Box>
// //   );
// // };

// // export default OrdersTable;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Input,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   SimpleGrid,
//   IconButton,
//   Spacer,
//   useToast,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   ModalFooter,
//   Select,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons

// const OrdersTable = () => {
//   const [categories, setCategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [updatedStatus, setUpdatedStatus] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const toast = useToast();

//   useEffect(() => {
//     axios
//       .get("https://news-b4c3.onrender.com/api/article/category/get")
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   const openModal = () => {
//     setIsModalOpen(true);
//     // You can also set the initial value of `updatedStatus` here if needed.
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleUpdateCategory = (categoryId) => {
//     openModal();
//     // You can perform any additional actions related to updating the category status here.
//   };

//   //   // Function to handle category deletion
//   const handleDeleteCategory = async (categoryId) => {
//     try {
//       // Make an HTTP request to delete the category
//       const response = await axios.delete(
//         `http://localhost:5009/api/article/category/delete`,
//         {
//           data: { categoryId },
//         }
//       );
//       toast({
//         titile: "Deleted",
//         description: "Deleted Successfully.",
//         status: "success",
//         position: "top",
//         duration: 4000,
//       });

//       setCategories((prevCategories) => {
//         return prevCategories.filter((category) => category._id !== categoryId);
//       });
//       console.log("Category Deleted Successfully", categoryId);
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   const handleUpdateStatus = async () => {
//     try {
//       // Make an HTTP request to update the category status
//       // You can use the `updatedStatus` state to send the new status to the server
//       const response = await axios.put(
//         `http://localhost:5009/api/article/category/${categories._id}`,
//         {
//           // categoryId: categories._id,
//           status: updatedStatus,
//         }
//       );

//       if (response.data && response.data.success) {
//         toast({
//           title: "Updated",
//           description: "Status updated successfully.",
//           status: "success",
//           position: "top",
//           duration: 4000,
//         });
//         // Optionally, you can update the local state or refetch the data.
//         // Example: setCategories([...categories]);
//         closeModal();
//       } else {
//         console.log("Status Update Failed");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <Box p={6} bg="gray.100" border="1px solid #ccc" borderRadius="lg">
//       <VStack spacing={4} align="stretch">
//         <Link to="/category">
//           <Button mt={4} colorScheme="teal" size="sm" rounded="md">
//             Add new category
//           </Button>
//         </Link>
//         <Heading as="h3" size="sm" p={2} rounded="md">
//           Categories
//         </Heading>
//         {categories.length > 0 ? (
//           categories.map((category) => (
//             <Box key={category._id} bg="white" p={2} rounded="md">
//               <Text m={5} pr={2} fontWeight="bold">
//                 {category.name}
//                 <IconButton
//                   icon={<FaTrash />} // Delete icon
//                   colorScheme="red"
//                   size="sm"
//                   ml={2}
//                   onClick={() => handleDeleteCategory(category._id)}
//                   style={{ display: "flex", float: "right" }}
//                 />
//                 <IconButton
//                   icon={<FaEdit />}
//                   colorScheme="teal"
//                   size="sm"
//                   ml={2}
//                   onClick={() => handleUpdateCategory(category._id)}
//                   style={{ display: "flex", float: "right" }}
//                 />
//               </Text>
//               <SimpleGrid columns={1} spacing={2} pl={6}>
//                 {category.subcategory.map((subcat) => (
//                   <Text key={subcat} bg="lightgray" p={2} mb={4} rounded="md">
//                     {subcat}
//                   </Text>
//                 ))}
//               </SimpleGrid>
//             </Box>
//           ))
//         ) : (
//           <Text bg="white" p={2} rounded="md">
//             No categories available
//           </Text>
//         )}
//       </VStack>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Category Status</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* <Input
//               placeholder="New Status"
//               value={updatedStatus}
//               onChange={(e) => setUpdatedStatus(e.target.value)}
//             /> */}
//             <Select
//               placeholder="Select Status"
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//             >
//               <option value="Active">active</option>
//               <option value="Disabled">isabled</option>
//             </Select>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="teal" onClick={closeModal}>
//               Cancel
//             </Button>
//             <Button colorScheme="blue" onClick={handleUpdateStatus}>
//               Update
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default OrdersTable;

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
  Spacer,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import React Icons

const OrdersTable = () => {
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get("https://news-b4c3.onrender.com/api/article/category/get")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Function to handle category deletion
  const handleDeleteCategory = async (categoryId) => {
    try {
      // Make an HTTP request to delete the category
      const response = await axios.delete(
        `http://localhost:5009/api/article/category/delete`,
        {
          data: { categoryId },
        }
      );
      toast({
        titile: "Deleted",
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

  // Function to handle updating the category status
  const handleUpdateCategory = (categoryId) => {
    // Implement the status update logic here
  };

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
                  onClick={() => handleUpdateCategory(category._id)}
                  style={{ display: "flex", float: "right" }}
                />
              </Text>
              <SimpleGrid columns={1} spacing={2} pl={6}>
                {category.subcategory.map((subcat) => (
                  <Text key={subcat} bg="lightgray" p={2} mb={4} rounded="md">
                    {subcat}
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
      </VStack>
    </Box>
  );
};

export default OrdersTable;
