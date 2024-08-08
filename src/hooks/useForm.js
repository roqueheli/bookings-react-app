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

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const newImages = [...place.images];
    newImages[index][name] = value;
    setPlace({ ...place, images: newImages });
  };

  const handleRoomChange = (e, index) => {
    const { name, value } = e.target;
    const newRooms = [...place.rooms];
    newRooms[index][name] = value;
    setPlace({ ...place, rooms: newRooms });
  };

  const handleServiceChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedServices(selectedOptions);
  };

  const addImageField = () => {
    setPlace({ ...place, images: [...place.images, { img_url: "" }] });
  };

  const addRoomField = () => {
    setPlace({ ...place, rooms: [...place.rooms, { name: "", capacity: "" }] });
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
    selectedCategory,
    setSelectedCategory
  };
};

export default useForm;
