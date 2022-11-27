import { Button } from '@chakra-ui/react'
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
      <Button onClick={getName} bgColor='teal.300'>Click Here</Button>
    </div>
  )
}
