import React, { useState } from "react";
import writeIcon from "../assets/write.png";
import { Button, Modal } from "antd";

const PopupModel = ({ Element }: any) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <img
        alt="create a tweet"
        src={writeIcon}
        onClick={showModal}
        className="fixed bottom-28 right-16 opacity-60 cursor-pointer h-16 w-16 rounded-full object-contain shadow-2xl border-sky-300 border-2"
      />
      <Modal
        title="New Tweet"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Element handleOk={handleOk} onCancel={handleCancel}/>
      </Modal>
    </>
  );
};

export default PopupModel;
