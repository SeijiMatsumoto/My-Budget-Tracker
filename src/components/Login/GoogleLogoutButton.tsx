import { Box, Button } from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const GoogleLogoutButton = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!user || loading) return null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
      return null;
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
    >
      <Button colorScheme="gray" onClick={handleSignOut} mb={5}>
        Sign Out
      </Button>
    </Box>
  )
};

export default GoogleLogoutButton;
