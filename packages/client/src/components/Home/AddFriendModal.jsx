import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  ModalCloseButton,
  Heading,
} from "@chakra-ui/react";

import { Form, Formik } from "formik";
import React, { useCallback, useContext, useState } from "react";
import TextField from "../TextField";
import { friendSchema } from "@hyper/common";
import socket from "../../socket";
import { FriendContext } from "./Home";

const AddFriendModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const closeModal = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);
  const { setFriendList } = useContext(FriendContext);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => {
            socket.emit(
              "add_friend",
              values.friendName,
              ({ errorMsg, done, newFriend }) => {
                if (done) {
                  setFriendList(c => [newFriend, ...c]);
                  closeModal();
                  return;
                }
                setError(errorMsg);
              }
            );
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <Heading fontSize="l" color="red.500" textAlign="center">
                {error}
              </Heading>
              <TextField
                label="Friend's name"
                placeholder="Enter a friend's username"
                autoComplete="off"
                name="friendName"
              ></TextField>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Add Friend
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
