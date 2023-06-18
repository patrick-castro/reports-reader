import React, { useCallback, useState } from 'react'
import { read, utils } from 'xlsx'

import './App.css'

function App() {
  const [items, setItems] = useState([])

  const readExcel = useCallback((file: File) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target) return

        const bufferArray = e.target.result

        const workbook = read(bufferArray, { type: 'buffer' })

        const wsname = workbook.SheetNames[0]

        const worksheet = workbook.Sheets[wsname]

        const data = utils.sheet_to_json(worksheet)

        resolve(data)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promise.then((res: any) => {
      setItems(res)
    })
  }, [])

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e?.target?.files || [])[0]
    if (!file) return

    readExcel(file)
  }

  return (
    <main>
      <div>
        <input type='file' onChange={onChangeFileInput} />
      </div>
    </main>
  )
}

export default App
