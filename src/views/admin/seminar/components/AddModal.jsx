import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import axios from "axios";
import Card from "components/card";

import { useState } from "react";
const AddModal = ({ isOpen, onClose }) => {
  const [value, setValue] = useState({
    name: "",
    schedule: "",
  });
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("pamflet", file);
      formData.append("name", value.name);
      formData.append("schedule", value.schedule);
      const response = await axios.post(
        "http://127.0.0.1:3000/seminars",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
    setValue({
      name: "",
      schedule: "",
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[15vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <h1 className="mb-[5px] text-2xl font-bold">Add New Seminar</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-[10px]">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="mt-2 h-12 w-full rounded-xl border bg-white/0 p-3 text-sm outline-none "
                    placeholder="Type here..."
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="schedule"
                    className="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Schedule
                  </label>
                  <input
                    className="mt-2 h-12 w-full rounded-xl border bg-white/0 p-3 text-sm outline-none "
                    placeholder="Type Here..."
                    name="schedule"
                    type="datetime-local"
                    value={value.schedule}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="pamflet"
                    className="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Pamflet
                  </label>
                  <input
                    className="mt-2 h-12 w-full rounded-xl border bg-white/0 p-3 text-sm outline-none "
                    placeholder="Type Here..."
                    name="pamflet"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    type="button"
                    className="linear rounded-xl border-2 border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="linear rounded-xl bg-gray-100 px-4  py-2 text-sm font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddModal;
