import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createClient } from '@supabase/supabase-js'

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, res) => {
    const upload = await req.file({
      limits: {
        fileSize: 5_242_880,
      },
    })

    if (!upload) {
      return res.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-z]+/
    const isvalidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isvalidFileFormat) {
      return res.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    )
    const newFile = await supabase.storage
      .from('public')
      .upload(`uploads/${fileId.concat(extension)}`, upload.file, {
        cacheControl: '3600',
        upsert: false,
        duplex: 'half',
      })

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('public')
      .getPublicUrl(`uploads/${fileId.concat(extension)}`)
    console.log(publicUrl)
    return { data: publicUrl }
  })
}
