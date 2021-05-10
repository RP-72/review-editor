import React, {useState, useEffect} from 'react'
import store from '../redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal} from 'antd'

function Review(props) {
    const [openModal, setOpenModal] = useState(false)
    const [editedTitle, setEditedTitle] = useState()
    const [editedDesc, setEditedDesc] = useState()
    const [editedImg, setEditedImg] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        setEditedTitle(props.title)
        setEditedDesc(props.description)
        setEditedImg(props.image)
    },[props])

    const deleteReview = ()=>{
        dispatch({type: 'delete', payload: props.id})
    }
    const editClick = () =>{
        setOpenModal(true)
        setEditedTitle(props.title)
        setEditedDesc(props.description)
        setEditedImg(props.image)
    }
    const okClick = () => {
        console.log("Title", editedTitle, props.id)
        setOpenModal(false)
        dispatch({type: 'edit', payload: {
            key: props.id,
            title: editedTitle, 
            description: editedDesc,
            image: editedImg,
        }})
    }
    const cancelClick = () => {
        setOpenModal(false)
        setEditedTitle(props.title)
        setEditedDesc(props.description)
        setEditedImg(props.image)
    }   
    return (
        <div>
            <Modal
                visible={openModal}
                onOk = {okClick}
                onCancel = {cancelClick}
            >
                <h4>Title:</h4> <br/>
                <input type="text" value={editedTitle} onChange={(e)=>{setEditedTitle(e.target.value)}}/>
                <br/>
                <h4>Description</h4>
                <input type="text" value={editedDesc} onChange={(e)=>{setEditedDesc(e.target.value)}}/>
                <h4>Image:</h4>
                <input type="file" value={editedImg} onChange={(e)=>{setEditedImg(e.target.value)}}/>
            </Modal>
            <h4>{editedTitle}</h4> 
            <Button onClick={editClick}>Edit</Button>
            <Button onClick={deleteReview} type="submit"> delete </Button>
            <br/>
            {editedDesc}
            <img src={editedImg} alt="review image"/>
            <br/>
        </div>
    )
}

export default Review