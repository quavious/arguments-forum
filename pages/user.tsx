import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import User, { UserProps } from '../components/User';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

const UserPage: NextPage<{ user: UserProps }> = (props) => {
  const { user } = props;
  return (
    <div>
      <User name={user?.name} email={user?.email} />
    </div>
  );
};

export default UserPage;
