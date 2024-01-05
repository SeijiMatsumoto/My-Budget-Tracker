import { Button, Flex, Icon } from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '../../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = () => {
  const { user } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google login error:', error.message);
    }
  };

  return (
    <Button onClick={handleGoogleLogin} isDisabled={user !== null}>
      {user ?
        'Already logged in'
        : <Flex flexDir="row" alignItems="center"> <Icon as={FaGoogle} mr="10px" />Login with Google</Flex>}
    </Button>
  );
};

export default GoogleLoginButton;
