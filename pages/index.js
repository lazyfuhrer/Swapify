import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div>
      <Box align={'center'}>
        <Heading py={'150'} px={'50'}>
          Welcome to Swapify - Converts Native tokens to ERC20
        </Heading>
      </Box>
    </div>
  )
}
