import { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getCsrfToken,
  getSession,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import { useState } from 'react';
import Login from '../../components/Login';

export interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  csrfToken: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken,
    },
  };
};

const LogInPage: NextPage<SignInProps> = (props) => {
  const { csrfToken } = props;
  const [value, setValue] = useState('');
  return (
    <Login
      email={value}
      csrfToken={csrfToken}
      onEmailChange={(value) => setValue(value)}
      onEmailSubmit={(value) => {
        signIn('email', { email: value });
      }}
    />
  );
};

export default LogInPage;
