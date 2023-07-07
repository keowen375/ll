import React, {useState, useEffect} from 'react'
import '../styling/doctors.css'

export default function ViewDoctors(){

    const[doctors, setDoctors] = useState([])
    const[search, setSearch] = useState('')

    useEffect(() => {
        fetch('/doctors', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setDoctors(data))
    },[])

    const allDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(search.toLowerCase()) || 
        doctor.speciality.toLowerCase().includes(search.toLowerCase()) ||
        doctor.location.toLowerCase().includes(search.toLowerCase())
        )

    const listDoctors = allDoctors.map((doctor) => {
        return(
            <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.speciality}</td>
                <td>{doctor.location}</td>
            </tr>
        )
    })

    return(
        <div id='doctors-page'>

            <input type='search' className='form-control border-primary' style={{width: '310px'}} placeholder='Search by name, location or speciality' id='search-input' onChange={e => setSearch(e.target.value)}/> 

            <table className='table table-striped table-hover' id='doctors-table'>

                <thead className='bg-primary'>
                    <tr>
                        <td className='text-light'>ID.</td>
                        <td className='text-light'>Name</td>
                        <td className='text-light'>Contact</td>
                        <td className='text-light'>Speciality</td>
                        <td className='text-light'>Location</td>
                    </tr>
                </thead>
                <tbody>
                    {listDoctors}
                </tbody>
            </table>

        </div>
        
    )
}