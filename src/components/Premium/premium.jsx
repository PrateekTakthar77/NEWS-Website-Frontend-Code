// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../Dash/Home.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./Home.css";
// import {
//   Box,
//   Input,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   Select,
// } from "@chakra-ui/react";

// function HomeDashboard() {
//   // const [title, setTitle] = useState("");
//   // const [quillDescription, setQuillDescription] = useState("");
//   // const [category, setCategory] = useState("");
//   // const [photo, setPhoto] = useState(null);
//   // const [active, setActive] = useState("");
//   // const [seotitle, Setseotitle] = useState("");
//   // const [seodescription, Setseodescription] = useState("");

//   // const [selectedCategories, setSelectedCategories] = useState([]);
//   // // const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   // const [availableCategories, setAvailableCategories] = useState([]);

//   // const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   // const [availableSubcategories, setAvailableSubcategories] = useState([]);

//   const [title, setTitle] = useState("");
//   const [quillDescription, setQuillDescription] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [photo, setPhoto] = useState(null);
//   const [active, setActive] = useState("");
//   const [seotitle, Setseotitle] = useState("");
//   const [seodescription, Setseodescription] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

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

//   // const handleCategoryChange = (e) => {
//   //   const selectedCategory = e.target.value;
//   //   setSelectedCategories(e.target.selectedOptions);
//   // };
//   const handleCategoryChange = (e) => {
//     const selectedCategoryName = e.target.value;

//     // Find the category object based on the selected category name
//     const selectedCategoryObject = availableCategories.find(
//       (category) => category.name === selectedCategoryName
//     );

//     setCategory(selectedCategoryName);
//     setSelectedCategory(selectedCategoryObject); // Set the selectedCategory
//     setSelectedSubcategories([]); // Clear selected subcategories
//   };

//   const handleSubcategoryChange = (e) => {
//     const selectedSubcategory = e.target.value;
//     setSelectedSubcategories(e.target.selectedOptions);
//   };

//   // Function to fetch subcategories based on the selected parent category
//   const fetchSubcategories = (parentCategory) => {
//     // Find the category object based on the selected parent category
//     const selectedCategoryObject = availableCategories.find(
//       (category) => category.name === parentCategory
//     );

//     if (selectedCategoryObject) {
//       const subcategoryNames = selectedCategoryObject.subcategory;
//       setAvailableSubcategories(subcategoryNames);
//     }
//   };

//   // Handle the change of the parent category and fetch related subcategories
//   const handleParentCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setCategory(selectedCategory);
//     setSelectedSubcategories([]); // Clear selected subcategories
//     fetchSubcategories(selectedCategory);
//   };

//   // const handleSubcategoryChange = (e) => {
//   //   const value = e.target.value;
//   //   if (e.target.checked) {
//   //     setSelectedSubcategories([...selectedSubcategories, value]);
//   //   } else {
//   //     setSelectedSubcategories(
//   //       selectedSubcategories.filter((subcat) => subcat !== value)
//   //     );
//   //   }
//   // };

//   // useEffect(() => {
//   //   axios
//   //     .get("https://news-b4c3.onrender.com/api/article/category/get")
//   //     .then((response) => {
//   //       const categoryNames = response.data.map((category) => category.name);
//   //       setAvailableCategories(categoryNames);
//   //       console.log(response);
//   //       const subcategoryNames = response.data.map(
//   //         (category) => category.subcategory
//   //       );
//   //       setSelectedSubcategories(subcategoryNames);
//   //       console.log(subcategoryNames);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching categories:", error);
//   //     });
//   // }, []); // The empty dependency array ensures this effect runs only once

//   // useEffect(() => {
//   //   axios
//   //     .get("https://news-b4c3.onrender.com/api/article/category/get")
//   //     .then((response) => {
//   //       const categories = response.data;

//   //       // Extract category names
//   //       const categoryNames = categories.map((category) => category.name);
//   //       setAvailableCategories(categoryNames);

//   //       // Extract subcategories based on the initially selected category (assuming "category" is the initial one)
//   //       const initialSelectedCategory = categoryNames[0];
//   //       const initialCategory = categories.find(
//   //         (category) => category.name === initialSelectedCategory
//   //       );

//   //       if (initialCategory) {
//   //         const subcategoryNames = initialCategory.subcategory;
//   //         setAvailableSubcategories(subcategoryNames);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching categories:", error);
//   //     });
//   // }, []);

//   const handleInputChange = (e, field) => {
//     if (field === "title") setTitle(e.target.value);
//     if (field === "description") setQuillDescription(e);
//     if (field === "category") setCategory(e.target.value);
//     if (field === "status") setActive(e.target.value);
//     if (field === "seotitle") Setseotitle(e.target.value);
//     if (field === "seodescription") Setseodescription(e.target.value);
//   };

//   const handlePhotoChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const uploadBlogData = async (blogData) => {
//     try {
//       // Join selectedCategories and selectedSubcategories as comma-separated strings
//       blogData.category = selectedCategories.join(",");
//       blogData.subcategory = selectedSubcategories.join(",");

//       const response = await axios.post(
//         "https://news-b4c3.onrender.com/api/article",
//         blogData
//       );
//       console.log("Blog uploaded:", response.data);
//     } catch (error) {
//       console.error("Error uploading blog:", error);
//     }
//     const clearForm = () => {
//       setTitle("");
//       setQuillDescription("");
//       setCategory("");
//       setPhoto(null);
//       setActive("");
//       Setseotitle("");
//       Setseodescription("");
//     };
//     clearForm();
//   };

//   const uploadImage = async () => {
//     if (!photo) {
//       alert("Please select an image to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", photo);
//     formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dmlflkbrx/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Image uploaded:", response.data);
//       const secureUrl = response.data.secure_url;
//       uploadBlogData({
//         title,
//         description: quillDescription,
//         category,
//         photo: secureUrl,
//         status: active,
//         seotitle,
//         seodescription,
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       console.log("Response data:", error.response.data);
//     }
//   };

//   // const handleCategoryChange = (e) => {
//   //   const value = e.target.value;
//   //   if (e.target.checked) {
//   //     setSelectedCategories([...selectedCategories, value]);
//   //   } else {
//   //     setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
//   //   }
//   // };

//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline", "strike"],
//       [{ align: [] }],
//       [{ color: [] }, { background: [] }],
//       ["link"],
//       ["image"],
//       ["clean"],
//     ],
//   };

//   return (
//     <div className="form-container">
//       <div className="form-content">
//         <h2>Upload an Article</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="title">Blog Title</label>
//             <input
//               type="text"
//               id="title"
//               placeholder="Blog Title"
//               className="input-field"
//               value={title}
//               onChange={(e) => handleInputChange(e, "title")}
//             />
//           </div>

//           <div className="form-group">
//             <label className="desc" htmlFor="quillDescription">
//               Blog Description
//             </label>
//             <ReactQuill
//               className="quill"
//               value={quillDescription}
//               onChange={setQuillDescription}
//               modules={modules}
//               id="quillDescription"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="category">Categories</label>
//             <select
//               id="category"
//               onChange={handleCategoryChange}
//               className="input-field"
//               multiple
//             >
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat.name}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="subcategory">Subcategories</label>
//             <select
//               id="subcategory"
//               onChange={handleSubcategoryChange}
//               className="input-field"
//               multiple
//             >
//               {selectedCategory &&
//                 selectedCategory.subcategory.map((subcat) => (
//                   <option key={subcat} value={subcat}>
//                     {subcat}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="seotitle">SEO Title</label>
//             <input
//               type="text"
//               id="seotitle"
//               placeholder="SEO Title"
//               className="input-field"
//               value={seotitle}
//               onChange={(e) => handleInputChange(e, "seotitle")}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="seodescription">SEO Description</label>
//             <input
//               type="text"
//               id="seodescription"
//               placeholder="SEO Description"
//               className="input-field"
//               value={seodescription}
//               onChange={(e) => handleInputChange(e, "seodescription")}
//             />
//           </div>
//           <div className="radio-container">
//             <label>Status:</label>
//             <div className="radio-group">
//               <input
//                 type="radio"
//                 id="published"
//                 name="status"
//                 value="published"
//                 checked={active === "published"}
//                 onChange={(e) => handleInputChange(e, "status")}
//                 className="radio-input"
//               />
//               <label htmlFor="published" className="radio-labels">
//                 Published
//               </label>
//             </div>

//             <div className="radio-group">
//               <input
//                 type="radio"
//                 id="draft"
//                 name="status"
//                 value="draft"
//                 checked={active === "draft"}
//                 onChange={(e) => handleInputChange(e, "status")}
//                 className="radio-input"
//               />
//               <label htmlFor="draft" className="radio-labels">
//                 Draft
//               </label>
//             </div>

//             <div className="radio-group">
//               <input
//                 type="radio"
//                 id="archived"
//                 name="status"
//                 value="archived"
//                 checked={active === "archived"}
//                 onChange={(e) => handleInputChange(e, "status")}
//                 className="radio-input"
//               />
//               <label htmlFor="archived" className="radio-labels">
//                 Archived
//               </label>
//             </div>
//           </div>
//         </form>
//         <h2>Upload Image</h2>
//         <input
//           type="file"
//           accept="image/*"
//           className="file-input"
//           onChange={handlePhotoChange}
//         />
//         <button onClick={uploadImage} className="button">
//           Upload Article
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HomeDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Dash/Home.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Dash/Home.css";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Select,
} from "@chakra-ui/react";

function HomeDashboard() {
  const [title, setTitle] = useState("");
  const [quillDescription, setQuillDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [active, setActive] = useState("");
  const [seotitle, Setseotitle] = useState("");
  const [seodescription, Setseodescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;

    // Find the category object based on the selected category name
    const selectedCategoryObject = categories.find(
      (category) => category.name === selectedCategoryName
    );

    setSelectedCategory(selectedCategoryObject); // Set the selectedCategory
    setSelectedSubcategories([]); // Clear selected subcategories
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSubcategories(selectedSubcategoryValues);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadBlogData = async (blogData) => {
    try {
      const response = await axios.post(
        "https://news-b4c3.onrender.com/api/article",
        blogData
      );
      console.log("Blog uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading blog:", error);
    }
    const clearForm = () => {
      setTitle("");
      setQuillDescription("");
      setSelectedCategory(null);
      setPhoto(null);
      setActive("");
      Setseotitle("");
      Setseodescription("");
    };
    clearForm();
  };

  const uploadImage = async () => {
    if (!photo) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmlflkbrx/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded:", response.data);
      const secureUrl = response.data.secure_url;
      uploadBlogData({
        title,
        description: quillDescription,
        category: selectedCategory ? selectedCategory.name : "",
        photo: secureUrl,
        status: active,
        seotitle,
        seodescription,
        subcategory: selectedSubcategories.join(","),
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Response data:", error.response.data);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["image"],
      ["clean"],
    ],
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Upload an Article</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              placeholder="Blog Title"
              className="input-field"
              value={title}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>

          <div className="form-group">
            <label className="desc" htmlFor="quillDescription">
              Blog Description
            </label>
            <ReactQuill
              className="quill"
              value={quillDescription}
              onChange={setQuillDescription}
              modules={modules}
              id="quillDescription"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categories</label>
            <select
              id="category"
              onChange={handleCategoryChange}
              className="input-field"
              multiple
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subcategory">Subcategories</label>
            <select
              id="subcategory"
              onChange={handleSubcategoryChange}
              className="input-field"
              multiple
            >
              {selectedCategory &&
                selectedCategory.subcategory.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="seotitle">SEO Title</label>
            <input
              type="text"
              id="seotitle"
              placeholder="SEO Title"
              className="input-field"
              value={seotitle}
              onChange={(e) => handleInputChange(e, "seotitle")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seodescription">SEO Description</label>
            <input
              type="text"
              id="seodescription"
              placeholder="SEO Description"
              className="input-field"
              value={seodescription}
              onChange={(e) => handleInputChange(e, "seodescription")}
            />
          </div>
          <div className="radio-container">
            <label>Status:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="published"
                name="status"
                value="published"
                checked={active === "published"}
                onChange={(e) => handleInputChange(e, "status")}
                className="radio-input"
              />
              <label htmlFor="published" className="radio-labels">
                Published
              </label>
            </div>

            <div className="radio-group">
              <input
                type="radio"
                id="draft"
                name="status"
                value="draft"
                checked={active === "draft"}
                onChange={(e) => handleInputChange(e, "status")}
                className="radio-input"
              />
              <label htmlFor="draft" className="radio-labels">
                Draft
              </label>
            </div>

            <div className="radio-group">
              <input
                type="radio"
                id="archived"
                name="status"
                value="archived"
                checked={active === "archived"}
                onChange={(e) => handleInputChange(e, "status")}
                className="radio-input"
              />
              <label htmlFor="archived" className="radio-labels">
                Archived
              </label>
            </div>
          </div>
        </form>
        <h2>Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handlePhotoChange}
        />
        <button onClick={uploadImage} className="button">
          Upload Article
        </button>
      </div>
    </div>
  );
}

export default HomeDashboard;
