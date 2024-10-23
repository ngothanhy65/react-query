import axios from 'axios'

const fetchApi = async (page: number | string, limit: number | string) => {
  const response = await axios.get(`http://localhost:4000/students?page=${page}`, {
    params: { _page: page, _limit: limit }
  })
  console.log('response', response)
  console.log('page', page)
  return response
}
export default fetchApi
