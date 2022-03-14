import { CButton, CTable, CTableBody, CTableHeaderCell, CTableRow } from '@coreui/react'
import QRCode from 'qrcode.react'
import React from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useSelector } from 'react-redux'
import { exportData } from '../../redux/selectors'
import Promise from 'bluebird'

const A4Page = () => {
  const pxMapping = {
    s: 64,
    m: 90,
    l: 142,
  }
  const perPageMapping = {
    s: 56,
    m: 36,
    l: 16,
  }
  const perLineMapping = {
    s: 8,
    m: 6,
    l: 4,
  }
  const data = useSelector(exportData)
  const listQrcode = data.totalItems
  const size = data.qrcodeSize
  let qrcodeComponent = []
  let subPage = []
  let subArray = []
  for (let i = 0; i < listQrcode.length; i++) {
    subArray.push(listQrcode[i])
    if ((i + 1) % perLineMapping[size] === 0) {
      subPage.push(subArray)
      subArray = []
    }
    if ((i + 1) % perPageMapping[size] === 0) {
      qrcodeComponent.push(subPage)
      subPage = []
    }
  }
  if (subArray.length > 0) subPage.push(subArray)
  if (subPage.length > 0) qrcodeComponent.push(subPage)
  console.log(qrcodeComponent)
  const handleExport = async (e) => {
    const pdf = new jsPDF()
    const len = qrcodeComponent.length
    const listPrint = []
    for (let i = 0; i < len; i++) {
      listPrint.push(document.getElementById(`print${i}`))
    }
    Promise.map(listPrint, async (ele, idx) => {
      let canvas = await html2canvas(ele)
      const imgData = await canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'JPEG', 0, 0)
      if (idx + 1 < len) pdf.addPage()
    }).then(() => {
      pdf.save('download.pdf')
    })
  }
  return (
    <div>
      {qrcodeComponent.map((page, index) => {
        return (
          <>
            <CTable
              key={index}
              hover
              id={`print${index}`}
              style={{ width: '640px', background: '#ffffff', tableLayout: 'fixed' }}
            >
              <CTableBody>
                {page.map((row, rowIdx) => {
                  return (
                    <CTableRow key={rowIdx} className={'text-center'}>
                      {row.map((item, itemIdx) => {
                        return (
                          <CTableHeaderCell key={itemIdx}>
                            <QRCode
                              value={item}
                              size={pxMapping[size]}
                              level={'H'}
                              includeMargin={true}
                            />
                            <p style={{ fontSize: '50%' }}>{item}</p>
                          </CTableHeaderCell>
                        )
                      })}
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </>
        )
      })}
      <CButton onClick={handleExport}>Export</CButton>
    </div>
  )
}

export default A4Page
