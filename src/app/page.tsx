"use client"
import Grid from "@/components/grid/Grid"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
    }
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  return (
    <main className='container'>
      <div>
      <Grid/>
      </div>
    </main>
  )
}
