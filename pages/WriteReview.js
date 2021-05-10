import React, {useState, useEffect} from 'react'
import store from '../redux/store'
import {useDispatch} from 'react-redux'
import Link from 'next/Link'
import {Button, Input, message} from 'antd'
import {useSelector} from 'react-redux'


function WriteReview() {
    const [reviewTitle, setTitle] = useState("");
    const [reviewDescription, setDescription] = useState("");
    const [reviewImage, setImage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const dispatch = useDispatch()
    const selecter = state => state;
    const st = useSelector(selecter)
    const addReview= ()=>{ 
        dispatch({type: 'add', payload: {
                                            title: reviewTitle, 
                                            description: reviewDescription, 
                                            image: reviewImage
                                        }})
        console.log(store.getState());
        setTitle("");
        setDescription("");
        setImage("");
        message.success('Review added')        
    }

    useEffect(()=>{
        if(!(reviewTitle && reviewDescription)){
            setButtonDisabled(true)
        }
        else setButtonDisabled(false)
    },[reviewTitle, reviewDescription])
    //const [image, setImage] = useState("");
    return (
        <div>
            <ul>
                <li>
                    <Link href="../">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/WriteReview">
                        <a>Write a review</a>
                    </Link>
                </li>
                <li>
                    <Link href="/EditReview">
                        <a>Edit reviews</a>
                    </Link>
                </li>
            </ul>
            <h1>Enter your review here</h1>
            <h3>title:</h3>
            <br/>
            <Input type="text" 
                placeholder="Enter title here" 
                value={reviewTitle} 
                onChange={(e) => setTitle(e.target.value)}/>
            <h3>Description: </h3>
            <br/>
            <Input type="text" 
                placeholder="Enter description here" 
                value={reviewDescription} 
                onChange={(e) => setDescription(e.target.value)}/>
            <br/>
            <h3>Choose the image you want to upload </h3>
            <Input type="file" onChange={(e)=> setImage(e.target.value)}/>
            <br/>
            <br/>
            <Button onClick={addReview} disabled={buttonDisabled}> Add review </Button>
        </div>
    )        
}

export default WriteReview
