import React, { useState } from 'react';
import './CustomForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faChevronRight, faUpload } from '@fortawesome/free-solid-svg-icons';

const questions = [
  {
    question: "What is the occasion for this jewellery?",
    note: "This helps us tailor our recommendations to match the significance and style suitable for the event.",
    options: ["Engagement", "Anniversary", "Birthday", "Daily-wear"],
    inputType: "select",
  },
  {
    question: "Is this a gift or a personal purchase?",
    note: "Understanding if the jewellery is for yourself or someone else helps us refine our suggestions based on typical gift preferences.",
    options: ["Gift", "Personal Purchase"],
    inputType: "radio",
  },
  {
    question: "Please select the gender.",
    note: "This allows us to recommend designs and styles that align with the typical preferences of the chosen gender.",
    options: ["Male", "Female", "Other"],
    inputType: "radio",
  },
  {
    question: "What is the age group of the wearer?",
    note: "Age can significantly influence jewellery style preferences, so this helps us make more suitable recommendations.",
    options: ["<18", "18-25", "26-35", "36-50", "51+"],
    inputType: "radio",
  },
  {
    question: "Do you have any religious considerations for this jewellery?",
    note: "Some religious beliefs might influence jewellery design choices, like specific symbols or restrictions.",
    options: ["Christianity", "Islam", "Hinduism", "None"],
    inputType: "select",
  },
  {
    question: "What type of jewellery are you interested in?",
    note: "This helps us narrow down the product category to provide more relevant recommendations.",
    options: ["Rings", "Necklaces", "Pendants", "Bracelets", "Earrings"],
    inputType: "select",
  },
  {
    question: "What is your budget for this jewellery?",
    note: "Knowing your budget helps us suggest options that fit within your financial constraints.",
    options: ["<$50", "$50-$100", "$100-$200", "$200+"],
    inputType: "radio",
  },
  {
    question: "Would you like to match your jewellery with an outfit?",
    note: "Uploading an image of your outfit can help us recommend jewellery that complements your attire perfectly.",
    options: ["Yes", "No"],
    inputType: "radio",
    additionalAction: "Upload an image of your outfit for better recommendations.",
  },
];

const CustomForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData({ ...formData, outfitImage: file });
  };

  return (
    <div className="custom-form">
      {!submitted ? (
        <div className={`question-container animate__animated ${step > 0 ? 'animate__fadeIn' : ''}`}>
          <h2>{questions[step].question}</h2>
          <span className="note-icon" title={questions[step].note}>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
          <div className="options">
            {questions[step].inputType === "select" ? (
              <select name={questions[step].question} onChange={handleChange}>
                {questions[step].options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              questions[step].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type={questions[step].inputType}
                    name={questions[step].question}
                    value={option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))
            )}
          </div>
          {questions[step].additionalAction && formData[questions[step].question] === "Yes" && (
            <div className="upload-preview">
              <label>
                <FontAwesomeIcon icon={faUpload} /> {questions[step].additionalAction}
                <input type="file" onChange={handleFileChange} />
              </label>
              {imagePreview && <img src={imagePreview} alt="Outfit Preview" style={{ marginTop: '20px', maxWidth: '100%' }} />}
            </div>
          )}
          <div className='button-container'>
          <button onClick={handleNext}>
            {step < questions.length - 1 ? 'Next' : 'Submit'} <FontAwesomeIcon icon={faChevronRight} />
          </button></div>
        </div>
      ) : (
        <div className="thank-you-message">
          <h2>Thank You!</h2>
          <p>Here are your responses:</p>
          <ul>
            {Object.entries(formData).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value.toString()}
              </li>
            ))}
          </ul>
          {imagePreview && (
            <div>
              <p>Outfit Image:</p>
              <img src={imagePreview} alt="Outfit Preview" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomForm;

