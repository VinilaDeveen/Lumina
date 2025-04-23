import React, { useState } from "react";
import ChatBox from '../../components/Main/ChatBox';
import Footer from '../../components/Main/Footer';
import "../../styles/FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
        question: "Why is blood donation important?",
        answer:
          "Blood donation helps save lives by providing essential blood to patients in need. It is used in surgeries, accident recovery, and for patients with chronic illnesses or blood disorders.",
      },
      {
        question: "What safety measures are in place for donors?",
        answer:
          "All donation equipment is sterile and used only once to ensure your safety. Additionally, the donation process is supervised by trained professionals to ensure a safe experience.",
      },
      {
        question: "How long does the blood donation process take?",
        answer:
          "The entire process typically takes around 30-45 minutes, including registration, a quick health check, the donation itself, and refreshments afterward.",
      },
      {
        question: "Can I donate blood if I have a medical condition?",
        answer:
          "Certain medical conditions may restrict you from donating blood. We recommend using our eligibility checklist or consulting a medical professional before donating.",
      },
      {
        question: "How often can I donate blood?",
        answer:
          "You can donate whole blood every 56 days (8 weeks) or as advised by your healthcare provider based on the type of donation and your overall health.",
      },
      {
        question: "Is it safe to donate blood during pregnancy?",
        answer:
          "No, pregnant individuals are not eligible to donate blood. However, you can resume donating blood once cleared by your doctor postpartum.",
      },
      {
        question: "What should I eat before and after donating blood?",
        answer:
          "Before donating, eat a nutritious meal and stay hydrated. After donating, have a light snack and drink plenty of fluids to replenish your energy levels.",
      },
      {
        question: "Will I feel weak after donating blood?",
        answer:
          "Most donors feel fine after donating blood. However, some may feel lightheaded. Resting for a few minutes, staying hydrated, and eating well will help you recover quickly.",
      },
      {
        question: "How can I become a regular donor?",
        answer:
          "You can schedule regular donations through the 'Schedule Donation' section in our app and enable reminders to keep track of your donation schedule.",
      },
      {
        question: "What should I do if I feel unwell after donating blood?",
        answer:
          "If you feel unwell after donating, rest, stay hydrated, and avoid strenuous activities. If symptoms persist, contact a healthcare professional immediately.",
      },
      {
        question: "Can I donate blood if I have traveled recently?",
        answer:
          "Traveling to certain regions might require you to wait for a specific period before donating blood. This ensures the safety of both donors and recipients.",
      },
      {
        question: "What types of blood donations can I make?",
        answer:
          "You can donate whole blood, platelets, plasma, or double red cells. Each type serves different medical needs and can be discussed during your donation appointment.",
      },
      {
        question: "Does blood donation affect my physical performance?",
        answer:
          "You may need to avoid heavy physical activity for 24 hours after donating blood. This precaution helps prevent dizziness or fatigue during recovery.",
      },
      {
        question: "How is my personal information protected?",
        answer:
          "Your personal information is securely stored and handled per privacy laws to ensure confidentiality. It is only used for the purposes of the donation system.",
      },
  ];      

  return (
    <div className="faq-container">
     <div className="tophelp">
        <h1>HELP</h1>
        <p>Here, you'll find answers to frequently asked questions , step-by step guides, and support to help you navigate and make the most of our blood donation platform.  </p>
      </div>
      <div className="faq-list">
        <h3>FAQ</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
      <ChatBox/>
      <Footer/>
    </div>
  );
};

export default FAQ;
