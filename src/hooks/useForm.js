import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../configuration/firebaseConfig.js";

const useForm = (initialValues = {}) => {
  const [place, setPlace] = useState(initialValues);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRRSS, setSelectedRRSS] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [progress, setProgress] = useState(0);
  
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
      images: [...prevPlace.images, { img_url: "" }],
    }));
  };

  const addRRSSField = () => {
    setPlace((prevPlace) => ({
      ...prevPlace,
      rrss: [...prevPlace.placesRRSSs, { rrss: { rrssId: '' }, rrssUrl: ''}],
    }));
  };

  const handleRoomChange = (e, index) => {
    const { name, value } = e.target;
    const newRooms = [...place.rooms];
    newRooms[index][name] = value;
    setPlace({ ...place, rooms: newRooms });
  };

  const handleRRSSChange = (e, index) => {
    const { name, value } = e.target;
    const newRRSS = [...place.placesRRSSs];
    newRRSS[index][name === 'rrssId' ? 'rrss' : name] = name === 'rrssId' ? { rrssId: value } : value;
    setPlace({ ...place, placesRRSSs: newRRSS });
    setSelectedRRSS(value);
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

    setSelectedServices(
      selectedServices.map((service) => service.service.service_id)
    );
  };

  const addRoomField = () => {
    setPlace({ ...place, rooms: [...place.rooms, { name: "", capacity: "" }] });
  };

  const handleImageUpload = (e, index) => {
    if (!e.target.files[0]) return;

    // Crea una referencia al almacenamiento de Firebase
    const storageRef = ref(storage, `images/${e.target.files[0].name}`);

    // Sube el archivo
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    // Monitorea el progreso de la subida
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress); // Actualiza el progreso
      },
      (error) => {
        console.error("Error al subir la imagen:", error);
      },
      () => {
        // Obtiene la URL de descarga cuando la subida es exitosa
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleImageChange(
            { target: { name: "img_url", value: downloadURL } },
            index
          );
        });
      }
    );
  };

  const resetForm = () => {
    setPlace(initialValues);
    setSelectedServices([]);
    setSelectedCategory("");
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
    addRRSSField,
    handleRRSSChange,
    handleImageUpload,
    progress,
    selectedRRSS
  };
};

export default useForm;
