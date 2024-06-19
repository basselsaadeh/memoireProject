import React, { useState } from "react";
import { ethers } from "ethers";

import styles from "./Buy.module.css";

const Buy = ({ state }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const buyCoffee = async (event) => {
    event.preventDefault();
    const { contract } = state;

    if (!contract) {
      console.error("Contract is not set up correctly.");
      return;
    }

    try {
      const name = event.target.elements.name.value;
      const message = event.target.elements.message.value;

      //   const amount = { value: ethers.utils.parseEther("0.001") };

      setIsProcessing(true);
      const transaction = await contract.buyCoffee(name, message);

      await transaction.wait();

      console.log("Transaction successful");
      alert("Transaction successfull");
    } catch (error) {
      console.error("Error buying coffee:", error);

      if (error.message.includes("insufficient funds")) {
        setErrorMessage(
          "Insufficient funds. Please ensure you have enough ETH in your account."
        );
      } else {
        setErrorMessage("Error buying coffee. Please try again later.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={buyCoffee}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="message">Message:</label>
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Your message"
            required
          />
        </div>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
      {errorMessage && (
        <p className={styles["error-message"]}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Buy;
