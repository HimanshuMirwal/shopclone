import React, { useState } from "react";
import "../styleSheets/Header.css"
import { Colors } from "../Colors";
import { getAuth, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider, updateProfile } from "firebase/auth";
import { AdminEmail } from "./Credentials";
import { toast } from "react-toastify";

const ResetPass = () => {
    const [displayName, setName] = useState("");
    const [NameValid, setNameValid] = useState(false);
    const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
    const email = user.email;
    const auth = getAuth();
    const onResetPass = async () => {
        return sendPasswordResetEmail(auth, email)
    }
    const CurrentUser = auth.currentUser;
    const DeleteAccount = () => {
        const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
        const displayName = user.displayName
        console.log(displayName);
        const data = localStorage.getItem("currentUserCredentials");
        const { email, Pass } = JSON.parse(data)
        const credential = EmailAuthProvider.credential(
            email,
            Pass
        );
        reauthenticateWithCredential(CurrentUser, credential).then((res) => {
            deleteUser(CurrentUser).then(() => {
                alert("user deleted.")
            }).catch((error) => {
                alert(error, "user deleted.")
            });
            console.log(res)
        }).catch((error) => {
            console.log(error)
        });
    }
    const UpdateProfile = () => {
        // console.log(auth.currentUser)
        if(NameValid){
            updateProfile(auth.currentUser, {
                displayName: displayName
            }).then(() => {
                toast.success("Your profile has updated, changes will appear when you login to shopclone next time.")
            }).catch((error) => {
                toast.error("Error has occur during processing your request, try after some time.",error)

            });
            console.log(NameValid)
            setName("");
            setNameValid(false);
        }else{
            toast("Please check the given details to update.")
        }
    }
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content" >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: Colors.primary }}>Profile operations</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group my-2" >
                        <h5 style={{ color: Colors.Gray }}>{displayName?displayName:email}</h5>
                            <strong><label style={{ color: Colors.Gray }}>Name</label></strong>
                            <input value={displayName} onChange={(e) => {
                                setName(e.target.value)
                                let usernameRegex = /^[a-zA-Z0-9]+$/;
                                if (usernameRegex.test(displayName)) {
                                    setNameValid(true)
                                } else {
                                    setNameValid(false)
                                }
                            }
                            } type="text" className="form-control" placeholder="Enter Name" />
                        </div>
                        <div className="mb-3">
                            <button
                                onClick={() => {
                                    UpdateProfile()
                                }}
                                className="btn" style={{ background: Colors.primary, color: Colors.secondary }}>
                                Update</button>
                        </div>
                        <div className="mb-3">
                            <button
                                onClick={() => {
                                    onResetPass()
                                }}
                                className="btn" style={{ background: Colors.primary, color: Colors.secondary }}>
                                Reset Password</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            type="button" className="btn btn-secondary" style={{ background: Colors.third, color: Colors.secondary }}>Close</button>
                        {email === AdminEmail ? "" : <button
                            onClick={() => {
                                DeleteAccount()
                            }}
                            type="button"
                            className="btn btn-danger" data-bs-dismiss="modal" >Delete Account</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;
