import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Verification from '../../components/Verification';

const VerificationPage = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (!router) {
      return;
    }
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);
  return <Verification />;
};

export default VerificationPage;
