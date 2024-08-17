import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import useFetch from "../../../hooks/useFetch";

const RRSSSelect = ({ selectedRRSS, handleRRSSChange }) => {
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/rrss/all`, "GET");
  }, []);

  return (
    <Form.Select value={selectedRRSS} name={'rrssId'} onChange={handleRRSSChange}>
      <option>Seleccione una red social</option>
      {data?.map((rrss) => (
        <option key={rrss?.rrssId} value={rrss?.rrssId}>
          {rrss?.rrssName}
        </option>
      ))}
    </Form.Select>
  );
};

export default RRSSSelect;
