import React, { useCallback, useEffect, useState } from 'react'
import { read, utils, writeFileXLSX } from 'xlsx'

interface President {
  Name: string
  Index: number
}

const dummy = [
  { Name: 'Bill Clinton', Index: 42 },
  { Name: 'GeorgeW Bush', Index: 43 },
  { Name: 'Barack Obama', Index: 44 },
  { Name: 'Donald Trump', Index: 45 },
  { Name: 'Joseph Biden', Index: 46 },
]

export default function XLSXRenderer() {
  /* the component state is an array of presidents */
  const [data, setData] = useState<President[]>(dummy)

  const exportFile = useCallback(() => {
    const workbook = utils.book_new()
    const worksheet = utils.json_to_sheet(data)
    utils.book_append_sheet(workbook, worksheet, 'Data')

    // Specify the cell reference
    const cellReference = 'B2' // Replace with your desired cell reference

    // Set the value in the specified cell
    worksheet[cellReference] = { v: 'Data Value' }

    // Specify the range of cells
    const startRow = 12
    const endRow = 25
    const column = 'A'

    writeFileXLSX(workbook, 'report-testing.xlsx')
  }, [data])

  return (
    <div>
      <button onClick={exportFile}>Export XLSX</button>
    </div>
  )
}
