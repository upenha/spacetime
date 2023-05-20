'use client'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import cookie from 'js-cookie'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
dayjs.locale(ptBr)

interface ViewMemoryProps {
  params: Record<string, string>
}

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default function ViewMemory({ params }: ViewMemoryProps) {
  const postId = params.id
  const token = cookie.get('token')
  if (!params) redirect('/')
  const [memory, setMemory] = useState<null | Memory>(null)

  useEffect(() => {
    api
      .get(`/memories/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMemory(res.data)
      })
  }, [])

  if (memory === null) return
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <div key={memory?.id} className="space-y-4">
        <Image
          src={memory?.coverUrl}
          width={592}
          height={280}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-100">
          {memory?.content}
        </p>
      </div>
    </div>
  )
}
