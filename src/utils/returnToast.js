export const returnToast = (toast, isSuccess, message) => {
  if (isSuccess) {
    return toast({
      title: message,
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } else {
    return toast({
      title: message,
      position: "top",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
