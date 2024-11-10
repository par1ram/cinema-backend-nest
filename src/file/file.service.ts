import { Injectable } from '@nestjs/common'
import { IFileResponse } from './types/file.interface'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<IFileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`

    await ensureDir(uploadFolder)

    const res: IFileResponse[] = await Promise.all(
      files.map(async (file) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`
        await writeFile(`${uploadFolder}/${uniqueName}`, file.buffer)

        return {
          url: `/uploads/${folder}/${uniqueName}`,
          name: uniqueName,
        }
      }),
    )
    return res
  }
}
