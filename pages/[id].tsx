import * as React from 'react'
import type {GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { Md5 } from 'ts-md5/dist/md5'
import { useRouter } from 'next/dist/client/router'

interface Props {
  hex: string
}

const Random = ({ hex }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>{hex}</div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  const id = ctx?.params?.id as string

  return {
    props: {
      hex: Md5.hashStr(id)
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = Array.from({ length: 10 }, (_, i) => i + 1)
  const paths = ids.map((id) => {
    return { params: { id: id.toString() } }
  })

  return {
    paths,
    fallback: true,
  }
}

export default Random