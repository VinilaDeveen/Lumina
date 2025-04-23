import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/BBM/BloodStatistics.css";

const BStatistics = ({ bloodDropStatistics }) => {
  console.log(bloodDropStatistics);

  const bloodTypes = bloodDropStatistics;

  const [fillType, setFillType] = useState("half");

  // Function to map blood type names
  const mapBloodType = (type) => {
    const mapping = {
      APOSITIVE: "A+",
      BPOSITIVE: "B+",
      ABPOSITIVE: "AB+",
      OPOSITIVE: "O+",
      ANEGATIVE: "A-",
      BNEGATIVE: "B-",
      ABNEGATIVE: "AB-",
      ONEGATIVE: "O-",
    };
    return mapping[type] || type; // Return original type if not found in mapping
  };

  return (
    <div style={{ marginTop: "-10px" }} className="blood-statistics">
      <div className="blood-drops">
        {bloodTypes.map((blood) => (
          <div key={blood.type} className="blood-drop-container">
            <span className="blood-type">{mapBloodType(blood.bloodType)}</span>
            <div className="blood-drop">
              <motion.div
                className="blood-fill"
                initial={{ height: 0 }}
                animate={{
                  height:
                    fillType === "full"
                      ? `${blood.bloodpercentage}%`
                      : `${blood.bloodpercentage}%`,
                }}
                transition={{ duration: 1.5 }}
              ></motion.div>
            </div>
            <span className="percentage">{blood.bloodpercentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BStatistics;
