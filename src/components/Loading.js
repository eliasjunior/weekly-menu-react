import React from "react";
import { useSelector } from "react-redux";
import "./loading.css";

export default function() {
  const isLoading = useSelector(state => state.loading.isLoading);

  if (!isLoading) {
    return "";
  }

  return (
    <div className="centered">
      <h1>Loading...</h1>
    </div>
  );
}
