import './App.css'

import { DataGrid, Download, Status, StatusProps } from './components'
import { DataGridColumn } from './components/DataGrid/types'


interface Data extends Record<string, unknown> {
  name: string;
  device: string;
  path: string;
  status: string;
}

const data: Data[] = 
[
  {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
  {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
  {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
  {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
  {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
]


const columns: DataGridColumn<Data>[] = [
  { id: 'name', label: 'Name', accessor: 'name' },
  { id: 'device', label: 'Device', accessor: 'device' },
  { id: 'path', label: 'Path', accessor: 'path' },
  { id: 'status', label: 'Status', accessor: 'status', customRender: (row) => <Status status={row.status as StatusProps['status']} /> },
]


function App() {

  const handleDownload = (rows: Data[]) => {
    console.log('Downloading:', rows);
    alert(JSON.stringify(rows, null, 2));
  }

  return (
    <>
      <DataGrid
        data={data}
        columns={columns}
        uniqueKey="name"
        isSelectable={true}
        isRowSelectable={(row) => row.status === 'available'}
        topbarProps={{
          customActions: (selectedRows) => {
            return (
              <Download onClick={() => handleDownload(selectedRows)} disabled={selectedRows.length === 0} />
            );
          }
        }}
      />
    </>
  )
}

export default App
