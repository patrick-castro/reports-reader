import React, { useCallback, useEffect, useState } from 'react'
import { read, utils, writeFileXLSX } from 'xlsx'

interface President {
  Name: string
  Index: number
}

const sampleXLSX = 'https://sheetjs.com/pres.xlsx'

export default function Sample() {
  /* the component state is an array of presidents */
  const [pres, setPres] = useState<President[]>([])

  /* Fetch and update the state once */
  useEffect(() => {
    ;(async () => {
      const f = await (await fetch(sampleXLSX)).arrayBuffer()
      const wb = read(f) // parse the array buffer
      const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
      const data = utils.sheet_to_json(ws) as President[] // generate objects
      setPres(data) // update state
    })()
  }, [])

  /* get state data and export to XLSX */
  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(pres)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')
    writeFileXLSX(wb, 'SheetJSReactAoO.xlsx')
  }, [pres])

  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Index</th>
      </thead>
      <tbody>
        {
          /* generate row for each president */
          pres?.map((pres, idx) => (
            <tr key={idx}>
              <td>{pres.Name}</td>
              <td>{pres.Index}</td>
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        <td colSpan={2}>
          <button onClick={exportFile}>Export XLSX</button>
        </td>
      </tfoot>
    </table>
  )
}
