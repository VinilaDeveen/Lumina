import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [subject, setSubject] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleCheckboxChange = () => {
    setIsAnonymous(!isAnonymous);
    if (isAnonymous) {
      console.log('IS ANONYMOUS');
    } else {
      console.log('IS NOT ANONYMOUS');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the email data
    const formData = {
      from_name: isAnonymous ? 'Anonymous User' : `${firstName} ${lastName}`,
      subject: subject,
      enquiry: enquiry,

      user_email: isAnonymous ? 'anonymous@domain.com' : email,
      mobile_number: isAnonymous ? 'N/A' : mobile,
    };

    // Send email using EmailJS
    emailjs
      .send('service_ouyvax9', 'template_ehqs81k', formData, {
        publicKey: 'CbuhA-TdHOjLPH57K',
      })
      .then(
        () => {
          console.log('Email Sent Successfully!');
          alert('Your enquiry has been submitted successfully.');
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          alert('Failed to send your enquiry. Please try again.');
        }
      );
  };

  return (
    <main className="form-main">
      <div className="top">
        <h1 className="removeH1CSS">Submit a Suggestion to our Support Team</h1>
        <p style={{ color: 'white' }}>Our dedicated staff will respond within 48 hours.</p>
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="anonymous-checkbox"
          checked={isAnonymous}
          onChange={handleCheckboxChange}
          className="checkbox-input"
        />
        <label style={{ color: 'black' }} htmlFor="anonymous-checkbox" className="checkbox-label">
          Stay As An Anonymous User
        </label>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label contact-us">Subject</label>
          <input
            type="text"
            placeholder="Enter your subject"
            className="form-input contact-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label contact-us">Enquiry</label>
          <textarea
            placeholder="Enter your enquiry"
            className="form-textarea contact-input"
            value={enquiry}
            onChange={(e) => setEnquiry(e.target.value)}
            required
          ></textarea>
        </div>

        {!isAnonymous && (
          <>
            <div className="form-group">
              <label className="form-label contact-us">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="form-input contact-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label contact-us">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="form-input contact-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label contact-us">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-input contact-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label contact-us">Mobile No</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="form-input contact-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Contact;
