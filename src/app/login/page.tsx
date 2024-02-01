"use client"
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Login'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useMyNavigationContext } from '@/contexts/NavigationContext';

const page = () => {
  const { setPage } = useMyNavigationContext();
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    setPage("Dashboard")
    router.push("/");
    return null;
  }

  return (
    <Login />
  )
}

export default page