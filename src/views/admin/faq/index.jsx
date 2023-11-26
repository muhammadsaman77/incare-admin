import FaqTable from "./components/FaqTable";
import AddModal from "./components/AddModal";
import { useDisclosure } from "@chakra-ui/hooks";
import UpdateModal from "./components/UpdateModal";
import { useState } from "react";

export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateMethod = useDisclosure();
  const [dataUpdate, setDataUpdate] = useState({
    id: "",
    question: "",
    answer: "",
  });
  const onOpenUpdate = (id, question, answer) => {
    setDataUpdate({
      id,
      question,
      answer,
    });
    updateMethod.onOpen();
  };

  return (
    <>
      <div>
        <FaqTable onOpen={onOpen} onOpenUpdate={onOpenUpdate} />
        <UpdateModal
          id={dataUpdate.id}
          question={dataUpdate.question}
          answer={dataUpdate.answer}
          isOpen={updateMethod.isOpen}
          onClose={updateMethod.onClose}
        />
        <AddModal isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
}
