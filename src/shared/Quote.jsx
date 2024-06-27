import { useState } from "react";
import axios from "axios";
import "../styles/quote.css";
import Button from 'react-bootstrap/Button'

function Quote() {
  const [quote, setQuote] = useState("Press the button to get a random quote");
  const [loading, setLoading] = useState(false);

  const fetchAdvice = () => {
    setLoading(true);
    axios.get("https://api.adviceslip.com/advice")
      .then(result => {
        setQuote(result.data.slip.advice);
      })
      .catch(err => {
        console.error("Error fetching advice:", err);
        setQuote("Failed to fetch advice. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="quote">
      <h1>Advice</h1>
      <p>{loading ? "Loading..." : quote}</p>
      <Button variant="primary" onClick={fetchAdvice} disabled={loading}>
        {loading ? "Fetching..." : "Get Advice"}
      </Button>{' '}
    </div>
  );
}

export default Quote;
