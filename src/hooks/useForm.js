import { useState } from "react";

const useForm = (initialValues = {}) => {
  const [place, setPlace] = useState(initialValues);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlace({ ...place, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPlace({
      ...place,
      address: { ...place.address, [name]: value },
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setPlace({
      ...place,
      category: {
        category_id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
    setSelectedCategory(e.target.value);
  };

  const handleImageChange = (e, index) => {
    const newImages = [...place.images];
    newImages[index] = { ...newImages[index], img_url: e.target.value };
    setPlace((prevPlace) => ({ ...prevPlace, images: newImages }));
  };
  
  const addImageField = () => {
    setPlace((prevPlace) => ({
      ...prevPlace,
      images: [...prevPlace.images, { img_url: '' }],
    }));
  };

  const handleRoomChange = (e, index) => {
    const { name, value } = e.target;
    const newRooms = [...place.rooms];
    newRooms[index][name] = value;
    setPlace({ ...place, rooms: newRooms });
  };

  const handleServiceChange = (e) => {
    const selectedServices = Array.from(e.target.selectedOptions).map(
      (option) => ({
        service: {
          service_id: option.value, // Asumimos que el value es el service_id
          name: option.text, // Usamos el texto de la opción para el nombre del servicio
        },
      })
    );

    // Actualizamos el estado place con los servicios seleccionados
    setPlace({
      ...place,
      placeServices: selectedServices,
    });

    setSelectedServices(selectedServices.map((service) => service.service.service_id));
  };

  const addRoomField = () => {
    setPlace({ ...place, rooms: [...place.rooms, { name: "", capacity: "" }] });
  };

  const resetForm = () => {
    setPlace(initialValues);
    setSelectedServices([]);
    setSelectedCategory('');
  };

  return {
    ...place,
    handleChange,
    handleAddressChange,
    handleImageChange,
    handleRoomChange,
    handleServiceChange,
    addImageField,
    addRoomField,
    selectedServices,
    handleCategoryChange,
    selectedCategory,
    resetForm,
  };
};

export default useForm;
