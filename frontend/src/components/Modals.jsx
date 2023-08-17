import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modals({
  open,
  handleOpen,
  handleClose,
  deleteUser,
  userId,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="text-center font-bold"
            id="modal-modal-title"
            variant="h6"
            component="h1"
          >
            Are you sure ?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 6 }}
            className="flex w-full justify-around items-center"
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteUser(userId);
                handleClose();
               
              }}
            >
              Delete
            </Button>
            <Button onClick={handleClose} variant="contained" color="primary">
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
