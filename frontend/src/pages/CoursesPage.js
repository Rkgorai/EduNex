import React, { useState } from "react";
import axios from "axios";
const CoursesPage = () => {
  const [queryType, setQueryType] = useState("course_name");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: {
          queryType,
          searchTerm,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="courses-container">
      <h2>Find Courses</h2>
      <form onSubmit={handleSearch}>
        <select
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
        >
          <option value="course_name">Course Name</option>
          <option value="instructor">Instructor Name</option>
          <option value="rating">Rating</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Search Results</h3>
          <ul>
            {results.map((course, index) => (
              <li key={index}>
                <strong>{course.course_name}</strong> by {course.instructor},
                Rating: {course.rating}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
