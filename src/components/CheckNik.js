import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actCheckNikKswp, actCheckTunggakkan } from '../store/actions/checkNikKswp'
import { INIT_LOCAL_STATE } from '../store/constants'
import { useForm } from 'react-hook-form'
import LoadingSpinner from './LoadingSpinner'
import { useIsMounted } from '../alat/useIsMounted'
import { actCallNik } from '../store/actions/callNik'

const ViewDataWpCapil = props => {
  const dispatch = useDispatch()
  const isMounted = useIsMounted()
  const [isData, setIsData] = useState({
    ...INIT_LOCAL_STATE,
    data: {}
  })

  const callNik = useCallback((
    value,
    changeData
  ) => dispatch(actCallNik(
    isMounted,
    value,
    changeData
  )), [isMounted, dispatch])

  useEffect(() => {
    if (props.nik) callNik({
      nik: props.nik
    }, onChangeIsData)
  }, [props, callNik])

  const onChangeIsData = value => {
    setIsData(value)
  }

  const onRefreshCallNik = (nik, onChangeIsData) => event => {
    if (event) event.preventDefault()
    callNik({
      nik: nik
    }, onChangeIsData)
  }
  
  return (
    <div className="w-full mx-auto overflow-auto">
      <table className="table-auto text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="p-2 title-font tracking-wider font-medium text-gray-900 text-xs"></th>
            <th className="p-2 title-font tracking-wider font-medium text-gray-900 text-xs bg-gray-200 border">DATA WAJIB PAJAK PBB</th>
            <th className="p-2 title-font tracking-wider font-medium text-gray-900 text-xs bg-gray-200 border">
              DATA WAJIB PAJAK CAPIL
              <button
                disabled={isData.loading && `disabled`}
                type="button"
                onClick={onRefreshCallNik(props.nik, onChangeIsData)}
                className="ml-2 text-xs px-2 rounded-md bg-teal-500 bg-opacity-75 text-white"
              >refresh</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">NIK</td>
            <td className="border px-2 py-1 text-xs text-gray-900">{props.nik}</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
              {isData.data?.nik}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">NAMA</td>
            <td className="border px-2 py-1 text-xs text-gray-900">{props.namapbb}</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
              {isData.data?.nama}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">ALAMAT</td>
            <td className="border px-2 py-1 text-xs text-gray-900">{props.alamatpbb}</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
              {isData.data?.alamat}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">KELURAHAN</td>
            <td className="border px-2 py-1 text-xs text-gray-900">{props.kelurahanpbb}</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
              {isData.data?.nama_kel}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">KECAMATAN</td>
            <td className="border px-2 py-1 text-xs text-gray-900">{props.kecamatanpbb}</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
              {isData.data?.nama_kec}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">KABUPATEN/KOTA</td>
            <td className="border px-2 py-1 text-xs text-gray-900">{props.kotakabpbb}</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-2 py-1 text-xs font-semibold">PROVINSI</td>
            <td className="border px-2 py-1 text-xs text-gray-900">GORONTALO</td>
            <td className="border px-2 py-1 text-xs text-gray-900">
              {isData.loading && <span className="text-xs text-gray-600">Loading...</span>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const DataCapil = props => {
  const { data } = props

  if (data.length === 0) return null

  return (
    <div className="container lg:w-1/2 px-4 lg:px-2 mx-auto py-4">
      <div className="flex flex-col w-full mb-3">
        <h1 className="title-font sm:text-lg text-md font-medium text-gray-700">Data wajib pajak</h1>
      </div>
      <ViewDataWpCapil {...data[0]} />
    </div>
  )
}

const ViewObjekPajak = props => (
  <div className="w-full mx-auto overflow-auto mb-2">
    <table className="table-auto text-left whitespace-no-wrap">
      <tbody>
        <tr className="hover:bg-gray-100">
          <td className="border px-2 py-1 text-xs font-semibold">NAMA</td>
          <td className="border px-2 py-1 text-xs font-semibold">ALAMAT</td>
          <td className="border px-2 py-1 text-xs font-semibold">KELURAHAN</td>
          <td className="border px-2 py-1 text-xs font-semibold">KECAMATAN</td>
          <td className="border px-2 py-1 text-xs font-semibold">KABUPATEN/KOTA</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="border px-2 py-1 text-xs text-gray-900 uppercase">{props.namapbb}</td>
          <td className="border px-2 py-1 text-xs text-gray-900 uppercase">{props.jalan}</td>
          <td className="border px-2 py-1 text-xs text-gray-900 uppercase">{props.namakelurahan}</td>
          <td className="border px-2 py-1 text-xs text-gray-900 uppercase">{props.namakecamatan}</td>
          <td className="border px-2 py-1 text-xs text-gray-900 uppercase">{props.kotakabpbb}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const ViewTunggakkan = React.memo(props => {
  const isMounted = useIsMounted()
  const dispatch = useDispatch()
  const [isData, setIsData] = useState({
    ...INIT_LOCAL_STATE,
    data: []
  })

  let rows = null

  const checkTunggakkan = useCallback((
    value,
    changeData
  ) => dispatch(actCheckTunggakkan(
    isMounted,
    value,
    changeData
  )), [isMounted, dispatch])

  useEffect(() => {
    checkTunggakkan({
      nop: props.nop
    }, onChangeIsData)
  }, [checkTunggakkan, props.nop])

  const onChangeIsData = value => {
    setIsData(value)
  }

  rows = (
    <tr className="hover:bg-gray-100">
      <td colSpan={3} className="border px-2 py-1 text-xs text-gray-700 font-semibold">
        {isData.loading ? <span className="text-gray-500">Loading...</span> : <span className="text-white bg-green-500 px-2 rounded">TIDAK MEMPUNYAI TUNGGAKKAN</span>}
      </td>
    </tr>
  )

  if (isData.data.length > 0) {
    rows = isData.data.map(item => {
      return (
        <tr key={`${item.nosppt}-${item.tahunsppt}`} className="hover:bg-gray-100">
          <td className="text-red-500 border px-2 py-1 text-xs text-gray-700 font-semibold">{item.nosppt}</td>
          <td className="text-red-500 border px-2 py-1 text-xs text-gray-700 font-semibold">{item.tahunsppt}</td>
          <td className="text-red-500 border px-2 py-1 text-xs text-gray-700 font-semibold">{item.pbbterhutang}</td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className="w-full mx-auto overflow-auto">
        <table className="table-auto text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-2 py-1 title-font tracking-wider font-medium text-gray-800 text-xs bg-gray-200 border">NOSPPT</th>
              <th className="px-2 py-1 title-font tracking-wider font-medium text-gray-800 text-xs bg-gray-200 border">TAHUN</th>
              <th className="px-2 py-1 title-font tracking-wider font-medium text-gray-800 text-xs bg-gray-200 border">TERHUTANG</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      {isData.loading && <LoadingSpinner />}
    </>
  )
})

const ViewTable = ({ ...props }) => {
  const { data } = props
  let nomrw = 0

  if (data.length === 0) return null

  return (
    <div className="container lg:w-1/2 px-4 lg:px-2 mx-auto pt-4 pb-24">
      <div className="flex flex-col w-full mb-3">
        <h1 className="title-font sm:text-lg text-md font-medium text-gray-700">Data PBB</h1>
      </div>
      <div className="flex flex-wrap">
        {data.map(item => {
          nomrw++
          return (
            <div key={`${item.nop}-${item.nik}`} className="w-full mb-4">
              <div className="border-2 rounded-lg p-3 h-full border-b-2 pb-2 hover:border-teal-500 flex flex-col relative overflow-hidden">
                <span className="bg-teal-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">{nomrw}</span>
                <h1 className="text-lg text-gray-700 pb-1 mb-2 border-b-2 border-gray-200 leading-none">{`NOP : ${item.nop}`}</h1>
                <p className="text-xs font-semibold mb-2 text-gray-700">Data Objek Pajak</p>
                <ViewObjekPajak {...item} />
                <p className="text-xs font-semibold mb-2 text-gray-700">Tunggakkan</p>
                <ViewTunggakkan {...item} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CheckNik = () => {
  const isMounted = useIsMounted()
  const dispatch = useDispatch()
  const [isData, setIsData] = useState({
    ...INIT_LOCAL_STATE,
    data: []
  })

  const { handleSubmit, register, errors } = useForm()

  const checkKswp = useCallback((
    value,
    changeData
  ) => dispatch(actCheckNikKswp(
    isMounted,
    value,
    changeData
  )), [isMounted, dispatch])

  const onCheckKswp = value => {
    checkKswp(value, onChangeIsData)
  }

  const onChangeIsData = value => {
    setIsData(value)
  }

  return (
    <section className="text-gray-700 body-font">
      <div className="container lg:w-1/2 lg:w-1/2 px-4 lg:px-2 mx-auto flex md:flex-row flex-col items-center pt-12 lg:pt-24">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-lg text-md font-medium text-gray-700">Check</h1>
          <p className="leading-relaxed text-xs text-gray-700 -mt-2 mb-3">Inputkan nik pada form dibawah ini dengan baik dan benar.</p>
          <form className="flex w-full" onSubmit={handleSubmit(onCheckKswp)} autoComplete="off">
            <div className="flex w-full md:justify-start justify-center">
              <input ref={register({ required: true })} className="bg-gray-100 rounded-lg mr-4 border-2 focus:outline-none focus:border-teal-500 border-gray-400 focus:outline-none focus:border-gray-500 text-base px-4 lg:w-full xl:w-1/2 w-2/4 md:w-full" name="nik" placeholder="NIK" type="text" />
              <button disabled={isData.loading && `disabled`} type="submit" className="inline-flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-lg text-lg">Check</button>
            </div>
          </form>
          {errors.nik && <p className="text-xs text-red-600 w-full">Inputan tidak boleh kosong.</p>}
          {isData.errors && <p className="text-xs text-red-600 w-full">Data tidak ditemukan.</p>}
          {isData.loading && (
            <div className="w-full flex my-2">
              <LoadingSpinner />
              <p>Tunggu...</p>
            </div>
          )}
        </div>
      </div>
      <DataCapil {...isData} />
      <ViewTable {...isData} />
    </section>
  )
}

export default CheckNik
