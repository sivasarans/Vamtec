import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [allImages, setAllImages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image1", file);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchImages(); // Re-fetch images after upload
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setAllImages(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

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
