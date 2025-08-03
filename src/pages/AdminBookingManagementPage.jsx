import { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'

import LoadingSpinner from '../components/LoadingSpinner'
import AdminBookingManagementTable from '../components/AdminBookingManagementTable'
import { fetchBookings } from '../features/bookings/bookingsSlice'
import { useDispatch } from 'react-redux'

export default function AdminBookingManagementPage() {
  const [filter, setFilter] = useState('confirmed')
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchBookings()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  return (
    <>
      <h1 className="my-4 ms-5">Admin Bookings Managament</h1>
      <Nav
        variant="tabs"
        defaultActiveKey="confirmed"
        justify
        className="mt-5 fw-bold"
      >
        <Nav.Item>
          <Nav.Link
            className="custom-nav-link"
            eventKey="confirmed"
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="custom-nav-link"
            eventKey="cancelled"
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {isLoading ? (
        <div className="my-5">
          <LoadingSpinner />
        </div>
      ) : (
        <AdminBookingManagementTable filter={filter} />
      )}
    </>
  )
}
