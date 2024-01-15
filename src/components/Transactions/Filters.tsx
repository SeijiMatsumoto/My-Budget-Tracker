"use client";
import React from "react"
import DateRange from "./Filters/DateRange"
import {
  CardHeader,
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import Type from "./Filters/Type";
import Budget from "./Filters/Budget";
import Search from "./Filters/Search";
import SortButton from "./Filters/SortButton";
import { useMyDataContext } from "@/contexts/DataContext";
import { useMediaQuery } from "@chakra-ui/react"
import useIsMobile from "@/hooks/useIsMobile";

interface SortConfig {
  key: keyof Transaction | null;
  direction: "asc" | "desc";
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
}

interface Props {
  sortConfig: SortConfig;
  setSortConfig: Function;
}

const Filters = ({ sortConfig, setSortConfig }: Props) => {
  const { handleSort } = useMyDataContext();
  const [isLargerThan1380] = useMediaQuery("(min-width: 1380px)")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useIsMobile();

  return (
    <CardHeader justifyContent="space-between" display="flex" flexDir="row">
      {isLargerThan1380 ?
        <>
          <DateRange isDrawer={false} />
          <Flex mb={3}>
            <Search isDrawer={false} />
            <Type isDrawer={false} />
            <Budget isDrawer={false} />
            <SortButton sortConfig={sortConfig} setSortConfig={setSortConfig} handleSort={handleSort} isDrawer={false} />
          </Flex></>
        :
        <Flex justifyContent={isMobile ? "flex-end" : "space-between"} width="100%">
          {!isMobile && <DateRange isDrawer={false} />}
          <Button colorScheme="telegram" onClick={onOpen}>
            Filters
          </Button>
        </Flex>
      }
      <Drawer placement={isMobile ? "bottom" : "right"} onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Filter Settings</DrawerHeader>
          <DrawerBody>
            <DateRange isDrawer={true} />
            <Search isDrawer={true} />
            <Type isDrawer={true} />
            <Budget isDrawer={true} />
            <SortButton sortConfig={sortConfig} setSortConfig={setSortConfig} handleSort={handleSort} isDrawer={true} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </CardHeader>
  )
}

export default Filters