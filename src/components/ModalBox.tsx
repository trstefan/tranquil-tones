import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CirclePlus } from "lucide-react";

export const ModalBox = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-[3rem_5rem] flex justify-center items-center ">
      <Button
        className="flex flex-col gap-2 text-black font-bold"
        onClick={handleOpen}
      >
        <CirclePlus />
        Contribute
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white rounded-lg p-8">
          <div>
            <h1 className="text-2xl font-bold text-center mb-4">Contribute</h1>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">
              There are lots (and we mean lots!) of relaxing sounds in the
              world. We’ll add as many as we can and we encourage you to
              contribute too.
            </p>
            <p className="text-lg font-semibold mb-2">
              A few ways you can help make the site more awesome:
            </p>
            <ul className="list-disc px-8">
              <li className="mb-2">
                <p className="text-lg font-medium	">
                  Send an email to{" "}
                  <span className="italic">lorem@lorem.com</span>
                </p>
              </li>
              <li className="mb-2">
                <p className="text-lg font-medium	">
                  Contribute code and/or content to Sleep Serenade via GitHub.
                </p>
              </li>
              <li className="mb-2">
                <p className="text-lg font-medium">
                  Like this project? Give it a star.
                </p>
              </li>
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
};