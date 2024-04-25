import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {

  // console.log(supabase)

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setSmoothies(smootSebelumnya => {
      return smootSebelumnya.filter(smoothie => smoothie.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smooties').select().order(orderBy, { ascending: true })

      if (error) {
        setFetchError("Tidak bisa mengambil data")
        setSmoothies(null)
        console.log(error)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }

    }

    fetchSmoothies()

  }, [orderBy])

  return (
    <div className="page home">
      <h2>Beranda</h2>

      {fetchError && (<p>{fetchError}</p>)}

      {smoothies && (
        <div className="smoothies">
          {/* order by button */}
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={()=> setOrderBy('created_at')}>Time created</button>
            <button onClick={()=> setOrderBy('title')}>Title</button>
            <button onClick={()=> setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Home