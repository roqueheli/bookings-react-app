import React, { useEffect } from "react";
import { Form, Row, Col } from 'react-bootstrap';
import useFetch from "../../../hooks/useFetch";

const CategoriesSelect = ({ selectedCategory, handleCategoryChange }) => {
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/categories/all`, "GET");
  }, []);

  return (
    <>
      <h3 className="mt-4">Categoría</h3>
      <Form.Group as={Row} controlId="formCategoryId">
        <Form.Label column sm="2">
          Categoría
        </Form.Label>
        <Col sm="10">
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}>
            <option>Seleccione una categoría</option>
            {data?.map((category) => (
              <option key={category?.category_id} value={category?.category_id}>
                {category?.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
    </>
  );
};

export default CategoriesSelect;
