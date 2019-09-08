import { useState, useEffect } from "react"
import hash from "../../util/hash"
import Cookies from "js-cookie"

const useToken = init => {
  const [token, setToken] = useState(init)

  useEffect(() => {
    const savedToken = Cookies.get("token")
    if (savedToken && savedToken !== "undefined") {
      setToken(Cookies.get("token"))
    } else {
      const accessToken = hash.access_token
      if (accessToken !== undefined) {
        setToken(accessToken)
        Cookies.set("token", accessToken)
      }
    }
  }, [])

  return [token, setToken]
}

export default useToken
