import { useEffect, useState } from "react"
import { changeCustomerProfile, getLoggedInCustomer } from "../ApiManager"

export const CustomerForm = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    //state and observer code for user alert
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    //initial state of profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: 1111111111
    })

    //Get customer profile info from API and update state
    useEffect(() => {
        getLoggedInCustomer(honeyUserObject.id)
            .then((data) => {
                const employeeObject = data[0]
                updateProfile(employeeObject)
            })
    },
        []
    )

    //click event
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        changeCustomerProfile(profile)
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
    }
    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Change Customer Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    // TODO: Update specialty property
                                    const copy = { ...profile }
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    // TODO: Update specialty property
                                    const copy = { ...profile }
                                    copy.phoneNumber = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}