import { Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  async function getName() {
    const res = await axios.get('/api/hello')
    console.log(res)
  }

  return (
    <div>
      <Heading alignItems={'center'} justifyContent='center'>
        Welcome to Swapify - Converts Native tokens to ERC20
      </Heading>
    </div>
  )
}
