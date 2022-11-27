import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button } from '@chakra-ui/react';

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();

    const handleAuth = async (wallet) => {
        if (isConnected) {
            await disconnectAsync();
        }

        const userData = { network: 'evm' };

        if (wallet === 'metamask') {
            const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });
            userData.address = account;
            userData.chain = chain.id;
        }

        if (wallet === 'walletConnect') {
            const { account, chain } = await connectAsync({ connector: new WalletConnectConnector({options: {qrcode:true}}) });
            userData.address = account;
            userData.chain = chain.id;
        }

        if (wallet === 'coinbase') {
            const { account, chain } = await connectAsync({ connector: new CoinbaseWalletConnector() });
            userData.address = account;
            userData.chain = chain.id;
        }

        // const userData = { address: account, chain: chain.id, network: 'evm' };

        const { data } = await axios.post('/api/auth/request-message', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const message = data.message;

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/user' });
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    return (
        <div>
            <h3>Web3 Authentication</h3>
            <Button onClick={() => handleAuth("metamask")} bgColor={'teal.300'}>Authenticate via Metamask</Button>
            <br/>
            <Button onClick={() => handleAuth("walletConnect")} bgColor={'teal.500'}>Authenticate via WalletConnect</Button>
            <br/>
            <Button onClick={() => handleAuth("coinbase")} bgColor={'teal.700'}>Authenticate via Coinbase</Button>

        </div>
    );
}

export default SignIn;