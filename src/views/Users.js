import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { saveUser, listUsers, deleteUser } from "../actions/user.actions"

import { BsPersonPlus } from "react-icons/bs"
import { AiOutlineExport } from "react-icons/ai"
import { GrEdit } from "react-icons/gr"

import jsPDF from "jspdf"
import "jspdf-autotable"
import ReactExport from "react-export-excel"
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn


function Users(props) {
  const [modal, setModal] = useState(false)
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [first_name, setName] = useState("")
  const [last_name, setSurname] = useState("")
  const userList = useSelector((state) => state.userList)
  const { loading, users, error } = userList;

  const userSave = useSelector((state) => state.userSave)
  const { loadingSave, success: successSave, error: errorSave } = userSave

  const userDelete = useSelector((state) => state.userDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete

  const dispatch = useDispatch()

  const openModal = (user) => {
    setModal(true)
    setId(user.id)
    setEmail(user.email)
    setName(user.first_name)
    setSurname(user.last_name)
  }

  useEffect(() => {
    if (successSave) {
      setModal(false);
    }
    dispatch(listUsers());
    return () => {
      //
    };
  }, [successSave, successDelete])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveUser({
        id,
        email,
        first_name,
        last_name,
      })
    );
  };

  const deleteHandler = (user) => {
    dispatch(deleteUser(user.id));
  };

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4"
    const orientation = "portrait"

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Users"
    const headers = [["Email", "First Name", "Last Name"]]

    const data = users.map(user => [user.email, user.first_name, user.last_name])

    let content = {
      startY: 50,
      head: headers,
      body: data
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("report.pdf")
  }

  return (
    <div className="content m-1">
      {modal && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2> Add New User</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  className="input-email"
                  type="text"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="first_name">Name</label>
                <input
                  className="input-first_name"
                  type="text"
                  name="first_name"
                  value={first_name}
                  id="first_name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="last_name">Last Name</label>
                <input
                  className="input-last_name"
                  type="text"
                  name="last_name"
                  value={last_name}
                  id="last_name"
                  onChange={(e) => setSurname(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="btn btn-primary">
                  {id ? "Update to edit" : "Add a new user"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="btn"
                >
                  Close
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="user-header">
        <h3>Users</h3>
        <div className="buttons">
          <button className="btn btn-primary" onClick={() => openModal({})}>
            <BsPersonPlus />  Add New User
        </button>
          <button className="btn" onClick={() => exportPDF()}>
            <AiOutlineExport /> Export to PDF
        </button>
          <ExcelFile element={<button className="btn">
            <AiOutlineExport /> Export to Excel
        </button>}>
            <ExcelSheet data={users} name="Users">
              <ExcelColumn label="Email" value="email" />
              <ExcelColumn label="First Name" value="first_name" />
              <ExcelColumn label="Last Name" value="last_name" />
            </ExcelSheet>
          </ExcelFile>
        </div>
      </div>
      <div className="user-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button className="btn" onClick={() => openModal(user)}>
                    <GrEdit /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteHandler(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users