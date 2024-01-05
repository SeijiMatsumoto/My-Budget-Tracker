"use client"
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Switch,
  FormLabel,
  FormControl,
  Box,
} from '@chakra-ui/react'
import GoogleLogoutButton from '../Login/GoogleLogoutButton';
import { useAuth } from '@/contexts/AuthContext';

type Props = {
  open: boolean;
  onClose: () => void;
}

const UserModal = ({ open, onClose }: Props) => {
  const { user, showPhoto, setShowPhoto } = useAuth();

  return (
    <Modal isOpen={open} onClose={onClose} size='sm' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Settings</ModalHeader>
        <ModalBody>
          <FormControl display='flex' alignItems='center' mb={5}>
            <FormLabel htmlFor='profile-photo' mb='0'>
              Show profile photo
            </FormLabel>
            <Switch id='profile-photo' isChecked={showPhoto} onChange={() => setShowPhoto(!showPhoto)} />
          </FormControl>
          <Box onClick={onClose}>
            <GoogleLogoutButton />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserModal;