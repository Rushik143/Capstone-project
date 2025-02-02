
function setupTable() {
    const table = document.getElementById('tableBooking')

    apiFetchAllBookings(table)
}

setupTable()

function propulateActualData(table, bookings) {

    for(const booking of bookings) {

        const { bookingId, bookingVname, bookingFrom, bookingDestination,date } = booking

        const updatePageUrl = `./update-booking-slot.html?bookingId=${bookingId}`
        const viewPageUrl = `./view-more-booking.html?bookingId=${bookingId}`


        const row = table.insertRow()
        row.insertCell(0).innerHTML = bookingId
        row.insertCell(1).innerHTML = bookingVname
        row.insertCell(2).innerHTML = bookingFrom
        row.insertCell(3).innerHTML = bookingDestination
        row.insertCell(4).innerHTML = date
        row.insertCell(5).innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="window.location='${viewPageUrl}';" data-bs-dismiss="modal">View More</a></button>
        <button type="button" class="btn btn-secondary" onclick="window.location='${updatePageUrl}';" data-bs-dismiss="modal">Update</a></button>
        <button type="button" class="btn btn-secondary" onclick='showConfirmDeleteModal(${bookingId})';" data-bs-dismiss="modal">Delete</a></button>`
    }
}

// function showConfirmDeleteModal(bookingId) {
//     console.log('clicked ' + bookingId)
//     const myModalEl = document.getElementById('deleteModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()

//     const btDl = document.getElementById('btDl')
//     btDl.onclick = () => {
//         apiCallDeleteBooking(bookingId, modal)
        
//         window.location.reload()
        
//     }
// }

function apiFetchAllEmp(table) {


    if(userId!='null')
    {
    axios.get('http://localhost:8080/company/getemployee')
        .then(res => {
            const { data } = res
            console.log(data)  
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
    }
        
}

function apiFetchAllBookings(table) {
    axios.get('http://localhost:8080/booking/list')
        .then(res => {
            const { data } = res
            console.log(data)  
            const {  bd } = data

            console.log(bd)

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
        
}

// function apiCallDeleteBooking(bookingId, modal) {
    
//     const url = `http://localhost:8080/booking/delete/${bookingId}`

//     axios.delete(url)
//         .then(res => res.data) // you converted complete response in to our business reponse
//         // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below
//         .then( ({ sts, msg, bd }) =>  modal.hide())
//         .catch(console.log)
// }
