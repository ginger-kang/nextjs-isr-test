import * as React from 'react'
import type {GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import Identicon from 'identicon.js'
import { hashGeneratorHelper } from '../src/utils/hashGeneratorHelper'

interface Props {
  identicon: string
}

const Random = ({ identicon }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const icon = `data:image/png;base64,${identicon}`

  return (
    <>
      <img src={icon} alt="icon"/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string

  const identicon = new Identicon(id).toString()

  return {
    props: {
      identicon
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const hashs = hashGeneratorHelper(15, 10000)

  const paths = hashs.map((hash) => {
    return { params: { id: hash } }
  })

  return {
    paths,
    fallback: true,
  }
}

export default Random