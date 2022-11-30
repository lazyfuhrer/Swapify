import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import axios from 'axios'
import NextLink from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div>
      <Box align={'center'}>
        <Heading mt={'150'} px='50' mb={'75'}>
          Welcome to Swapify - Converts Native tokens to ERC20
        </Heading>
        <Link as={NextLink} href='/login' fontSize={'2xl'}>
          Connect your wallet
        </Link>
      </Box>
    </div>
  )
}
