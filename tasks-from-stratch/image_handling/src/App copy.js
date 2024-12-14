import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to set the right content type
        },
      });
      setUploadedImages((prev) => [...prev, response.data.imageName]);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // Fetch all images from the database when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setAllImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div>
        {uploadedImages.map((image, index) => (
          <div key={index}>
            <p>{image}</p>
            <img
              src={`http://localhost:5000/${image}`}
              alt={image}
              width="100"
              height="100"
            />
          </div>
        ))}
      </div>

      <h2>All Uploaded Images</h2>
      <div>
        {allImages.map((image, index) => (
          <div key={index}>
            <p>{image.image_name}</p>
            <img
              src={`http://localhost:5000/${image.image_name}`}
              alt={image.image_name}
              width="100"
              height="100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
