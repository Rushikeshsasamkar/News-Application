"use client"
import { useSelector } from "react-redux"
import Dashboard from "./components/Dashboard"

export default function Home() {
  //checking user is authorized or not
  const userData = useSelector((state) => state.user)

  return (
    <div className="mt-4">
      {
           <Dashboard />
      }
    </div>
  )
}
