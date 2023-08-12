'use client'
import { NextPage } from 'next'
import style from './style.module.scss'

const AdminDashboard: NextPage = () => {
  return (
    <div className={` ${style['dashborad-wrapper']}`}>
      <div className={` ${style['dashborad-wrapper-bg']}`}></div>
      <div className="title-wrapper flex  h-full w-full flex-col flex-wrap items-center justify-center">
        <h1 className="text-center text-2xl font-semibold">
          Selamat Datang di Web Admin AmalKita
        </h1>
        <h2 className="text-center text-xl font-medium">
          {' '}
          Yayasan Peduli Yatim Piatu An-Nur
        </h2>
      </div>
    </div>
  )
}

export default AdminDashboard
