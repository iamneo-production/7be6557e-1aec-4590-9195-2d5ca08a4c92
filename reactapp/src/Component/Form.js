import React, { useState } from 'react';

const Form = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Predefined list of skills
  const skillsList = ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js'];

  // Function to handle input change
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    // Filter the skills list based on the input value
    const filteredSuggestions = skillsList.filter((skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  // Function to handle item selection from suggestions
  const handleSelect = (value) => {
    setValue(value);
  };

  return (
    <form>
      <label htmlFor="skill">Skill:</label>
      <input type="text" id="skill" value={value} onChange={handleChange} />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((skill, index) => (
            <li key={index} onClick={() => handleSelect(skill)}>
              {skill}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
