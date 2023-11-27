import SeminarTable from "./components/SeminarTable";
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import { useState } from "react";

import { useDisclosure } from "@chakra-ui/hooks";

export default function Seminar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateMethod = useDisclosure();
  const [dataUpdate, setDataUpdate] = useState({
    id: "",
    name: "",
    schedule: "",
  });
  const onOpenUpdate = (id, name, schedule) => {
    setDataUpdate({
      id,
      name,
      schedule,
    });
    updateMethod.onOpen();
  };

  return (
    <>
      <div>
        <SeminarTable onOpen={onOpen} onOpenUpdate={onOpenUpdate} />
        <UpdateModal
          id={dataUpdate.id}
          name={dataUpdate.name}
          schedule={dataUpdate.schedule}
          isOpen={updateMethod.isOpen}
          onClose={updateMethod.onClose}
        />
        <AddModal isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
}
