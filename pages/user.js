import { getSession, signOut } from 'next-auth/react';
import Moralis from 'moralis';
import { Text } from '@chakra-ui/react';

// gets a prop from getServerSideProps
function User({ user, balance }) {
    return (
        <div>
            <Text>User: {user.address}</Text>
            <Text>Your MATIC balance: {((balance.balance)/1E18).toFixed(3)}</Text>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    
    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const response = await Moralis.EvmApi.balance.getNativeBalance({
        address: session.user.address,
        chain: 0x89
    })

    return {
        props: { user: session.user, balance: response.raw },
    };
}

export default User;