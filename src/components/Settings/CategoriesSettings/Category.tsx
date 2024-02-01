"use client"
import {
  Flex,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  Button,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from '@/styles/Settings/settings.module.scss'
import { useMyDataContext } from '@/contexts/DataContext'
import EmojiPicker from 'emoji-picker-react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { setDataInFirestore } from '@/data/useFirebase'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast';

type Props = {
  category: string;
  index: number;
  innerIndex: number;
}

const Category = ({ category, index, innerIndex }: Props) => {
  const { user } = useAuth();
  const toast = useToast()
  const { categoriesData, setCategoriesData } = useMyDataContext();
  const [categoryText, setCategoryText] = useState<string>(category);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef: any = React.useRef()

  const submitHandler = () => {
    const temp = categoriesData.slice();
    temp[index].data[innerIndex] = categoryText;
    setDataInFirestore(user, 'categories', setCategoriesData, temp, returnToast, toast)
  }

  const deleteHandler = () => {
    const temp = categoriesData.slice();
    const filtered = temp[index].data.filter((each: string) => each !== category);
    temp[index].data = filtered;
    setDataInFirestore(user, 'categories', setCategoriesData, temp, returnToast, toast)
  }

  return (
    <Flex key={category + index} className={styles.category} flexDir="row" justifyContent="space-between" alignItems="center">
      <Text>
        {category}
      </Text>
      <Flex>
        <Popover placement='left'>
          <PopoverTrigger>
            <Button size="xs" mr={2}>
              <EditIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Edit category</PopoverHeader>
            <PopoverBody>
              <FormControl onSubmit={submitHandler}>
                <Flex flexDir="row">
                  <Input value={categoryText} onChange={(e) => setCategoryText(e.target.value)} mr={3} />
                  <Button onClick={submitHandler} mr={1}>Save</Button>
                </Flex>
              </FormControl>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button size="xs" onClick={onOpen} colorScheme="red"><DeleteIcon /></Button>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{category}"? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => { onClose(); deleteHandler() }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}

export default Category