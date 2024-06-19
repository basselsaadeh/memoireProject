import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      if (!contract) {
        console.error("Contract is not available");
        return;
      }

      try {
        // Create a filter for the NewMemo event
        const filter = contract.filters.NewMemo();

        // Fetch all past events matching the filter
        const events = await contract.queryFilter(filter);

        console.log(events);

        // Parse memos array into readable format
        const parsedMemos = events.map((event) => ({
          name: event.args.name,
          message: event.args.message,
          timestamp: event.args.timestamp.toNumber(),
          from: event.args.from,
        }));

        setMemos(parsedMemos);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    fetchMemos();
  }, [contract]);

  return (
    <>
      {memos.map((memo, index) => (
        <div key={index}>
          <p>Name: {memo.name}</p>
          <p>Message: {memo.message}</p>
          <p>Date: {new Date(memo.timestamp * 1000).toLocaleDateString()}</p>
          <p>From: {memo.from}</p>
        </div>
      ))}
    </>
  );
};

Memos.propTypes = {
  state: PropTypes.shape({
    contract: PropTypes.object,
  }).isRequired,
};

export default Memos;
