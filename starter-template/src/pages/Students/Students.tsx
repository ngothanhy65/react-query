import { keepPreviousData, useQuery, useParams } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import fetchApi from '../../apis/students.apt'
import { useState } from 'react'

export default function Students() {
  let { pageNow } = useParams()
  const [page, setPage] = useState<number>(1)
  const LIMIT = 10
  const { isLoading, isError, isPlaceholderData, data } = useQuery({
    queryKey: ['student', page],
    queryFn: () => fetchApi(page, LIMIT),
    placeholderData: keepPreviousData
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  const totalStudentCount = Number(data?.headers['x-total-count'])
  const totalPages = Math.ceil(totalStudentCount / LIMIT)
  console.log('data: ', data?.headers['x-total-count'])
  console.log('totalPages', totalPages)
  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                #
              </th>
              <th scope='col' className='px-6 py-3'>
                Avatar
              </th>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((student: { id: number; avatar: string; last_name: string; email: string }) => (
              <tr
                key={student.id}
                className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
              >
                <td className='px-6 py-4'>{student.id}</td>
                <td className='px-6 py-4'>
                  <img src={student.avatar} alt='student' className='h-5 w-5' />
                </td>
                <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                  {student.last_name}
                </th>
                <td className='px-6 py-4'>{student.email}</td>
                <td className='px-6 py-4 text-right'>
                  <Link to='/students/1' className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'>
                    Edit
                  </Link>
                  <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              {page === 1 ? (
                <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Previous
                </span>
              ) : (
                <Link
                  className=' border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  to={`/students?_page=${page - 1}`}
                  onClick={() => {
                    setPage(page - 1)
                  }}
                >
                  Previous
                </Link>
              )}
            </li>
            {Array(10)
              .fill(0)
              .map((_, index) => {
                const pageNumber = index + 1
                return (
                  <li key={pageNumber}>
                    <Link
                      onClick={() => {
                        setPage(pageNumber)
                      }}
                      className={` border border-gray-300 bg-white px-3 py-2  hover:bg-gray-100 hover:text-gray-700`}
                      to={`/students?_page=${pageNumber}`}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                )
              })}
            <li>
              {page === 10 ? (
                <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Next
                </span>
              ) : (
                <Link
                  className=' border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  to={`/students?_page=${page + 1}`}
                  onClick={() => {
                    setPage(page + 1)
                  }}
                >
                  Next
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
