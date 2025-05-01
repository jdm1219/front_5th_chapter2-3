import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useQueryParamsStore } from "./queryParamsStore"

export const useSyncQueryParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag, setFromURL } = useQueryParamsStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setFromURL(params)
  }, [location.search])

  useEffect(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])
}
