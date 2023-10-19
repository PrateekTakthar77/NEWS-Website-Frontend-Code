import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Dash/Home.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Article.css";

function HomeDashboard() {
  const [title, setTitle] = useState("");
  const [quillDescription, setQuillDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [active, setActive] = useState("");
  const [seotitle, Setseotitle] = useState("");
  const [seodescription, Setseodescription] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
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

  const handleInputChange = (e, field) => {
    if (field === "title") setTitle(e.target.value);
    if (field === "description") setQuillDescription(e);
    if (field === "category") setCategory(e.target.value);
    if (field === "status") setActive(e.target.value);
    if (field === "seotitle") Setseotitle(e.target.value);
    if (field === "seodescription") Setseodescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadBlogData = async (blogData) => {
    try {
      // Join selectedCategories and selectedSubcategories as comma-separated strings
      blogData.category = selectedCategories.join(",");
      blogData.subcategory = selectedSubcategories.join(",");

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
      setCategory("");
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
        category,
        photo: secureUrl,
        status: active,
        seotitle,
        seodescription,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Response data:", error.response.data);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    }
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedSubcategories([...selectedSubcategories, value]);
    } else {
      setSelectedSubcategories(
        selectedSubcategories.filter((subcat) => subcat !== value)
      );
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
    // <div className="form-container">
    //   <div className="form-container">
    //     <h2>Upload a Article</h2>
    //     <form>
    //       <label for="title">Blog Title</label>
    //       <input
    //         type="text"
    //         placeholder="Blog Title"
    //         className="input-field"
    //         value={title}
    //         onChange={(e) => handleInputChange(e, "title")}
    //       />
    //       <label style={{ padding: "10px" }} for="quillDescription">
    //         Blog Description
    //       </label>
    //       <ReactQuill
    //         value={quillDescription}
    //         onChange={setQuillDescription}
    //         modules={modules}
    //       />
    //       <div className="category-container">
    //         {Array.isArray(availableCategories) &&
    //           availableCategories.map((cat) => (
    //             <label key={cat}>
    //               <input
    //                 type="checkbox"
    //                 value={cat}
    //                 checked={selectedCategories.includes(cat)}
    //                 onChange={handleCategoryChange}
    //               />
    //               {cat}
    //             </label>
    //           ))}
    //       </div>

    //       <div className="subcategory-container">
    //         {Array.isArray(availableSubCategories) &&
    //           availableSubCategories.map((subcat) => (
    //             <label key={subcat}>
    //               <input
    //                 type="checkbox"
    //                 value={subcat}
    //                 checked={selectedSubcategories.includes(subcat)}
    //                 onChange={handleSubcategoryChange}
    //               />
    //               {subcat}
    //             </label>
    //           ))}
    //       </div>

    //       <div className="radio-container">
    //         <input
    //           type="radio"
    //           id="published"
    //           name="status"
    //           value="published"
    //           checked={active === "published"}
    //           onChange={(e) => handleInputChange(e, "status")}
    //           className="radio-input"
    //         />
    //         <label htmlFor="published" className="radio-label">
    //           Published
    //         </label>

    //         <input
    //           type="radio"
    //           id="draft"
    //           name="status"
    //           value="draft"
    //           checked={active === "draft"}
    //           onChange={(e) => handleInputChange(e, "status")}
    //           className="radio-input"
    //         />
    //         <label htmlFor="draft" className="radio-label">
    //           Draft
    //         </label>

    //         <input
    //           type="radio"
    //           id="archived"
    //           name="status"
    //           value="archived"
    //           checked={active === "archived"}
    //           onChange={(e) => handleInputChange(e, "status")}
    //           className="radio-input"
    //         />
    //         <label htmlFor="archived" className="radio-label">
    //           Archived
    //         </label>
    //       </div>
    //       <input
    //         type="text"
    //         placeholder="SEO title"
    //         className="input-field"
    //         value={seotitle}
    //         onChange={(e) => handleInputChange(e, "seotitle")}
    //       />
    //       <input
    //         type="text"
    //         placeholder="SEO Description"
    //         className="input-field"
    //         value={seodescription}
    //         onChange={(e) => handleInputChange(e, "seodescription")}
    //       />
    //     </form>

    //     <h2>Upload Image</h2>
    //     <input
    //       type="file"
    //       accept="image/*"
    //       className="file-input"
    //       onChange={handlePhotoChange}
    //     />
    //     <button onClick={uploadImage} className="button">
    //       Upload Article
    //     </button>
    //   </div>
    // </div>
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

          <div className="category-container">
            <label>Categories:</label>
            {Array.isArray(availableCategories) &&
              availableCategories.map((cat) => (
                <div key={cat} className="checkbox-group">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={handleCategoryChange}
                  />
                  <label>{cat}</label>
                </div>
              ))}
          </div>

          <div className="subcategory-container">
            <label>Subcategories:</label>
            {Array.isArray(availableSubCategories) &&
              availableSubCategories.map((subcat) => (
                <div key={subcat} className="checkbox-group">
                  <input
                    type="checkbox"
                    value={subcat}
                    checked={selectedSubcategories.includes(subcat)}
                    onChange={handleSubcategoryChange}
                  />
                  <label>{subcat}</label>
                </div>
              ))}
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
